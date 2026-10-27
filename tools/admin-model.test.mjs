import test from 'node:test';
import assert from 'node:assert/strict';
import {createDemoState,canAccessDealerArea,isFinderVisible,decideMembership,moveMembership,prepareInvitation,saveDealer} from '../src/admin-model.js';
import {prepareDealerImport} from './prepare-dealer-import.mjs';

test('Kartenfreigabe und Mitarbeiterzugang sind voneinander unabhängig',()=>{
 const state=createDemoState();
 assert.equal(isFinderVisible(state.dealers[1]),false);
 assert.equal(canAccessDealerArea(state,'demo-u3','demo-d2'),true);
 state.dealers[0].finderVisible=false;
 assert.equal(canAccessDealerArea(state,'demo-u1','demo-d1'),true);
 assert.equal(canAccessDealerArea(state,'demo-u2','demo-d1'),false);
});
test('Individuelle Freigabe aktiviert weder Nachbarkonto noch Passwort',()=>{
 const state=createDemoState();
 decideMembership(state,'demo-m2','approved');
 assert.equal(state.memberships[0].status,'approved');
 assert.equal(state.users[1].status,'invited');
 assert.equal(canAccessDealerArea(state,'demo-u2','demo-d1'),false);
 prepareInvitation(state,'demo-m2');
 assert.equal(state.users[1].passwordSet,false);
 assert.equal(state.users[1].emailVerified,false);
 decideMembership(state,'demo-m1','suspended');
 assert.equal(canAccessDealerArea(state,'demo-u1','demo-d1'),false);
 assert.equal(state.memberships[1].status,'approved');
});
test('Firmeneintrag ist kein Zugang; Sperrung und fehlende E-Mail-Bestätigung verhindern Zugriff',()=>{
 const state=createDemoState();
 assert.equal(canAccessDealerArea(state,'unknown','demo-d1'),false);
 assert.throws(()=>prepareInvitation(state,'demo-m2'));
 state.users[0].emailVerified=false;assert.equal(canAccessDealerArea(state,'demo-u1','demo-d1'),false);
 state.users[0].emailVerified=true;state.users[0].status='suspended';assert.equal(canAccessDealerArea(state,'demo-u1','demo-d1'),false);
 state.users[0].status='active';state.dealers[0].status='archived';assert.equal(canAccessDealerArea(state,'demo-u1','demo-d1'),false);
});
test('Firmenwechsel verlangt neue Freigabe und betrifft nur die Zuordnung',()=>{
 const state=createDemoState();
 moveMembership(state,'demo-m1','demo-d2');
 assert.equal(state.memberships[0].status,'pending');
 assert.equal(canAccessDealerArea(state,'demo-u1','demo-d2'),false);
 assert.equal(state.memberships[2].status,'approved');
 assert.throws(()=>moveMembership(state,'demo-m1','missing'));
 state.memberships.push({id:'duplicate',userId:'demo-u1',dealerId:'demo-d3',status:'pending'});
 assert.throws(()=>moveMembership(state,'demo-m1','demo-d3'));
});
test('Firmenbearbeitung ändert keine Loginadresse und bewahrt Freigaben',()=>{
 const state=createDemoState(),dealer={...state.dealers[0],email:'neu@firma.example'};
 saveDealer(state,dealer.id,dealer);
 assert.equal(state.dealers[0].email,'neu@firma.example');
 assert.equal(state.users[0].email,'alex@marina.example');
 assert.equal(state.dealers[0].finderVisible,true);
 assert.throws(()=>saveDealer(state,dealer.id,{...dealer,company:'  '}));
 assert.throws(()=>saveDealer(state,dealer.id,{...dealer,website:'javascript:alert(1)'}));
});
const record={id:'example001',collectionName:'dealers',name:'Firma Beispiel',address:'G45 / 76–84 Test Drive, 4209 Musterort',country:'Australia',email:'kontakt@firma.example',phone:'',latitude:0,longitude:0,website:'',website2:'',created:'2026-07-10 12:56:09.512Z',updated:'2026-07-10 12:56:09.512Z'};
test('Händlerimport bewahrt Koordinaten und Anschrift und erzeugt keine Zugänge',()=>{
 const result=prepareDealerImport([record]);
 assert.equal(result.dealers[0].original_address,record.address);
 assert.equal(result.dealers[0].latitude,0);
 assert.equal(result.dealers[0].longitude,0);
 assert.equal(result.dealers[0].country_code,'AU');
 assert.equal(result.dealers[0].finder_status,'unlisted');
 assert.deepEqual(result.counts,{dealers:1,users:0,memberships:0,newsletterSubscriptions:0,invitations:0});
});
test('Import stoppt bei doppelten Quellkennungen oder unbrauchbaren Daten',()=>{
 assert.throws(()=>prepareDealerImport([record,record]));
 assert.throws(()=>prepareDealerImport([{...record,latitude:91}]));
 assert.throws(()=>prepareDealerImport([{...record,country:'Unknown'}]));
 assert.throws(()=>prepareDealerImport([{...record,website:'javascript:alert(1)'}]));
 assert.throws(()=>prepareDealerImport([{...record,updated:'invalid'}]));
});
