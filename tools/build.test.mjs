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
  assert.equal([...root.keys()].filter(name => name.endsWith('.html')).length, 121);
  assert.equal(root.size, 201);
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

test('Dynamische Pages-Links sind schon vor dem Klick für neue Tabs korrekt', () => {
  const html = adaptForBase('<html><head></head></html>', 'index.html', PAGES_BASE);
  let observer;
  const context = { URL, window: {}, location: { href: 'https://example.com/smartdock-website/', origin: 'https://example.com' },
    document: { addEventListener() {}, documentElement: {} },
    MutationObserver: class { constructor(callback) { observer = callback; } observe() {} },
  };
  for (const [, script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) vm.runInNewContext(script, context);
  const anchor = href => ({ nodeType: 1, href, matches: () => true, querySelectorAll: () => [],
    getAttribute() { return this.href; }, setAttribute(_, value) { this.href = value; } });
  for (const [input, expected] of [
    ['/faq', '/smartdock-website/faq'], ['/positionhold', '/smartdock-website/positionhold'],
    ['https://example.com/en/faq?q=1#answer', '/smartdock-website/en/faq?q=1#answer'],
    ['/smartdock-website/faq', '/smartdock-website/faq'],
    ['https://other.example/faq', 'https://other.example/faq'], ['#download-app', '#download-app'],
  ]) {
    const element = anchor(input);
    observer([{ type: 'childList', addedNodes: [element] }]);
    assert.equal(element.href, expected);
    observer([{ type: 'attributes', target: element }]);
    assert.equal(element.href, expected);
  }
});

test('Lokale Konfigurationsvorschau speichert wie Pages nur im aktuellen Tab', async () => {
  const { readFile } = await import('node:fs/promises');
  const source = await readFile(new URL('../src/preview.js', import.meta.url), 'utf8');
  for (const hostname of ['127.0.0.1', 'localhost', 'thitronik.github.io']) {
    let saved; let network = 0;
    const context = { URL, Request, Response, crypto: { randomUUID: () => 'test-id' },
      location: { hostname, href: 'http://' + hostname + '/' },
      sessionStorage: { setItem: (key, value) => { saved = { key, value: JSON.parse(value) }; } },
      window: { fetch: async () => { network++; throw Error('Unerwarteter Netzwerkzugriff'); } },
    };
    vm.runInNewContext(source, context);
    const response = await context.window.fetch('/hcgi/platform/api/collections/configuration_requests/records',
      { method: 'POST', body: JSON.stringify({ firstName: 'Test', email: 'test@example.invalid' }) });
    assert.equal(response.status, 200);
    assert.equal(network, 0);
    assert.equal(saved.value.preview, true);
    assert.equal(saved.key, 'smartdock-last-test-configuration');
  }
});

 test('Händlerseiten bleiben ohne Backend und enthalten keine geschützten Inhalte', async () => {
 const files = await createOutput(PAGES_BASE);
 for (const lang of ['', 'en/', 'fr/', 'nl/', 'es/']) {
 const html = files.get(lang+'haendlerbereich/index.html').toString();
 assert.ok(html.includes('/smartdock-website/assets/index-RRVGC1mK.js'));
 assert.ok(html.includes('noindex,nofollow'));
 }
 const js = files.get('assets/dealer-portal.js').toString();
 assert.ok(!/fetch\(|localStorage|sessionStorage/.test(js));
 const {dealerLink} = await import('../src/dealer-link.js');
 for (const lang of ['DE','EN','FR','NL','ES']) {
 const link = dealerLink(lang);
 assert.ok(files.has(link.href.slice(1)+'index.html'));
 assert.ok(link.children);
 }
 });

test('Händler-Sprachwechsel erhält die Seite und nutzt dieselbe Anwendung wie die Startseite', async () => {
  for (const base of ['', PAGES_BASE]) {
    const files = await createOutput(base);
    const bundle = files.get('assets/index-RRVGC1mK.js').toString();
    const source = bundle.match(/function JQ\(e,t\)\{[\s\S]*?(?=function Ek\()/)?.[0];
    assert.ok(source, 'Sprachrouting fehlt');
    const { dealerLink } = await import('../src/dealer-link.js');
    const translate = vm.runInNewContext('(' + source + ')', {sdDealerLink:dealerLink});
    for (const lang of ['DE', 'EN', 'FR', 'NL', 'ES']) {
      for (const current of ['/haendlerbereich', '/en/haendlerbereich/']) {
        assert.equal(translate(current, lang), dealerLink(lang).href);
      }
      const page = files.get((lang === 'DE' ? '' : lang.toLowerCase() + '/') + 'haendlerbereich/index.html').toString();
      assert.ok(page.includes('src="' + base + '/assets/index-RRVGC1mK.js"'));
      assert.ok(page.includes('id="root"'));
      assert.ok(!page.includes('<header'), 'Keine zweite Headerimplementierung');
    }
  }
});

test('Cookie-Auswahl zeigt gleichwertige Buttons mit getrennten Einwilligungsaktionen', async () => {
 const files = await createOutput();
 for (const name of ['index-RRVGC1mK.js','positionhold.js']) {
  const source=files.get('assets/'+name).toString();
  const at=source.lastIndexOf('children:e("cookie_accept_necessary")');
  const start=source.lastIndexOf('children:[',at)+'children:'.length;
  const end=source.indexOf(']})',at)+1;
  const jsx=(_type,props)=>props;
  const all=Object.assign(()=> 'all',{jsx});
  const buttons=vm.runInNewContext(source.slice(start,end),{r:{jsx},s:all,o:()=> 'necessary',i:()=> 'all',vt:null,Tt:null,e:key=>key});
  assert.equal(buttons.length,2);
  const visual=button=>JSON.stringify({variant:button.variant,className:button.className,style:button.style});
  assert.equal(visual(buttons[0]),visual(buttons[1]),name);
  assert.equal(buttons[0].style.background,'transparent');
  assert.equal(buttons[0].style.color,'hsl(var(--foreground))');
  assert.equal(buttons[0].style.boxShadow,'none');
  assert.equal(buttons[0].onClick(),'necessary');
  assert.equal(buttons[1].onClick(),'all');
 }
});
