import { execFileSync } from 'node:child_process';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './build.mjs';

export function forbiddenPath(name) {
  if (name.split('/').some(part => ['dist', '_site', 'node_modules'].includes(part))) return true;
  const file = path.posix.basename(name);
  return (file === '.env' || file.startsWith('.env.')) && file !== '.env.example';
}

// Prüft Dateiziele, keine externen URLs oder Überschriften-Anker. Beispiele in
// Codeblöcken sind keine Links der Dokumentation.
export function localLinks(markdown) {
  const text = markdown.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
  const targets = [];
  const pattern = /!?\[[^\]\n]*\]\((?:<([^>]+)>|([^\s)]+))(?:\s+"[^"]*")?\)/g;
  for (const match of text.matchAll(pattern)) targets.push(match[1] ?? match[2]);
  for (const match of text.matchAll(/^\s{0,3}\[[^\]\n]+\]:\s*(?:<([^>]+)>|(\S+))/gm)) targets.push(match[1] ?? match[2]);
  return targets.filter(target => !/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(target));
}

export async function validateRepositoryFiles(root, files) {
  const errors = [];
  const names = new Set(files);
  for (const name of names) {
    if (forbiddenPath(name)) errors.push('Nicht versionieren: ' + name);
    if (!name.endsWith('.md')) continue;
    const text = await readFile(path.join(root, name), 'utf8');
    for (const link of localLinks(text)) {
      let target;
      try {
        const pathname = decodeURIComponent(link.split(/[?#]/)[0]);
        if (pathname.startsWith('/') || pathname.includes('\\')) throw new Error();
        target = path.posix.normalize(path.posix.join(path.posix.dirname(name), pathname));
        if (target === '..' || target.startsWith('../')) throw new Error();
      } catch {
        errors.push(name + ': ungültiges lokales Dateiziel ' + link);
        continue;
      }
      const directory = target.replace(/\/$/, '');
      // Git-Pfade statt nur exists(): Windows würde eine falsche Großschreibung
      // sonst akzeptieren, GitHub und Linux aber nicht.
      if (target !== '.' && !names.has(target) && ![...names].some(file => file.startsWith(directory + '/'))) {
        errors.push(name + ': fehlendes Dateiziel ' + link);
      }
    }
  }
  return errors;
}

export async function checkRepository(root = ROOT) {
  const listed = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: root, encoding: 'utf8' });
  const files = [];
  for (const name of new Set(listed.split('\0').filter(Boolean))) {
    // Eine beabsichtigte Löschung wird vor dem Staging ebenso geprüft wie danach.
    try { await access(path.join(root, name)); files.push(name); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  const errors = await validateRepositoryFiles(root, files);
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`PASS: Repository – ${files.filter(name => name.endsWith('.md')).length} Markdown-Dateien, lokale Dateilinks und keine versionierten Build-/Umgebungsdateien.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { await checkRepository(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
