import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { validateRepositoryFiles, checkRepository } from './check-repository.mjs';

async function withDocument(text, run) {
  const root = await mkdtemp(path.join(tmpdir(), 'smartdock-repo-test-'));
  try {
    await writeFile(path.join(root, 'README.md'), text, 'utf8');
    await run(root);
  } finally {
    // Ausschließlich das von diesem Test angelegte, eindeutig benannte Verzeichnis.
    assert.equal(path.dirname(path.resolve(root)), path.resolve(tmpdir()));
    assert.ok(path.basename(root).startsWith('smartdock-repo-test-'));
    await rm(root, { recursive: true, force: true });
  }
}

test('Eine umbenannte Dokumentation und falsche Großschreibung brechen die Prüfung', async () => {
  await withDocument('[alt](TEAM-WORKFLOW.md) [Fall](docs/Ziel.json)', async root => {
    const errors = await validateRepositoryFiles(root, ['README.md', 'docs/ziel.json']);
    assert.equal(errors.length, 2);
    assert.ok(errors.some(error => error.includes('TEAM-WORKFLOW.md')));
    assert.ok(errors.some(error => error.includes('docs/Ziel.json')));
  });
});

test('Datei-, Bild- und Referenzlinks funktionieren mit Leerzeichen, Ankern und Verzeichnissen', async () => {
  const source = '[Datei](docs/Ein%20Bild.png#beispiel) ![Bild](<docs/Ein Bild.png>) [Ordner](docs/)\n[Quelle]: docs/data.json\n[Web](https://example.com/kein-lokales-ziel) [Anker](#intern)\n```md\n[Beispiel](gibt-es-nicht.md)\n```';
  await withDocument(source, async root => {
    assert.deepEqual(await validateRepositoryFiles(root, ['README.md', 'docs/Ein Bild.png', 'docs/data.json']), []);
  });
});

test('Build-Ausgaben und Umgebungsdateien werden auch bei erzwungenem Git-Add abgewiesen', async () => {
  await withDocument('[Ausbruch](../privat.txt) [Defekt](%xx)', async root => {
    await writeFile(path.join(root, '.gitignore'), 'dist/\n_site/\nnode_modules/\n.env*\n');
    const files = ['dist/index.html', '_site/index.html', 'node_modules/paket/index.js', '.env', 'nested/.env.production', '.env.example'];
    for (const file of files) {
      await mkdir(path.dirname(path.join(root, file)), { recursive: true });
      await writeFile(path.join(root, file), 'TEST_PLACEHOLDER');
    }
    execFileSync('git', ['init', '--quiet'], { cwd: root });
    execFileSync('git', ['add', '--force', '--', ...files], { cwd: root });
    await assert.rejects(checkRepository(root), error => {
      const errors = error.message.split('\n');
      assert.equal(errors.filter(line => line.startsWith('Nicht versionieren:')).length, 5);
      assert.equal(errors.filter(line => line.includes('ungültiges lokales Dateiziel')).length, 2);
      assert.ok(!errors.some(line => line.includes('.env.example')));
      return true;
    });
  });
});
