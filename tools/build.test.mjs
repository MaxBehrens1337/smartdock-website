import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { createOutput, adaptForBase, validateBase, validateRoutes, PAGES_BASE } from './build.mjs';

test('URL-Basis und Routen lassen weder Pfadausbruch noch mehrdeutige Ziele zu', () => {
  for (const base of ['../dist', '/a/', '//host', '/a?b', '/a/../b', '/a"']) assert.throws(() => validateBase(base));
  const app = { main: {} };
  const route = { path: '/', application: 'main', htmlLang: 'de', lineEnding: 'lf' };
  validateRoutes([route], app);
  for (const path of ['/../', '/%2e%2e/', '/a\\b/', '/A/', '/no-slash']) assert.throws(() => validateRoutes([{ ...route, path }], app));
  assert.throws(() => validateRoutes([route, route], app), /Doppelter/);
  assert.throws(() => validateRoutes([{ ...route, application: 'unknown' }], app), /Unbekannte/);
});

test('Pages-Anpassung erhält React-Routen, externe URLs und Query/Hash', () => {
  const source = 'const x={path:"/faq",src:"/media/image.png",href:"/faq?q=1#answer",external:"https://example.com/media/image.png"};';
  const result = adaptForBase(source, 'assets/main.js', PAGES_BASE);
  assert.ok(result.includes('path:"/faq"'));
  assert.ok(result.includes('src:"/smartdock-website/media/image.png"'));
  assert.ok(result.includes('href:"/smartdock-website/faq?q=1#answer"'));
  assert.ok(result.includes('https://example.com/media/image.png'));
});

test('Navigation unter Pages verdoppelt den Präfix nicht und verändert keine fremden Ziele', () => {
  const html = adaptForBase('<html><head></head></html>', 'index.html', PAGES_BASE);
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const context = { URL, window: {}, location: { href: 'https://example.com/smartdock-website/', origin: 'https://example.com' }, document: { addEventListener() {} } };
  vm.runInNewContext(script, context, { timeout: 100 });
  const navigate = context.window.__sdPagesUrl;
  assert.equal(navigate('/faq?q=1#answer'), '/smartdock-website/faq?q=1#answer');
  for (const target of ['/smartdock-website/faq', 'https://other.example/faq', 'mailto:smartdock@thitronik.de']) assert.equal(navigate(target), target);
});

test('Der Build erzeugt beide Anwendungen, fünf Sprach-Einstiege und alle historischen Seiten', async () => {
  const root = await createOutput();
  const pages = await createOutput(PAGES_BASE);
  assert.equal([...root.keys()].filter(name => name.endsWith('.html')).length, 116);
  assert.equal(root.size, 186);
  assert.equal(pages.size, root.size + 1);
  for (const language of ['', 'en/', 'fr/', 'nl/', 'es/']) {
    assert.ok(root.has(language + 'index.html'));
    assert.ok(root.get(language + 'positionhold/index.html').toString().includes('/assets/positionhold.js'));
  }
  assert.ok(root.has('ch/positionhold/index.html'));
  assert.ok(pages.has('.nojekyll'));
  for (const [name, bytes] of root) {
    if (!/\.(html|js|css|json)$/.test(name)) assert.deepEqual(pages.get(name), bytes, name);
    assert.ok(!name.startsWith('src/') && !name.startsWith('tools/') && !name.startsWith('docs/'));
  }
});

test('Wiederholte Builds sind ohne Uhrzeit, Netzwerk oder Zufallswerte identisch', async () => {
  for (const base of ['', PAGES_BASE]) {
    const first = await createOutput(base), second = await createOutput(base);
    assert.deepEqual([...second.keys()], [...first.keys()]);
    for (const [name, bytes] of first) assert.deepEqual(second.get(name), bytes, name);
  }
});
