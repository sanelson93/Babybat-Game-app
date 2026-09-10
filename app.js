const UI_STORAGE = 'babybat-game-hub-ui-v2';
const CONFIG = window.BABYBAT_CONFIG;
const { createClient } = window.supabase;
const db = createClient(CONFIG.supabaseUrl, CONFIG.supabasePublishableKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

const DEMO = {
  entities: [
    {slug:'sovereign-circle',name:'Sovereign Circle',entity_type:'circle'},
    {slug:'nocturne-collective',name:'Nocturne Collective',entity_type:'collective'},
    {slug:'infernal-firm',name:'Infernal Firm',entity_type:'firm'}
  ],
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
  ],
  rosters: {
    sovereign:['Shawn — CEO / Chair','Sir — Chief Brat Tamer','Saint — Empathy','Sphinx — Chief Strategist / Voice Filter','Silk — Warmth / Connection','Sinister — Firebrand','Scales — Legal Counsel','Sigma — CFO','Sage — Executive Assistant / Personnel'],
    nocturne:['Moxie — Executive Director, Night Ops','Nyx — Adversarial Compliance','Sable — Temptation','Selene — Yielding','Dusk — Comfort','Cress — Fortification']
  }
};

let ui = loadUI();
let session = null;
let profile = null;
let remoteStatus = 'loading';
let remoteError = '';
let game = null;
let membership = null;
let entities = [];
let directives = [];
let pointTransactions = [];
let rewards = [];
let tiers = [];
let scoringRules = [];
let ruleSections = [];
let threadId = null;
let chatMessages = [];
let realtimeChannel = null;
let realtimeTimer = null;

function loadUI(){
  try { return {activePage:'home', demo:false, demoViewer:'shawn', ...JSON.parse(localStorage.getItem(UI_STORAGE)||'{}')}; }
  catch { return {activePage:'home', demo:false, demoViewer:'shawn'}; }
}
function saveUI(){ localStorage.setItem(UI_STORAGE, JSON.stringify(ui)); }
function esc(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c])); }
function fmtDate(v){ if(!v) return ''; const d=new Date(v); return Number.isNaN(d.valueOf()) ? String(v).slice(0,10) : d.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}); }
function role(){ return ui.demo ? (ui.demoViewer==='moxie'?'game_master':'player') : (membership?.role || 'player'); }
function isGM(){ return ['game_master','admin'].includes(role()); }
function canRedeem(){ return ['player','game_master','admin'].includes(role()); }
function roleLabel(){ return ({player:'Player',game_master:'Game Master',admin:'Admin',viewer:'Viewer'})[role()] || 'Player'; }
function personLabel(){ if(ui.demo) return ui.demoViewer==='moxie'?'Moxie':'Shawn'; return profile?.display_name || session?.user?.email?.split('@')[0] || 'Player'; }

