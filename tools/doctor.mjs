import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './build.mjs';

function git(...args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function optionalGit(...args) {
  try { return git(...args); } catch { return null; }
}

const args = process.argv.slice(2);
if (args.some(arg => arg !== '--json')) {
  console.error('Aufruf: npm run doctor [-- --json]');
  process.exitCode = 1;
} else {
  const errors = [], warnings = [];
  const expected = 'Thitronik/smartdock-website';
  const origin = optionalGit('config', '--get', 'remote.origin.url');
  // Remote-URLs können Zugangswerte enthalten und werden deshalb nie ausgegeben.
  const originMatches = typeof origin === 'string' && /^(?:https:\/\/github\.com\/|git@github\.com:|ssh:\/\/git@github\.com\/)Thitronik\/smartdock-website(?:\.git)?\/?$/i.test(origin);
  if (!originMatches) errors.push('origin fehlt oder zeigt nicht auf ' + expected + '.');
  if (process.versions.node.split('.')[0] !== '24') errors.push('Node 24 erforderlich; gefunden: ' + process.versions.node);
  const head = optionalGit('rev-parse', '--verify', 'HEAD');
  if (!head) errors.push('Kein lesbarer Git-Stand. Git-Installation und Repository prüfen.');
  const branch = optionalGit('symbolic-ref', '--quiet', '--short', 'HEAD');
  if (head && !branch) warnings.push('Detached HEAD: vor Änderungen einen eigenen Branch anlegen.');
  const status = optionalGit('status', '--porcelain=v1', '--untracked-files=all');
  if (status === null) errors.push('Arbeitsverzeichnis konnte nicht geprüft werden.');
  const changedFiles = status ? status.split('\n').length : 0;
  if (changedFiles) warnings.push('Vorhandene Änderungen erhalten und vor neuen Änderungen zuordnen.');
  if (['main', 'staging'].includes(branch)) warnings.push('Vor Änderungen auf einen eigenen codex/…- oder claude/…-Branch wechseln.');
  const refs = Object.fromEntries(['main', 'staging'].map(name => [name, optionalGit('rev-parse', '--verify', 'refs/remotes/origin/' + name)]));
  let comparison = null;
  if (refs.main && refs.staging) {
    const counts = optionalGit('rev-list', '--left-right', '--count', 'origin/main...origin/staging');
    const diff = optionalGit('diff', '--name-only', '-z', 'origin/main', 'origin/staging');
    if (counts !== null && diff !== null) {
      const [mainOnly, stagingOnly] = counts.split(/\s+/).map(Number);
      comparison = { mainOnly, stagingOnly, differentFiles: diff.split('\0').filter(Boolean).length };
      if (comparison.differentFiles) warnings.push('main und staging enthalten unterschiedliche Dateien; betroffene Commits und offene PRs vor Wahl der Basis ansehen.');
    } else warnings.push('Branchvergleich nicht möglich; gegebenenfalls fehlen Commits im lokalen Clone.');
  } else warnings.push('Lokale Remote-Referenzen fehlen. Zuerst git fetch --all --prune ausführen.');
  let lastFetch = null;
  const fetchPath = optionalGit('rev-parse', '--git-path', 'FETCH_HEAD');
  if (fetchPath) {
    try { lastFetch = statSync(path.resolve(ROOT, fetchPath)).mtime.toISOString(); }
    catch (error) { if (error.code !== 'ENOENT') warnings.push('Zeitpunkt des letzten Fetch nicht lesbar.'); }
  }
  const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const report = { repository: expected, originMatches, node: process.versions.node, branch, head, changedFiles, lastFetch, remoteRefs: refs, comparison, commands: pkg.scripts, errors, warnings };
  if (args.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(`SMARTDOCK Projektcheck\nRepository: ${expected} (${originMatches ? 'origin stimmt' : 'origin prüfen'})\nNode: ${report.node}\nBranch: ${branch ?? '(detached/kein Git)'}\nCommit: ${head ?? '(fehlt)'}\nGeänderte/neue Dateien: ${changedFiles}\nLetzter lokaler Fetch: ${lastFetch ?? '(unbekannt)'}`);
    if (comparison) console.log(`main/staging: ${comparison.mainOnly} / ${comparison.stagingOnly} eigene Commits, ${comparison.differentFiles} unterschiedliche Dateien.`);
    for (const error of errors) console.log('FEHLER: ' + error);
    for (const warning of warnings) console.log('HINWEIS: ' + warning);
    console.log('Nur lokale Git-Fakten; offene PRs separat prüfen. Kein Build oder fachlicher Freigabenachweis.\nEinstieg: AGENTS.md → docs/README.md → CONTRIBUTING.md');
  }
  if (errors.length) process.exitCode = 1;
}
