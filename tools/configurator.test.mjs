import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { allocationFromSelection, moduleFields } from '../src/module-allocation.js';
import { calculate as live, countries } from './fixtures/live-pricing-2026-10-22.js';

async function currentCalculator() {
  const source = await readFile(new URL('../vendor/website/assets/index-RRVGC1mK.js', import.meta.url), 'utf8');
  const first = source.indexOf(',Eg={'), last = source.indexOf(',a4=j.createContext()', first);
  assert.ok(first > 0 && last > first, 'Preisbereich im Anwendungspaket nicht gefunden');
  const context = { sdAllocationFromSelection: allocationFromSelection, console };
  vm.createContext(context);
  vm.runInContext('const ' + source.slice(first + 1, last) + ';globalThis.calculate=uV;', context);
  return context.calculate;
}

// Zusätzliche Kanalmetadaten sind eine bewusste Verbesserung der Vorschau.
// Verglichen werden die auf Bildschirm/PDF sichtbaren Namen und Beträge.
function visible(result) {
  return JSON.stringify({
    items: result.items.map(({ name, price }) => ({ name, price })),
    subtotal: result.subtotal, bundleDiscount: result.bundleDiscount,
    totalPrice: result.totalPrice, vat: result.vat, currency: result.currency,
  });
}

test('Browser-Gegenbeispiel: eine Ankerwinde wie live als WCU für 1.250 EUR', async () => {
  const calculate = await currentCalculator();
  const selected = { ecu: null, tcu: [], acu: '1 Ankerwinde', wcu: null, horn: false };
  const result = calculate(selected, '', 'Deutschland', '', false, 'DE');
  assert.equal(result.items[0].name, 'WCU (1 Ankerwinde)');
  assert.equal(result.totalPrice, 1250);
  assert.equal(visible(result), visible(live(selected, '', 'Deutschland', '', false, 'DE')));
  assert.deepEqual(moduleFields(result.devices, selected).moduleAllocation,
    [{ type: 'WCU', channels: ['anchor1', null] }]);
});

test('Preis-/Modulberechnung stimmt mit eingefrorener Live-Referenz überein', async () => {
  const calculate = await currentCalculator();
  let cases = 0;
  for (const ecu of [null, '1 Motor', '2+ Motoren'])
  for (const tcu of [[], ['Bugstrahlruder'], ['Heckstrahlruder'], ['Heckstrahlruder', 'Bugstrahlruder']])
  for (const acu of [null, '1 Ankerwinde', '2 Ankerwinden'])
  for (const wcu of [null, '1 Winch', '2 Winches'])
  for (const horn of [false, true])
  for (const manufacturer of ['', 'Sleipner proportional'])
  for (const country of Object.keys(countries))
  for (const language of ['DE', 'EN', 'FR', 'NL', 'ES'])
  for (const installation of [false, true])
  for (const promo of ['', ' pibs26 ', 'INVALID']) {
    const args = [{ ecu, tcu, acu, wcu, horn }, manufacturer, country, promo, installation, language];
    assert.equal(visible(calculate(...args)), visible(live(...args)), JSON.stringify(args));
    cases++;
  }
  assert.equal(cases, 414720);
});

test('Jede ausgewählte Zusatzfunktion ist genau einmal belegt', () => {
  for (const tcu of [[], ['Bugstrahlruder'], ['Heckstrahlruder'], ['Bugstrahlruder', 'Heckstrahlruder']])
  for (let anchors = 0; anchors <= 2; anchors++)
  for (let winches = 0; winches <= 2; winches++)
  for (const horn of [false, true]) {
    const selected = { tcu, acu: anchors ? anchors + (anchors === 1 ? ' Ankerwinde' : ' Ankerwinden') : null,
      wcu: winches ? winches + (winches === 1 ? ' Winch' : ' Winches') : null, horn };
    const modules = allocationFromSelection(selected);
    const channels = modules.flatMap(x => x.channels).filter(Boolean);
    assert.equal(channels.length, tcu.length + anchors + winches + Number(horn));
    assert.equal(new Set(channels).size, channels.length);
  }
});

test('Motor abwählen leert Hersteller-/Joystickdaten in Zusammenfassung und PDF-Eingabe', async () => {
  const source = await readFile(new URL('../vendor/website/assets/index-RRVGC1mK.js', import.meta.url), 'utf8');
  const first = source.indexOf(',AV=e=>'), last = source.indexOf(',Bs=()=>', first);
  assert.ok(first > 0 && last > first);
  const state = []; let cursor = 0, effects = [];
  const context = {
    j: {
      useState(initial) {
        const i = cursor++;
        if (!(i in state)) state[i] = initial;
        return [state[i], value => { state[i] = typeof value === 'function' ? value(state[i]) : value; }];
      },
      useMemo: fn => fn(), useEffect: fn => effects.push(fn),
    },
    vn: () => ({ currentLanguage: 'DE' }), r: { jsx: (_, props) => props.value }, a4: {},
    uV: await currentCalculator(), sdModuleFields: moduleFields,
  };
  vm.createContext(context);
  vm.runInContext('const ' + source.slice(first + 1, last) + ';globalThis.render=hV;', context);
  function render() {
    cursor = 0; effects = [];
    context.render({});
    effects.forEach(fn => fn());
    cursor = 0; effects = [];
    return context.render({});
  }
  for (const remove of ['uncheck', 'remove']) {
    let ui = render();
    ui.addProduct('ecu', '1 Motor'); ui.addProduct('acu', '1 Ankerwinde');
    ui.setEngineManufacturer('Volvo Penta');
    ui.setVolvoPentaJoystick('Ja, ein Joystick ist vorhanden');
    ui.setVolvoPentaJoystickModel('IPS');
    ui = render();
    assert.equal(ui.configData.motorType, 'Volvo Penta');
    if (remove === 'uncheck') ui.addProduct('ecu', null);
    else ui.removeProduct('ecu');
    ui = render();
    assert.equal(ui.engineManufacturer, '');
    assert.equal(ui.volvoPentaJoystick, '');
    assert.equal(ui.volvoPentaJoystickModel, '');
    assert.equal(ui.configData.motorType, '');
    assert.equal(ui.configData.joystickType, '');
    assert.equal(ui.configData.motorCount, 0);
    assert.equal(ui.configData.ecuCount, 0);
    assert.equal(ui.priceData.totalPrice, 1250);
    assert.equal(ui.answers.manufacturer, undefined);
    assert.equal(ui.answers.engineManufacturer, '');
  }
});
