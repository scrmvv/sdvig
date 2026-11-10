/* Примерные данные для интерактивного подбора прогулки. */
'use strict';
const TOPICS = [
  {id:'nature',name:'Природа',group:'ВОЗДУХ',color:'#56805a',x:16,y:25},
  {id:'coffee',name:'Кофе',group:'ПАУЗА',color:'#b3774c',x:38,y:16},
  {id:'architecture',name:'Архитектура',group:'ФОРМЫ',color:'#456d8a',x:65,y:17},
  {id:'culture',name:'Культура',group:'ИДЕИ',color:'#ad6c78',x:86,y:30},
  {id:'history',name:'История',group:'ПРОШЛОЕ',color:'#9a7937',x:83,y:68},
  {id:'waterfront',name:'У воды',group:'ПРОСТОР',color:'#397b91',x:63,y:82},
  {id:'streetart',name:'Стрит-арт',group:'ЦВЕТ',color:'#bb5b4c',x:37,y:81},
  {id:'food',name:'Еда',group:'ВКУС',color:'#a36c32',x:15,y:68},
  {id:'quiet',name:'Тишина',group:'НАСТРОЕНИЕ',color:'#64846a',x:25,y:48},
  {id:'views',name:'Виды',group:'ВПЕЧАТЛЕНИЯ',color:'#6467a4',x:75,y:49}
];
const SUGGESTED = [
  ['nature','coffee'],['architecture','history'],['coffee','food'],['culture','streetart'],
  ['waterfront','quiet'],['nature','views'],['waterfront','views'],['history','culture']
];
const FUSIONS = {
  'coffee+nature':['Кофе с видом','Зелёные остановки, где кофе становится частью прогулки.'],
  'architecture+history':['Следы города','Места, в которых город рассказывает свою историю через архитектуру.'],
  'coffee+food':['Вкус города','Небольшой гастрономический маршрут без длинного поиска.'],
  'culture+streetart':['Галерея улиц','Искусство, которое встречается не в залах, а по пути.'],
  'quiet+waterfront':['Тихая вода','Неспешные остановки рядом с водой и подальше от шума.'],
  'nature+views':['Открытые горизонты','Зелёные пространства и точки с хорошим обзором.'],
  'views+waterfront':['Линия горизонта','Маршрут к воде с открытыми видами.'],
  'culture+history':['Живые истории','Связь культурных событий и памяти города.'],
  'architecture+coffee':['Кофе в старом городе','Кофейные остановки на фоне интересных фасадов.'],
  'nature+waterfront':['Зелёный берег','Прогулки по природе у воды.'],
  'nature+quiet':['Тихий город','Маршрут для тех, кто хочет отвлечься от городского шума.'],
  'coffee+views':['Чашка над городом','Виды, ради которых стоит остановиться на кофе.'],
  'architecture+streetart':['Искусство стен','Городские фасады как пространство для художников.'],
  'food+history':['История на вкус','От старых улиц к местам с характерными блюдами.'],
  'food+waterfront':['Обед у воды','Небольшие остановки у воды с местами для еды.']
};
// Вымышленные объекты для демонстрации логики композиционной навигации.
const PLACES=[
 {id:'01',name:'Терраса у реки',description:'Кофе с видом на спокойную воду',tags:['coffee','nature','waterfront','views'],minutes:50,walk:8,price:490,quiet:true},
 {id:'02',name:'Оранжерея и эспрессо',description:'Стеклянный павильон среди растений',tags:['coffee','nature','quiet'],minutes:55,walk:11,price:620,quiet:true},
 {id:'03',name:'Кофейня у смотровой',description:'Небольшая остановка над городом',tags:['coffee','views','architecture'],minutes:35,walk:13,price:430,quiet:false},
 {id:'04',name:'Парк и маленький киоск',description:'Прогулка под деревьями с кофе навынос',tags:['coffee','nature','quiet'],minutes:40,walk:7,price:300,quiet:true},
 {id:'05',name:'Арка старого квартала',description:'Фасады и городские легенды',tags:['architecture','history','culture'],minutes:55,walk:10,price:0,quiet:true},
 {id:'06',name:'Башня с часами',description:'Смотровая площадка в старом центре',tags:['architecture','history','views'],minutes:65,walk:12,price:250,quiet:false},
 {id:'07',name:'Типографский переулок',description:'Надписи, дворы и история книги',tags:['history','culture','streetart'],minutes:45,walk:9,price:0,quiet:true},
 {id:'08',name:'Открытая галерея',description:'Рисунки на стенах городских мастерских',tags:['culture','streetart','history'],minutes:50,walk:11,price:0,quiet:false},
 {id:'09',name:'Городской мурал',description:'Большая роспись во внутреннем дворе',tags:['streetart','architecture','culture'],minutes:35,walk:7,price:0,quiet:false},
 {id:'10',name:'Музейный двор',description:'Небольшая выставка под открытым небом',tags:['culture','history','quiet'],minutes:60,walk:12,price:300,quiet:true},
 {id:'11',name:'Тихая набережная',description:'Протяжённая дорожка вдоль воды',tags:['waterfront','quiet','nature','views'],minutes:65,walk:11,price:0,quiet:true},
 {id:'12',name:'Скамья под ивой',description:'Уединённый уголок у пруда',tags:['waterfront','quiet','nature'],minutes:35,walk:6,price:0,quiet:true},
 {id:'13',name:'Мост на закате',description:'Пешеходный переход с видом на реку',tags:['waterfront','views','architecture'],minutes:45,walk:13,price:0,quiet:false},
 {id:'14',name:'Лесная тропа',description:'Тенистая прогулка вдали от машин',tags:['nature','quiet','views'],minutes:80,walk:12,price:0,quiet:true},
 {id:'15',name:'Кафе в арке',description:'Небольшая кофейня в старом доме',tags:['coffee','architecture','history'],minutes:45,walk:8,price:440,quiet:true},
 {id:'16',name:'Завтрак на крыше',description:'Сытная пауза с видом на город',tags:['food','views','architecture'],minutes:60,walk:15,price:750,quiet:false},
 {id:'17',name:'Пекарня у театра',description:'Свежая выпечка рядом со сценой',tags:['food','culture','coffee'],minutes:45,walk:10,price:450,quiet:true},
 {id:'18',name:'Уличный гастрономический двор',description:'Несколько маленьких кухонь в одном месте',tags:['food','streetart','culture'],minutes:65,walk:12,price:550,quiet:false},
 {id:'19',name:'Киоск у пристани',description:'Перекус перед прогулкой вдоль реки',tags:['food','waterfront','views'],minutes:40,walk:8,price:380,quiet:false},
 {id:'20',name:'Чайный сад',description:'Спокойное место среди цветов',tags:['food','nature','quiet'],minutes:55,walk:9,price:490,quiet:true},
 {id:'21',name:'Квартал первых мастерских',description:'Старинные мастерские и современное искусство',tags:['history','architecture','streetart'],minutes:70,walk:12,price:0,quiet:false},
 {id:'22',name:'Площадка у каскада',description:'Вид на воду и зелёные склоны',tags:['views','waterfront','nature'],minutes:50,walk:14,price:0,quiet:true},
 {id:'23',name:'Литературная кофейня',description:'Книги, кофе и старые городские истории',tags:['coffee','culture','history','quiet'],minutes:60,walk:8,price:470,quiet:true},
 {id:'24',name:'Фудкорт во дворе',description:'Еда рядом с расписанными стенами',tags:['food','coffee','streetart'],minutes:55,walk:12,price:480,quiet:false},
 {id:'25',name:'Старая рыбная пристань',description:'История речного города на набережной',tags:['history','waterfront','architecture'],minutes:65,walk:15,price:0,quiet:true},
 {id:'26',name:'Галерея на холме',description:'Выставка с панорамным видом',tags:['culture','views','architecture'],minutes:65,walk:17,price:360,quiet:true}
];
const byId=Object.fromEntries(TOPICS.map(t=>[t.id,t]));
const $=id=>document.getElementById(id);
const field=$('field'),layer=$('node-layer'),svg=$('edges');
const savedPreview=$('result').innerHTML;
const mobile=()=>window.innerWidth<=650;
function defaultPositions(){
  const mobilePositions=[ [18,17],[50,16],[82,17],[18,31],[82,31],[18,45],[82,45],[18,59],[82,59],[50,72] ];
  return Object.fromEntries(TOPICS.map((t,i)=>[t.id,mobile()?{x:mobilePositions[i][0],y:mobilePositions[i][1]}:{x:t.x,y:t.y}]));
}
const state={positions:defaultPositions(),selected:null,parts:[],duration:240,quiet:false,budget:false,route:[]};
let lastMobile=mobile(),timer;
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function name(id){return byId[id]?.name||id;}
function key(a,b){return [a,b].sort().join('+');}
function toast(text){const el=$('toast');el.textContent=text;el.classList.add('visible');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('visible'),2600);}
function setHint(){
  const hint=$('field-hint');
  if(!state.parts.length){
    if(state.selected)hint.innerHTML=`<strong>${escapeHTML(name(state.selected))} выбрана</strong><span>Нажми на другую тему, чтобы соединить их</span>`;
    else hint.innerHTML='<strong>Нажми на две темы</strong><span>Или перетащи одну на другую</span>';
  } else {
    hint.innerHTML=`<strong>${escapeHTML(title())}</strong><span>Добавь ещё тему или нажми на выбранную, чтобы убрать её</span>`;
  }
  $('central-placeholder').hidden=state.parts.length>0;
}
function createNode(t){
  const p=state.positions[t.id];const btn=document.createElement('button');
  btn.type='button';btn.className='node'+(state.selected===t.id?' selected':'')+(state.parts.includes(t.id)?' part':'');btn.dataset.id=t.id;
  btn.style.left=p.x+'%';btn.style.top=p.y+'%';btn.style.setProperty('--node-color',t.color);
  btn.setAttribute('aria-pressed',String(state.parts.includes(t.id)||state.selected===t.id));
  btn.setAttribute('aria-label',`Интерес: ${t.name}. ${state.parts.includes(t.id)?'Убрать из созданного раздела':'Выбрать для создания раздела'}`);
  btn.innerHTML=`<span class="node-title">${escapeHTML(t.name)}</span>`;
  let drag=null;
  btn.addEventListener('pointerdown',ev=>{
    if(ev.pointerType==='mouse'&&ev.button!==0)return;
    drag={pointerId:ev.pointerId,startX:ev.clientX,startY:ev.clientY,origin:{...state.positions[t.id]},rect:field.getBoundingClientRect(),moved:false};
    btn.setPointerCapture(ev.pointerId);
  });
  btn.addEventListener('pointermove',ev=>{
    if(!drag||ev.pointerId!==drag.pointerId)return;
    const dx=ev.clientX-drag.startX,dy=ev.clientY-drag.startY;
    if(!drag.moved&&Math.hypot(dx,dy)<7)return;
    drag.moved=true;btn.classList.add('dragging');
    const px=Math.max(btn.offsetWidth/2+4,Math.min(drag.rect.width-btn.offsetWidth/2-4,drag.origin.x*drag.rect.width/100+dx));
    const py=Math.max(btn.offsetHeight/2+4,Math.min(drag.rect.height-btn.offsetHeight/2-4,drag.origin.y*drag.rect.height/100+dy));
    state.positions[t.id]={x:px/drag.rect.width*100,y:py/drag.rect.height*100};
    btn.style.left=state.positions[t.id].x+'%';btn.style.top=state.positions[t.id].y+'%';
    drawEdges();const target=dropTarget(t.id);
    layer.querySelectorAll('.node').forEach(node=>node.classList.toggle('drop-target',node.dataset.id===target));
  });
  const finish=ev=>{
    if(!drag||ev.pointerId!==drag.pointerId)return;
    const moved=drag.moved;const target=moved?dropTarget(t.id):null;
    drag=null;
    if(target){combine(t.id,target);return;}
    if(moved){renderNodes();toast('Тема перемещена — соедини её с другой');}
    else pick(t.id);
  };
  btn.addEventListener('pointerup',finish);
  btn.addEventListener('pointercancel',ev=>{if(drag&&ev.pointerId===drag.pointerId){drag=null;renderNodes();}});
  btn.addEventListener('click',ev=>{if(ev.detail===0)pick(t.id);});
  return btn;
}
function dropTarget(id){
  const src=layer.querySelector(`[data-id="${id}"]`);if(!src)return null;
  const a=src.getBoundingClientRect(),cx=a.left+a.width/2,cy=a.top+a.height/2;
  let closest=null,dist=Infinity;
  layer.querySelectorAll('.node').forEach(node=>{
    if(node.dataset.id===id)return;
    const b=node.getBoundingClientRect();const d=Math.hypot(cx-(b.left+b.width/2),cy-(b.top+b.height/2));
    if(d<Math.max(85,(a.width+b.width)*.59)&&d<dist){closest=node.dataset.id;dist=d;}
  });
  return closest;
}
function pick(id){
  if(state.parts.length){
    if(state.parts.includes(id)){
      state.parts=state.parts.filter(x=>x!==id);
      if(state.parts.length<2)state.parts=[];
      if(!state.parts.length)state.route=[];
      toast('Состав раздела изменён');render();return;
    }
    if(state.parts.length>=4){toast('В одном разделе максимум четыре темы. Убери одну, чтобы добавить другую.');return;}
    state.parts.push(id);state.selected=null;toast(`«${name(id)}» добавлена — раздел перестроен`);render();return;
  }
  if(state.selected===id){state.selected=null;render();return;}
  if(!state.selected){state.selected=id;render();toast(`«${name(id)}» выбрана. Нажми на вторую тему.`);return;}
  combine(state.selected,id);
}
function combine(a,b){
  if(a===b){pick(a);return;}
  if(state.parts.length){
    const added=[a,b].filter(id=>!state.parts.includes(id));
    state.parts=[...state.parts,...added].slice(0,4);
  }else{state.parts=[a,b];state.route=[];}
  state.selected=null;render();toast(`Новый раздел «${title()}» появился из связи`);
  if(mobile())$('result').scrollIntoView({behavior:'smooth',block:'start'});
}
function title(){
  if(!state.parts.length)return '';
  const pair=FUSIONS[key(state.parts[0],state.parts[1])];
  const first=pair?.[0]??`${name(state.parts[0])} и ${name(state.parts[1])}`;
  if(state.parts.length===2)return first;
  return `${first} + ${state.parts.slice(2).map(name).join(' + ')}`;
}
function description(){const pair=FUSIONS[key(state.parts[0],state.parts[1])];return pair?.[1]??'Новый раздел объединяет выбранные темы и предлагает несколько способов исследовать их вместе.';}
function drawEdges(){
  const w=field.clientWidth,h=field.clientHeight;if(!w||!h)return;
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
  let s='';
  for(const [a,b] of SUGGESTED){
    const p=state.positions[a],q=state.positions[b];
    const chosen=state.parts.includes(a)&&state.parts.includes(b);
    const active=(state.selected===a||state.selected===b)||chosen;
    s+=`<line class="edge${chosen?' edge-created':active?' edge-active':''}" x1="${w*p.x/100}" y1="${h*p.y/100}" x2="${w*q.x/100}" y2="${h*q.y/100}"/>`;
  }
  if(state.parts.length){
    for(const id of state.parts){const p=state.positions[id];s+=`<line class="edge edge-created" x1="${w*.5}" y1="${h*.49}" x2="${w*p.x/100}" y2="${h*p.y/100}"/>`;}
  }
  svg.innerHTML=s;
}
function renderNodes(){
  layer.replaceChildren(...TOPICS.map(createNode));drawEdges();
  const el=$('created-node');
  el.hidden=state.parts.length<2;
  if(state.parts.length>=2){
    el.innerHTML=`<span class="created-label">ТВОЯ СВЯЗЬ</span><span class="created-title">${escapeHTML(title())}</span><span class="created-more">Выбери ещё тему, чтобы изменить подборку</span><button type="button" id="break-apart">Разъединить всё ↶</button>`;
    $('break-apart').addEventListener('click',()=>{state.parts=[];state.selected=null;state.route=[];render();toast('Темы снова самостоятельны');});
  }
}
function matches(){
  if(state.parts.length<2)return[];
  const active=state.parts;
  return PLACES.map(p=>({...p,score:active.reduce((n,id)=>n+Number(p.tags.includes(id)),0)}))
    .filter(p=>p.score>0&&p.minutes+p.walk<=state.duration&&(!state.quiet||p.quiet)&&(!state.budget||p.price<=500))
    .sort((a,b)=>b.score-a.score||a.walk-b.walk||a.minutes-b.minutes).slice(0,5);
}
function renderResults(){
  const el=$('result');
  if(state.parts.length<2){el.innerHTML=savedPreview;bindPreview();return;}
  const items=matches();
  const buttons=items.map(p=>{
    const added=state.route.includes(p.id);
    return `<article class="place"><div class="place-top"><div><div class="place-name">${escapeHTML(p.name)}</div><div class="place-desc">${escapeHTML(p.description)}</div></div></div><div class="place-meta"><span>${p.minutes} мин</span><span>${p.price?p.price+' ₽':'Бесплатно'}</span></div><div class="place-action"><button type="button" data-add="${p.id}" class="${added?'added':''}">${added?'✓ В маршруте':'+ В маршрут'}</button></div></article>`;
  }).join('');
  el.innerHTML=`<h2 class="result-title">${escapeHTML(title())}<span class="dot">.</span></h2><p class="result-description">${escapeHTML(description())}</p><div class="created-formula">${state.parts.map((id,i)=>`${i?'<b>+</b>':''}<span>${escapeHTML(name(id))}</span>`).join('')}</div><p class="result-hint">Добавь ещё одну тему — и подборка изменится.</p><div class="matches-head"><strong>Подходящие остановки</strong><small>${items.length} ${items.length===1?'место':items.length<5?'места':'мест'}</small></div>${buttons||'<div class="no-matches">Для этих условий пока нет подходящих точек. Попробуй увеличить время или убрать ограничение.</div>'}<p class="preview-footnote">Места, цены и время приведены для примера.</p>`;
  el.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>togglePlace(b.dataset.add)));
}
function bindPreview(){const b=$('preview-cta');if(b)b.addEventListener('click',showExample);}
function renderControls(){
  document.querySelectorAll('[data-duration]').forEach(b=>{const on=Number(b.dataset.duration)===state.duration;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));});
  for(const [id,value] of [['quiet',state.quiet],['budget',state.budget]]){$(id).classList.toggle('on',value);$(id).setAttribute('aria-pressed',String(value));}
}
function togglePlace(id){
  state.route=state.route.includes(id)?state.route.filter(x=>x!==id):[...state.route,id];renderResults();renderRoute();
  toast(state.route.includes(id)?'Остановка добавлена в маршрут':'Остановка удалена из маршрута');
}
function renderRoute(){
  const el=$('route');el.hidden=state.parts.length<2;if(state.parts.length<2)return;
  const chosen=state.route.map(id=>PLACES.find(p=>p.id===id)).filter(Boolean),total=chosen.reduce((s,p)=>s+p.minutes+p.walk,0),cost=chosen.reduce((s,p)=>s+p.price,0);
  el.innerHTML=`<div class="route-title"><strong>Мой маршрут</strong><span>${chosen.length} остановок</span></div>${chosen.length?chosen.map((p,i)=>`<div class="route-item"><span>${i+1}. ${escapeHTML(p.name)}</span><button type="button" aria-label="Убрать ${escapeHTML(p.name)}" data-remove="${p.id}">×</button></div>`).join(''):'<p class="route-empty">Добавляй остановки выше: они соберутся здесь, без отдельной страницы.</p>'}<div class="route-total"><span>Примерно ${total} мин</span><span>${cost} ₽</span></div>${total>state.duration?'<p class="route-warning">Время остановок превышает выбранный лимит.</p>':''}<button class="export" id="export" type="button" ${chosen.length?'':'disabled'}>Скачать маршрут ↗</button>`;
  el.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>togglePlace(b.dataset.remove)));
  $('export').addEventListener('click',exportRoute);
}
function exportRoute(){
  const chosen=state.route.map(id=>PLACES.find(p=>p.id===id)).filter(Boolean);if(!chosen.length)return;
  const text=['СДВИГ — мой маршрут','Места и значения приведены для примера.',`Раздел: ${title()}`,`Выбранные темы: ${state.parts.map(name).join(' + ')}`,`Время: ${state.duration/60} ч. Без шума: ${state.quiet?'да':'нет'}. До 500 ₽: ${state.budget?'да':'нет'}.`,'',...chosen.map((p,i)=>`${i+1}. ${p.name} — ${p.minutes} мин, ≈ ${p.walk} мин условного пути, ${p.price} ₽`),'','Места и время условные.'].join('\n');
  const url=URL.createObjectURL(new Blob(['\uFEFF',text],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='СДВИГ-мой-маршрут.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
  toast('Маршрут сохранён');
}
function render(){renderNodes();renderControls();renderResults();renderRoute();setHint();}
function showExample(){state.parts=['nature','coffee'];state.selected=null;state.route=[];state.positions=defaultPositions();render();toast('Природа + Кофе → Кофе с видом');if(mobile())$('result').scrollIntoView({behavior:'smooth',block:'start'});}
function reset(){state.parts=[];state.selected=null;state.route=[];state.positions=defaultPositions();state.duration=240;state.quiet=false;state.budget=false;render();toast('Пространство очищено');}
$('example').addEventListener('click',showExample);$('reset').addEventListener('click',reset);
document.querySelectorAll('[data-duration]').forEach(b=>b.addEventListener('click',()=>{state.duration=Number(b.dataset.duration);render();toast('Условия изменены — результаты перестроены');}));
$('quiet').addEventListener('click',()=>{state.quiet=!state.quiet;render();toast('Условие «Тише» изменено');});
$('budget').addEventListener('click',()=>{state.budget=!state.budget;render();toast('Бюджет изменён — результаты перестроены');});
if('ResizeObserver' in window)new ResizeObserver(()=>drawEdges()).observe(field);else window.addEventListener('resize',drawEdges);
window.addEventListener('resize',()=>{const now=mobile();if(now!==lastMobile){lastMobile=now;state.positions=defaultPositions();render();}});
render();
