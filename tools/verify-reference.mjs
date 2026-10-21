import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { createOutput, PAGES_BASE } from './build.mjs';

// Einmaliger Migrationsvergleich. Spätere gewollte Inhaltsänderungen dürfen
// hiervon abweichen; die historische Referenz wird dafür nicht überschrieben.
const reference = JSON.parse(await readFile(new URL('../docs/migration/export-reference.json', import.meta.url), 'utf8'));
for (const [base, kind] of [['', 'files'], [PAGES_BASE, 'pages']]) {
  const expected = Object.assign({}, reference[kind], ...(reference.includedChanges || []).map(change => change[kind]));
  const files = await createOutput(base);
  assert.deepEqual([...files.keys()].sort(), Object.keys(expected).sort(), 'Dateibestand abweichend');
  const differences = [];
  for (const [name, bytes] of files) {
    const hash = crypto.createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    if (hash !== expected[name]) differences.push(name);
  }
  assert.deepEqual(differences, [], 'Inhalt weicht von Migrationsreferenz ab');
  console.log(`PASS: ${files.size} ${base ? 'Pages' : 'Root'}-Dateien bytegleich zur Referenz ${reference.commit.slice(0, 7)} plus FAQ-Fix #4.`);
}