function icon(name){const icons={home:'<path d="M3 11.5 12 4l9 7.5v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v18H6.5A2.5 2.5 0 0 0 4 22zM20 4.5A2.5 2.5 0 0 0 17.5 2H13v18h4.5A2.5 2.5 0 0 1 20 22z"/>',ledger:'<path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/>',chat:'<path d="M4 4h16v12H8l-4 4z"/>',admin:'<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6zM9 12l2 2 4-5"/>'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`}
function crest(){return `<div class="crest"><svg viewBox="0 0 64 64" fill="none"><path d="M9 19c8 1 14 5 18 12 2-10 5-17 5-17s3 7 5 17c4-7 10-11 18-12-2 12-9 20-18 22-1 7-3 11-5 11s-4-4-5-11C18 39 11 31 9 19Z" stroke="#49d17d" stroke-width="3"/><circle cx="27" cy="36" r="1.5" fill="#49d17d"/><circle cx="37" cy="36" r="1.5" fill="#49d17d"/></svg></div>`}

function header(){
  const consoleName=isGM()?'Nocturne Console':'Sovereign Console';
  const live=ui.demo?'Demo':'Live';
  return `<header class="topbar"><div class="brand">${crest()}<div><div class="eyebrow">BabyBat Game Hub · ${live}</div><h1>${consoleName}</h1></div></div><div class="role-pill">${esc(personLabel())} · ${roleLabel()}</div></header>`;
}
function nav(){return `<nav class="nav">${[['home','Home'],['book','Rules'],['ledger','Ledger'],['chat','Counsel'],['admin','Admin']].map(([p,l])=>`<button class="${ui.activePage===p?'active':''}" onclick="go('${p}')">${icon(p==='book'?'book':p)}${l}</button>`).join('')}</nav>`}

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

function home(){
  const p=progress(), rr=rewardRows(), available=rr.filter(r=>r.status==='available'), led=ledgerItems();
  return `<main class="page"><section class="hero"><div class="hero-title"><div><h2>The Sovereign Circle</h2><p>Official game progress</p></div><div class="lifetime">Lifetime<br><strong>${p.t} pts</strong></div></div><div class="score-big">${p.within}<span class="pts">PTS</span></div><div class="bar-wrap"><div class="bar-label"><span>${p.floor}</span><span>${p.next} · ${esc(p.tier.toUpperCase())}</span></div><div class="bar"><i style="width:${p.pct}%"></i></div><div class="to-go"><strong>${p.left}</strong> points until ${esc(p.tier)} reward</div></div></section>
  <section class="section"><div class="grid2"><div class="mini"><strong>${led.length}</strong><span>Scored directives</span></div><div class="mini"><strong>${available.length}</strong><span>Rewards ready</span></div></div></section>
  <section class="section"><div class="section-head"><h2>Reward Chest</h2><span>${available.length} available</span></div>${rewardChest(available,p)}</section>
  <section class="section"><div class="section-head"><h2>Game Realms</h2><span>Built to expand</span></div>${realmCards()}</section>
  <section class="section"><div class="section-head"><h2>Recent Activity</h2><span>Permanent ledger</span></div>${led.slice().reverse().map(activity).join('')}</section></main>`;
}
function rewardChest(av,p){if(!av.length)return `<div class="empty">No unlocked rewards in the chest yet.<br><br><strong style="color:#d8dce2">Next:</strong> ${esc(p.tier)} at ${p.next} points.</div>`;return av.map(r=>`<div class="card reward-card"><div class="reward-icon">${r.tier==='Sovereign'?'♛':'◆'}</div><div class="reward-main"><h3>${esc(r.tier)} Reward</h3><p>Unlocked at ${r.milestone} · ${esc(r.game)}</p></div><span class="badge available">Available</span>${canRedeem()?`<button class="use-btn" onclick="askRedeem('${r.id}')">USE</button>`:''}</div>`).join('')}
function realmCards(){
  const gm=isGM();
  return `<div class="card ${gm?'':'locked-card'}"><div class="locked-line"><div><h3>☾ Nocturne Collective</h3><p>${gm?'Game Master access unlocked · point controls available in Admin.':'Locked · authorized members only'}</p></div><span class="badge ${gm?'available':'locked'}">${gm?'Unlocked':'Locked'}</span></div></div><div class="card locked-card"><div class="locked-line"><div><h3>♜ Infernal Firm</h3><p>Expansion slot reserved for the second game.</p></div><span class="badge locked">Future</span></div></div>`;
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
function ruleText(key){return ruleSections.find(r=>r.section_key===key)?.body||''}
function rules(){
  const charter=charterRows(), scores=scoreRows(), awards=scores.filter(x=>Number(x.sort_order)<200), penalties=scores.filter(x=>Number(x.sort_order)>=200), rt=ui.demo?DEMO.tiers:tiers.slice().sort((a,b)=>a.cycle_order-b.cycle_order);
  return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>Official Rulebook</h2><span>database-backed v1</span></div><div class="tabs"><button class="chip active" onclick="scrollToId('charter')">Charter</button><button class="chip" onclick="scrollToId('scoring')">Scoring</button><button class="chip" onclick="scrollToId('rewards')">Rewards</button><button class="chip" onclick="scrollToId('rosters')">Rosters</button></div><div class="notice">Written Word Wins. Point history and reward use are retained permanently; later rule edits do not silently rewrite earlier scores.</div></section>
  <section id="charter" class="section"><div class="section-head"><h2>Game Charter</h2><span>I–XXV</span></div>${charter.map(([h,b])=>`<details class="card rule"><summary>${esc(h)}</summary><div class="rule-body">${esc(b)}</div></details>`).join('')}</section>
  <section id="scoring" class="section"><div class="section-head"><h2>Scoring Breakdown</h2><span>awards</span></div>${awards.map(scoreCard).join('')}<div class="section-head" style="margin-top:17px"><h2>Penalties</h2><span>deductions</span></div>${penalties.map(scoreCard).join('')}</section>
  <section id="rewards" class="section"><div class="section-head"><h2>Reward Breakdown</h2><span>repeats every 800</span></div>${rt.map(t=>`<div class="card score-row"><div><h4>${esc(t.name)} Reward</h4><p>${esc(t.description||'Reward tier')} · sequence repeats after Sovereign.</p></div><div class="points">${t.base_milestone}</div></div>`).join('')}</section>
  <section id="rosters" class="section"><div class="section-head"><h2>Organizations</h2><span>authority map</span></div>${rosterMarkup()}</section></main>`;
}
function scoreCard(s){const label=s.label??s[0], pts=Number(s.points??s[1]), def=s.definition??s[2]??'';return `<div class="card score-row"><div><h4>${esc(label)}</h4><p>${esc(def)}</p></div><div class="points ${pts<0?'negative':''}">${pts>0?'+':''}${pts}</div></div>`}
function rosterMarkup(){
  const sov=DEMO.rosters.sovereign,noc=DEMO.rosters.nocturne;
  const extra=ruleText('contacts');
  return `<details class="card rule" open><summary>Sovereign Circle</summary><div class="rule-body">${sov.map(x=>`<p>• ${esc(x)}</p>`).join('')}<p>External: chambers@sovereigncircle.org</p></div></details><details class="card rule"><summary>Nocturne Collective</summary><div class="rule-body">${noc.map(x=>`<p>• ${esc(x)}</p>`).join('')}<p>External: nocturnecollective@nightshift.net</p></div></details><details class="card rule"><summary>Infernal Firm</summary><div class="rule-body"><p>Vex — external advisor/contact and game participant with Moxie; not a Sovereign Circle member unless formally appointed.</p><p>Contact: infernalfirm@hellscape.net</p>${extra?`<p>${esc(extra)}</p>`:''}</div></details>`;
}

function ledgerPage(){const led=ledgerItems(), rr=rewardRows();return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>Game Ledger</h2><span>${total()} lifetime points</span></div>${led.slice().reverse().map(x=>{const sign=x.total>=0?'+':'';return `<details class="card rule"><summary><span>${esc(x.directive)} · ${sign}${x.total}</span></summary><div class="rule-body"><p>${esc(x.reason||'')}</p>${x.breakdown.map(([n,v])=>`<div class="score-row" style="margin-top:8px"><span>${esc(n)}</span><strong class="points ${v<0?'negative':''}">${v>0?'+':''}${v}</strong></div>`).join('')}<div class="divider"></div><div class="score-row"><strong>Total</strong><strong class="points ${x.total<0?'negative':''}">${sign}${x.total}</strong></div></div></details>`}).join('')}</section><section class="section"><div class="section-head"><h2>Redeemed Rewards</h2><span>never deleted</span></div>${redeemedArchive(rr)}</section></main>`}
function redeemedArchive(rr=rewardRows()){const xs=rr.filter(r=>r.status==='used');if(!xs.length)return `<div class="empty">No rewards have been redeemed.</div>`;return xs.map(r=>`<div class="card reward-card"><div class="reward-icon">✓</div><div class="reward-main"><h3>${esc(r.tier)} Reward</h3><p>${r.milestone} pts · used ${fmtDate(r.used_at)}</p></div><span class="badge used">Used</span></div>`).join('')}

function counsel(){
  if(ui.demo) return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>Sovereign Counsel</h2><span>demo</span></div><div class="card chat-box"><div class="messages"><div class="bubble ai">Sovereign Counsel shell online. The production database is connected; live AI replies require the server-side OpenAI connection.</div></div><div class="composer"><input id="chatInput" class="input" placeholder="Ask the Circle…" onkeydown="if(event.key==='Enter')sendChat()"><button class="send" onclick="sendChat()">↑</button></div></div><p class="small-note">Demo messages are not saved.</p></section></main>`;
  return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>Sovereign Counsel</h2><span>persistent game chat</span></div><div class="card chat-box"><div class="messages">${chatMessages.length?chatMessages.map(m=>`<div class="bubble ${m.sender_type==='user'?'user':'ai'}">${esc(m.content)}</div>`).join(''):`<div class="bubble ai">Your game chat storage is live. Messages you type here are saved to BabyBat Game Hub. The final OpenAI server connection is still pending, so I won't fake an AI reply.</div>`}</div><div class="composer"><input id="chatInput" class="input" placeholder="Type into the game hub…" onkeydown="if(event.key==='Enter')sendChat()"><button class="send" onclick="sendChat()">↑</button></div></div><p class="small-note">Database chat storage is live. AI responses will be enabled server-side so the OpenAI secret never touches the browser.</p></section></main>`;
}

function admin(){
  const gm=isGM(), rr=rewardRows();
  return `<main class="page"><section class="section" style="margin-top:4px"><div class="section-head"><h2>${gm?'Game Master':'Administration'}</h2><span>${gm?'Nocturne permissions':'Sovereign access'}</span></div>${gm?awardForm():`<div class="card"><h3 style="margin-top:0">Permission Model</h3><p class="small-note">Your current game role is <strong>${roleLabel()}</strong>. Only Game Master/Admin roles can post score transactions. Players can view their ledger and use unlocked rewards.</p></div>`}</section><section class="section"><div class="section-head"><h2>Reward Control</h2><span>shared object</span></div>${adminRewards(rr)}</section>${ui.demo?`<section class="section"><div class="card"><button class="secondary" onclick="toggleDemoViewer()">Preview ${ui.demoViewer==='moxie'?'Shawn / Player':'Moxie / Game Master'}</button><button class="danger" style="margin-left:8px" onclick="leaveDemo()">Exit Demo</button></div></section>`:`<section class="section"><div class="section-head"><h2>Account</h2><span>Supabase Auth</span></div><div class="card"><p class="small-note">${esc(session?.user?.email||'')}<br>Role: ${roleLabel()} · Live sync enabled</p><div class="row"><button class="secondary" onclick="syncNow()">Sync Now</button><button class="danger" onclick="signOut()">Sign Out</button></div></div></section>`}</main>`;
}
function awardForm(){
  const options=scoreRows().filter(s=>Number(s.points)!==0).map(s=>`<option value="${esc(s.label)}" data-points="${Number(s.points)}">${esc(s.label)} (${Number(s.points)>0?'+':''}${Number(s.points)})</option>`).join('');
  return `<div class="card"><h3 style="margin-top:0">Award Points to Sovereign Circle</h3><div class="form-grid"><div class="row"><div class="field"><label>Directive</label><input id="aDirective" class="input" value="SD-003"></div><div class="field"><label>Points</label><input id="aPoints" class="input" type="number" min="-100" max="500" value="10"></div></div><div class="field"><label>Scoring Category</label><select id="aCategory" class="input" onchange="categoryChanged()"><option value="Manual Award">Manual Award</option>${options}</select></div><div class="field"><label>Reason</label><input id="aReason" class="input" placeholder="Directive completed…"></div><button id="awardButton" class="primary" onclick="awardPoints()">Post to Ledger</button></div></div>`;
}
function adminRewards(rr){const av=rr.filter(r=>r.status==='available');if(!av.length)return `<div class="empty">No available rewards to redeem.</div>`;return av.map(r=>`<div class="card reward-card"><div class="reward-icon">◆</div><div class="reward-main"><h3>${esc(r.tier)} Reward</h3><p>Milestone ${r.milestone}</p></div>${canRedeem()?`<button class="use-btn" onclick="askRedeem('${r.id}')">${isGM()?"USE SHAWN'S":"USE"}</button>`:''}</div>`).join('')}

function loadingScreen(){return `<main class="auth-wrap"><div class="auth-card">${crest()}<div class="eyebrow">BabyBat Game Hub</div><h1>Opening the vault…</h1><div class="loader"></div></div></main>`}
function authScreen(message=''){
  return `<main class="auth-wrap"><div class="auth-card">${crest()}<div class="eyebrow">BabyBat Game Hub</div><h1>Enter the Game</h1><p class="auth-copy">One app. Separate player and Game Master permissions. Your score and rewards stay synced across devices.</p>${message?`<div class="notice">${esc(message)}</div>`:''}<div class="form-grid auth-form"><div class="field"><label>Display Name</label><input id="authName" class="input" placeholder="Shawn or Moxie"></div><div class="field"><label>Email</label><input id="authEmail" class="input" type="email" autocomplete="email" placeholder="you@example.com"></div><div class="field"><label>Password</label><input id="authPassword" class="input" type="password" autocomplete="current-password" minlength="8" placeholder="8+ characters"></div><button class="primary" onclick="signIn()">Sign In</button><button class="secondary" onclick="signUp()">Create Account</button><button class="ghost" onclick="enterDemo()">Explore Demo</button></div><p class="small-note">Accounts do not automatically receive game access. That prevents a random signup from seeing Sovereign/Nocturne data.</p></div></main>`;
}
function pendingScreen(){
  return `<main class="auth-wrap"><div class="auth-card">${crest()}<div class="eyebrow">Account created</div><h1>Unlock Game Access</h1><p class="auth-copy">Your login works. Enter the one-time code for your role: Shawn's code can only unlock Sovereign Circle Player access; Moxie's code can only unlock Nocturne Game Master access.</p><div class="field"><label>One-Time Access Code</label><input id="accessCode" class="input" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="SC-… or NC-…"></div><div class="form-grid" style="margin-top:10px"><button id="claimButton" class="primary" onclick="claimAccess()">Unlock My Role</button><button class="secondary" onclick="enterDemo()">Preview the Game</button><button class="danger" onclick="signOut()">Sign Out</button></div><div class="card id-card"><span>Signed in as</span><strong>${esc(session?.user?.email||'')}</strong><span>Access ID</span><code>${esc(session?.user?.id||'')}</code></div><p class="small-note">Each role code works once and expires. Do not swap codes: the database assigns exactly the role attached to the code.</p></div></main>`;
}
function errorScreen(){return `<main class="auth-wrap"><div class="auth-card">${crest()}<div class="eyebrow">Connection issue</div><h1>Vault didn't open</h1><div class="notice">${esc(remoteError||'Unknown error')}</div><div class="form-grid"><button class="primary" onclick="syncNow()">Try Again</button><button class="secondary" onclick="enterDemo()">Open Demo</button><button class="danger" onclick="signOut()">Sign Out</button></div></div></main>`}

function render(){
  const root=document.getElementById('app');
  if(!ui.demo){
    if(remoteStatus==='loading'){root.innerHTML=loadingScreen();return}
    if(!session){root.innerHTML=authScreen(remoteError);return}
    if(remoteStatus==='pending'){root.innerHTML=pendingScreen();return}
    if(remoteStatus==='error'){root.innerHTML=errorScreen();return}
  }
  root.innerHTML=header()+({home,book:rules,ledger:ledgerPage,chat:counsel,admin}[ui.activePage]||home)()+nav();
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
function clearRemote(){game=null;membership=null;entities=[];directives=[];pointTransactions=[];rewards=[];tiers=[];scoringRules=[];ruleSections=[];threadId=null;chatMessages=[];profile=null;stopRealtime()}
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
    const [er,dr,pr,rr,tr,sr,rb] = await Promise.all([
      db.from('game_entities').select('*').order('name'),
      db.from('directives').select('*').eq('game_id',game.id).order('created_at'),
      db.from('point_transactions').select('*').eq('game_id',game.id).order('created_at'),
      db.from('rewards').select('*').eq('game_id',game.id).order('milestone'),
      db.from('reward_tiers').select('*').eq('game_id',game.id).order('cycle_order'),
      db.from('scoring_rules').select('*').eq('game_id',game.id).eq('is_active',true).order('sort_order'),
      db.from('rulebook_sections').select('*').eq('game_id',game.id).eq('is_active',true).eq('version','1.0').order('sort_order')
    ]);
    for(const r of [er,dr,pr,rr,tr,sr,rb]) if(r.error) throw r.error;
    entities=er.data||[];directives=dr.data||[];pointTransactions=pr.data||[];rewards=rr.data||[];tiers=tr.data||[];scoringRules=sr.data||[];ruleSections=rb.data||[];
    await loadChat();
    remoteStatus='ready';
    startRealtime();
    render();
  }catch(e){remoteError=e?.message||String(e);remoteStatus='error';render()}
}
async function loadChat(){
  if(!game||!session) return;
  let q=await db.from('chat_threads').select('*').eq('game_id',game.id).eq('owner_user_id',session.user.id).order('created_at').limit(1);
  if(q.error) throw q.error;
  if(!q.data?.length){
    const ins=await db.from('chat_threads').insert({game_id:game.id,owner_user_id:session.user.id,title:'Sovereign Counsel'}).select().single();
    if(ins.error) throw ins.error; threadId=ins.data.id;
  } else threadId=q.data[0].id;
  const mr=await db.from('chat_messages').select('*').eq('thread_id',threadId).order('created_at');
  if(mr.error) throw mr.error; chatMessages=mr.data||[];
}
function startRealtime(){
  stopRealtime(); if(!game) return;
  realtimeChannel=db.channel(`babybat-${game.id}`)
    .on('postgres_changes',{event:'*',schema:'public',table:'point_transactions',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'rewards',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .on('postgres_changes',{event:'*',schema:'public',table:'directives',filter:`game_id=eq.${game.id}`},queueRealtimeReload)
    .subscribe();
}
function queueRealtimeReload(){clearTimeout(realtimeTimer);realtimeTimer=setTimeout(()=>loadRemote(),350)}
function stopRealtime(){if(realtimeChannel){db.removeChannel(realtimeChannel);realtimeChannel=null}}

window.go=p=>{ui.activePage=p;saveUI();render();window.scrollTo({top:0,behavior:'smooth'})}
window.scrollToId=id=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})
window.enterDemo=()=>{ui.demo=true;ui.demoViewer='shawn';ui.activePage='home';saveUI();remoteStatus='ready';render();toast('Demo mode — live database unchanged')}
window.leaveDemo=()=>{ui.demo=false;saveUI();if(session)loadRemote();else{remoteStatus='ready';render()}}
window.toggleDemoViewer=()=>{ui.demoViewer=ui.demoViewer==='moxie'?'shawn':'moxie';saveUI();render();toast(ui.demoViewer==='moxie'?'Moxie / Game Master preview':'Shawn / Player preview')}
window.categoryChanged=()=>{const sel=document.getElementById('aCategory');const opt=sel?.selectedOptions?.[0];const pts=opt?.dataset?.points;if(pts!==undefined)document.getElementById('aPoints').value=pts}
window.syncNow=async()=>{if(ui.demo)return;await loadRemote();toast('Game state synced')}
window.copyUserId=async()=>{try{await navigator.clipboard.writeText(session?.user?.id||'');toast('Access ID copied')}catch{toast('Copy failed — press and hold the ID')}}
window.claimAccess=async()=>{
  const code=document.getElementById('accessCode')?.value.trim();
  if(!code){toast('Enter your one-time access code');return}
  const btn=document.getElementById('claimButton');if(btn){btn.disabled=true;btn.textContent='Unlocking…'}
  const {data,error}=await db.from('access_claims').insert({user_id:session.user.id,requested_code:code}).select('status,role_granted,label').single();
  if(error){toast(error.message);if(btn){btn.disabled=false;btn.textContent='Unlock My Role'};return}
  await loadRemote();toast(`${data?.label||'Game access'} unlocked`)
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
window.signOut=async()=>{stopRealtime();await db.auth.signOut();session=null;clearRemote();ui.demo=false;saveUI();remoteStatus='ready';render()}

window.askRedeem=id=>{const r=rewardRows().find(x=>x.id===id);if(!r)return;document.body.insertAdjacentHTML('beforeend',`<div class="modal-back" id="redeemModal"><div class="modal"><h3>Use ${esc(r.tier)} Reward?</h3><p>This removes it from the active Reward Chest but keeps it permanently in Redeemed Rewards. ${isGM()?"Moxie's redemption clears the same shared reward from Shawn's chest.":''}</p><div class="row"><button class="secondary" onclick="closeModal()">Cancel</button><button class="primary" onclick="redeem('${r.id}')">Confirm Use</button></div></div></div>`)}
window.closeModal=()=>document.getElementById('redeemModal')?.remove()
window.redeem=async id=>{
  if(ui.demo){closeModal();toast('Demo does not change the live reward chest');return}
  const {error}=await db.from('rewards').update({status:'used'}).eq('id',id).eq('status','available');
  if(error){toast(error.message);return}closeModal();await loadRemote();toast('Reward moved to redeemed history')
}
window.awardPoints=async()=>{
  if(ui.demo){toast('Demo award controls do not alter the live database');return}
  if(!isGM()){toast('Game Master permission required');return}
  const code=document.getElementById('aDirective')?.value.trim()||'Manual';
  const pts=Number(document.getElementById('aPoints')?.value);
  const category=document.getElementById('aCategory')?.value||'Manual Award';
  const reason=document.getElementById('aReason')?.value.trim()||'Points awarded by Game Master.';
  if(!Number.isFinite(pts)||pts===0){toast('Enter a non-zero point amount');return}
  const btn=document.getElementById('awardButton');if(btn){btn.disabled=true;btn.textContent='Posting…'}
  try{
    let d=directives.find(x=>x.code.toLowerCase()===code.toLowerCase());
    if(!d){
      const now=new Date().toISOString();
      const ins=await db.from('directives').insert({game_id:game.id,code,title:code,status:'scored',issued_by_user_id:session.user.id,issued_at:now,completed_at:now}).select().single();
      if(ins.error) throw ins.error; d=ins.data;
    }
    const tx=await db.from('point_transactions').insert({game_id:game.id,directive_id:d.id,points:pts,category,reason,source:'game_master',awarded_by_user_id:session.user.id});
    if(tx.error) throw tx.error;
    await loadRemote();toast(`${pts>0?'+':''}${pts} points posted to the permanent ledger`);
  }catch(e){toast(e?.message||String(e));if(btn){btn.disabled=false;btn.textContent='Post to Ledger'}}
}
window.sendChat=async()=>{
  const el=document.getElementById('chatInput');const v=el?.value.trim();if(!v)return;
  if(ui.demo){el.value='';toast('Demo message not saved');return}
  if(!threadId){toast('Chat thread is not ready yet');return}
  const res=await db.from('chat_messages').insert({thread_id:threadId,user_id:session.user.id,sender_type:'user',content:v});
  if(res.error){toast(res.error.message);return}el.value='';await loadChat();render();setTimeout(()=>document.querySelector('.messages')?.scrollTo(0,99999),0);toast('Message saved to Game Hub')
}
function toast(msg){document.querySelector('.toast')?.remove();const el=document.createElement('div');el.className='toast';el.textContent=msg;document.body.appendChild(el);setTimeout(()=>el.remove(),2400)}

if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
boot();
