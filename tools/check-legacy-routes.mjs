import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

// Der übernommene Export hat noch kein Quellprojekt. Deshalb führt diese
// Regression nur den vorhandenen Redirect mit isolierten Router-Eingaben aus.
// Ändert sich das Bündel, muss die Prüfung bewusst angepasst werden.
const bundle = fileURLToPath(new URL('../dist/assets/index-RRVGC1mK.js', import.meta.url));
const source = await readFile(bundle, 'utf8');
function extract(marker, endMarker, offset = 0) {
  const start = source.indexOf(marker);
  assert.ok(start >= 0 && start === source.lastIndexOf(marker), 'Einstieg nicht eindeutig: ' + marker);
  const end = source.indexOf(endMarker, start);
  assert.ok(end > start, 'Ende nicht gefunden: ' + endMarker);
  return source.slice(start + offset, end);
}
const mapping = JSON.parse(extract('Mf={"/ch":', ',XA=', 3));
const normalize = extract('x0=e=>', ';function b0', 3);
const redirect = extract('fo=()=>{', ',aJ=', 3);
const expected = {
  '/ch': '/', '/ch/produkt': '/produkt', '/ch/funktionen': '/funktionen',
  '/ch/features': '/features', '/ch/installation': '/installation',
  '/ch/faq': '/faq', '/ch/konfigurator': '/konfigurator',
  '/ch/haendlerfinder': '/haendlerfinder', '/ch/datenschutz': '/datenschutz',
  '/ch/impressum': '/impressum', '/ch/agb': '/agb',
  '/ch/barrierefreiheit': '/barrierefreiheit',
  '/ch/widerrufsbelehrung': '/widerrufsbelehrung',
  '/ch/versandbedingungen': '/versandbedingungen', '/ch/contact': '/'
};
assert.deepEqual(mapping, expected, 'Die übernommenen CH-Zielpfade haben sich geändert.');
const failures = [];
let count = 0;
for (const [path, target] of Object.entries(expected)) {
  for (const suffix of ['', '/']) {
    for (const extra of [{ search: '', hash: '' }, { search: '?from=legacy&test=1', hash: '#details' }]) {
      const input = { pathname: path + suffix, ...extra };
      const result = vm.runInNewContext('const x0 = ' + normalize + ';(' + redirect + ')()', {
        ai: () => input, Mf: mapping, Yg: null,
        r: { jsx: (_component, props) => props }
      }, { timeout: 100 });
      count++;
      if (result.to !== target + extra.search + extra.hash || result.replace !== true) {
        failures.push({ input, expected: target + extra.search + extra.hash, actual: result.to });
      }
    }
  }
}
if (failures.length) {
  console.error(JSON.stringify({ checked: count, failures: failures.length, examples: failures.slice(0, 3) }, null, 2));
  process.exitCode = 1;
} else {
  console.log('PASS: ' + count + ' Redirect-Fälle; Ziel, Query, Hash und replace stimmen.');
}
