const APP_VERSION = '3.1.7';
const UI_STORAGE = 'babybat-game-hub-ui-v312';
const CONFIG = window.BABYBAT_CONFIG;
const { createClient } = window.supabase;
const db = createClient(CONFIG.supabaseUrl, CONFIG.supabasePublishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

function authRedirectUrl(){
  const configured=(CONFIG.siteUrl||'').trim();
  if(configured) return configured.endsWith('/')?configured:`${configured}/`;
  if(window.location.protocol==='http:'||window.location.protocol==='https:') return `${window.location.origin}/`;
  return undefined;
}
function authCallbackError(){
  const raw=(window.location.hash||'').replace(/^#/,'');
  const hash=new URLSearchParams(raw);
  const query=new URLSearchParams(window.location.search||'');
  const code=hash.get('error_code')||query.get('error_code');
  const desc=hash.get('error_description')||query.get('error_description')||hash.get('error')||query.get('error');
  if(!code&&!desc) return '';
  try{ history.replaceState({},document.title,window.location.pathname); }catch{}
  return `Email confirmation failed${code?` (${code})`:''}: ${desc||'Supabase rejected the confirmation link.'}`;
}

const DEMO = {
  statuses: [
    {entity_slug:'sovereign-circle',status:'open',note:''},
    {entity_slug:'nocturne-collective',status:'open',note:''}
  ],
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
    ['sovereign-circle','Silk','Connection','Warmth & Connection','Director of Connection','sc-silk.webp',50],
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
let organizationStatuses = [];
let organizationMembers = [];
let directives = [];
let pointTransactions = [];
let rewards = [];
let tiers = [];
let scoringRules = [];
let ruleSections = [];
let appSettings = [];
let mailMessages = [];
let evidenceSubmissions = [];
let notificationEvents = [];
let counselThread = null;
let counselMessages = [];
let counselHealth = 'unknown';
let counselSending = false;
let counselPendingText = '';
let counselLastError = '';
let aiUsage = null;
let aiUsageLoading = false;
let aiUsageError = '';
let aiUsageAttempted = false;
let mailMode = 'inbox';
let realtimeChannel = null;
let realtimeTimer = null;
let bulkLedgerRows = [];
let bulkLedgerIgnored = [];
let authMode = 'login';
let authDraft = {name:'',email:''};
let authNotice = '';
let authNoticeKind = 'info';
let authNeedsConfirmation = false;
let authRecoveryActive = false;

function setAuthNotice(message='',kind='info'){
  authNotice=message||'';
  authNoticeKind=kind||'info';
}
function captureAuthDraft(){
  const name=document.getElementById('authName')?.value;
  const email=document.getElementById('authEmail')?.value;
  if(name!==undefined) authDraft.name=name.trim();
  if(email!==undefined) authDraft.email=email.trim();
}
function authCallbackType(){
  const hash=new URLSearchParams((window.location.hash||'').replace(/^#/,''));
  const query=new URLSearchParams(window.location.search||'');
  return hash.get('type')||query.get('type')||'';
}
function cleanAuthUrl(){
  try{ history.replaceState({},document.title,window.location.pathname); }catch{}
}
function friendlyAuthError(error){
  const raw=String(error?.message||error||'Authentication failed.');
  const low=raw.toLowerCase();
  if(low.includes('invalid login credentials')) return 'That email/password combination does not match. Use Forgot Password if you are not sure which password is current.';
  if(low.includes('email not confirmed')) return 'That account still needs email confirmation. Confirm the email or resend the confirmation below.';
  if(low.includes('rate limit')||low.includes('too many')) return 'Too many email/auth attempts were made too quickly. Wait a little bit and try again.';
  if(low.includes('password should')||low.includes('weak password')) return 'That password is not strong enough. Use at least 8 characters and avoid a compromised/common password.';
  if(low.includes('same password')) return 'Choose a password different from the current one.';
  return raw;
}
function normalizeAccessCode(value=''){
  return String(value||'').trim().replace(/[‐‑‒–—]/g,'-').replace(/\s+/g,'');
}
function canonicalClaimName(label='',role=''){
  const text=String(label||'').toLowerCase();
  if(text.includes('moxie')) return 'Moxie';
  if(text.includes('shawn')) return 'Shawn';
  if(role==='game_master') return 'Moxie';
  return '';
}
async function applyCanonicalClaimName(label,role){
  const name=canonicalClaimName(label,role);
  if(!name||!session?.user?.id) return;
  const {error}=await db.from('profiles').update({display_name:name}).eq('id',session.user.id);
  if(!error) profile={...(profile||{}),id:session.user.id,display_name:name};
}
function authNoticeHtml(){
  if(!authNotice) return '';
  return `<div class="auth-notice ${esc(authNoticeKind)}">${esc(authNotice)}</div>`;
}
function passwordField(id,label,autocomplete='current-password',placeholder='8+ characters'){
  return `<div class="field"><label>${esc(label)}</label><div class="password-wrap"><input id="${esc(id)}" class="input" type="password" autocomplete="${esc(autocomplete)}" minlength="8" placeholder="${esc(placeholder)}"><button type="button" class="password-toggle" aria-label="Show password" onclick="togglePassword('${esc(id)}',this)">Show</button></div></div>`;
}

function loadUI(){
  try { return {activePage:'home', demo:false, demoViewer:'shawn', siteMode:'player', adminPreview:'none', orgSlug:'sovereign-circle', ...JSON.parse(localStorage.getItem(UI_STORAGE)||'{}')}; }
  catch { return {activePage:'home', demo:false, demoViewer:'shawn', siteMode:'player', adminPreview:'none', orgSlug:'sovereign-circle'}; }
}
function saveUI(){ localStorage.setItem(UI_STORAGE, JSON.stringify(ui)); }
function esc(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }
function assetUrl(path=''){ const raw=String(path||'').trim(); if(!raw)return ''; if(/^https?:\/\//i.test(raw)||raw.startsWith('data:'))return raw; const clean=raw.replace(/^\/+/, ''); try{return new URL(clean, document.baseURI).href}catch{return clean} }
function fmtDate(v){ if(!v) return ''; const d=new Date(v); return Number.isNaN(d.valueOf()) ? String(v).slice(0,10) : d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}); }
function accountRole(){ return ui.demo ? (ui.demoViewer==='moxie'?'game_master':'player') : (membership?.role || 'player'); }
function isAdminAccount(){ return !ui.demo && membership?.role==='admin'; }
function effectiveRole(){
  if(ui.demo) return ui.demoViewer==='moxie'?'game_master':'player';
  if(isAdminAccount()){
    if(ui.siteMode!=='admin') return 'player';
    return ui.adminPreview==='moxie'?'game_master':'admin';
  }
  return accountRole();
}
function isGMView(){ return ['game_master','admin'].includes(effectiveRole()); }
function previewReadOnly(){ return isAdminAccount() && ui.siteMode==='admin' && ui.adminPreview==='moxie'; }
function canRedeemView(){ return ['player','game_master','admin'].includes(effectiveRole()); }
function roleLabel(r=effectiveRole()){ return ({player:'Player',game_master:'Game Master',admin:'Site Admin',viewer:'Viewer'})[r] || 'Player'; }
function personLabel(){
  if(ui.demo) return ui.demoViewer==='moxie'?'Moxie':'Shawn';
  if(isAdminAccount() && ui.siteMode==='admin' && ui.adminPreview==='moxie') return 'Moxie Preview';
  if(accountRole()==='game_master') return 'Moxie';
  return profile?.display_name || session?.user?.email?.split('@')[0] || 'Shawn';
}
function viewTheme(){ return effectiveRole()==='game_master'?'nocturne':'sovereign'; }
function setting(key,fallback=null){
  if(ui.demo) return fallback;
  const row=appSettings.find(x=>x.setting_key===key);
  return row?row.setting_value:fallback;
}
function currentEntity(){
  if(ui.demo){const slug=ui.demoViewer==='moxie'?'nocturne-collective':'sovereign-circle';return entityRows().find(e=>e.slug===slug);}
  return entityRows().find(e=>e.id===membership?.entity_id) || null;
}
function otherGameEntity(){
  const mine=currentEntity()?.id;
  if(!game) return null;
  const otherId=mine===game.player_entity_id?game.game_master_entity_id:game.player_entity_id;
  return entityRows().find(e=>e.id===otherId)||null;
}
function entityName(id){return entityRows().find(e=>e.id===id)?.name||'Unknown Organization';}
function entitySlug(id){return entityRows().find(e=>e.id===id)?.slug||'';}
function mailAddressForEntity(id){
  const slug=entitySlug(id);
  if(slug==='nocturne-collective') return setting('nocturne_mail_address','nocturnecollective@nightshift.net');
  if(slug==='sovereign-circle') return setting('sovereign_mail_address','chambers@sovereigncircle.org');
  return '';
}
function unreadMailCount(){
  const me=currentEntity()?.id;if(!me)return 0;
  return mailMessages.filter(m=>m.recipient_entity_id===me&&!m.recipient_read_at&&!m.recipient_archived_at).length;
}
function storageBytes(){return evidenceSubmissions.filter(e=>!e.deleted_at).reduce((a,e)=>a+Number(e.byte_size||0),0)}
function humanBytes(n=0){const x=Number(n)||0;if(x<1024)return `${x} B`;if(x<1048576)return `${(x/1024).toFixed(1)} KB`;if(x<1073741824)return `${(x/1048576).toFixed(1)} MB`;return `${(x/1073741824).toFixed(2)} GB`;}

function icon(name){const icons={home:'<path d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',counsel:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',mail:'<path d="M3 5h18v14H3zM3 6l9 7 9-7"/>',book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v18H6.5A2.5 2.5 0 0 0 4 22zM20 4.5A2.5 2.5 0 0 0 17.5 2H13v18h4.5A2.5 2.5 0 0 1 20 22z"/>',ledger:'<path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/>',org:'<path d="M12 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM5 11a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm14 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM8 21v-1.5A3.5 3.5 0 0 1 11.5 16h1a3.5 3.5 0 0 1 3.5 3.5V21M1.5 21v-1a3 3 0 0 1 3-3h1M22.5 21v-1a3 3 0 0 0-3-3h-1"/>',admin:'<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6zM9 12l2 2 4-5"/>'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]||icons.home}</svg>`}
function crest(theme=viewTheme()){
  const img=theme==='nocturne'?'nocturne-collective-logo.webp':'sovereign-circle-logo.webp';
  return `<div class="crest crest-${theme}"><img src="${img}" alt="" /></div>`;
}
function appLogo(extra=''){
  return `<div class="babybat-logo ${extra}"><img src="babybat-logo.webp" alt="BabyBat"></div>`;
}
function siteModeSwitcher(){
  if(!isAdminAccount()) return '';
  const adminLabel=ui.siteMode==='admin' && ui.adminPreview==='moxie' ? 'Admin Home' : 'Admin';
  return `<div class="site-mode-switch"><span>MODE</span><button class="${ui.siteMode==='player'?'active player':''}" onclick="setSiteMode('player')">Player</button><button class="${ui.siteMode==='admin'?'active admin':''}" onclick="setSiteMode('admin')">${adminLabel}</button></div>`;
}
function header(){
  const r=effectiveRole();
  const consoleName=r==='game_master'?'Nocturne Console':r==='admin'?'Site Administration':'Sovereign Console';
  const live=ui.demo?'Demo':'Live';
  return `<header class="topbar theme-${viewTheme()}"><div class="brand">${appLogo('header-logo')}<div><div class="eyebrow">BabyBat Game Hub · ${live}</div><h1>${consoleName}</h1></div></div><div class="role-pill">${esc(personLabel())} · ${roleLabel()}</div></header>`;
}
function nav(){
  const lastLabel=effectiveRole()==='game_master'?'Score':(isAdminAccount()&&ui.siteMode==='player'?'Profile':'Admin');
  const unread=unreadMailCount();
  return `<nav class="nav"><span class="build-version">BABYBAT v${APP_VERSION}</span>${[['home','Home'],['counsel','Counsel'],['mail',unread?`Mail ${unread}`:'Mail'],['book','Rules'],['ledger','Ledger'],['org','Orgs'],['admin',lastLabel]].map(([p,l])=>`<button class="${ui.activePage===p?'active':''}" onclick="go('${p}')">${icon(p)}<span>${l}</span></button>`).join('')}</nav>`;
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
  <section class="section presence-section"><div class="section-head"><h2>Game Status</h2><span>organization availability</span></div>${organizationPresence()}</section>
  ${gameDesk()}
  <section class="section"><div class="grid2"><div class="mini"><strong>${led.length}</strong><span>Scored directives</span></div><div class="mini"><strong>${available.length}</strong><span>Rewards ready</span></div></div></section>
  ${moxie?`<section class="section"><div class="section-head"><h2>Game Master</h2><span>simple workflow</span></div><div class="gm-next-step"><div><span class="eyebrow">NEXT ACTION</span><h3>Score a Directive</h3><p>Enter the Directive number, tap the scoring awards that apply, and post the ledger.</p></div><button class="primary" onclick="go('admin')">Build Ledger</button></div><button class="ledger-link" onclick="go('ledger')"><span>Review scoring history</span><b>View Ledger ›</b></button></section>`:''}
  <section class="section"><div class="section-head"><h2>Reward Chest</h2><span>${available.length} available</span></div>${rewardChest(available,p,moxie)}</section>
  <section class="section"><div class="section-head"><h2>Organizations</h2><span>Meet the boards</span></div>${organizationTeasers()}</section>
  <section class="section"><div class="section-head"><h2>Recent Activity</h2><span>Permanent ledger</span></div>${led.slice().reverse().slice(0,4).map(activity).join('')}</section></main>`;
}
function adminHome(p,available,led){
  return `<main class="page"><section class="admin-command"><div><span class="eyebrow">Site Administration</span><h2>BabyBat Control Room</h2><p>Maintenance, QA, and live game management stay here. Player Mode remains your normal profile.</p></div><div class="admin-crown">♛</div></section>
  <section class="section"><div class="section-head"><h2>Experience Check</h2><span>switch when needed</span></div><div class="preview-grid"><button class="preview-card sovereign" onclick="setSiteMode('player')"><img src="sovereign-circle-logo.webp"><div><b>Return to Player</b><span>Your live Shawn profile</span></div></button><button class="preview-card nocturne" onclick="setAdminPreview('moxie')"><img src="nocturne-collective-logo.webp"><div><b>Preview Moxie</b><span>Inspect Game Master layout</span></div></button></div></section>
  <section class="section"><div class="section-head"><h2>Organization Status</h2><span>live availability</span></div>${organizationPresence()}</section>
  <section class="section"><div class="section-head"><h2>Live Game</h2><span>${p.t} lifetime points</span></div><div class="card admin-score"><div><strong>${p.left}</strong><span>points to ${esc(p.tier)}</span></div><div><strong>${available.length}</strong><span>rewards ready</span></div><div><strong>${led.length}</strong><span>scored directives</span></div></div></section>
  <section class="section"><div class="section-head"><h2>Quick Control</h2><span>site owner</span></div><div class="quick-actions"><button class="action-tile" onclick="go('admin')"><b>Control Center</b><span>Settings / scoring / storage</span></button><button class="action-tile" onclick="go('counsel')"><b>Sovereign Counsel</b><span>Private AI strategy room</span></button><button class="action-tile" onclick="go('mail')"><b>BabyBat Mail</b><span>Official game correspondence</span></button><button class="action-tile" onclick="go('org')"><b>Organizations</b><span>Review both rosters</span></button></div></section></main>`;
}
function rewardChest(av,p,moxie=false){if(!av.length)return `<div class="empty">No unlocked rewards in the chest yet.<br><br><strong style="color:#d8dce2">Next:</strong> ${esc(p.tier)} at ${p.next} points.</div>`;return av.map(r=>`<div class="card reward-card"><div class="reward-icon">${r.tier==='Sovereign'?'♛':'◆'}</div><div class="reward-main"><h3>${esc(r.tier)} Reward</h3><p>Unlocked at ${r.milestone} · ${esc(r.game)}</p></div><span class="badge available">Available</span>${canRedeemView()?`<button class="use-btn" ${previewReadOnly()?'disabled':''} onclick="${previewReadOnly()?'previewOnly()':`askRedeem('${r.id}')`}">${moxie?"USE SHAWN'S":'USE'}</button>`:''}</div>`).join('')}
function organizationTeasers(){
  const data=entityRows().filter(e=>['sovereign-circle','nocturne-collective'].includes(e.slug));
  return `<div class="org-teasers">${data.map(e=>`<button class="org-teaser ${esc(e.theme_key||'')}" onclick="openOrganization('${e.slug}')"><img src="${esc(assetUrl(e.logo_path||''))}" alt=""><div><b>${esc(e.name)}</b><span>${memberRows().filter(m=>m.entity_slug===e.slug||m.entity_id===e.id).length} members</span></div><span class="chev">›</span></button>`).join('')}</div>`;
}
function activity(x){const sign=x.total>=0?'+':'';return `<div class="card activity"><div class="dot"></div><div class="copy"><h4>${esc(x.directive)}</h4><p>${esc(x.reason||x.title)}</p></div><div class="amount ${x.total<0?'negative':''}">${sign}${x.total}</div></div>`}


function gameDesk(){
  if(ui.demo) return `<section class="section"><div class="section-head"><h2>Game Desk</h2><span>demo</span></div><div class="empty">Live directives and photo submissions appear here.</div></section>`;
  const active=directives.filter(d=>!['scored','completed','void'].includes(d.status)).slice().reverse();
  const me=currentEntity()?.id;
  const mine=evidenceSubmissions.filter(e=>!e.deleted_at&&(e.submitter_entity_id===me||e.recipient_entity_id===me)).slice().reverse();
  if(effectiveRole()==='game_master'){
    const pending=mine.filter(e=>e.recipient_entity_id===me&&e.status==='pending');
    return `<section class="section"><div class="section-head"><h2>Submission Review</h2><span>${pending.length} waiting</span></div>${pending.length?pending.map(submissionReviewCard).join(''):`<div class="empty">No photo evidence is waiting for Nocturne review.</div>`}</section>`;
  }
  return `<section class="section"><div class="section-head"><h2>Active Directives</h2><span>${active.length} active</span></div>${active.length?active.map(d=>directiveCard(d)).join(''):`<div class="empty">No active Directives right now.</div>`}${mine.filter(e=>e.submitter_entity_id===me).slice(0,3).length?`<div class="submission-mini-title">Recent submissions</div>${mine.filter(e=>e.submitter_entity_id===me).slice(0,3).map(submissionHistoryCard).join('')}`:''}</section>`;
}
function directiveCard(d){
  const photos=setting('photo_submissions_enabled',true)!==false;
  const submitted=evidenceSubmissions.filter(e=>e.directive_id===d.id&&!e.deleted_at).length;
  return `<div class="card directive-card"><div class="directive-top"><div><span class="directive-code">${esc(d.code||'DIRECTIVE')}</span><h3>${esc(d.title||d.code||'Directive')}</h3></div><span class="badge">${esc(String(d.status||'issued').toUpperCase())}</span></div>${d.description?`<p>${esc(d.description)}</p>`:''}<div class="directive-meta"><span>${submitted} photo submission${submitted===1?'':'s'}</span>${photos&&!previewReadOnly()?`<button class="primary compact" onclick="openEvidenceSubmit('${esc(d.id)}')">Submit Photo</button>`:''}</div></div>`;
}
function submissionHistoryCard(e){
  const d=directives.find(x=>x.id===e.directive_id);
  return `<button class="card submission-row" onclick="openEvidence('${esc(e.id)}')"><div><b>${esc(d?.code||'Directive')}</b><span>${esc(e.caption||'Photo evidence')}</span></div><span class="submission-status ${esc(e.status)}">${esc(e.status)}</span></button>`;
}
function submissionReviewCard(e){
  const d=directives.find(x=>x.id===e.directive_id);
  return `<div class="card review-card"><div><span class="eyebrow">${esc(d?.code||'DIRECTIVE')}</span><h3>${esc(d?.title||'Photo Evidence')}</h3><p>${esc(e.caption||'No caption')}</p></div><div class="row"><button class="secondary" onclick="openEvidence('${esc(e.id)}')">View Photo</button><button class="secondary" onclick="askCounselAboutEvidence('${esc(e.id)}')">Ask Counsel</button><button class="primary" onclick="reviewEvidence('${esc(e.id)}','approved')">Approve</button></div></div>`;
}
function mailRows(){
  if(ui.demo) return [];
  const me=currentEntity()?.id;if(!me)return [];
  return mailMessages.filter(m=>mailMode==='sent'?m.sender_entity_id===me&&!m.sender_archived_at:m.recipient_entity_id===me&&!m.recipient_archived_at).slice().sort((a,b)=>String(b.created_at).localeCompare(String(a.created_at)));
}
function mailPage(){
  if(setting('mail_enabled',true)===false) return `<main class="page"><section class="section"><div class="empty">BabyBat Mail is disabled by Site Admin.</div></section></main>`;
  const rows=mailRows(), other=otherGameEntity();
  return `<main class="page"><section class="mail-hero ${viewTheme()}"><div><span class="eyebrow">Official Game Channel</span><h2>BabyBat Mail</h2><p>${esc(mailAddressForEntity(currentEntity()?.id))}</p></div><button class="primary" ${previewReadOnly()?'disabled':''} onclick="${previewReadOnly()?'previewOnly()':'openComposeMail()'}">New Mail</button></section><section class="section"><div class="mail-tabs"><button class="${mailMode==='inbox'?'active':''}" onclick="setMailMode('inbox')">Inbox <span>${unreadMailCount()}</span></button><button class="${mailMode==='sent'?'active':''}" onclick="setMailMode('sent')">Sent</button></div>${rows.length?`<div class="mail-list">${rows.map(mailCard).join('')}</div>`:`<div class="empty">${mailMode==='sent'?'Nothing sent yet.':'Inbox zero. No game mail waiting.'}</div>`}<div class="mail-route-note">Game-facing identities: ${esc(currentEntity()?.name||'—')} ↔ ${esc(other?.name||'—')}</div></section></main>`;
}
function mailCard(m){
  const incoming=m.recipient_entity_id===currentEntity()?.id;
  return `<button class="mail-card ${incoming&&!m.recipient_read_at?'unread':''}" onclick="openMail('${esc(m.id)}')"><div class="mail-dot"></div><div class="mail-card-main"><div class="mail-card-head"><b>${esc(incoming?entityName(m.sender_entity_id):entityName(m.recipient_entity_id))}</b><time>${fmtDate(m.created_at)}</time></div><strong>${esc(m.subject)}</strong><p>${esc(String(m.body||'').replace(/\s+/g,' ').slice(0,120))}</p><span class="mail-category">${esc(m.category)}</span></div></button>`;
}


function counselSide(){return currentEntity()?.slug==='nocturne-collective'?'nocturne':'sovereign'}
function counselName(){return counselSide()==='nocturne'?'Nocturne Counsel':'Sovereign Counsel'}
function counselQuickPrompts(){
  if(counselSide()==='nocturne') return [
    ['What needs attention?','Pull the current BabyBat state and tell me what needs Nocturne attention right now.'],
    ['Draft next Directive','Using the live game state and rules, help me draft the next Sovereign Directive. Do not issue it; give me the strongest ready-to-approve draft.'],
    ['Review submissions','Review the current pending submissions and tell me what Nocturne should do next.'],
    ['Audit scoring','Audit the current scoring/ledger for any material math, rule, or consistency issues.']
  ];
  return [
    ['Pull latest','Pull the latest BabyBat state and brief the Sovereign Circle on everything materially new or actionable.'],
    ['Analyze Directive','Analyze the newest active Directive. Scales should inspect wording and loopholes; Sigma should inspect scoring implications; Sphinx should summarize the best move.'],
    ['Draft response','Draft a BabyBat Mail response to the most recent incoming game message. Keep it in my natural voice and do not send it.'],
    ['Reward check','Tell me exactly where I stand on points, reward progress, and any available rewards.']
  ];
}
function counselMessageCard(m){
  const assistant=m.role==='assistant';
  const evidence=m.metadata?.evidence_id;
  const failed=!assistant&&m.metadata?.delivery_status==='failed';
  const failure=failed?(m.metadata?.error_message||'Counsel could not answer this message.'):'';
  return `<div class="counsel-msg ${assistant?'assistant':'user'} ${failed?'failed':''}"><div class="counsel-msg-label">${assistant?esc(counselName()):esc(personLabel())}</div><div class="counsel-msg-body">${esc(m.content||'')}</div>${evidence?`<div class="counsel-evidence-tag">Photo evidence attached</div>`:''}${failed?`<div class="counsel-error-tag">Not answered · ${esc(failure)}</div>`:''}${assistant?`<div class="counsel-actions"><button onclick="counselToMail('${esc(m.id)}')">Use in Mail</button>${counselSide()==='nocturne'?`<button onclick="counselToDirective('${esc(m.id)}')">Use as Directive</button>`:''}<button onclick="copyCounsel('${esc(m.id)}')">Copy</button></div>`:''}</div>`;
}
function counselPage(){
  if(ui.demo) return `<main class="page"><section class="section"><div class="empty">Private AI Counsel is available only after signing into a live BabyBat account.</div></section></main>`;
  if(previewReadOnly()) return `<main class="page"><section class="section"><div class="card"><div class="eyebrow">PRIVACY WALL</div><h3>Moxie's Counsel is private</h3><p class="small-note">Site Admin preview can inspect her interface, but it cannot open or read Nocturne Counsel. Sign into Moxie's actual BabyBat account to use that private room.</p><button class="secondary" onclick="setSiteMode('admin')">Back to Admin Home</button></div></section></main>`;
  if(setting('counsel_enabled',true)===false) return `<main class="page"><section class="section"><div class="empty">BabyBat Counsel is currently disabled by Site Admin.</div></section></main>`;
  const side=counselSide();const prompts=counselQuickPrompts();const configured=counselHealth==='ready';const needsKey=counselHealth==='needs_key';
  const model=setting('counsel_model','gpt-5.6-sol');
  const history=counselMessages.slice().sort((a,b)=>String(a.created_at).localeCompare(String(b.created_at)));
  const pending=counselPendingText?`<div class="counsel-msg user pending"><div class="counsel-msg-label">${esc(personLabel())}</div><div class="counsel-msg-body">${esc(counselPendingText)}</div></div>`:'';
  return `<main class="page counsel-page"><section class="counsel-hero ${side}"><div>${crest(side==='nocturne'?'nocturne':'sovereign')}<div><span class="eyebrow">PRIVATE AI STRATEGY ROOM</span><h2>${esc(counselName())}</h2><p>${side==='nocturne'?'Nocturne Collective only':'Sovereign Circle only'} · ${esc(model)}</p></div></div><span class="counsel-health ${configured?'ready':needsKey?'missing':'checking'}">${configured?'AI READY':needsKey?'SETUP NEEDED':'CHECKING'}</span></section>
  ${needsKey?`<section class="section"><div class="notice">${isAdminAccount()?`Counsel is built, but the OpenAI API key has not been added to Supabase yet. Add the server-side <strong>OPENAI_API_KEY</strong> secret, then tap Test Counsel in Site Admin.`:`Counsel is being configured by Site Admin. Your private room and history are ready for activation.`}</div></section>`:''}
  <section class="section counsel-quick"><div class="section-head"><h2>Quick Ask</h2><span>live BabyBat context</span></div><div class="counsel-chips">${prompts.map(([label,prompt])=>`<button ${configured&&!counselSending?'':'disabled'} onclick="sendCounselPrompt(${JSON.stringify(prompt).replace(/"/g,'&quot;')})">${esc(label)}</button>`).join('')}</div></section>
  <section class="section counsel-thread"><div class="counsel-privacy">This room is private to this BabyBat account. Relevant live game data is sent to OpenAI for each answer; opposing Counsel history is never shared.</div>${counselLastError?`<div class="notice counsel-error"><b>Counsel connection problem</b><br>${esc(counselLastError)}</div>`:''}<div id="counselMessages" class="counsel-messages">${history.length?history.map(counselMessageCard).join(''):`<div class="counsel-welcome"><b>${esc(counselName())} is standing by.</b><span>Ask about directives, Mail, scoring, rewards, rules, evidence, or strategy.</span></div>`}${pending}${counselSending?`<div class="counsel-thinking"><i></i><i></i><i></i><span>Counsel is working…</span></div>`:''}</div></section>
  <section class="counsel-composer"><textarea id="counselInput" class="input" rows="2" maxlength="12000" ${configured&&!counselSending?'':'disabled'} placeholder="Ask ${esc(counselName())}…" aria-label="Message ${esc(counselName())}"></textarea><button id="counselSend" class="primary" ${configured&&!counselSending?'':'disabled'} onclick="askCounsel()">Send</button></section>
  <section class="section counsel-footer"><button class="ghost" ${configured&&!counselSending?'':'disabled'} onclick="resetCounsel()">Reset private Counsel history</button></section></main>`;
}

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
function organizationStatusRows(){
  if(ui.demo) return DEMO.statuses.map(x=>{const e=DEMO.entities.find(y=>y.slug===x.entity_slug);return {...x,entity_id:e?.id||x.entity_slug};});
  return organizationStatuses;
}
function organizationStatusFor(slug){
  const entity=entityRows().find(e=>e.slug===slug);
  const row=organizationStatusRows().find(x=>x.entity_id===entity?.id || x.entity_slug===slug);
  return row?.status==='closed'?'closed':'open';
}
function statusLabel(slug){ return `${entityRows().find(e=>e.slug===slug)?.name||slug} — ${organizationStatusFor(slug).toUpperCase()}`; }
function canControlOrgStatus(slug){
  if(ui.demo||previewReadOnly()) return false;
  if(isAdminAccount()&&ui.siteMode==='admin') return true;
  const entity=entityRows().find(e=>e.slug===slug);
  return !!entity && membership?.entity_id===entity.id;
}
function organizationPresence(){
  const slugs=['sovereign-circle','nocturne-collective'];
  return `<div class="presence-grid">${slugs.map(slug=>{const e=entityRows().find(x=>x.slug===slug);if(!e)return '';const st=organizationStatusFor(slug);return `<div class="presence-card ${esc(e.theme_key||'')} ${st}"><div><span class="presence-dot"></span><div><b>${esc(e.name)}</b><small>${st==='open'?'Open for game activity':'Currently closed'}</small></div></div>${canControlOrgStatus(slug)?`<button onclick="toggleOrganizationStatus('${esc(slug)}')">${st==='open'?'Close':'Open'}</button>`:`<strong>${st.toUpperCase()}</strong>`}</div>`}).join('')}</div>`;
}
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
  const playerMode=isAdminAccount() && ui.siteMode==='player';
  const playerUpgrade=accountRole()==='player' && !ui.demo;
  const isMoxie=r==='game_master';
  if(playerMode){
    return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>Player Profile</h2><span>your normal mode</span></div><div class="card player-profile-card"><div class="eyebrow">Sovereign Circle Player</div><h3>${esc(profile?.display_name||'Shawn')}</h3><p class="small-note">This is your live player account. Use the Player / Admin switch at the very top only when you need to maintain or QA the site.</p></div></section><section class="section account-section"><div class="section-head"><h2>Account</h2><span>live sync</span></div><div class="card account-card"><p class="small-note">${esc(session?.user?.email||'')}<br>Player Mode · Site Admin access available</p><div class="row"><button class="secondary" onclick="syncNow()">Sync</button><button class="danger" onclick="signOut()">Sign Out</button></div><button class="account-reset" onclick="emailPasswordReset()">Email Password Reset</button></div></section></main>`;
  }
  const moxiePreview=isMoxie && previewReadOnly();
  const heading=r==='admin'?'Site Administration':isMoxie?(moxiePreview?'Moxie Preview':'Moxie Scoring Console'):'Administration';
  const sub=r==='admin'?'full access':isMoxie?(moxiePreview?'Game Master layout · read-only QA':'Nocturne Game Master'):'Sovereign access';
  const scoringIntro=gm?(isMoxie?`<div class="gm-workflow nocturne"><div class="workflow-step active"><b>1</b><span>Directive #</span></div><i>›</i><div class="workflow-step"><b>2</b><span>Tap awards</span></div><i>›</i><div class="workflow-step"><b>3</b><span>Post ledger</span></div></div>`:`<div class="gm-workflow"><div class="workflow-step active"><b>1</b><span>Paste ledger</span></div><i>›</i><div class="workflow-step"><b>2</b><span>Preview</span></div><i>›</i><div class="workflow-step"><b>3</b><span>Import</span></div></div>`):'';
  const scoringTool=isMoxie?scoreBuilderForm():bulkLedgerForm();
  return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>${heading}</h2><span>${sub}</span></div>${moxiePreview?`<div class="preview-context"><span>Moxie layout preview</span><button onclick="setSiteMode('admin')">Back to Admin Home</button></div>`:''}${scoringIntro}${isMoxie&&!moxiePreview?directiveIssuerCard():''}${gm?scoringTool:`<div class="card"><h3 style="margin-top:0">Permission Model</h3><p class="small-note">Your current game role is <strong>${roleLabel()}</strong>. Players can view the ledger and use unlocked rewards. Game Master/Admin roles can post official scoring ledgers.</p></div>`}${playerUpgrade?adminUpgradeCard():''}</section>
  <section class="section"><div class="section-head"><h2>${isMoxie?'Reward Chest':'Reward Control'}</h2><span>${isMoxie?'shared with Shawn':'shared object'}</span></div>${adminRewards(rr)}</section>
  ${r==='admin'?adminControlCenter()+`<section class="section"><div class="section-head"><h2>Experience QA</h2><span>admin tools</span></div><div class="card"><p class="small-note">Player Mode is your real Shawn profile. Use Preview Moxie from the Admin Home only when you need to inspect her interface.</p></div></section>`:''}
  ${ui.demo?`<section class="section"><div class="card"><button class="secondary" onclick="toggleDemoViewer()">Preview ${ui.demoViewer==='moxie'?'Shawn / Player':'Moxie / Game Master'}</button><button class="danger" style="margin-left:8px" onclick="leaveDemo()">Exit Demo</button></div></section>`:`<section class="section account-section"><div class="section-head"><h2>Account</h2><span>live sync</span></div><div class="card account-card"><p class="small-note">${esc(session?.user?.email||'')}<br>${roleLabel(accountRole())} · Supabase connected</p><div class="row"><button class="secondary" onclick="syncNow()">Sync</button><button class="danger" onclick="signOut()">Sign Out</button></div><button class="account-reset" onclick="emailPasswordReset()">Email Password Reset</button></div></section>`}</main>`;
}
function adminUpgradeCard(){return `<div class="card admin-upgrade"><div class="eyebrow">Site Owner</div><h3>Unlock Site Admin</h3><p class="small-note">Use the one-time admin upgrade code to turn this account into the site owner. That enables the top-level Player / Admin mode switch and Moxie QA preview.</p><div class="field"><label>Admin Upgrade Code</label><input id="adminUpgradeCode" class="input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="ADM-…"></div><button id="adminUpgradeButton" class="primary" onclick="claimAdminUpgrade()">Activate Site Admin</button></div>`}

function directiveIssuerCard(){
  return `<div class="card directive-issuer"><div class="bulk-title"><div><div class="eyebrow">Nocturne Desk</div><h3>Issue Directive</h3></div><span class="badge">NEW</span></div><p class="small-note">Create the official Directive and deliver it to Sovereign Circle through BabyBat Mail in one step.</p><div class="form-grid"><div class="field"><label>Directive Code</label><input id="newDirectiveCode" class="input" placeholder="SD-004"></div><div class="field"><label>Title</label><input id="newDirectiveTitle" class="input" placeholder="Directive title"></div><div class="field"><label>Directive Text</label><textarea id="newDirectiveBody" class="input" rows="4" placeholder="Requirements, deadline, evidence rules…"></textarea></div><button class="primary" onclick="issueDirective()">Issue + Send to Sovereign</button></div></div>`;
}

function scoreBuilderForm(){
  const rules=scoreRows();
  const awards=rules.filter(r=>Number(r.points)>=0);
  const penalties=rules.filter(r=>Number(r.points)<0);
  const recent=directives.slice().sort((a,b)=>String(b.created_at||b.issued_at||'').localeCompare(String(a.created_at||a.issued_at||''))).slice(0,5);
  const disabled=previewReadOnly()?'disabled':'';
  const ruleButton=r=>`<label class="score-pick ${Number(r.points)<0?'penalty':''}"><input type="checkbox" class="score-rule-check" data-label="${esc(r.label)}" data-points="${Number(r.points)||0}" ${disabled} onchange="updateScoreBuilderTotal()"><span><b>${esc(r.label)}</b>${r.definition?`<small>${esc(r.definition)}</small>`:''}</span><strong class="points ${Number(r.points)<0?'negative':''}">${Number(r.points)>0?'+':''}${Number(r.points)}</strong></label>`;
  return `<div class="card score-builder ${effectiveRole()==='game_master'?'nocturne':''}"><div class="bulk-title"><div><div class="eyebrow">Official Scoring</div><h3>Build Ledger</h3></div><span class="badge">TAP</span></div><p class="small-note">Type the Directive number, check what applies, then post it. BabyBat handles the math and permanent ledger entries.</p>${previewReadOnly()?`<div class="notice">Preview only — this is exactly what Moxie sees, but Admin QA cannot post from preview mode.</div>`:''}<div class="field"><label>Directive Number</label><div class="directive-number-row"><span>SD-</span><input id="scoreDirectiveNumber" class="input" type="number" inputmode="numeric" min="1" max="9999" ${disabled} placeholder="004"></div>${recent.length?`<div class="directive-quick-picks">${recent.map(d=>{const m=String(d.code||'').match(/(\d{1,4})/);return m?`<button type="button" ${disabled} onclick="pickScoreDirective('${String(Number(m[1])).padStart(3,'0')}')">${esc(d.code)}</button>`:''}).join('')}</div>`:''}</div><div class="score-builder-section"><div class="score-builder-section-head"><b>Awards & Bonuses</b><span>tap everything that applies</span></div><div class="score-pick-grid">${awards.map(ruleButton).join('')}</div></div>${penalties.length?`<div class="score-builder-section"><div class="score-builder-section-head"><b>Penalties</b><span>only when applicable</span></div><div class="score-pick-grid">${penalties.map(ruleButton).join('')}</div></div>`:''}<div class="field score-note"><label>Scoring Note <span>(optional)</span></label><textarea id="scoreBuilderNote" class="input" rows="2" ${disabled} placeholder="Why this score was awarded…"></textarea></div><div class="score-builder-footer"><div class="score-builder-total"><span>Selected</span><strong id="scoreBuilderCount">0</strong></div><div class="score-builder-total"><span>Ledger Total</span><strong id="scoreBuilderTotal">+0</strong></div><button id="postScoreBuilder" class="primary" ${disabled} onclick="${previewReadOnly()?'previewOnly()':'postScoreBuilder()'}">Post Ledger</button></div></div>`;
}

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
  // Accept the ways the real scoring notices tend to label a directive:
  // SD-003, SD #003, Directive #003, Sovereign Directive #003, or a bare #003 heading.
  const m=text.match(/(?:\bSD\b|\bDIRECTIVE\b|SOVEREIGN\s+DIRECTIVE)\s*[-#:]?\s*(\d{1,4})/i)
    || text.match(/^\s*#\s*(\d{1,4})(?:\b|\s|[-–—:])/i);
  if(!m) return '';
  return `SD-${String(Number(m[1])).padStart(3,'0')}`;
}
function cleanBulkLine(line=''){
  return String(line)
    .replace(/^\s*(?:✅|☑️?|✔️?|✓|❌|✖️?|⭐|🔥|🦇|👑)\s*/u,'')
    .replace(/^\s*[•*▶►▪◦]+\s*/,'')
    .replace(/^\s*[-–—]\s+(?=[A-Za-z])/,'')
    .trim();
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
  const rawText=String(text||'');
  const lines=rawText.split(/\r?\n/).map(cleanBulkLine).filter(Boolean);
  // First pass: discover directive codes anywhere in the pasted notice. If the whole
  // paste only references one directive, use it as the default for every scoring row.
  const discovered=[...new Set(lines.map(normalizeDirectiveCode).filter(Boolean))];
  const defaultDirective=discovered.length===1?discovered[0]:'';
  const rows=[]; const ignored=[]; let currentDirective=defaultDirective; let pendingReason='';
  for(const original of lines){
    const line=original.trim();
    const directOnly=normalizeDirectiveCode(line);
    const hasPointValue=/[+-]\s*\d+\s*(?:pts?|points?)?\s*$/i.test(line);
    // Any non-scoring line that identifies a directive can establish context. This
    // intentionally accepts decorated headings such as "SD-003 — OFFICIAL SCORECARD".
    if(directOnly && !hasPointValue){
      currentDirective=directOnly; ignored.push(line); continue;
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
    if(!r.directive && defaultDirective) r.directive=defaultDirective;
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

function usageMoney(v){
  const n=Number(v||0);
  if(n>0&&n<0.01) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(2)}`;
}
function usageTokens(v){
  const n=Number(v||0);
  if(n>=1_000_000) return `${(n/1_000_000).toFixed(2)}M`;
  if(n>=1_000) return `${(n/1_000).toFixed(1)}K`;
  return String(Math.round(n));
}
function aiUsageSummary(){
  const events=aiUsage?.events||[];
  const entityMap=new Map((aiUsage?.entities||[]).map(e=>[e.id,e]));
  const now=new Date();
  const todayStart=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const monthStart=new Date(now.getFullYear(),now.getMonth(),1);
  const today=events.filter(e=>new Date(e.created_at)>=todayStart);
  const month=events.filter(e=>new Date(e.created_at)>=monthStart);
  const sum=(arr,key)=>arr.reduce((n,e)=>n+Number(e[key]||0),0);
  const cost=arr=>sum(arr,'estimated_cost_usd');
  const sideCost=slug=>cost(month.filter(e=>entityMap.get(e.entity_id)?.slug===slug));
  return {
    todayCost:cost(today),monthCost:cost(month),
    sovereignCost:sideCost('sovereign-circle'),nocturneCost:sideCost('nocturne-collective'),
    calls:month.length,avg:month.length?cost(month)/month.length:0,
    input:sum(month,'input_tokens'),cached:sum(month,'cached_input_tokens'),
    output:sum(month,'output_tokens'),reasoning:sum(month,'reasoning_tokens'),total:sum(month,'total_tokens')
  };
}
function aiUsagePanel(){
  const u=aiUsageSummary();
  const state=aiUsageLoading?'SYNCING':aiUsageError?'ERROR':aiUsage?'LIVE':'WAITING';
  return `<div class="card admin-panel ai-usage-panel"><div class="eyebrow">AI SPEND</div><h3>AI Usage Meter</h3><div class="diag-row"><span>BabyBat Counsel tracking</span><b class="${aiUsageError?'pending':'ok'}">${state}</b></div>${aiUsageError?`<div class="notice counsel-error">${esc(aiUsageError)}</div>`:''}<div class="ai-usage-grid"><div><strong>${usageMoney(u.todayCost)}</strong><span>today</span></div><div><strong>${usageMoney(u.monthCost)}</strong><span>this month</span></div><div><strong>${usageMoney(u.sovereignCost)}</strong><span>Sovereign</span></div><div><strong>${usageMoney(u.nocturneCost)}</strong><span>Nocturne</span></div><div><strong>${usageMoney(u.avg)}</strong><span>avg response</span></div><div><strong>${u.calls}</strong><span>responses</span></div></div><div class="ai-token-strip"><span><b>${usageTokens(u.input)}</b> input</span><span><b>${usageTokens(u.cached)}</b> cached</span><span><b>${usageTokens(u.output)}</b> output</span><span><b>${usageTokens(u.reasoning)}</b> reasoning</span></div><button class="secondary" ${aiUsageLoading?'disabled':''} onclick="refreshAiUsage(true)">${aiUsageLoading?'Syncing…':'Refresh Usage'}</button><p class="small-note ai-usage-note">Estimated BabyBat Counsel spend from OpenAI response token usage. OpenAI Platform billing is the authoritative total. Connection-test calls are not included.</p></div>`;
}

function adminControlCenter(){
  if(effectiveRole()!=='admin') return '';
  const auto=setting('photo_auto_delete_after_save',true)!==false;
  const eligible=evidenceSubmissions.filter(e=>!e.deleted_at&&e.delete_after&&new Date(e.delete_after)<=new Date()).length;
  return `<section class="section admin-control-center"><div class="section-head"><h2>Owner Control Center</h2><span>database-backed</span></div>
  <div class="admin-setting-grid">
    <div class="card admin-panel"><div class="eyebrow">GAME MECHANICS</div><h3>Core Game</h3><div class="field"><label>Game Name</label><input id="setGameName" class="input" value="${esc(game?.name||'')}"></div><div class="field"><label>Reward Interval</label><input id="setRewardInterval" class="input" type="number" min="1" value="${Number(game?.reward_interval||200)}"></div><button class="primary" onclick="saveGameBasics()">Save Game Settings</button></div>
    <div class="card admin-panel"><div class="eyebrow">PHOTO STORAGE</div><h3>Evidence Retention</h3><div class="field"><label>Max Long Edge (px)</label><input id="setPhotoEdge" class="input" type="number" min="800" max="4000" value="${Number(setting('photo_max_long_edge',1800))}"></div><div class="field"><label>Compression Quality (0.50–0.95)</label><input id="setPhotoQuality" class="input" type="number" step="0.01" min="0.5" max="0.95" value="${Number(setting('photo_quality',0.82))}"></div><div class="field"><label>Delete Grace Period After Save (days)</label><input id="setPhotoRetention" class="input" type="number" min="1" max="365" value="${Number(setting('photo_retention_days_after_save',14))}"></div><label class="toggle-row"><input id="setPhotoAutoDelete" type="checkbox" ${auto?'checked':''}><span>Make saved photos eligible for auto-cleanup</span></label><button class="primary" onclick="savePhotoSettings()">Save Photo Settings</button></div>
    <div class="card admin-panel"><div class="eyebrow">MAIL</div><h3>Official Addresses</h3><div class="field"><label>Sovereign Circle</label><input id="setSovMail" class="input" value="${esc(setting('sovereign_mail_address','chambers@sovereigncircle.org'))}"></div><div class="field"><label>Nocturne Collective</label><input id="setNocMail" class="input" value="${esc(setting('nocturne_mail_address','nocturnecollective@nightshift.net'))}"></div><label class="toggle-row"><input id="setMailEnabled" type="checkbox" ${setting('mail_enabled',true)!==false?'checked':''}><span>Enable BabyBat Mail</span></label><button class="primary" onclick="saveMailSettings()">Save Mail Settings</button></div>
    <div class="card admin-panel"><div class="eyebrow">AI COUNSEL</div><h3>Private Counsel Engine</h3><div class="diag-row"><span>OpenAI Responses API</span><b class="${counselHealth==='ready'?'ok':'pending'}">${counselHealth==='ready'?'READY':counselHealth==='needs_key'?'API KEY NEEDED':'CHECKING'}</b></div><label class="toggle-row"><input id="setCounselEnabled" type="checkbox" ${setting('counsel_enabled',true)!==false?'checked':''}><span>Enable Sovereign + Nocturne Counsel</span></label><div class="field"><label>Model</label><select id="setCounselModel" class="input"><option value="gpt-5.6-sol" ${setting('counsel_model','gpt-5.6-sol')==='gpt-5.6-sol'?'selected':''}>GPT-5.6 Sol — strongest</option><option value="gpt-5.6-terra" ${setting('counsel_model')==='gpt-5.6-terra'?'selected':''}>GPT-5.6 Terra — balanced</option><option value="gpt-5.6-luna" ${setting('counsel_model')==='gpt-5.6-luna'?'selected':''}>GPT-5.6 Luna — cheapest</option></select></div><div class="field"><label>Reasoning</label><select id="setCounselReasoning" class="input">${['none','low','medium','high','xhigh','max'].map(x=>`<option value="${x}" ${setting('counsel_reasoning_effort','medium')===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>Sovereign instruction supplement</label><textarea id="setSovCounselNotes" class="input" rows="3" placeholder="Optional owner notes…">${esc(setting('sovereign_counsel_notes',''))}</textarea></div><div class="field"><label>Nocturne instruction supplement</label><textarea id="setNocCounselNotes" class="input" rows="3" placeholder="Optional owner notes…">${esc(setting('nocturne_counsel_notes',''))}</textarea></div><button class="primary" onclick="saveCounselSettings()">Save Counsel Settings</button><button class="secondary" onclick="checkCounselHealth(true)">Test Counsel Connection</button></div>${aiUsagePanel()}<div class="card admin-panel"><div class="eyebrow">INTEGRATIONS</div><h3>Connection Status</h3><div class="diag-row"><span>In-app Counsel backend</span><b class="ok">DEPLOYED</b></div><div class="diag-row"><span>SMS provider</span><b class="pending">NOT CONFIGURED</b></div><label class="toggle-row"><input id="setSmsEnabled" type="checkbox" ${setting('sms_enabled',false)===true?'checked':''}><span>SMS master switch (takes effect after provider setup)</span></label><button class="secondary" onclick="saveIntegrationSettings()">Save Integration Switches</button></div>
  </div></section>
  <section class="section"><div class="section-head"><h2>Storage Health</h2><span>${humanBytes(storageBytes())} stored</span></div><div class="card storage-health"><div><strong>${evidenceSubmissions.filter(e=>!e.deleted_at).length}</strong><span>photos in BabyBat</span></div><div><strong>${eligible}</strong><span>eligible for cleanup</span></div><div><strong>${humanBytes(storageBytes())}</strong><span>current evidence size</span></div></div><button class="danger full-btn" ${eligible?'':'disabled'} onclick="purgeEligiblePhotos()">Purge ${eligible} Eligible Photo${eligible===1?'':'s'}</button></section>
  <section class="section"><div class="section-head"><h2>Scoring Rules</h2><span>edit without redeploy</span></div><div class="admin-rule-list">${scoringRules.map(r=>`<div class="admin-rule-row"><span>${esc(r.label)}</span><input class="input score-admin-input" data-score-id="${esc(r.id)}" type="number" value="${Number(r.points)}"></div>`).join('')}</div><button class="primary full-btn" onclick="saveScoringRules()">Save Scoring Values</button></section>
  <section class="section"><div class="section-head"><h2>Diagnostics</h2><span>v${APP_VERSION}</span></div><div class="card diagnostics"><div><span>Supabase</span><b class="ok">CONNECTED</b></div><div><span>Mail records</span><b>${mailMessages.length}</b></div><div><span>Evidence records</span><b>${evidenceSubmissions.length}</b></div><div><span>Counsel messages</span><b>${counselMessages.length}</b></div><div><span>Counsel service</span><b class="${counselHealth==='ready'?'ok':'pending'}">${counselHealth==='ready'?'READY':counselHealth==='needs_key'?'NEEDS API KEY':'CHECKING'}</b></div><div><span>Notification queue</span><b>${notificationEvents.filter(n=>n.sms_status==='queued').length}</b></div></div></section>`;
}

function adminRewards(rr){const av=rr.filter(r=>r.status==='available');if(!av.length)return `<div class="empty">No available rewards to redeem.</div>`;return av.map(r=>`<div class="card reward-card"><div class="reward-icon">◆</div><div class="reward-main"><h3>${esc(r.tier)} Reward</h3><p>Milestone ${r.milestone}</p></div>${canRedeemView()?`<button class="use-btn" ${previewReadOnly()?'disabled':''} onclick="${previewReadOnly()?'previewOnly()':`askRedeem('${r.id}')`}">${isGMView()?"USE SHAWN'S":'USE'}</button>`:''}</div>`).join('')}

function loadingScreen(){return `<main class="auth-wrap"><div class="auth-card">${appLogo('auth-logo')}<div class="eyebrow auth-eyebrow">BabyBat Game Hub</div><h1>Opening the vault…</h1><div class="loader"></div><p class="small-note">BABYBAT v${APP_VERSION}</p></div></main>`}
function loginScreen(){
  return `<main class="auth-wrap"><div class="auth-card">${appLogo('auth-logo')}<div class="eyebrow auth-eyebrow">BabyBat Game Hub</div><h1>Enter the Game</h1><p class="auth-copy">Sign in to your existing BabyBat account.</p>${authNoticeHtml()}<div class="form-grid auth-form"><div class="field"><label>Email</label><input id="authEmail" class="input" type="email" autocomplete="email" autocapitalize="none" spellcheck="false" value="${esc(authDraft.email)}" placeholder="you@example.com"></div>${passwordField('authPassword','Password','current-password')}<button class="primary" onclick="signIn()">Sign In</button><button class="auth-link" onclick="openForgotPassword()">Forgot Password?</button>${authNeedsConfirmation&&authDraft.email?`<button class="secondary" onclick="resendConfirmation()">Resend Confirmation Email</button>`:''}<div class="auth-divider"><span>or</span></div><button class="secondary" onclick="openSignUp()">Create Account</button><button class="ghost" onclick="enterDemo()">Explore Demo</button></div><p class="small-note auth-foot">Accounts only receive the role tied to their one-time access code. Shawn and Moxie stay isolated to their own views.</p><div class="auth-version">BABYBAT v${APP_VERSION}</div></div></main>`;
}
function signupScreen(){
  return `<main class="auth-wrap"><div class="auth-card">${appLogo('auth-logo')}<div class="eyebrow auth-eyebrow">New Account</div><h1>Create BabyBat Login</h1><p class="auth-copy">Create the account first. After email confirmation, enter the one-time role code.</p>${authNoticeHtml()}<div class="form-grid auth-form"><div class="field"><label>Display Name</label><input id="authName" class="input" autocomplete="name" value="${esc(authDraft.name)}" placeholder="Shawn or Moxie"></div><div class="field"><label>Email</label><input id="authEmail" class="input" type="email" autocomplete="email" autocapitalize="none" spellcheck="false" value="${esc(authDraft.email)}" placeholder="you@example.com"></div>${passwordField('authPassword','Password','new-password')}${passwordField('authPasswordConfirm','Confirm Password','new-password')}<button class="primary" onclick="signUp()">Create Account</button><button class="auth-link" onclick="openLogin()">Back to Sign In</button></div><div class="auth-version">BABYBAT v${APP_VERSION}</div></div></main>`;
}
function forgotPasswordScreen(){
  return `<main class="auth-wrap"><div class="auth-card">${appLogo('auth-logo')}<div class="eyebrow auth-eyebrow">Account Recovery</div><h1>Reset Password</h1><p class="auth-copy">Enter the account email. BabyBat will send a secure Supabase recovery link back to this app.</p>${authNoticeHtml()}<div class="form-grid auth-form"><div class="field"><label>Email</label><input id="authEmail" class="input" type="email" autocomplete="email" autocapitalize="none" spellcheck="false" value="${esc(authDraft.email)}" placeholder="you@example.com"></div><button class="primary" onclick="sendPasswordReset()">Send Reset Email</button><button class="auth-link" onclick="openLogin()">Back to Sign In</button></div><p class="small-note auth-foot">If the email exists, use the newest reset email. Recovery links expire and are intended for one use.</p><div class="auth-version">BABYBAT v${APP_VERSION}</div></div></main>`;
}
function resetPasswordScreen(){
  return `<main class="auth-wrap"><div class="auth-card">${appLogo('auth-logo')}<div class="eyebrow auth-eyebrow">Secure Recovery</div><h1>Choose New Password</h1><p class="auth-copy">This recovery link is authenticated. Set a new password, then BabyBat will return you to a fresh sign-in.</p>${authNoticeHtml()}<div class="form-grid auth-form">${passwordField('newPassword','New Password','new-password')}${passwordField('newPasswordConfirm','Confirm New Password','new-password')}<button class="primary" onclick="finishPasswordReset()">Save New Password</button><button class="auth-link" onclick="cancelRecovery()">Cancel and Return to Sign In</button></div><div class="auth-version">BABYBAT v${APP_VERSION}</div></div></main>`;
}
function authScreen(){
  if(authMode==='signup') return signupScreen();
  if(authMode==='forgot') return forgotPasswordScreen();
  return loginScreen();
}
function pendingScreen(){
  return `<main class="auth-wrap"><div class="auth-card">${appLogo('auth-logo')}<div class="eyebrow auth-eyebrow">Account Ready</div><h1>Unlock Game Access</h1><p class="auth-copy">Enter the one-time code for your assigned role. The role is applied only to this signed-in account.</p><div class="field"><label>One-Time Access Code</label><input id="accessCode" class="input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="SC-… or NC-…"></div><div class="form-grid" style="margin-top:10px"><button id="claimButton" class="primary" onclick="claimAccess()">Unlock My Role</button><button class="secondary" onclick="enterDemo()">Preview the Game</button><button class="danger" onclick="signOut()">Sign Out</button></div><div class="card id-card"><span>Signed in as</span><strong>${esc(session?.user?.email||'')}</strong><span>Access ID</span><code>${esc(session?.user?.id||'')}</code></div><div class="auth-version">BABYBAT v${APP_VERSION}</div></div></main>`;
}
function errorScreen(){return `<main class="auth-wrap"><div class="auth-card">${appLogo('auth-logo')}<div class="eyebrow auth-eyebrow">Connection issue</div><h1>Vault didn't open</h1><div class="notice">${esc(remoteError||'Unknown error')}</div><div class="form-grid"><button class="primary" onclick="syncNow()">Try Again</button><button class="secondary" onclick="enterDemo()">Open Demo</button><button class="danger" onclick="signOut()">Sign Out</button></div><div class="auth-version">BABYBAT v${APP_VERSION}</div></div></main>`}

function render(){
  const root=document.getElementById('app');
  document.body.dataset.theme=viewTheme();
  if(!ui.demo){
    if(authMode==='reset'){root.innerHTML=resetPasswordScreen();return}
    if(remoteStatus==='loading'){root.innerHTML=loadingScreen();return}
    if(!session){root.innerHTML=authScreen();return}
    if(remoteStatus==='pending'){root.innerHTML=pendingScreen();return}
    if(remoteStatus==='error'){root.innerHTML=errorScreen();return}
  }
  const pages={home,counsel:counselPage,mail:mailPage,book:rules,ledger:ledgerPage,org:organizationsPage,admin};
  root.innerHTML=siteModeSwitcher()+header()+(pages[ui.activePage]||home)()+nav();
  if(ui.activePage==='admin'&&effectiveRole()==='admin'&&!ui.demo&&!aiUsageAttempted&&!aiUsageLoading){setTimeout(()=>refreshAiUsage(false),0)}
}

async function boot(){
  const callbackType=authCallbackType();
  const callbackFailure=authCallbackError();
  if(callbackFailure){
    setAuthNotice(callbackFailure,'error');
    authMode='login';
  }else if(callbackType==='recovery'){
    authMode='reset';
    authRecoveryActive=true;
  }
  render();

  db.auth.onAuthStateChange((event,s2)=>{
    // Keep auth callbacks lightweight; schedule app/database work after Supabase releases its auth lock.
    setTimeout(async()=>{
      session=s2;
      if(event==='PASSWORD_RECOVERY'){
        authRecoveryActive=true;
        authMode='reset';
        remoteStatus='ready';
        setAuthNotice('Recovery link accepted. Choose a new password.','success');
        render();
        return;
      }
      if(event==='SIGNED_OUT'){
        clearRemote();
        remoteStatus='ready';
        ui.demo=false;ui.siteMode='player';ui.adminPreview='none';saveUI();
        if(authMode!=='forgot'&&authMode!=='signup') authMode='login';
        render();
        return;
      }
      if(session){
        ui.demo=false;saveUI();
        if(authMode==='reset'){remoteStatus='ready';render();return}
        await loadRemote({silent:remoteStatus==='ready'});
      }
    },0);
  });

  const {data:{session:s},error}=await db.auth.getSession();
  if(error){remoteError=error.message;remoteStatus='error';render();return}
  session=s;
  if(authMode==='reset'){
    remoteStatus='ready';
    if(!session) setAuthNotice('This recovery link is invalid or expired. Request a new reset email.','error');
    render();
    return;
  }
  if(session) await loadRemote(); else {remoteStatus='ready';render()}
}

function clearRemote(){game=null;membership=null;entities=[];organizationStatuses=[];organizationMembers=[];directives=[];pointTransactions=[];rewards=[];tiers=[];scoringRules=[];ruleSections=[];appSettings=[];mailMessages=[];evidenceSubmissions=[];notificationEvents=[];counselThread=null;counselMessages=[];counselHealth='unknown';counselLastError='';aiUsage=null;aiUsageLoading=false;aiUsageError='';aiUsageAttempted=false;profile=null;stopRealtime()}
async function loadRemote({silent=false}={}){
  if(!session) return;
  if(!silent){remoteStatus='loading'; render();}
  remoteError='';
  try{
    const [prof,mems] = await Promise.all([
      db.from('profiles').select('id,display_name').eq('id',session.user.id).maybeSingle(),
      db.from('game_memberships').select('game_id,user_id,entity_id,role').eq('user_id',session.user.id)
    ]);
    if(prof.error) throw prof.error; if(mems.error) throw mems.error;
    profile=prof.data;
    if(!mems.data?.length){membership=null;remoteStatus='pending';render();return}
    const ids=mems.data.map(m=>m.game_id);
    const gres=await db.from('games').select('*').in('id',ids);
    if(gres.error) throw gres.error;
    game=gres.data?.find(g=>g.slug===CONFIG.gameSlug)||gres.data?.[0];
    if(!game){remoteStatus='pending';render();return}
    membership=mems.data.find(m=>m.game_id===game.id && m.user_id===session.user.id);
    if(membership?.role!=='admin'){ui.siteMode='player';ui.adminPreview='none'; if(membership?.role==='game_master') ui.orgSlug='nocturne-collective';}
    else {
      if(!['player','admin'].includes(ui.siteMode)) ui.siteMode='player';
      if(!['none','moxie'].includes(ui.adminPreview)) ui.adminPreview='none';
    }
    saveUI();
    const [er,osr,om,dr,pr,rr,tr,sr,rb,aset,mail,evid,notif,cth,cmsg] = await Promise.all([
      db.from('game_entities').select('*').order('name'),
      db.from('organization_status').select('*').eq('game_id',game.id),
      db.from('organization_members').select('*').eq('game_id',game.id).eq('is_active',true).order('sort_order'),
      db.from('directives').select('*').eq('game_id',game.id).order('created_at'),
      db.from('point_transactions').select('*').eq('game_id',game.id).order('created_at'),
      db.from('rewards').select('*').eq('game_id',game.id).order('milestone'),
      db.from('reward_tiers').select('*').eq('game_id',game.id).order('cycle_order'),
      db.from('scoring_rules').select('*').eq('game_id',game.id).eq('is_active',true).order('sort_order'),
      db.from('rulebook_sections').select('*').eq('game_id',game.id).eq('is_active',true).eq('version','1.0').order('sort_order'),
      db.from('app_settings').select('*').eq('game_id',game.id),
      db.from('mail_messages').select('*').eq('game_id',game.id).order('created_at',{ascending:false}),
      db.from('evidence_submissions').select('*').eq('game_id',game.id).order('created_at',{ascending:false}),
      db.from('notification_events').select('*').eq('game_id',game.id).order('created_at',{ascending:false}).limit(100),
      db.from('counsel_threads').select('*').eq('game_id',game.id).eq('user_id',session.user.id).maybeSingle(),
      db.from('counsel_messages').select('*').eq('game_id',game.id).eq('user_id',session.user.id).order('created_at',{ascending:true}).limit(300)
    ]);
    for(const r of [er,osr,om,dr,pr,rr,tr,sr,rb,aset,mail,evid,notif,cth,cmsg]) if(r.error) throw r.error;
    entities=er.data||[];organizationStatuses=osr.data||[];organizationMembers=om.data||[];directives=dr.data||[];pointTransactions=pr.data||[];rewards=rr.data||[];tiers=tr.data||[];scoringRules=sr.data||[];ruleSections=rb.data||[];appSettings=aset.data||[];mailMessages=mail.data||[];evidenceSubmissions=evid.data||[];notificationEvents=notif.data||[];counselThread=cth.data||null;counselMessages=cmsg.data||[];
    remoteStatus='ready';
    startRealtime();
    render();
    if(counselHealth==='unknown') checkCounselHealth();
  }catch(e){remoteError=e?.message||String(e);remoteStatus='error';render()}
}
function startRealtime(){
  stopRealtime(); if(!game) return;
  realtimeChannel=db.channel(`babybat-${game.id}`)
    .on('postgres_changes',{event:'*',schema:'public',table:'point_transactions',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'rewards',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'directives',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'organization_members',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'organization_status',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'mail_messages',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'evidence_submissions',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'app_settings',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'counsel_messages',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .subscribe();
}
function queueRealtimeReload(){clearTimeout(realtimeTimer);realtimeTimer=setTimeout(()=>loadRemote({silent:true}),350)}
function stopRealtime(){if(realtimeChannel){db.removeChannel(realtimeChannel);realtimeChannel=null}}

window.go=p=>{ui.activePage=p;saveUI();render();window.scrollTo({top:0,behavior:'smooth'})}
window.scrollToId=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})
window.enterDemo=()=>{ui.demo=true;ui.demoViewer='shawn';ui.activePage='home';saveUI();remoteStatus='ready';render();toast('Demo mode — live database unchanged')}
window.leaveDemo=()=>{ui.demo=false;saveUI();if(session)loadRemote();else{remoteStatus='ready';render()}}
window.toggleDemoViewer=()=>{ui.demoViewer=ui.demoViewer==='moxie'?'shawn':'moxie';saveUI();render();toast(ui.demoViewer==='moxie'?'Moxie / Game Master preview':'Shawn / Player preview')}
window.setSiteMode=mode=>{if(!isAdminAccount())return;ui.siteMode=mode==='admin'?'admin':'player';ui.adminPreview='none';ui.activePage='home';saveUI();render();window.scrollTo({top:0,behavior:'smooth'})}
window.setAdminPreview=v=>{if(!isAdminAccount())return;ui.siteMode='admin';ui.adminPreview=v==='moxie'?'moxie':'none';ui.activePage='home';saveUI();render();window.scrollTo({top:0,behavior:'smooth'})}
window.previewOnly=()=>toast('Moxie preview is read-only. Tap Admin Home at the top to return.')
window.openOrganization=slug=>{ui.orgSlug=slug;ui.activePage='org';saveUI();render();window.scrollTo({top:0,behavior:'smooth'})}
window.setOrganization=slug=>{ui.orgSlug=slug;saveUI();render()}
window.toggleOrganizationStatus=async slug=>{
  if(ui.demo){toast('Demo mode — status changes are not saved');return}
  if(!canControlOrgStatus(slug)){toast('You cannot change that organization status');return}
  const entity=entityRows().find(e=>e.slug===slug);
  if(!entity||!game)return;
  const next=organizationStatusFor(slug)==='open'?'closed':'open';
  const payload={game_id:game.id,entity_id:entity.id,status:next,updated_by_user_id:session.user.id,updated_at:new Date().toISOString()};
  const {error}=await db.from('organization_status').upsert(payload,{onConflict:'game_id,entity_id'});
  if(error){toast(error.message);return}
  await loadRemote({silent:true});
  toast(`${entity.name} is now ${next.toUpperCase()}`);
}
window.openMember=id=>{const m=memberRows().find(x=>String(x.id)===String(id));if(!m)return;document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="memberModal" onclick="if(event.target.id==='memberModal')closeMember()"><div class="modal member-modal">${m.image_path?`<img src="${esc(assetUrl(m.image_path))}" alt="${esc(m.name)}">`:`<div class="member-placeholder large">${esc(m.name.slice(0,1))}</div>`}<div class="member-modal-copy"><div class="eyebrow">${esc(m.role_name||'Member')}</div><h3>${esc(m.name)}</h3><strong>${esc(m.position_title)}</strong>${m.department?`<p>${esc(m.department)}</p>`:''}<button class="secondary" onclick="closeMember()">Close</button></div></div></div>`)}
window.closeMember=()=>document.getElementById('memberModal')?.remove()
window.syncNow=async()=>{if(ui.demo)return;counselHealth='unknown';await loadRemote();toast('Game state synced')}
window.claimAccess=async()=>{
  const code=normalizeAccessCode(document.getElementById('accessCode')?.value||'');
  if(!code){toast('Enter your one-time access code');return}
  const btn=document.getElementById('claimButton');if(btn){btn.disabled=true;btn.textContent='Unlocking…'}
  const {data,error}=await db.from('access_claims').insert({user_id:session.user.id,requested_code:code}).select('status,role_granted,label').single();
  if(error){toast(error.message);if(btn){btn.disabled=false;btn.textContent='Unlock My Role'};return}
  await applyCanonicalClaimName(data?.label,data?.role_granted);
  await loadRemote();toast(`${data?.label||'Game access'} unlocked`)
}
window.claimAdminUpgrade=async()=>{
  const code=normalizeAccessCode(document.getElementById('adminUpgradeCode')?.value||'');
  if(!code){toast('Enter the Site Admin upgrade code');return}
  const btn=document.getElementById('adminUpgradeButton');if(btn){btn.disabled=true;btn.textContent='Activating…'}
  const {data,error}=await db.from('access_claims').insert({user_id:session.user.id,requested_code:code}).select('status,role_granted,label').single();
  if(error){toast(error.message);if(btn){btn.disabled=false;btn.textContent='Activate Site Admin'};return}
  await applyCanonicalClaimName(data?.label,data?.role_granted);
  ui.siteMode='player';ui.adminPreview='none';saveUI();await loadRemote();toast(`${data?.label||'Site Admin'} activated — Player Mode is your default`)
}

window.emailPasswordReset=async()=>{
  const email=session?.user?.email;
  if(!email){toast('No signed-in email found');return}
  const redirectTo=authRedirectUrl();
  const {error}=await db.auth.resetPasswordForEmail(email,redirectTo?{redirectTo}:undefined);
  if(error){toast(friendlyAuthError(error));return}
  toast(`Password reset email sent to ${email}`);
}
window.togglePassword=(id,btn)=>{
  const input=document.getElementById(id);if(!input)return;
  const showing=input.type==='text';input.type=showing?'password':'text';
  if(btn){btn.textContent=showing?'Show':'Hide';btn.setAttribute('aria-label',showing?'Show password':'Hide password')}
}
window.openLogin=()=>{captureAuthDraft();authMode='login';authNeedsConfirmation=false;setAuthNotice('');remoteStatus='ready';render()}
window.openSignUp=()=>{captureAuthDraft();authMode='signup';authNeedsConfirmation=false;setAuthNotice('');remoteStatus='ready';render()}
window.openForgotPassword=()=>{captureAuthDraft();authMode='forgot';authNeedsConfirmation=false;setAuthNotice('');remoteStatus='ready';render()}
window.cancelRecovery=async()=>{
  if(authRecoveryActive&&session){try{await db.auth.signOut({scope:'local'})}catch{}}
  authRecoveryActive=false;session=null;authMode='login';setAuthNotice('Password recovery canceled.','info');cleanAuthUrl();remoteStatus='ready';render();
}
window.signUp=async()=>{
  captureAuthDraft();
  const name=document.getElementById('authName')?.value.trim()||'Player';
  const email=document.getElementById('authEmail')?.value.trim();
  const password=document.getElementById('authPassword')?.value||'';
  const confirm=document.getElementById('authPasswordConfirm')?.value||'';
  authDraft={name,email:email||''};
  if(!email||password.length<8){setAuthNotice('Enter a valid email and a password with at least 8 characters.','error');render();return}
  if(password!==confirm){setAuthNotice('The two passwords do not match.','error');render();return}
  remoteStatus='loading';setAuthNotice('');render();
  const redirectOrigin=authRedirectUrl();
  const signUpOptions={data:{display_name:name},...(redirectOrigin?{emailRedirectTo:redirectOrigin}:{})};
  const {data,error}=await db.auth.signUp({email,password,options:signUpOptions});
  if(error){session=null;remoteStatus='ready';authMode='signup';setAuthNotice(friendlyAuthError(error),'error');render();return}
  session=data.session;
  if(session){authMode='login';await loadRemote()}
  else{
    remoteStatus='ready';session=null;authMode='login';authNeedsConfirmation=true;
    setAuthNotice(`Account created. A confirmation email was sent to ${email}. Confirm it, then sign in.`,'success');render();
  }
}
window.resendConfirmation=async()=>{
  captureAuthDraft();const email=authDraft.email;
  if(!email){setAuthNotice('Enter the account email first.','error');render();return}
  const options=authRedirectUrl()?{emailRedirectTo:authRedirectUrl()}:undefined;
  const {error}=await db.auth.resend({type:'signup',email,...(options?{options}:{})});
  if(error){setAuthNotice(friendlyAuthError(error),'error');render();return}
  authNeedsConfirmation=true;setAuthNotice(`A fresh confirmation email was sent to ${email}. Use the newest email.`,'success');render();
}
window.signIn=async()=>{
  captureAuthDraft();const email=document.getElementById('authEmail')?.value.trim();const password=document.getElementById('authPassword')?.value||'';
  authDraft.email=email||'';
  if(!email||!password){setAuthNotice('Enter your email and password.','error');render();return}
  remoteStatus='loading';setAuthNotice('');render();
  const {data,error}=await db.auth.signInWithPassword({email,password});
  if(error){session=null;remoteStatus='ready';authMode='login';const msg=friendlyAuthError(error);authNeedsConfirmation=msg.toLowerCase().includes('confirmation');setAuthNotice(msg,'error');render();return}
  session=data.session;authMode='login';authNeedsConfirmation=false;setAuthNotice('');await loadRemote();
}
window.sendPasswordReset=async()=>{
  captureAuthDraft();const email=authDraft.email;
  if(!email){setAuthNotice('Enter the account email first.','error');render();return}
  setAuthNotice('Sending secure reset email…','info');render();
  const redirectTo=authRedirectUrl();
  const {error}=await db.auth.resetPasswordForEmail(email,redirectTo?{redirectTo}:undefined);
  if(error){setAuthNotice(friendlyAuthError(error),'error');render();return}
  setAuthNotice(`If ${email} is a BabyBat account, a password reset email has been sent. Use the newest message.`,'success');render();
}
window.finishPasswordReset=async()=>{
  const password=document.getElementById('newPassword')?.value||'';
  const confirm=document.getElementById('newPasswordConfirm')?.value||'';
  if(!session){setAuthNotice('This recovery link is no longer active. Request a new reset email.','error');render();return}
  if(password.length<8){setAuthNotice('Use a new password with at least 8 characters.','error');render();return}
  if(password!==confirm){setAuthNotice('The two new passwords do not match.','error');render();return}
  setAuthNotice('Saving new password…','info');render();
  const {error}=await db.auth.updateUser({password});
  if(error){setAuthNotice(friendlyAuthError(error),'error');render();return}
  try{await db.auth.signOut({scope:'local'})}catch{}
  session=null;clearRemote();authRecoveryActive=false;authMode='login';authNeedsConfirmation=false;cleanAuthUrl();remoteStatus='ready';
  setAuthNotice('Password changed successfully. Sign in with the new password.','success');render();
}
window.signOut=async()=>{stopRealtime();await db.auth.signOut();session=null;clearRemote();ui.demo=false;ui.siteMode='player';ui.adminPreview='none';saveUI();authMode='login';authNeedsConfirmation=false;setAuthNotice('');remoteStatus='ready';render()}


window.setMailMode=mode=>{mailMode=mode==='sent'?'sent':'inbox';render()}
window.openComposeMail=(replyId='',prefillBody='',prefillSubject='',prefillCategory='message')=>{
  if(ui.demo||previewReadOnly())return;
  const reply=mailMessages.find(m=>m.id===replyId);const other=otherGameEntity();if(!other)return;
  const subject=reply?(/^re:/i.test(reply.subject)?reply.subject:`Re: ${reply.subject}`):(prefillSubject||'');
  document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="composeModal"><div class="modal mail-compose"><div class="eyebrow">FROM ${esc(currentEntity()?.name||'')}</div><h3>New BabyBat Mail</h3><p class="small-note">To ${esc(other.name)} · ${esc(mailAddressForEntity(other.id))}</p><div class="field"><label>Type</label><select id="mailCategory" class="input"><option value="message" ${prefillCategory==='message'?'selected':''}>Message</option><option value="directive" ${prefillCategory==='directive'?'selected':''}>Directive</option><option value="submission" ${prefillCategory==='submission'?'selected':''}>Submission</option><option value="scoring" ${prefillCategory==='scoring'?'selected':''}>Scoring</option><option value="ruling" ${prefillCategory==='ruling'?'selected':''}>Ruling</option><option value="reward" ${prefillCategory==='reward'?'selected':''}>Reward</option></select></div><div class="field"><label>Subject</label><input id="mailSubject" class="input" value="${esc(subject)}" placeholder="Subject"></div><div class="field"><label>Message</label><textarea id="mailBody" class="input" rows="8" placeholder="Official game correspondence…">${esc(prefillBody||'')}</textarea></div><div class="row"><button class="secondary" onclick="document.getElementById('composeModal')?.remove()">Cancel</button><button class="primary" onclick="sendMail('${esc(replyId)}')">Send to ${esc(other.name)}</button></div></div></div>`);
}
window.sendMail=async(replyId='')=>{
  const subject=document.getElementById('mailSubject')?.value.trim()||'';const body=document.getElementById('mailBody')?.value.trim()||'';const category=document.getElementById('mailCategory')?.value||'message';
  if(!subject||!body){toast('Subject and message are required');return}
  const sender=currentEntity(),recipient=otherGameEntity();if(!sender||!recipient||!game)return;
  const reply=mailMessages.find(m=>m.id===replyId);const id=crypto.randomUUID();
  const payload={id,game_id:game.id,thread_id:reply?(reply.thread_id||reply.id):id,in_reply_to:reply?.id||null,sender_entity_id:sender.id,recipient_entity_id:recipient.id,sender_user_id:session.user.id,subject,body,category};
  const {error}=await db.from('mail_messages').insert(payload);if(error){toast(error.message);return}
  document.getElementById('composeModal')?.remove();await loadRemote({silent:true});mailMode='sent';ui.activePage='mail';saveUI();render();toast(`Sent to ${recipient.name}`)
}
window.openMail=async id=>{
  const m=mailMessages.find(x=>x.id===id);if(!m)return;const incoming=m.recipient_entity_id===currentEntity()?.id;
  if(incoming&&!m.recipient_read_at&&!ui.demo){await db.from('mail_messages').update({recipient_read_at:new Date().toISOString()}).eq('id',m.id);m.recipient_read_at=new Date().toISOString();}
  document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="mailModal"><div class="modal mail-view"><div class="eyebrow">${esc(m.category.toUpperCase())}</div><h3>${esc(m.subject)}</h3><div class="mail-from">${esc(entityName(m.sender_entity_id))} <span>${esc(mailAddressForEntity(m.sender_entity_id))}</span><br>to ${esc(entityName(m.recipient_entity_id))}</div><div class="mail-body">${esc(m.body).replace(/\n/g,'<br>')}</div><div class="row"><button class="secondary" onclick="document.getElementById('mailModal')?.remove()">Close</button>${incoming&&!previewReadOnly()?`<button class="primary" onclick="document.getElementById('mailModal')?.remove();openComposeMail('${esc(m.id)}')">Reply</button>`:''}</div></div></div>`);render();
}
window.issueDirective=async()=>{
  if(previewReadOnly())return previewOnly();
  const code=normalizeDirectiveCode(document.getElementById('newDirectiveCode')?.value||'');const title=document.getElementById('newDirectiveTitle')?.value.trim()||'';const body=document.getElementById('newDirectiveBody')?.value.trim()||'';
  if(!code||!title||!body){toast('Code, title and Directive text are required');return}
  const now=new Date().toISOString();const ins=await db.from('directives').insert({game_id:game.id,code,title,description:body,status:'issued',issued_by_user_id:session.user.id,issued_at:now}).select().single();if(ins.error){toast(ins.error.message);return}
  const sender=currentEntity(),recipient=otherGameEntity();const mid=crypto.randomUUID();
  const mail=await db.from('mail_messages').insert({id:mid,game_id:game.id,thread_id:mid,sender_entity_id:sender.id,recipient_entity_id:recipient.id,sender_user_id:session.user.id,subject:`${code} — ${title}`,body,category:'directive'});
  if(mail.error){toast(`Directive created, but Mail failed: ${mail.error.message}`);await loadRemote({silent:true});return}
  await loadRemote({silent:true});toast(`${code} issued to ${recipient.name}`)
}
window.openEvidenceSubmit=id=>{
  const d=directives.find(x=>x.id===id);if(!d||previewReadOnly())return;
  document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="evidenceModal"><div class="modal evidence-submit"><div class="eyebrow">${esc(d.code||'DIRECTIVE')}</div><h3>Submit Photo Evidence</h3><p class="small-note">BabyBat compresses the photo before private upload. Real photographs only.</p><div class="field"><label>Photo</label><input id="evidenceFile" class="input file-input" type="file" accept="image/*"></div><div class="field"><label>Caption (optional)</label><textarea id="evidenceCaption" class="input" rows="3" placeholder="Anything Nocturne should know…"></textarea></div><div class="row"><button class="secondary" onclick="document.getElementById('evidenceModal')?.remove()">Cancel</button><button id="evidenceSubmitButton" class="primary" onclick="submitEvidence('${esc(id)}')">Submit to Nocturne</button></div></div></div>`)
}
async function imageElementFromFile(file){return await new Promise((resolve,reject)=>{const url=URL.createObjectURL(file);const img=new Image();img.onload=()=>{URL.revokeObjectURL(url);resolve(img)};img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('This image format could not be compressed in the browser.'))};img.src=url})}
async function compressPhoto(file){
  const maxEdge=Math.max(800,Math.min(4000,Number(setting('photo_max_long_edge',1800))||1800));const quality=Math.max(.5,Math.min(.95,Number(setting('photo_quality',.82))||.82));
  try{const img=await imageElementFromFile(file);let w=img.naturalWidth,h=img.naturalHeight;const scale=Math.min(1,maxEdge/Math.max(w,h));w=Math.round(w*scale);h=Math.round(h*scale);const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d',{alpha:false});ctx.drawImage(img,0,0,w,h);const blob=await new Promise((res,rej)=>c.toBlob(b=>b?res(b):rej(new Error('Could not compress image')),'image/jpeg',quality));return {blob,name:(file.name||'evidence').replace(/\.[^.]+$/,'')+'.jpg',mime:'image/jpeg'};}catch(err){if(file.size<=6*1024*1024)return {blob:file,name:file.name||'evidence.jpg',mime:file.type||'image/jpeg'};throw err;}
}
window.submitEvidence=async directiveId=>{
  const file=document.getElementById('evidenceFile')?.files?.[0];const caption=document.getElementById('evidenceCaption')?.value.trim()||'';if(!file){toast('Choose a photo first');return}
  const btn=document.getElementById('evidenceSubmitButton');if(btn){btn.disabled=true;btn.textContent='Preparing Photo…'}
  try{const processed=await compressPhoto(file);if(processed.blob.size>6*1024*1024)throw new Error('Photo is still over 6 MB after compression.');const id=crypto.randomUUID();const sender=currentEntity(),recipient=otherGameEntity();const safe=processed.name.replace(/[^a-zA-Z0-9._-]/g,'_');const path=`${game.id}/${id}/${Date.now()}-${safe}`;const row={id,game_id:game.id,directive_id:directiveId,submitter_entity_id:sender.id,recipient_entity_id:recipient.id,submitted_by_user_id:session.user.id,storage_path:path,original_name:processed.name,mime_type:processed.mime,byte_size:processed.blob.size,caption};const ins=await db.from('evidence_submissions').insert(row);if(ins.error)throw ins.error;const up=await db.storage.from('game-evidence').upload(path,processed.blob,{contentType:processed.mime,upsert:false,cacheControl:'3600'});if(up.error){await db.from('evidence_submissions').delete().eq('id',id);throw up.error}document.getElementById('evidenceModal')?.remove();await loadRemote({silent:true});toast(`Photo submitted · ${humanBytes(processed.blob.size)}`)}catch(e){toast(e?.message||String(e));if(btn){btn.disabled=false;btn.textContent='Submit to Nocturne'}}
}
window.openEvidence=async id=>{
  const e=evidenceSubmissions.find(x=>x.id===id);if(!e||e.deleted_at){toast('This photo is no longer stored in BabyBat');return}const signed=await db.storage.from('game-evidence').createSignedUrl(e.storage_path,600);if(signed.error){toast(signed.error.message);return}const recipient=e.recipient_entity_id===currentEntity()?.id;const d=directives.find(x=>x.id===e.directive_id);
  document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="photoModal"><div class="modal photo-view"><div class="eyebrow">${esc(d?.code||'EVIDENCE')}</div><h3>${esc(d?.title||'Photo Submission')}</h3><img src="${esc(signed.data.signedUrl)}" alt="Submitted evidence"><p>${esc(e.caption||'No caption')}</p><div class="photo-meta">${humanBytes(e.byte_size||0)} · ${fmtDate(e.created_at)} · ${esc(e.status)}</div><div class="row"><button class="secondary" onclick="document.getElementById('photoModal')?.remove()">Close</button><button class="secondary" onclick="askCounselAboutEvidence('${esc(e.id)}')">Ask Counsel</button>${recipient?`<button class="secondary" onclick="saveEvidencePhoto('${esc(e.id)}')">Save Photo</button>`:''}${recipient&&accountRole()==='game_master'?`<button class="primary" onclick="reviewEvidence('${esc(e.id)}','approved')">Approve</button><button class="danger" onclick="reviewEvidence('${esc(e.id)}','rejected')">Reject</button>`:''}</div></div></div>`)
}
window.saveEvidencePhoto=async id=>{
  const e=evidenceSubmissions.find(x=>x.id===id);if(!e)return;const dl=await db.storage.from('game-evidence').download(e.storage_path);if(dl.error){toast(dl.error.message);return}const file=new File([dl.data],e.original_name||'babybat-photo.jpg',{type:e.mime_type||dl.data.type||'image/jpeg'});try{if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'BabyBat Photo'});}else{const url=URL.createObjectURL(dl.data);const a=document.createElement('a');a.href=url;a.download=file.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000)}}catch(err){if(err?.name==='AbortError')return;toast(err?.message||String(err));return}
  const days=Math.max(1,Number(setting('photo_retention_days_after_save',14))||14);const auto=setting('photo_auto_delete_after_save',true)!==false;const now=new Date();const update={recipient_saved_at:now.toISOString(),delete_after:auto?new Date(now.getTime()+days*86400000).toISOString():null};const res=await db.from('evidence_submissions').update(update).eq('id',id);if(res.error){toast(res.error.message);return}await loadRemote({silent:true});toast(auto?`Saved · eligible for cleanup in ${days} days`:'Saved · BabyBat retention remains on')
}
window.reviewEvidence=async(id,status)=>{if(previewReadOnly())return previewOnly();const e=evidenceSubmissions.find(x=>x.id===id);if(!e)return;const note=status==='rejected'?prompt('Reason / resubmission note (optional):','')||'':'';const upd={status,reviewed_by_user_id:session.user.id,reviewed_at:new Date().toISOString(),review_note:note};const r=await db.from('evidence_submissions').update(upd).eq('id',id);if(r.error){toast(r.error.message);return}document.getElementById('photoModal')?.remove();await loadRemote({silent:true});toast(status==='approved'?'Submission approved':'Submission rejected')}
window.saveGameBasics=async()=>{const name=document.getElementById('setGameName')?.value.trim();const reward_interval=Number(document.getElementById('setRewardInterval')?.value);if(!name||!Number.isFinite(reward_interval)||reward_interval<1){toast('Enter a valid name and reward interval');return}const r=await db.from('games').update({name,reward_interval,updated_at:new Date().toISOString()}).eq('id',game.id);if(r.error){toast(r.error.message);return}await loadRemote({silent:true});toast('Game settings saved')}
async function saveSettings(values){const payload=Object.entries(values).map(([setting_key,setting_value])=>({game_id:game.id,setting_key,setting_value,updated_by_user_id:session.user.id,updated_at:new Date().toISOString()}));const r=await db.from('app_settings').upsert(payload,{onConflict:'game_id,setting_key'});if(r.error)throw r.error}
window.savePhotoSettings=async()=>{try{await saveSettings({photo_max_long_edge:Number(document.getElementById('setPhotoEdge')?.value)||1800,photo_quality:Number(document.getElementById('setPhotoQuality')?.value)||.82,photo_retention_days_after_save:Number(document.getElementById('setPhotoRetention')?.value)||14,photo_auto_delete_after_save:!!document.getElementById('setPhotoAutoDelete')?.checked});await loadRemote({silent:true});toast('Photo settings saved')}catch(e){toast(e.message)}}
window.saveMailSettings=async()=>{try{await saveSettings({sovereign_mail_address:document.getElementById('setSovMail')?.value.trim()||'chambers@sovereigncircle.org',nocturne_mail_address:document.getElementById('setNocMail')?.value.trim()||'nocturnecollective@nightshift.net',mail_enabled:!!document.getElementById('setMailEnabled')?.checked});await loadRemote({silent:true});toast('Mail settings saved')}catch(e){toast(e.message)}}
window.saveCounselSettings=async()=>{try{await saveSettings({counsel_enabled:!!document.getElementById('setCounselEnabled')?.checked,counsel_model:document.getElementById('setCounselModel')?.value||'gpt-5.6-sol',counsel_reasoning_effort:document.getElementById('setCounselReasoning')?.value||'medium',sovereign_counsel_notes:document.getElementById('setSovCounselNotes')?.value||'',nocturne_counsel_notes:document.getElementById('setNocCounselNotes')?.value||''});await loadRemote({silent:true});toast('Counsel settings saved')}catch(e){toast(e.message)}}
window.saveIntegrationSettings=async()=>{try{await saveSettings({sms_enabled:!!document.getElementById('setSmsEnabled')?.checked});await loadRemote({silent:true});toast('Integration switches saved')}catch(e){toast(e.message)}}
window.saveScoringRules=async()=>{const inputs=[...document.querySelectorAll('.score-admin-input')];try{for(const i of inputs){const v=Number(i.value);if(!Number.isFinite(v)||v===0)throw new Error('Scoring values must be non-zero numbers.');const r=await db.from('scoring_rules').update({points:v,updated_at:new Date().toISOString()}).eq('id',i.dataset.scoreId);if(r.error)throw r.error}await loadRemote({silent:true});toast('Scoring values saved')}catch(e){toast(e.message)}}
window.purgeEligiblePhotos=async()=>{const now=new Date();const rows=evidenceSubmissions.filter(e=>!e.deleted_at&&e.delete_after&&new Date(e.delete_after)<=now);if(!rows.length){toast('No photos are eligible for cleanup');return}if(!confirm(`Permanently remove ${rows.length} eligible BabyBat photo${rows.length===1?'':'s'}? The game record remains.`))return;const rm=await db.storage.from('game-evidence').remove(rows.map(e=>e.storage_path));if(rm.error){toast(rm.error.message);return}const ids=rows.map(e=>e.id);const upd=await db.from('evidence_submissions').update({deleted_at:new Date().toISOString()}).in('id',ids);if(upd.error){toast(upd.error.message);return}await loadRemote({silent:true});toast(`${rows.length} photo${rows.length===1?'':'s'} removed from storage`)}


window.checkCounselHealth=async(showToast=false)=>{
  if(ui.demo||!session)return;
  counselHealth='checking';if(showToast)render();
  try{
    const {data,error}=await db.functions.invoke('babybat-counsel',{body:{action:showToast?'diagnose':'health'}});
    if(error)throw error;
    if(!data?.configured){counselHealth='needs_key';counselLastError='';if(showToast)toast('OpenAI API key is not configured yet')}
    else if(data?.ready===false){counselHealth='error';counselLastError=data?.error||'OpenAI is configured, but a live model request failed.';if(showToast)toast(counselLastError)}
    else{counselHealth='ready';counselLastError='';if(showToast)toast(data?.tested?'Counsel passed a live OpenAI test':'Counsel connection is ready')}
  }catch(e){counselHealth='error';counselLastError=e?.message||String(e);if(showToast)toast(counselLastError)}
  render();
}
window.refreshAiUsage=async(showToast=false)=>{
  if(ui.demo||effectiveRole()!=='admin'||aiUsageLoading)return;
  aiUsageLoading=true;aiUsageError='';aiUsageAttempted=true;render();
  try{
    const {data,error}=await db.functions.invoke('babybat-ai-usage',{body:{action:'sync'}});
    if(error)throw error;if(data?.error)throw new Error(data.error);
    aiUsage=data||{events:[],entities:[]};
    if(showToast)toast(data?.synced?`Usage synced · ${data.synced} response${data.synced===1?'':'s'} added`:'AI usage is up to date');
  }catch(e){
    aiUsageError=e?.message||String(e);
    if(showToast)toast(aiUsageError);
  }finally{aiUsageLoading=false;render()}
}

window.askCounsel=()=>{const el=document.getElementById('counselInput');const text=el?.value.trim()||'';if(!text){toast('Ask Counsel something first');return}sendCounselPrompt(text)}
window.sendCounselPrompt=async(text,evidenceId='')=>{
  if(ui.demo||previewReadOnly()||counselSending)return;
  const msg=String(text||'').trim();if(!msg)return;
  if(counselHealth!=='ready'){toast('Counsel is not connected yet');return}
  counselSending=true;counselPendingText=msg;counselLastError='';render();requestAnimationFrame(scrollCounselBottom);
  try{
    const {data,error}=await db.functions.invoke('babybat-counsel',{body:{action:'chat',message:msg,...(evidenceId?{evidence_id:evidenceId}:{})}});
    if(error)throw error;
    if(data?.ok===false||data?.error)throw new Error(data?.error||'Counsel could not answer.');
    if(data?.response_id){db.functions.invoke('babybat-ai-usage',{body:{action:'record',response_id:data.response_id}}).catch(()=>{})}
    counselPendingText='';counselSending=false;counselLastError='';await loadRemote({silent:true});ui.activePage='counsel';saveUI();render();requestAnimationFrame(scrollCounselBottom)
  }catch(e){
    counselSending=false;counselPendingText='';counselLastError=e?.message||String(e);
    try{await loadRemote({silent:true})}catch(_){ }
    ui.activePage='counsel';saveUI();render();requestAnimationFrame(scrollCounselBottom);toast(counselLastError)
  }
}
window.scrollCounselBottom=()=>{const box=document.getElementById('counselMessages');if(box)box.scrollTop=box.scrollHeight}
window.askCounselAboutEvidence=id=>{document.getElementById('photoModal')?.remove();ui.activePage='counsel';saveUI();render();sendCounselPrompt(counselSide()==='nocturne'?'Analyze this evidence photo against the Directive and current rules. Tell me what matters before I approve, reject, or score it.':'Analyze this submitted evidence photo against the active Directive and current rules. Tell me what the Sovereign Circle should notice.',id)}
window.counselToMail=id=>{const m=counselMessages.find(x=>x.id===id&&x.role==='assistant');if(!m)return;openComposeMail('',m.content,'','message')}
window.copyCounsel=async id=>{const m=counselMessages.find(x=>x.id===id);if(!m)return;try{await navigator.clipboard.writeText(m.content);toast('Counsel response copied')}catch{toast('Could not copy response')}}
window.counselToDirective=id=>{const m=counselMessages.find(x=>x.id===id&&x.role==='assistant');if(!m||counselSide()!=='nocturne')return;document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="counselDirectiveModal"><div class="modal"><div class="eyebrow">HUMAN APPROVAL REQUIRED</div><h3>Turn Counsel Draft into Directive</h3><p class="small-note">Review and edit everything before issuing. Counsel never sends this automatically.</p><div class="field"><label>Directive Code</label><input id="counselDirectiveCode" class="input" placeholder="SD-004"></div><div class="field"><label>Title</label><input id="counselDirectiveTitle" class="input" placeholder="Directive title"></div><div class="field"><label>Directive Text</label><textarea id="counselDirectiveBody" class="input" rows="10">${esc(m.content)}</textarea></div><div class="row"><button class="secondary" onclick="document.getElementById('counselDirectiveModal')?.remove()">Cancel</button><button class="primary" onclick="issueCounselDirective()">Issue + Send</button></div></div></div>`)}
window.issueCounselDirective=async()=>{const code=normalizeDirectiveCode(document.getElementById('counselDirectiveCode')?.value||'');const title=document.getElementById('counselDirectiveTitle')?.value.trim()||'';const body=document.getElementById('counselDirectiveBody')?.value.trim()||'';if(!code||!title||!body){toast('Code, title and Directive text are required');return}document.getElementById('counselDirectiveModal')?.remove();const now=new Date().toISOString();const ins=await db.from('directives').insert({game_id:game.id,code,title,description:body,status:'issued',issued_by_user_id:session.user.id,issued_at:now}).select().single();if(ins.error){toast(ins.error.message);return}const sender=currentEntity(),recipient=otherGameEntity();const mid=crypto.randomUUID();const mail=await db.from('mail_messages').insert({id:mid,game_id:game.id,thread_id:mid,sender_entity_id:sender.id,recipient_entity_id:recipient.id,sender_user_id:session.user.id,subject:`${code} — ${title}`,body,category:'directive'});if(mail.error){toast(`Directive created, but Mail failed: ${mail.error.message}`);await loadRemote({silent:true});return}await loadRemote({silent:true});toast(`${code} issued to ${recipient.name}`)}
window.resetCounsel=async()=>{if(counselSending)return;if(!confirm(`Reset ${counselName()}? This clears this BabyBat account's private Counsel history and starts a fresh AI conversation.`))return;try{const {data,error}=await db.functions.invoke('babybat-counsel',{body:{action:'reset'}});if(error)throw error;if(data?.error)throw new Error(data.error);counselThread=null;counselMessages=[];counselLastError='';render();toast('Private Counsel history reset')}catch(e){toast(e?.message||String(e))}}

window.askRedeem=id=>{const r=rewardRows().find(x=>x.id===id);if(!r)return;document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="redeemModal"><div class="modal"><h3>Use ${esc(r.tier)} Reward?</h3><p>This removes it from the active Reward Chest but keeps it permanently in Redeemed Rewards. ${isGMView()?"Moxie's redemption clears the same shared reward from Shawn's chest.":''}</p><div class="row"><button class="secondary" onclick="closeModal()">Cancel</button><button class="primary" onclick="redeem('${r.id}')">Confirm Use</button></div></div></div>`)}
window.closeModal=()=>document.getElementById('redeemModal')?.remove()
window.redeem=async id=>{
  if(ui.demo){closeModal();toast('Demo does not change the live reward chest');return}
  if(previewReadOnly()){closeModal();previewOnly();return}
  const {error}=await db.from('rewards').update({status:'used'}).eq('id',id).eq('status','available');
  if(error){toast(error.message);return}closeModal();await loadRemote();toast('Reward moved to redeemed history')
}
window.updateScoreBuilderTotal=()=>{
  const checked=[...document.querySelectorAll('.score-rule-check:checked')];
  const total=checked.reduce((sum,el)=>sum+Number(el.dataset.points||0),0);
  const count=document.getElementById('scoreBuilderCount');
  const totalEl=document.getElementById('scoreBuilderTotal');
  if(count) count.textContent=String(checked.length);
  if(totalEl){totalEl.textContent=`${total>0?'+':''}${total}`;totalEl.classList.toggle('negative',total<0)}
}
window.pickScoreDirective=num=>{const el=document.getElementById('scoreDirectiveNumber');if(el){el.value=String(Number(num));el.focus()}}
window.postScoreBuilder=async()=>{
  if(ui.demo){toast('Demo scoring does not alter the live database');return}
  if(previewReadOnly()){previewOnly();return}
  if(accountRole()!=='game_master'){toast('Nocturne Game Master permission required');return}
  const raw=String(document.getElementById('scoreDirectiveNumber')?.value||'').trim();
  const n=Number(raw);
  if(!Number.isInteger(n)||n<1||n>9999){toast('Enter a valid Directive number');return}
  const code=`SD-${String(n).padStart(3,'0')}`;
  const directive=directives.find(d=>(normalizeDirectiveCode(d.code)||String(d.code).toUpperCase())===code);
  if(!directive){toast(`${code} is not in BabyBat yet`);return}
  const selected=[...document.querySelectorAll('.score-rule-check:checked')].map(el=>({category:String(el.dataset.label||'').trim(),points:Number(el.dataset.points||0)})).filter(x=>x.category&&Number.isFinite(x.points));
  if(!selected.length){toast('Choose at least one scoring item');return}
  const existing=existingLedgerSignatures();
  const fresh=selected.filter(x=>!existing.has(`${code}|${x.category.toLowerCase()}|${x.points}`));
  const duplicates=selected.length-fresh.length;
  if(!fresh.length){toast('Those scoring items are already posted for this Directive');return}
  if(duplicates&&!confirm(`${duplicates} selected scoring item${duplicates===1?' is':'s are'} already in ${code}. Skip ${duplicates===1?'it':'them'} and post the rest?`))return;
  const note=String(document.getElementById('scoreBuilderNote')?.value||'').trim();
  const totalPts=fresh.reduce((sum,x)=>sum+x.points,0);
  if(!confirm(`Post ${fresh.length} ledger item${fresh.length===1?'':'s'} to ${code} for ${totalPts>0?'+':''}${totalPts} points?`))return;
  const btn=document.getElementById('postScoreBuilder');if(btn){btn.disabled=true;btn.textContent='Posting…'}
  try{
    const reason=note||`Official ${code} scoring ledger.`;
    const payload=fresh.map(x=>({game_id:game.id,directive_id:directive.id,points:x.points,category:x.category,reason,source:'game_master',awarded_by_user_id:session.user.id}));
    const tx=await db.from('point_transactions').insert(payload);
    if(tx.error) throw tx.error;
    const now=new Date().toISOString();
    const up=await db.from('directives').update({status:'scored',completed_at:directive.completed_at||now,updated_at:now}).eq('id',directive.id);
    if(up.error) throw up.error;
    await loadRemote();
    toast(`${code} posted · ${totalPts>0?'+':''}${totalPts} points`);
  }catch(e){toast(e?.message||String(e));if(btn){btn.disabled=false;btn.textContent='Post Ledger'}}
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

// v3.1.7 — iPhone/virtual-keyboard-safe Counsel composer.
function sizeCounselInput(el){
  if(!el||el.id!=='counselInput')return;
  el.style.height='auto';
  const next=Math.max(48,Math.min(el.scrollHeight,156));
  el.style.height=`${next}px`;
  el.style.overflowY=el.scrollHeight>156?'auto':'hidden';
}
function syncCounselKeyboard(){
  const input=document.getElementById('counselInput');
  const focused=!!input&&document.activeElement===input;
  document.body.classList.toggle('counsel-keyboard-open',focused);
  if(focused){
    sizeCounselInput(input);
    requestAnimationFrame(()=>input.scrollIntoView({block:'nearest',inline:'nearest'}));
  }
}
document.addEventListener('focusin',e=>{
  if(e.target?.id!=='counselInput')return;
  document.body.classList.add('counsel-keyboard-open');
  sizeCounselInput(e.target);
  setTimeout(syncCounselKeyboard,60);
});
document.addEventListener('input',e=>{if(e.target?.id==='counselInput')sizeCounselInput(e.target)});
document.addEventListener('focusout',e=>{
  if(e.target?.id!=='counselInput')return;
  setTimeout(syncCounselKeyboard,80);
});
window.visualViewport?.addEventListener('resize',()=>{
  if(document.activeElement?.id==='counselInput')requestAnimationFrame(syncCounselKeyboard);
});
window.visualViewport?.addEventListener('scroll',()=>{
  if(document.activeElement?.id==='counselInput')requestAnimationFrame(syncCounselKeyboard);
});

if('serviceWorker' in navigator)window.addEventListener('load',async()=>{try{const reg=await navigator.serviceWorker.register('sw.js',{updateViaCache:'none'});reg.update().catch(()=>{});}catch{}});
boot();
