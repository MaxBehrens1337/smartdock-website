/** Modulzuordnung wie auf smartdock.de, abgeglichen am 22.10.2026.
 * Ein einzelnes nicht proportionales Strahlruder teilt eine ACU mit einem Extra.
 * Alle übrigen Extras belegen paarweise WCUs. ECU bleibt unabhängig.
 * Dies dokumentiert Live-Verhalten, keine eigenständige fachliche Freigabe.
 */
export function allocateModules({engine=null,thrusters=[],anchors=0,winches=0,horn=false,proportional=false}) {
  for (const [name,value] of Object.entries({anchors,winches})) {
    if (!Number.isInteger(value)||value<0||value>2) throw new RangeError(`Invalid ${name} count`);
  }
  if (!Array.isArray(thrusters)||thrusters.length>2||new Set(thrusters).size!==thrusters.length||thrusters.some(x=>!['bow','stern'].includes(x))) throw new RangeError('Invalid thrusters');
  const modules=[];
  const add=(type,functions)=>modules.push({type,channels:[functions[0]??null,functions[1]??null]});
  if(engine) {
    const single=engine===1||engine==='1 Motor';
    add('ECU',single?['engine',null]:[null,'engines']);
  }
  const thrust=['bow','stern'].filter(x=>thrusters.includes(x));
  const extra=[...Array.from({length:anchors},(_,i)=>`anchor${i+1}`),...Array.from({length:winches},(_,i)=>`winch${i+1}`),...(horn?['horn']:[])];
  if(thrust.length) {
    if(proportional||thrust.length===2||extra.length===0) add('TCU',thrust);
    else add('ACU',[thrust[0],extra.shift()]);
  }
  while(extra.length)add('WCU',extra.splice(0,2));
  return modules;
}

/** Existing form selections -> locale-independent physical allocation. */
export function allocationFromSelection(selected,manufacturer='') {
  return allocateModules({
    engine:selected.ecu,
    thrusters:(selected.tcu||[]).map(x=>x==='Bugstrahlruder'?'bow':x==='Heckstrahlruder'?'stern':x),
    anchors:selected.acu==='2 Ankerwinden'?2:selected.acu==='1 Ankerwinde'?1:0,
    winches:selected.wcu==='2 Winches'?2:selected.wcu==='1 Winch'?1:0,
    horn:!!selected.horn,
    proportional:manufacturer.toLowerCase().includes('proportional')
  });
}

/** Keep physical module flags distinct from requested function flags. */
export function moduleFields(modules,selected) {
  const physical=modules.filter(x=>x.type!=='INSTALLATION');
  const count=type=>physical.filter(x=>x.type===type).length;
  const channels=physical.flatMap(x=>x.channels||[]);
  return {
    moduleAllocation:physical.map(({type,channels})=>({type,channels:[...channels]})),
    ecuCount:count('ECU'),tcuCount:count('TCU'),acuCount:count('ACU'),wcuCount:count('WCU'),
    tcu:count('TCU')>0,acu:count('ACU')>0,wcu:count('WCU')>0,
    bugstrahlruder:channels.includes('bow'),heckstrahlruder:channels.includes('stern'),
    ankerwinde1:channels.includes('anchor1'),ankerwinde2:channels.includes('anchor2'),
    ankerwinch1:channels.includes('winch1'),ankerwinch2:channels.includes('winch2'),horn:channels.includes('horn')
  };
}
