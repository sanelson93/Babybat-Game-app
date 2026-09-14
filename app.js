const UI_STORAGE = 'babybat-game-hub-ui-v22';
const CONFIG = window.BABYBAT_CONFIG;
const { createClient } = window.supabase;
const db = createClient(CONFIG.supabaseUrl, CONFIG.supabasePublishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const DEMO = {
  entities: [
    {slug:'sovereign-circle',name:'Sovereign Circle',entity_type:'circle',logo_path:'sovereign-circle-logo.webp',theme_key:'sovereign',tagline:'Strategy. Loyalty. Control.'},
    {slug:'nocturne-collective',name:'Nocturne Collective',entity_type:'collective',logo_path:'nocturne-collective-logo.webp',theme_key:'nocturne',tagline:"We don't follow the light. We run the night."},
    {slug:'infernal-firm',name:'Infernal Firm',entity_type:'firm',logo_path:null,theme_key:'infernal',tagline:'Reserved for the next game.'}
  ],
  members: [
    ['sovereign-circle','Shawn','Chair','Executive Command','CEO / Chair','sc-shawn.webp',10],
    ['sovereign-circle','Sir','Brat Tamer','Discipline & Dynamics','Chief Brat Tamer','sc-sir.webp',20],
    ['sovereign-circle','Saint','Caregiver','Care & Welfare','Chief Caretaker','sc-saint.webp',30],
    ['sovereign-circle','Sphinx','Strategist','Strategy & Voice','Chief Strategist','sc-sphinx.webp',40],
    ['sovereign-circle','Silk','Connection','Warmth & Connection','Director of Connection',null,50],
    ['sovereign-circle','Sinister','Corruption & Punishment','Chaos & Consequences','Director of Chaos & Consequences','sc-sinister.webp',60],
    ['sovereign-circle','Scales','Rules & Interpretation','Oversight, Compliance & Legal Strategy','Chief of Rules & Interpretation','sc-scales.webp',70],
    ['sovereign-circle','Sigma','Findom','Finance','Chief Financial Officer','sc-sigma.webp',80],
    ['sovereign-circle','Sage','Personal Assistant','Executive Administration & Personnel','Executive Assistant / Director of Personnel','sc-sage.webp',90],
    ['nocturne-collective','Moxie','Praise-Oriented Submissive','Executive Relations & Validation','Executive Director of Night Operations','nc-moxie.webp',10],
    ['nocturne-collective','Vega','Emotional Support Sub','Finance, Scoring & Audit','Chief Financial Officer','nc-vega.webp',20],
    ['nocturne-collective','Dusk','Bat','Morale, Affection & Distraction','Chief Distraction Officer','nc-dusk.webp',30],
    ['nocturne-collective','Cress','Princess','Connection, Reassurance & Confidence','Director of Relational Dynamics','nc-cress.webp',40],
    ['nocturne-collective','Jinx','Chaos Gremlin','Special Projects, Innovation & Unforeseen Consequences','Director of Chaotic Operations','nc-jinx.webp',50],
    ['nocturne-collective','Eclipse','Corporate','Administration, Oversight & Internal Review','Chief Administrative Officer','nc-eclipse.webp',60],
    ['nocturne-collective','Sable','Sensual Prey','Desire & Pursuit','Director of Pursuit Dynamics','nc-sable.webp',70],
    ['nocturne-collective','Selene','Bedroom Submissive','Surrender & Vulnerability','Director of Private Surrender','nc-selene.webp',80],
    ['nocturne-collective','Nyx','Brat','Opposition, Loopholes & Technical Compliance','Director of Adversarial Compliance','nc-nyx.webp',90],
    ['nocturne-collective','Ember','Caregiver','Care, Wellness & Office Operations','Chief Care Officer','nc-ember.webp',100]
  ].map((m,i)=>({id:`demo-${i}`,entity_slug:m[0],name:m[1],role_name:m[2],department:m[3],position_title:m[4],image_path:m[5],sort_order:m[6]})),
  ledger: [
    {id:'sd001',directive:'SD-001',date:'2026-08-31',title:'Sovereign Directive #001',total:19,reason:'Official scoring notice from Moxie / Nocturne.',breakdown:[['Directive Completed',10],['Above & Beyond',5],['Chaos Bonus',2],['No Bullshit Completion',2]]},
    {id:'sd002',directive:'SD-002',date:'2026-08-31',title:'Sovereign Directive #002',total:22,reason:'Alani can at baseball practice — submission accepted.',breakdown:[['Directive Completed',10],['Above & Beyond',5],['Made Moxie Melt',3],['Voice Perfect',2],['No Bullshit Completion',2]]}
  ],
  scoring: [
    ['Directive Completed',10,'Base award for successful completion.'],['Above & Beyond',5,'Execution materially exceeds the written requirement.'],['Strategic Execution',3,'Smart, deliberate execution.'],['Moxie Melt',3,'Execution gets the Moxie Melt bonus.'],['Laugh',1,'Earns the laugh bonus.'],['Sovereign Loophole',5,'Valid exploitation of the written directive.'],['Scales Approved',3,'Legal/technical execution approved by Scales.'],['Gotcha',2,'A valid gotcha under the game rules.'],['Sinister',1,'Sinister-style escalation or flair.'],['Caretaker Bonus',3,'Caretaker execution bonus.'],['Desire Bonus',3,'Desire-focused execution bonus.'],['Brat Handler Bonus',3,'Brat-handling execution bonus.'],['Voice Perfect',2,'Special recognized scoring bonus.'],['Chaos Bonus',2,'Special recognized scoring bonus.'],['No Bullshit Completion',2,'Special recognized scoring bonus.'],
    ['Missed Deadline',-3,'Published penalty.'],['Missed Requirement',-2,'Published penalty.'],['Invalid Evidence',-2,'Published penalty.'],['Abandoned Directive',-5,'Published penalty.'],['Refused Directive',0,'A refusal earns zero unless another rule applies.']
  ],
  tiers: [
    {cycle_order:1,name:'Small',base_milestone:200,description:'Reward I'},
    {cycle_order:2,name:'Premium',base_milestone:400,description:'Reward II'},
    {cycle_order:3,name:'Executive',base_milestone:600,description:'Reward III'},
    {cycle_order:4,name:'Sovereign',base_milestone:800,description:'Sovereign reward'}
  ],
  charter: [
    ['I — The Game','The challenge game is played between Shawn and Moxie, supported by The Sovereign Circle and the Nocturne Collective.'],
    ['II — Players & Rosters','Players execute. Boards advise. The Sovereign Circle advises Shawn; Nocturne Collective advises Moxie. Vex / Infernal Firm is an external player/advisor unless formally appointed otherwise.'],
    ['III — Authority','The issuing side controls its Directive subject to the written rules. Advisory boards may interpret, audit, strategize and challenge, but do not replace the active players.'],
    ['IV — Sovereign Directives','A Directive is the formal game instruction. Its written wording controls what is required.'],
    ['V — Activation','A Directive becomes live when properly issued/received under the game protocol.'],
    ['VI — Deadlines','Any stated deadline is part of the Directive. Missing it may trigger the published penalty.'],
    ['VII — Written Word Wins','The written language governs. Intent does not silently add requirements that were never written.'],
    ['VIII — Loopholes','Valid loopholes may be exploited when the text genuinely leaves room for them. A forced loophole is not automatically valid.'],
    ['IX — Interpretation','Ambiguity is interpreted using the written Directive, game charter, established rulings and fair-play principles.'],
    ['X — Review','Directives and submissions may be reviewed by the relevant boards/counsel for compliance, scoring and disputes.'],
    ['XI — Clarification','Clarification can explain ambiguity but should not retroactively rewrite completed requirements.'],
    ['XII — Evidence','When proof is required, evidence must be valid, responsive to the Directive, and sufficient to show compliance.'],
    ['XIII — Submissions','A submission should satisfy every written requirement, including format, quantity, wording, timing and evidence rules.'],
    ['XIV — Real Photograph Rule','For the photo challenge, submissions are real photographs; AI-generated replacement evidence does not count.'],
    ['XV — Advisory Privilege','The boards may privately strategize for their player. Advice itself is not execution by the player.'],
    ['XVI — Staff Duties','Sovereign Circle and Nocturne staff operate according to their established roles. Scales audits wording/loopholes; Sigma audits numbers.'],
    ['XVII — Scoring Oversight','Scores should be traceable to categories and logged as transactions rather than silently editing a running total.'],
    ['XVIII — Completion','Successful completion earns the applicable base score plus valid bonuses.'],
    ['XIX — Failure & Penalties','Missed deadlines, missed requirements, invalid evidence and abandoned Directives use the published deductions. A refusal earns zero unless another rule applies.'],
    ['XX — Scoring Conflicts','Stacking bonuses must be compatible with the rule language and established rulings. Obvious/material conflicts may be challenged.'],
    ['XXI — Amendments','Rules may be amended prospectively. The app should preserve version history so later edits do not erase what governed earlier play.'],
    ['XXII — Directive Classes','Different Directive classes may carry different execution or scoring conditions when explicitly stated.'],
    ['XXIII — Fair Play','Technical play is encouraged; bad-faith rewriting, fabricated evidence or hidden retroactive requirements are not.'],
    ['XXIV — Recordkeeping','Directives, rulings, scores and reward redemptions should remain auditable even after the active item is closed.'],
    ['XXV — Golden Rule','The game is supposed to be fun, consensual and connection-building. The game never outranks real-world boundaries or consent.']
  ]
};

let ui = loadUI();
let session = null;
let profile = null;
let remoteStatus = 'loading';
let remoteError = '';
let game = null;
let membership = null;
let entities = [];
let organizationMembers = [];
let directives = [];
let pointTransactions = [];
let rewards = [];
let tiers = [];
let scoringRules = [];
let ruleSections = [];
let realtimeChannel = null;
let realtimeTimer = null;
let bulkLedgerRows = [];
let bulkLedgerIgnored = [];


function loadUI(){
  try { return {activePage:'home', demo:false, demoViewer:'shawn', adminView:'admin', orgSlug:'sovereign-circle', ...JSON.parse(localStorage.getItem(UI_STORAGE)||'{}')}; }
  catch { return {activePage:'home', demo:false, demoViewer:'shawn', adminView:'admin', orgSlug:'sovereign-circle'}; }
}
function saveUI(){ localStorage.setItem(UI_STORAGE, JSON.stringify(ui)); }
function esc(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }
function assetUrl(path=''){ const raw=String(path||'').trim(); if(!raw)return ''; if(/^https?:\/\//i.test(raw)||raw.startsWith('data:'))return raw; const clean=raw.replace(/^\/+/, ''); try{return new URL(clean, document.baseURI).href}catch{return clean} }
function fmtDate(v){ if(!v) return ''; const d=new Date(v); return Number.isNaN(d.valueOf()) ? String(v).slice(0,10) : d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}); }
function accountRole(){ return ui.demo ? (ui.demoViewer==='moxie'?'game_master':'player') : (membership?.role || 'player'); }
function isAdminAccount(){ return !ui.demo && membership?.role==='admin'; }
function effectiveRole(){
  if(ui.demo) return ui.demoViewer==='moxie'?'game_master':'player';
  if(isAdminAccount()) return ui.adminView==='moxie'?'game_master':ui.adminView==='shawn'?'player':'admin';
  return accountRole();
}
function isGMView(){ return ['game_master','admin'].includes(effectiveRole()); }
function previewReadOnly(){ return isAdminAccount() && ui.adminView!=='admin'; }
function canRedeemView(){ return ['player','game_master','admin'].includes(effectiveRole()); }
function roleLabel(r=effectiveRole()){ return ({player:'Player',game_master:'Game Master',admin:'Site Admin',viewer:'Viewer'})[r] || 'Player'; }
function personLabel(){
  if(ui.demo) return ui.demoViewer==='moxie'?'Moxie':'Shawn';
  if(isAdminAccount() && ui.adminView==='moxie') return 'Moxie Preview';
  if(isAdminAccount() && ui.adminView==='shawn') return 'Shawn Preview';
  return profile?.display_name || session?.user?.email?.split('@')[0] || 'Player';
}
function viewTheme(){ return effectiveRole()==='game_master'?'nocturne':'sovereign'; }

function icon(name){const icons={home:'<path d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v18H6.5A2.5 2.5 0 0 0 4 22zM20 4.5A2.5 2.5 0 0 0 17.5 2H13v18h4.5A2.5 2.5 0 0 1 20 22z"/>',ledger:'<path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/>',org:'<path d="M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM5 11a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm14 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM8 21v-1.5A3.5 3.5 0 0 1 11.5 16h1a3.5 3.5 0 0 1 3.5 3.5V21M1.5 21v-1a3 3 0 0 1 3-3h1M22.5 21v-1a3 3 0 0 0-3-3h-1"/>',admin:'<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6zM9 12l2 2 4-5"/>'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`}
function crest(theme=viewTheme()){
  const img=theme==='nocturne'?'nocturne-collective-logo.webp':'sovereign-circle-logo.webp';
  return `<div class="crest crest-${theme}"><img src="${img}" alt="" /></div>`;
}
function adminSwitcher(){
  if(!isAdminAccount()) return '';
  return `<div class="view-switch"><span>VIEW AS</span>${[['admin','Admin'],['shawn','Shawn'],['moxie','Moxie']].map(([v,l])=>`<button class="${ui.adminView===v?'active':''}" onclick="setAdminView('${v}')">${l}</button>`).join('')}</div>`;
}
function header(){
  const r=effectiveRole();
  const consoleName=r==='game_master'?'Nocturne Console':r==='admin'?'Site Administration':'Sovereign Console';
  const live=ui.demo?'Demo':'Live';
  return `<header class="topbar theme-${viewTheme()}"><div class="brand">${crest()}<div><div class="eyebrow">BabyBat Game Hub · ${live}</div><h1>${consoleName}</h1></div></div><div class="role-pill">${esc(personLabel())} · ${roleLabel()}</div></header>${adminSwitcher()}${previewReadOnly()?`<div class="preview-banner">ADMIN PREVIEW · Actions are disabled while viewing as ${ui.adminView==='moxie'?'Moxie':'Shawn'}.</div>`:''}`;
}
function nav(){
  const lastLabel=effectiveRole()==='game_master'?'Score':'Admin';
  return `<nav class="nav">${[['home','Home'],['book','Rules'],['ledger','Ledger'],['org','Organizations'],['admin',lastLabel]].map(([p,l])=>`<button class="${ui.activePage===p?'active':''}" onclick="go('${p}')">${icon(p)}${l}</button>`).join('')}</nav>`;
}

function ledgerItems(){
  if(ui.demo) return DEMO.ledger.map(x=>structuredClone(x));
  const dmap=new Map(directives.map(d=>[d.id,d]));
  const map=new Map();
  for(const pt of pointTransactions){
    const key=pt.directive_id || pt.id;
    const d=dmap.get(pt.directive_id);
    if(!map.has(key)) map.set(key,{id:key,directive:d?.code||'Manual',date:(d?.completed_at||pt.created_at||'').slice(0,10),title:d?.title||pt.category,total:0,reason:pt.reason||'',breakdown:[]});
    const x=map.get(key); x.total+=Number(pt.points||0); x.breakdown.push([pt.category,Number(pt.points||0)]); if(!x.reason&&pt.reason)x.reason=pt.reason;
  }
  return [...map.values()].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
}
function total(){return ledgerItems().reduce((a,b)=>a+Number(b.total||0),0)}
function tierAt(m){
  const idx=((Math.floor(m/200)-1)%4+4)%4+1;
  const list=ui.demo?DEMO.tiers:tiers;
  return list.find(t=>Number(t.cycle_order)===idx)?.name || ['Small','Premium','Executive','Sovereign'][idx-1];
}
function nextMilestone(t=total()){const interval=Number(game?.reward_interval||200); return (Math.floor(Math.max(t,0)/interval)+1)*interval}
function currentFloor(t=total()){const interval=Number(game?.reward_interval||200); return Math.floor(Math.max(t,0)/interval)*interval}
function progress(){const t=total(),floor=currentFloor(t),next=nextMilestone(t);return {t,floor,next,within:t-floor,pct:Math.min(100,Math.max(0,((t-floor)/(next-floor))*100)),left:next-t,tier:tierAt(next)}}
function rewardRows(){
  if(ui.demo) return [];
  const tmap=new Map(tiers.map(t=>[t.id,t]));
  return rewards.map(r=>({...r,tier:tmap.get(r.tier_id)?.name||'Reward',game:game?.name||'Sovereign Circle'}));
}

function dashboardHero(kind,p){
  const noct=kind==='moxie';
  const logo=noct?'nocturne-collective-logo.webp':'sovereign-circle-logo.webp';
  const title=noct?'Nocturne Collective':'The Sovereign Circle';
  const sub=noct?'Game Master control over Sovereign progress':'Official game progress';
  return `<section class="hero hero-${noct?'nocturne':'sovereign'}"><div class="hero-brand"><img src="${logo}" alt="${title} logo"><div><span>${noct?'GAME MASTER':'PLAYER DASHBOARD'}</span><h2>${title}</h2><p>${sub}</p></div></div><div class="hero-scoreline"><div><div class="score-big">${p.within}<span class="pts">PTS</span></div><div class="lifetime-inline">${p.t} lifetime points</div></div><div class="next-orb"><strong>${p.left}</strong><span>TO ${esc(p.tier.toUpperCase())}</span></div></div><div class="bar-wrap"><div class="bar-label"><span>${p.floor}</span><span>${p.next} · ${esc(p.tier.toUpperCase())}</span></div><div class="bar"><i style="width:${p.pct}%"></i></div></div></section>`;
}
function home(){
  const p=progress(), rr=rewardRows(), available=rr.filter(r=>r.status==='available'), led=ledgerItems();
  if(effectiveRole()==='admin') return adminHome(p,available,led);
  const moxie=effectiveRole()==='game_master';
  return `<main class="page">${dashboardHero(moxie?'moxie':'shawn',p)}
  <section class="section"><div class="grid2"><div class="mini"><strong>${led.length}</strong><span>Scored directives</span></div><div class="mini"><strong>${available.length}</strong><span>Rewards ready</span></div></div></section>
  ${moxie?`<section class="section"><div class="section-head"><h2>Game Master</h2><span>simple workflow</span></div><div class="gm-next-step"><div><span class="eyebrow">NEXT ACTION</span><h3>Score a Directive</h3><p>Paste Moxie's completed scoring ledger, preview it, then import it.</p></div><button class="primary" onclick="go('admin')">Paste Ledger</button></div><button class="ledger-link" onclick="go('ledger')"><span>Review scoring history</span><b>View Ledger ›</b></button></section>`:''}
  <section class="section"><div class="section-head"><h2>Reward Chest</h2><span>${available.length} available</span></div>${rewardChest(available,p,moxie)}</section>
  <section class="section"><div class="section-head"><h2>Organizations</h2><span>Meet the boards</span></div>${organizationTeasers()}</section>
  <section class="section"><div class="section-head"><h2>Recent Activity</h2><span>Permanent ledger</span></div>${led.slice().reverse().slice(0,4).map(activity).join('')}</section></main>`;
}
function adminHome(p,available,led){
  return `<main class="page"><section class="admin-command"><div><span class="eyebrow">Site Administration</span><h2>BabyBat Control Room</h2><p>One login. Both experiences. Live data stays shared.</p></div><div class="admin-crown">♛</div></section>
  <section class="section"><div class="section-head"><h2>Experience Preview</h2><span>tap to inspect</span></div><div class="preview-grid"><button class="preview-card sovereign" onclick="setAdminView('shawn')"><img src="sovereign-circle-logo.webp"><div><b>Shawn View</b><span>Player dashboard</span></div></button><button class="preview-card nocturne" onclick="setAdminView('moxie')"><img src="nocturne-collective-logo.webp"><div><b>Moxie View</b><span>Game Master dashboard</span></div></button></div></section>
  <section class="section"><div class="section-head"><h2>Live Game</h2><span>${p.t} lifetime points</span></div><div class="card admin-score"><div><strong>${p.left}</strong><span>points to ${esc(p.tier)}</span></div><div><strong>${available.length}</strong><span>rewards ready</span></div><div><strong>${led.length}</strong><span>scored directives</span></div></div></section>
  <section class="section"><div class="section-head"><h2>Quick Control</h2><span>site owner</span></div><div class="quick-actions"><button class="action-tile" onclick="go('admin')"><b>Scoring & Rewards</b><span>Paste ledger / manage rewards</span></button><button class="action-tile" onclick="go('org')"><b>Organizations</b><span>Review both rosters</span></button></div></section></main>`;
}
function rewardChest(av,p,moxie=false){if(!av.length)return `<div class="empty">No unlocked rewards in the chest yet.<br><br><strong style="color:#d8dce2">Next:</strong> ${esc(p.tier)} at ${p.next} points.</div>`;return av.map(r=>`<div class="card reward-card"><div class="reward-icon">${r.tier==='Sovereign'?'♛':'◆'}</div><div class="reward-main"><h3>${esc(r.tier)} Reward</h3><p>Unlocked at ${r.milestone} · ${esc(r.game)}</p></div><span class="badge available">Available</span>${canRedeemView()?`<button class="use-btn" ${previewReadOnly()?'disabled':''} onclick="${previewReadOnly()?'previewOnly()':`askRedeem('${r.id}')`}">${moxie?"USE SHAWN'S":'USE'}</button>`:''}</div>`).join('')}
function organizationTeasers(){
  const data=entityRows().filter(e=>['sovereign-circle','nocturne-collective'].includes(e.slug));
  return `<div class="org-teasers">${data.map(e=>`<button class="org-teaser ${esc(e.theme_key||'')}" onclick="openOrganization('${e.slug}')"><img src="${esc(assetUrl(e.logo_path||''))}" alt=""><div><b>${esc(e.name)}</b><span>${memberRows().filter(m=>m.entity_slug===e.slug||m.entity_id===e.id).length} members</span></div><span class="chev">›</span></button>`).join('')}</div>`;
}
function activity(x){const sign=x.total>=0?'+':'';return `<div class="card activity"><div class="dot"></div><div class="copy"><h4>${esc(x.directive)}</h4><p>${esc(x.reason||x.title)}</p></div><div class="amount ${x.total<0?'negative':''}">${sign}${x.total}</div></div>`}

function charterRows(){
  if(ui.demo) return DEMO.charter;
  const rows=ruleSections.filter(r=>r.section_key?.startsWith('charter_')).sort((a,b)=>a.sort_order-b.sort_order);
  return rows.length ? rows.map(r=>[r.title,r.body]) : DEMO.charter;
}
function scoreRows(){
  if(ui.demo) return DEMO.scoring.map((x,i)=>({label:x[0],points:x[1],definition:x[2],sort_order:i<15?i:200+i}));
  return scoringRules.slice().sort((a,b)=>a.sort_order-b.sort_order);
}
function rules(){
  const charter=charterRows(), scores=scoreRows(), awards=scores.filter(x=>Number(x.sort_order)<200), penalties=scores.filter(x=>Number(x.sort_order)>=200), rt=ui.demo?DEMO.tiers:tiers.slice().sort((a,b)=>a.cycle_order-b.cycle_order);
  return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>Official Rulebook</h2><span>database-backed v1</span></div><div class="tabs"><button class="chip active" onclick="scrollToId('charter')">Charter</button><button class="chip" onclick="scrollToId('scoring')">Scoring</button><button class="chip" onclick="scrollToId('rewards')">Rewards</button></div><div class="notice">Written Word Wins. Point history and reward use are retained permanently; later rule edits do not silently rewrite earlier scores.</div></section>
  <section id="charter" class="section"><div class="section-head"><h2>Game Charter</h2><span>I–XXV</span></div>${charter.map(([h,b])=>`<details class="card rule"><summary>${esc(h)}</summary><div class="rule-body">${esc(b)}</div></details>`).join('')}</section>
  <section id="scoring" class="section"><div class="section-head"><h2>Scoring Breakdown</h2><span>awards</span></div>${awards.map(scoreCard).join('')}<div class="section-head" style="margin-top:17px"><h2>Penalties</h2><span>deductions</span></div>${penalties.map(scoreCard).join('')}</section>
  <section id="rewards" class="section"><div class="section-head"><h2>Reward Breakdown</h2><span>repeats every 800</span></div>${rt.map(t=>`<div class="card score-row"><div><h4>${esc(t.name)} Reward</h4><p>${esc(t.description||'Reward tier')} · sequence repeats after Sovereign.</p></div><div class="points">${t.base_milestone}</div></div>`).join('')}</section></main>`;
}
function scoreCard(s){const label=s.label??s[0], pts=Number(s.points??s[1]), def=s.definition??s[2]??'';return `<div class="card score-row"><div><h4>${esc(label)}</h4><p>${esc(def)}</p></div><div class="points ${pts<0?'negative':''}">${pts>0?'+':''}${pts}</div></div>`}

function entityRows(){ return ui.demo ? DEMO.entities : entities; }
function memberRows(){ return ui.demo ? DEMO.members : organizationMembers.map(m=>({...m,entity_slug:entityRows().find(e=>e.id===m.entity_id)?.slug})); }
function organizationsPage(){
  const all=entityRows();
  const selected=all.find(e=>e.slug===ui.orgSlug)||all[0]||DEMO.entities[0];
  if(!selected) return `<main class="page"><div class="empty">No organizations configured.</div></main>`;
  const members=memberRows().filter(m=>(m.entity_slug===selected.slug)||(m.entity_id===selected.id)).sort((a,b)=>Number(a.sort_order)-Number(b.sort_order));
  const theme=selected.theme_key||'sovereign';
  return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>Organizations</h2><span>${all.length} realms</span></div><div class="field org-select"><label>Organization</label><select class="input" onchange="setOrganization(this.value)">${all.map(e=>`<option value="${esc(e.slug)}" ${e.slug===selected.slug?'selected':''}>${esc(e.name)}</option>`).join('')}</select></div></section>
  <section class="org-banner org-${esc(theme)}">${selected.logo_path?`<img src="${esc(assetUrl(selected.logo_path))}" alt="${esc(selected.name)} logo">`:`<div class="org-placeholder">♜</div>`}<div><span class="eyebrow">${esc(selected.entity_type||'organization')}</span><h2>${esc(selected.name)}</h2><p>${esc(selected.tagline||'')}</p></div></section>
  <section class="section"><div class="section-head"><h2>Roster</h2><span>${members.length} members</span></div>${members.length?`<div class="member-grid">${members.map(memberCard).join('')}</div>`:`<div class="empty">This organization is reserved for future expansion. No roster has been published yet.</div>`}</section></main>`;
}
function memberCard(m){
  const image=m.image_path?`<img src="${esc(assetUrl(m.image_path))}" alt="${esc(m.name)}" loading="lazy" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('image-failed')">`:`<div class="member-placeholder">${esc(m.name.slice(0,1))}</div>`;
  return `<button class="member-card" onclick="openMember('${esc(m.id)}')"><div class="member-photo">${image}</div><div class="member-copy"><h3>${esc(m.name)}</h3><strong>${esc(m.position_title)}</strong>${m.role_name?`<span>${esc(m.role_name)}</span>`:''}</div></button>`;
}
function ledgerPage(){const led=ledgerItems(), rr=rewardRows();return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>Game Ledger</h2><span>${total()} lifetime points</span></div>${led.slice().reverse().map(x=>{const sign=x.total>=0?'+':'';return `<details class="card rule"><summary><span>${esc(x.directive)} · ${sign}${x.total}</span></summary><div class="rule-body"><p>${esc(x.reason||'')}</p>${x.breakdown.map(([n,v])=>`<div class="score-row" style="margin-top:8px"><span>${esc(n)}</span><strong class="points ${v<0?'negative':''}">${v>0?'+':''}${v}</strong></div>`).join('')}<div class="divider"></div><div class="score-row"><strong>Total</strong><strong class="points ${x.total<0?'negative':''}">${sign}${x.total}</strong></div></div></details>`}).join('')}</section><section class="section"><div class="section-head"><h2>Redeemed Rewards</h2><span>never deleted</span></div>${redeemedArchive(rr)}</section></main>`}
function redeemedArchive(rr=rewardRows()){const xs=rr.filter(r=>r.status==='used');if(!xs.length)return `<div class="empty">No rewards have been redeemed.</div>`;return xs.map(r=>`<div class="card reward-card"><div class="reward-icon">✓</div><div class="reward-main"><h3>${esc(r.tier)} Reward</h3><p>${r.milestone} pts · used ${fmtDate(r.used_at)}</p></div><span class="badge used">Used</span></div>`).join('')}

function admin(){
  const r=effectiveRole(), rr=rewardRows(), gm=['game_master','admin'].includes(r);
  const playerUpgrade=accountRole()==='player' && !ui.demo;
  const isMoxie=r==='game_master';
  const heading=r==='admin'?'Site Administration':isMoxie?'Score a Directive':'Administration';
  const sub=r==='admin'?'full access':isMoxie?'paste → preview → import':'Sovereign access';
  const scoringIntro=gm?`<div class="gm-workflow ${isMoxie?'nocturne':''}"><div class="workflow-step active"><b>1</b><span>Paste ledger</span></div><i>›</i><div class="workflow-step"><b>2</b><span>Preview</span></div><i>›</i><div class="workflow-step"><b>3</b><span>Import</span></div></div>`:'';
  return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>${heading}</h2><span>${sub}</span></div>${scoringIntro}${gm?bulkLedgerForm():`<div class="card"><h3 style="margin-top:0">Permission Model</h3><p class="small-note">Your current game role is <strong>${roleLabel()}</strong>. Players can view the ledger and use unlocked rewards. Game Master/Admin roles can import official scoring ledgers.</p></div>`}${playerUpgrade?adminUpgradeCard():''}</section>
  <section class="section"><div class="section-head"><h2>${isMoxie?'Reward Chest':'Reward Control'}</h2><span>${isMoxie?'shared with Shawn':'shared object'}</span></div>${adminRewards(rr)}</section>
  ${r==='admin'?`<section class="section"><div class="section-head"><h2>Admin Preview</h2><span>cosmetic QA</span></div><div class="card"><p class="small-note">Use the View As switch above to inspect the exact Shawn and Moxie layouts. Preview actions are intentionally disabled so QA cannot accidentally alter live points or rewards.</p></div></section>`:''}
  ${ui.demo?`<section class="section"><div class="card"><button class="secondary" onclick="toggleDemoViewer()">Preview ${ui.demoViewer==='moxie'?'Shawn / Player':'Moxie / Game Master'}</button><button class="danger" style="margin-left:8px" onclick="leaveDemo()">Exit Demo</button></div></section>`:`<section class="section account-section"><div class="section-head"><h2>Account</h2><span>live sync</span></div><div class="card account-card"><p class="small-note">${esc(session?.user?.email||'')}<br>${roleLabel(accountRole())} · Supabase connected</p><div class="row"><button class="secondary" onclick="syncNow()">Sync</button><button class="danger" onclick="signOut()">Sign Out</button></div></div></section>`}</main>`;
}
function adminUpgradeCard(){return `<div class="card admin-upgrade"><div class="eyebrow">Site Owner</div><h3>Unlock Site Admin</h3><p class="small-note">Use the one-time admin upgrade code to turn this account into the site owner. That enables Admin / Shawn / Moxie view switching.</p><div class="field"><label>Admin Upgrade Code</label><input id="adminUpgradeCode" class="input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="ADM-…"></div><button id="adminUpgradeButton" class="primary" onclick="claimAdminUpgrade()">Activate Site Admin</button></div>`}
function bulkLedgerForm(){
  const rows=bulkLedgerRows||[];
  const importable=rows.filter(r=>r.valid&&!r.duplicate);
  const duplicates=rows.filter(r=>r.duplicate).length;
  const invalid=rows.filter(r=>!r.valid).length;
  const totalPts=importable.reduce((a,r)=>a+Number(r.points||0),0);
  const hasPreview=rows.length>0||bulkLedgerIgnored.length>0;
  const preview=hasPreview?`<div class="bulk-preview">
    <div class="bulk-summary"><div><strong>${importable.length}</strong><span>ready</span></div><div><strong>${duplicates}</strong><span>duplicates</span></div><div><strong>${invalid}</strong><span>needs review</span></div><div><strong class="${totalPts<0?'negative':''}">${totalPts>0?'+':''}${totalPts}</strong><span>net points</span></div></div>
    ${rows.length?`<div class="bulk-table">${rows.map((r,i)=>bulkPreviewRow(r,i)).join('')}</div>`:''}
    ${bulkLedgerIgnored.length?`<details class="bulk-ignored"><summary>${bulkLedgerIgnored.length} ignored line${bulkLedgerIgnored.length===1?'':'s'}</summary><div>${bulkLedgerIgnored.map(x=>`<code>${esc(x)}</code>`).join('')}</div></details>`:''}
    <div class="row"><button class="secondary" onclick="clearBulkLedger()">Clear</button><button id="bulkImportButton" class="primary" ${previewReadOnly()||!importable.length?'disabled':''} onclick="${previewReadOnly()?'previewOnly()':'importBulkLedger()'}">Import ${importable.length} Row${importable.length===1?'':'s'}</button></div>
  </div>`:'';
  return `<div class="card bulk-ledger-card ${effectiveRole()==='game_master'?'nocturne':''}"><div class="bulk-title"><div><div class="eyebrow">Official Scoring</div><h3>Paste Ledger</h3></div><span class="badge">BULK</span></div><p class="small-note">Paste the completed scoring ledger. The app checks it first; nothing changes until you preview and import.</p>${previewReadOnly()?`<div class="notice">Preview only — Moxie sees this importer, but Admin QA cannot post from preview mode.</div>`:''}<div class="field"><label>Ledger Text</label><textarea id="bulkLedgerText" class="input bulk-textarea" ${previewReadOnly()?'disabled':''} placeholder="SD-003\nDirective Completed +10\nAbove & Beyond +5\nMoxie Melt +3\nReason: Submission accepted"></textarea></div><div class="bulk-help"><span>Quick format:</span><code>SD-003 · Category +10</code><span>or paste spreadsheet/CSV rows</span></div><button class="secondary bulk-parse" ${previewReadOnly()?'disabled':''} onclick="${previewReadOnly()?'previewOnly()':'previewBulkLedger()'}">Preview Ledger</button>${preview}</div>`;
}
function bulkPreviewRow(r,i){
  const state=!r.valid?'invalid':r.duplicate?'duplicate':r.ruleMismatch?'warning':'ready';
  const status=!r.valid?'Review':r.duplicate?'Duplicate':r.ruleMismatch?'Points differ':'Ready';
  return `<div class="bulk-row ${state}"><div class="bulk-row-main"><div><strong>${esc(r.directive||'—')}</strong><span>${esc(r.category||'Missing category')}</span></div><b class="points ${Number(r.points)<0?'negative':''}">${Number.isFinite(Number(r.points))?(Number(r.points)>0?'+':'')+Number(r.points):'—'}</b></div>${r.reason?`<p>${esc(r.reason)}</p>`:''}${r.message?`<small>${esc(r.message)}</small>`:''}<span class="bulk-status">${status}</span></div>`;
}
function normalizeDirectiveCode(value=''){
  const text=String(value).trim();
  const m=text.match(/(?:\bSD\b|SOVEREIGN\s+DIRECTIVE)\s*[-#:]?\s*(\d{1,4})/i);
  if(!m) return '';
  return `SD-${String(Number(m[1])).padStart(3,'0')}`;
}
function cleanBulkLine(line=''){
  return String(line).replace(/^\s*[•*▶►▪◦]+\s*/,'').replace(/^\s*[-–—]\s+(?=[A-Za-z])/,'').trim();
}
function parseCsvLine(line){
  const out=[]; let cur=''; let quoted=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"'){
      if(quoted&&line[i+1]==='"'){cur+='"';i++;}
      else quoted=!quoted;
    }else if(ch===','&&!quoted){out.push(cur.trim());cur='';}
    else cur+=ch;
  }
  out.push(cur.trim()); return out;
}
function splitBulkColumns(line){
  if(line.includes('\t')) return line.split('\t').map(x=>x.trim());
  if(line.includes('|')) return line.split('|').map(x=>x.trim());
  if((line.match(/,/g)||[]).length>=2) return parseCsvLine(line);
  return null;
}
function parsePointValue(value){
  const m=String(value??'').replace(/\s+/g,'').match(/^([+-]?\d+)\s*(?:pts?|points?)?$/i);
  return m?Number(m[1]):NaN;
}
function isBulkHeader(cols){
  const text=cols.map(x=>String(x).toLowerCase()).join(' ');
  return text.includes('directive')&&text.includes('category')&&text.includes('point');
}
function existingLedgerSignatures(){
  const dmap=new Map(directives.map(d=>[d.id,normalizeDirectiveCode(d.code)||String(d.code).toUpperCase()]));
  const set=new Set();
  for(const pt of pointTransactions){
    const code=dmap.get(pt.directive_id)||'';
    const key=`${code}|${String(pt.category||'').trim().toLowerCase()}|${Number(pt.points)}`;
    set.add(key);
  }
  return set;
}
function parseBulkLedger(text){
  const lines=String(text||'').split(/\r?\n/).map(cleanBulkLine).filter(Boolean);
  const rows=[]; const ignored=[]; let currentDirective=''; let pendingReason='';
  for(const original of lines){
    const line=original.trim();
    const directOnly=normalizeDirectiveCode(line);
    const isDirectiveHeading=/^(?:SD\s*[-#:]?\s*\d{1,4}|SOVEREIGN\s+DIRECTIVE\s*[-#:]?\s*\d{1,4})(?:\s*(?:ACCEPTED|COMPLETED|SCORED))?$/i.test(line);
    if(directOnly && isDirectiveHeading){
      currentDirective=directOnly; continue;
    }
    if(/^reason\s*:/i.test(line)){
      pendingReason=line.replace(/^reason\s*:/i,'').trim();
      if(currentDirective&&pendingReason) rows.forEach(r=>{if(r.directive===currentDirective&&!r.reason)r.reason=pendingReason});
      continue;
    }
    if(/^(total|current\s+total|new\s+total|lifetime|reward|points?\s+to)\b/i.test(line)){ignored.push(line);continue;}
    const cols=splitBulkColumns(line);
    if(cols&&isBulkHeader(cols)){ignored.push(line);continue;}
    if(cols&&cols.length>=2){
      let directive=''; let category=''; let points=NaN; let reason='';
      const firstCode=normalizeDirectiveCode(cols[0]);
      const lastCode=normalizeDirectiveCode(cols[cols.length-1]);
      if(firstCode){
        directive=firstCode; currentDirective=directive; category=cols[1]||''; points=parsePointValue(cols[2]); reason=cols.slice(3).join(' | ');
      }else if(lastCode){
        directive=lastCode; currentDirective=directive; category=cols[0]||''; points=parsePointValue(cols[1]); reason=cols.slice(2,-1).join(' | ');
      }else{
        directive=currentDirective; category=cols[0]||''; points=parsePointValue(cols[1]); reason=cols.slice(2).join(' | ');
      }
      if(Number.isNaN(points)&&cols.length>=3){
        const pointIndex=cols.findIndex(c=>Number.isFinite(parsePointValue(c)));
        if(pointIndex>=0){points=parsePointValue(cols[pointIndex]);category=cols.filter((_,i)=>i!==pointIndex&&!normalizeDirectiveCode(cols[i]))[0]||category;}
      }
      rows.push({directive,category:category.replace(/^category\s*:\s*/i,''),points,reason:reason||pendingReason,raw:line});
      continue;
    }
    const scoreMatch=line.match(/^(.*?)(?:\s*[:=–—-]?\s*)([+-]\s*\d+)\s*(?:pts?|points?)?\s*$/i);
    if(scoreMatch){
      let category=scoreMatch[1].trim();
      let directive=normalizeDirectiveCode(category)||currentDirective;
      if(normalizeDirectiveCode(category)) category=category.replace(/(?:\bSD\b|SOVEREIGN\s+DIRECTIVE)\s*[-#:]?\s*\d{1,4}\s*[:|—-]?\s*/i,'').trim();
      if(!category||/^(total|score)$/i.test(category)){ignored.push(line);continue;}
      if(directive) currentDirective=directive;
      rows.push({directive,category,points:Number(scoreMatch[2].replace(/\s+/g,'')),reason:pendingReason,raw:line});
      continue;
    }
    ignored.push(line);
  }
  const existing=existingLedgerSignatures(); const seen=new Set(); const rules=new Map(scoreRows().map(r=>[String(r.label??r[0]).trim().toLowerCase(),Number(r.points??r[1])]));
  rows.forEach(r=>{
    r.directive=normalizeDirectiveCode(r.directive)||String(r.directive||'').trim().toUpperCase();
    r.category=String(r.category||'').trim();
    r.valid=Boolean(r.directive&&r.category&&Number.isFinite(Number(r.points))&&Number(r.points)!==0);
    if(!r.directive) r.message='No directive found. Add SD-### to the paste.';
    else if(!r.category) r.message='Scoring category is missing.';
    else if(!Number.isFinite(Number(r.points))||Number(r.points)===0) r.message='Points must be a non-zero number.';
    const sig=`${r.directive}|${r.category.toLowerCase()}|${Number(r.points)}`;
    r.duplicate=r.valid&&(existing.has(sig)||seen.has(sig));
    if(r.duplicate) r.message='Already exists in the ledger (or appears twice in this paste); excluded from import.';
    if(r.valid&&!r.duplicate) seen.add(sig);
    const expected=rules.get(r.category.toLowerCase());
    r.ruleMismatch=r.valid&&!r.duplicate&&Number.isFinite(expected)&&expected!==Number(r.points);
    if(r.ruleMismatch) r.message=`Published rule is ${expected>0?'+':''}${expected}; pasted value is ${Number(r.points)>0?'+':''}${Number(r.points)}. It can still be imported.`;
  });
  return {rows,ignored};
}
function adminRewards(rr){const av=rr.filter(r=>r.status==='available');if(!av.length)return `<div class="empty">No available rewards to redeem.</div>`;return av.map(r=>`<div class="card reward-card"><div class="reward-icon">◆</div><div class="reward-main"><h3>${esc(r.tier)} Reward</h3><p>Milestone ${r.milestone}</p></div>${canRedeemView()?`<button class="use-btn" ${previewReadOnly()?'disabled':''} onclick="${previewReadOnly()?'previewOnly()':`askRedeem('${r.id}')`}">${isGMView()?"USE SHAWN'S":'USE'}</button>`:''}</div>`).join('')}

function loadingScreen(){return `<main class="auth-wrap"><div class="auth-card">${crest('sovereign')}<div class="eyebrow">BabyBat Game Hub</div><h1>Opening the vault…</h1><div class="loader"></div></div></main>`}
function authScreen(message=''){
  return `<main class="auth-wrap"><div class="auth-card">${crest('sovereign')}<div class="eyebrow">BabyBat Game Hub</div><h1>Enter the Game</h1><p class="auth-copy">One app. Separate Player, Game Master, and Site Admin experiences. Score and rewards stay synced across devices.</p>${message?`<div class="notice">${esc(message)}</div>`:''}<div class="form-grid auth-form"><div class="field"><label>Display Name</label><input id="authName" class="input" placeholder="Shawn or Moxie"></div><div class="field"><label>Email</label><input id="authEmail" class="input" type="email" autocomplete="email" placeholder="you@example.com"></div><div class="field"><label>Password</label><input id="authPassword" class="input" type="password" autocomplete="current-password" minlength="8" placeholder="8+ characters"></div><button class="primary" onclick="signIn()">Sign In</button><button class="secondary" onclick="signUp()">Create Account</button><button class="ghost" onclick="enterDemo()">Explore Demo</button></div><p class="small-note">Accounts do not automatically receive game access. That prevents a random signup from seeing Sovereign/Nocturne data.</p></div></main>`;
}
function pendingScreen(){
  return `<main class="auth-wrap"><div class="auth-card">${crest('sovereign')}<div class="eyebrow">Account created</div><h1>Unlock Game Access</h1><p class="auth-copy">Enter the one-time code for your assigned role. Access codes are server-side, role-bound, and single-use.</p><div class="field"><label>One-Time Access Code</label><input id="accessCode" class="input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="SC-… or NC-…"></div><div class="form-grid" style="margin-top:10px"><button id="claimButton" class="primary" onclick="claimAccess()">Unlock My Role</button><button class="secondary" onclick="enterDemo()">Preview the Game</button><button class="danger" onclick="signOut()">Sign Out</button></div><div class="card id-card"><span>Signed in as</span><strong>${esc(session?.user?.email||'')}</strong><span>Access ID</span><code>${esc(session?.user?.id||'')}</code></div></div></main>`;
}
function errorScreen(){return `<main class="auth-wrap"><div class="auth-card">${crest('sovereign')}<div class="eyebrow">Connection issue</div><h1>Vault didn't open</h1><div class="notice">${esc(remoteError||'Unknown error')}</div><div class="form-grid"><button class="primary" onclick="syncNow()">Try Again</button><button class="secondary" onclick="enterDemo()">Open Demo</button><button class="danger" onclick="signOut()">Sign Out</button></div></div></main>`}

function render(){
  const root=document.getElementById('app');
  document.body.dataset.theme=viewTheme();
  if(!ui.demo){
    if(remoteStatus==='loading'){root.innerHTML=loadingScreen();return}
    if(!session){root.innerHTML=authScreen(remoteError);return}
    if(remoteStatus==='pending'){root.innerHTML=pendingScreen();return}
    if(remoteStatus==='error'){root.innerHTML=errorScreen();return}
  }
  const pages={home,book:rules,ledger:ledgerPage,org:organizationsPage,admin};
  root.innerHTML=header()+(pages[ui.activePage]||home)()+nav();
}

async function boot(){
  render();
  const {data:{session:s},error}=await db.auth.getSession();
  if(error){remoteError=error.message;remoteStatus='error';render();return}
  session=s;
  if(session) await loadRemote(); else {remoteStatus='ready';render()}
  db.auth.onAuthStateChange(async (_event,s2)=>{
    session=s2;
    if(session){ui.demo=false;saveUI();await loadRemote()}else{clearRemote();remoteStatus='ready';render()}
  });
}
function clearRemote(){game=null;membership=null;entities=[];organizationMembers=[];directives=[];pointTransactions=[];rewards=[];tiers=[];scoringRules=[];ruleSections=[];profile=null;stopRealtime()}
async function loadRemote(){
  if(!session) return;
  remoteStatus='loading'; remoteError=''; render();
  try{
    const [prof,mems] = await Promise.all([
      db.from('profiles').select('id,display_name').eq('id',session.user.id).maybeSingle(),
      db.from('game_memberships').select('game_id,user_id,entity_id,role')
    ]);
    if(prof.error) throw prof.error; if(mems.error) throw mems.error;
    profile=prof.data;
    if(!mems.data?.length){membership=null;remoteStatus='pending';render();return}
    const ids=mems.data.map(m=>m.game_id);
    const gres=await db.from('games').select('*').in('id',ids);
    if(gres.error) throw gres.error;
    game=gres.data?.find(g=>g.slug===CONFIG.gameSlug)||gres.data?.[0];
    if(!game){remoteStatus='pending';render();return}
    membership=mems.data.find(m=>m.game_id===game.id);
    if(membership?.role!=='admin' && !['shawn','moxie'].includes(ui.adminView)) ui.adminView='admin';
    const [er,om,dr,pr,rr,tr,sr,rb] = await Promise.all([
      db.from('game_entities').select('*').order('name'),
      db.from('organization_members').select('*').eq('game_id',game.id).eq('is_active',true).order('sort_order'),
      db.from('directives').select('*').eq('game_id',game.id).order('created_at'),
      db.from('point_transactions').select('*').eq('game_id',game.id).order('created_at'),
      db.from('rewards').select('*').eq('game_id',game.id).order('milestone'),
      db.from('reward_tiers').select('*').eq('game_id',game.id).order('cycle_order'),
      db.from('scoring_rules').select('*').eq('game_id',game.id).eq('is_active',true).order('sort_order'),
      db.from('rulebook_sections').select('*').eq('game_id',game.id).eq('is_active',true).eq('version','1.0').order('sort_order')
    ]);
    for(const r of [er,om,dr,pr,rr,tr,sr,rb]) if(r.error) throw r.error;
    entities=er.data||[];organizationMembers=om.data||[];directives=dr.data||[];pointTransactions=pr.data||[];rewards=rr.data||[];tiers=tr.data||[];scoringRules=sr.data||[];ruleSections=rb.data||[];
    remoteStatus='ready';
    startRealtime();
    render();
  }catch(e){remoteError=e?.message||String(e);remoteStatus='error';render()}
}
function startRealtime(){
  stopRealtime(); if(!game) return;
  realtimeChannel=db.channel(`babybat-${game.id}`)
    .on('postgres_changes',{event:'*',schema:'public',table:'point_transactions',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'rewards',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'directives',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'organization_members',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .subscribe();
}
function queueRealtimeReload(){clearTimeout(realtimeTimer);realtimeTimer=setTimeout(()=>loadRemote(),350)}
function stopRealtime(){if(realtimeChannel){db.removeChannel(realtimeChannel);realtimeChannel=null}}

window.go=p=>{ui.activePage=p;saveUI();render();window.scrollTo({top:0,behavior:'smooth'})}
window.scrollToId=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})
window.enterDemo=()=>{ui.demo=true;ui.demoViewer='shawn';ui.activePage='home';saveUI();remoteStatus='ready';render();toast('Demo mode — live database unchanged')}
window.leaveDemo=()=>{ui.demo=false;saveUI();if(session)loadRemote();else{remoteStatus='ready';render()}}
window.toggleDemoViewer=()=>{ui.demoViewer=ui.demoViewer==='moxie'?'shawn':'moxie';saveUI();render();toast(ui.demoViewer==='moxie'?'Moxie / Game Master preview':'Shawn / Player preview')}
window.setAdminView=v=>{if(!isAdminAccount())return;ui.adminView=v;ui.activePage='home';saveUI();render();window.scrollTo({top:0,behavior:'smooth'})}
window.previewOnly=()=>toast('Preview mode is read-only. Switch back to Admin for live actions.')
window.openOrganization=slug=>{ui.orgSlug=slug;ui.activePage='org';saveUI();render();window.scrollTo({top:0,behavior:'smooth'})}
window.setOrganization=slug=>{ui.orgSlug=slug;saveUI();render()}
window.openMember=id=>{const m=memberRows().find(x=>String(x.id)===String(id));if(!m)return;document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="memberModal" onclick="if(event.target.id==='memberModal')closeMember()"><div class="modal member-modal">${m.image_path?`<img src="${esc(assetUrl(m.image_path))}" alt="${esc(m.name)}">`:`<div class="member-placeholder large">${esc(m.name.slice(0,1))}</div>`}<div class="member-modal-copy"><div class="eyebrow">${esc(m.role_name||'Member')}</div><h3>${esc(m.name)}</h3><strong>${esc(m.position_title)}</strong>${m.department?`<p>${esc(m.department)}</p>`:''}<button class="secondary" onclick="closeMember()">Close</button></div></div></div>`)}
window.closeMember=()=>document.getElementById('memberModal')?.remove()
window.syncNow=async()=>{if(ui.demo)return;await loadRemote();toast('Game state synced')}
window.claimAccess=async()=>{
  const code=document.getElementById('accessCode')?.value.trim();
  if(!code){toast('Enter your one-time access code');return}
  const btn=document.getElementById('claimButton');if(btn){btn.disabled=true;btn.textContent='Unlocking…'}
  const {data,error}=await db.from('access_claims').insert({user_id:session.user.id,requested_code:code}).select('status,role_granted,label').single();
  if(error){toast(error.message);if(btn){btn.disabled=false;btn.textContent='Unlock My Role'};return}
  await loadRemote();toast(`${data?.label||'Game access'} unlocked`)
}
window.claimAdminUpgrade=async()=>{
  const code=document.getElementById('adminUpgradeCode')?.value.trim();
  if(!code){toast('Enter the Site Admin upgrade code');return}
  const btn=document.getElementById('adminUpgradeButton');if(btn){btn.disabled=true;btn.textContent='Activating…'}
  const {data,error}=await db.from('access_claims').insert({user_id:session.user.id,requested_code:code}).select('status,role_granted,label').single();
  if(error){toast(error.message);if(btn){btn.disabled=false;btn.textContent='Activate Site Admin'};return}
  ui.adminView='admin';saveUI();await loadRemote();toast(`${data?.label||'Site Admin'} activated`)
}

window.signUp=async()=>{
  const name=document.getElementById('authName')?.value.trim()||'Player';
  const email=document.getElementById('authEmail')?.value.trim();
  const password=document.getElementById('authPassword')?.value||'';
  if(!email||password.length<8){remoteError='Enter a valid email and a password with at least 8 characters.';render();return}
  remoteStatus='loading';render();
  const redirectOrigin=(window.location.protocol==='http:'||window.location.protocol==='https:')?window.location.origin:undefined;
  const signUpOptions={data:{display_name:name},...(redirectOrigin?{emailRedirectTo:redirectOrigin}:{})};
  const {data,error}=await db.auth.signUp({email,password,options:signUpOptions});
  if(error){remoteError=error.message;session=null;remoteStatus='ready';render();return}
  session=data.session;
  if(session){await loadRemote()}else{remoteStatus='ready';session=null;remoteError='Account created. Check your email for the confirmation link, then come back and sign in.';render()}
}
window.signIn=async()=>{
  const email=document.getElementById('authEmail')?.value.trim();const password=document.getElementById('authPassword')?.value||'';
  if(!email||!password){remoteError='Enter your email and password.';render();return}
  remoteStatus='loading';render();const {data,error}=await db.auth.signInWithPassword({email,password});
  if(error){remoteError=error.message;session=null;remoteStatus='ready';render();return}session=data.session;await loadRemote();
}
window.signOut=async()=>{stopRealtime();await db.auth.signOut();session=null;clearRemote();ui.demo=false;ui.adminView='admin';saveUI();remoteStatus='ready';render()}

window.askRedeem=id=>{const r=rewardRows().find(x=>x.id===id);if(!r)return;document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="redeemModal"><div class="modal"><h3>Use ${esc(r.tier)} Reward?</h3><p>This removes it from the active Reward Chest but keeps it permanently in Redeemed Rewards. ${isGMView()?"Moxie's redemption clears the same shared reward from Shawn's chest.":''}</p><div class="row"><button class="secondary" onclick="closeModal()">Cancel</button><button class="primary" onclick="redeem('${r.id}')">Confirm Use</button></div></div></div>`)}
window.closeModal=()=>document.getElementById('redeemModal')?.remove()
window.redeem=async id=>{
  if(ui.demo){closeModal();toast('Demo does not change the live reward chest');return}
  if(previewReadOnly()){closeModal();previewOnly();return}
  const {error}=await db.from('rewards').update({status:'used'}).eq('id',id).eq('status','available');
  if(error){toast(error.message);return}closeModal();await loadRemote();toast('Reward moved to redeemed history')
}
window.previewBulkLedger=()=>{
  if(ui.demo){toast('Demo paste preview is available, but imports stay disabled');}
  const text=document.getElementById('bulkLedgerText')?.value||'';
  if(!text.trim()){bulkLedgerRows=[];bulkLedgerIgnored=[];render();toast('Paste ledger text first');return}
  const parsed=parseBulkLedger(text); bulkLedgerRows=parsed.rows; bulkLedgerIgnored=parsed.ignored; render();
  const ready=bulkLedgerRows.filter(r=>r.valid&&!r.duplicate).length;
  toast(`${ready} ledger row${ready===1?'':'s'} ready to import`);
}
window.clearBulkLedger=()=>{bulkLedgerRows=[];bulkLedgerIgnored=[];render();}
window.importBulkLedger=async()=>{
  if(ui.demo){toast('Demo import does not alter the live database');return}
  if(previewReadOnly()){previewOnly();return}
  if(!['game_master','admin'].includes(accountRole())){toast('Game Master permission required');return}
  const rows=bulkLedgerRows.filter(r=>r.valid&&!r.duplicate);
  if(!rows.length){toast('No new valid ledger rows to import');return}
  const btn=document.getElementById('bulkImportButton');if(btn){btn.disabled=true;btn.textContent='Importing…'}
  try{
    const codes=[...new Set(rows.map(r=>r.directive))];
    const known=new Map(directives.map(d=>[(normalizeDirectiveCode(d.code)||String(d.code).toUpperCase()),d]));
    const missing=codes.filter(c=>!known.has(c));
    if(missing.length){
      const now=new Date().toISOString();
      const ins=await db.from('directives').insert(missing.map(code=>({game_id:game.id,code,title:code,status:'scored',issued_by_user_id:session.user.id,issued_at:now,completed_at:now}))).select();
      if(ins.error) throw ins.error;
      for(const d of ins.data||[]) known.set(normalizeDirectiveCode(d.code)||String(d.code).toUpperCase(),d);
    }
    const unresolved=codes.filter(c=>!known.has(c));
    if(unresolved.length){
      const q=await db.from('directives').select('*').eq('game_id',game.id).in('code',unresolved);
      if(q.error) throw q.error;
      for(const d of q.data||[]) known.set(normalizeDirectiveCode(d.code)||String(d.code).toUpperCase(),d);
    }
    const payload=rows.map(r=>({game_id:game.id,directive_id:known.get(r.directive)?.id,points:Number(r.points),category:r.category,reason:r.reason||'Bulk ledger import.',source:'game_master',awarded_by_user_id:session.user.id}));
    if(payload.some(x=>!x.directive_id)) throw new Error('Could not resolve one or more directive IDs. Sync and try again.');
    const tx=await db.from('point_transactions').insert(payload);
    if(tx.error) throw tx.error;
    const net=rows.reduce((a,r)=>a+Number(r.points),0); bulkLedgerRows=[];bulkLedgerIgnored=[];
    await loadRemote();toast(`${rows.length} rows imported · ${net>0?'+':''}${net} net points`);
  }catch(e){toast(e?.message||String(e));if(btn){btn.disabled=false;btn.textContent='Import Rows'}}
}
function toast(msg){document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2400)}

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
boot();
