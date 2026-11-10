'use strict';
/* СДВИГ v0.4. Статический сайт без API-ключей и отслеживания пользователя. */
const TOPICS = [
  {id:'nature',name:'Природа',caption:'зелёные места',paper:'#e6eccb',x:39,y:16,mx:82,my:10,angle:3},
  {id:'coffee',name:'Кофе',caption:'пауза в пути',paper:'#f5dcaf',x:17,y:18,mx:18,my:10,angle:-4},
  {id:'views',name:'Виды',caption:'посмотреть вокруг',paper:'#d9e4ec',x:65,y:16,mx:18,my:23,angle:-3},
  {id:'architecture',name:'Архитектура',caption:'городские линии',paper:'#f1dfd7',x:84,y:23,mx:82,my:23,angle:4},
  {id:'history',name:'История',caption:'следы времени',paper:'#f8e8bd',x:14,y:43,mx:18,my:37,angle:2},
  {id:'waterfront',name:'У воды',caption:'вдоль реки',paper:'#d5e6e2',x:86,y:47,mx:82,my:37,angle:-5},
  {id:'culture',name:'Культура',caption:'искусство рядом',paper:'#eadfe8',x:16,y:72,mx:18,my:66,angle:-3},
  {id:'streetart',name:'Стрит-арт',caption:'искусство улиц',paper:'#f2dbcb',x:38,y:83,mx:82,my:66,angle:3},
  {id:'food',name:'Еда',caption:'местный вкус',paper:'#f4e7c4',x:63,y:82,mx:18,my:80,angle:-3},
  {id:'quiet',name:'Тишина',caption:'сбавить темп',paper:'#dfe7cd',x:85,y:75,mx:82,my:80,angle:4}
];
const FUSIONS={
 'coffee+nature':['Кофе и зелёные паузы','Чередуй небольшие городские кофейные остановки с парками и прогулками.'],
 'architecture+history':['Город с историей','Фасады, памятники и места, где прошлое города остаётся рядом.'],
 'coffee+views':['Пауза с видом','Подбери место для кофе и точку, откуда приятно смотреть на Уфу.'],
 'nature+views':['Свободный горизонт','Зелёные пространства и открытые виды без суеты.'],
 'quiet+waterfront':['Тихие берега','Прогулка поближе к воде и подальше от спешки.'],
 'architecture+coffee':['Кофе среди фасадов','Смотри на центр города и делай паузы в городских пространствах.'],
 'culture+streetart':['Искусство на улице','От культурных пространств к искусству в городской среде.'],
 'nature+waterfront':['Вдоль зелёного берега','Набережные, скверы и дорожки с видом на реку.'],
 'food+history':['Истории и вкус','Прогулка через исторический центр с остановкой на еду.'],
 'culture+history':['Живая память','Музеи, памятники и культурные места старой Уфы.'],
 'food+coffee':['Неспешный перекус','Найди городские места, где можно остановиться, перекусить и продолжить прогулку.'],
 'quiet+nature':['Тихий маршрут','Зелёные уголки, где хочется задержаться подольше.']
};
// Редакционная подборка реальных объектов Уфы. Это не ответы API, здесь нет выдуманных цен или часов.
const PLACES=[
 {id:'art',name:'Арт-Квадрат',address:'ул. Чернышевского, 88',desc:'Творческий квартал с дворами, кафе и городскими событиями.',tags:['coffee','food','culture','streetart','architecture'],quiet:false},
 {id:'gostiny',name:'Гостиный двор',address:'Верхнеторговая площадь, 1',desc:'Исторические торговые ряды и возможность сделать гастрономическую остановку.',tags:['coffee','food','history','architecture'],quiet:false},
 {id:'aksakov',name:'Сад им. С. Т. Аксакова',address:'ул. Пушкина, 112/2',desc:'Небольшой исторический парк с прудом в старой части города.',tags:['nature','quiet','history','views'],quiet:true},
 {id:'salavatgarden',name:'Сад Салавата Юлаева',address:'ул. Салавата',desc:'Прогулочные дорожки, зелень и виды в сторону Белой.',tags:['nature','quiet','views','waterfront','history'],quiet:true},
 {id:'riverside',name:'Набережная реки Белой',address:'ул. Набережная',desc:'Пространство для прогулки вдоль реки и открытого горизонта.',tags:['nature','views','waterfront'],quiet:false},
 {id:'salavat',name:'Памятник Салавату Юлаеву',address:'площадь Салавата Юлаева',desc:'Знаковый монумент Уфы и панорама над рекой.',tags:['history','architecture','views','culture','waterfront'],quiet:false},
 {id:'toratau',name:'Конгресс-холл «Торатау»',address:'ул. Заки Валиди, 2',desc:'Современная архитектура и прогулочная зона рядом с рекой.',tags:['architecture','culture','views','waterfront'],quiet:false},
 {id:'friendship',name:'Монумент Дружбы',address:'ул. Сочинская',desc:'Монумент над Белой, связанный с историей города.',tags:['history','views','architecture','waterfront'],quiet:false},
 {id:'opera',name:'Театр оперы и балета',address:'ул. Ленина, 5/1',desc:'Исторический театр и архитектура центра Уфы.',tags:['architecture','history','culture'],quiet:false},
 {id:'museum',name:'Музей им. М. В. Нестерова',address:'ул. Гоголя, 27',desc:'Художественный музей в исторической городской среде.',tags:['culture','history','architecture','quiet'],quiet:true},
 {id:'sevend',name:'Фонтан «Семь девушек»',address:'Театральный сквер, ул. Ленина',desc:'Городская скульптурная композиция в центре.',tags:['culture','history','views'],quiet:false},
 {id:'national',name:'Национальный музей РБ',address:'ул. Советская, 14',desc:'Музей, посвящённый истории, природе и культуре Башкортостана.',tags:['history','culture','nature'],quiet:true},
 {id:'sofyushka',name:'Софьюшкина аллея',address:'ул. Тукаева',desc:'Историческая аллея для неспешной прогулки.',tags:['nature','history','quiet','architecture'],quiet:true},
 {id:'victory',name:'Парк Победы',address:'ул. Комарова, 7',desc:'Мемориальное парковое пространство на Дежнёвской горе.',tags:['nature','history','views','quiet'],quiet:true},
 {id:'kurai',name:'Фонтан «Курай»',address:'площадь Салавата Юлаева',desc:'Фонтан и городская прогулочная площадь рядом с «Торатау».',tags:['culture','views','waterfront'],quiet:false}
];
const $=id=>document.getElementById(id);
const byId=Object.fromEntries(TOPICS.map(t=>[t.id,t]));
const isMobile=()=>window.matchMedia('(max-width:650px)').matches;
const posDefault=()=>Object.fromEntries(TOPICS.map(t=>[t.id,{x:isMobile()?t.mx:t.x,y:isMobile()?t.my:t.y}]));
const state={positions:posDefault(),selected:null,parts:[],route:[],limit:3,slow:false};
let lastMobile=isMobile(),toastTimer,dragSuppress=false,prevPartsKey='';
function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function topicName(id){return byId[id]?.name||'';}
function pairKey(a,b){return [a,b].sort().join('+');}
function title(){
 if(state.parts.length<2)return '';
 const pair=FUSIONS[pairKey(state.parts[0],state.parts[1])];
 const base=pair?pair[0]:`${topicName(state.parts[0])} и ${topicName(state.parts[1])}`;
 return state.parts.length>2?base+' + '+state.parts.slice(2).map(topicName).join(' + '):base;
}
function description(){return FUSIONS[pairKey(state.parts[0],state.parts[1])]?.[1]||'Новая тема объединяет выбранные интересы — местам больше не нужно жить в отдельных категориях.';}
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2500);}
function renderNotes(){
 const layer=$('notes');const focusedId=document.activeElement?.dataset?.id;layer.replaceChildren(...TOPICS.map(t=>{
  const p=state.positions[t.id];const b=document.createElement('button');b.type='button';
  b.className='idea'+(state.selected===t.id?' is-selected':'')+(state.parts.includes(t.id)?' is-part':'');
  b.dataset.id=t.id;b.style.left=p.x+'%';b.style.top=p.y+'%';b.style.setProperty('--rotate',t.angle+'deg');b.style.setProperty('--note-color',t.paper);
  b.setAttribute('aria-pressed',String(state.parts.includes(t.id)||state.selected===t.id));
  b.setAttribute('aria-label',t.name+(state.parts.includes(t.id)?', убрать из связи':', выбрать для связи'));
  b.innerHTML=`<span class="idea-name">${safe(t.name)}</span><span class="idea-caption">${safe(t.caption)}</span>`;
  let drag=null;
  b.addEventListener('pointerdown',ev=>{
   // The touch layout uses large tap targets; dragging is desktop-only.
   if(isMobile()||(ev.pointerType==='mouse'&&ev.button!==0))return;
   const box=$('board').getBoundingClientRect();
   drag={id:ev.pointerId,sx:ev.clientX,sy:ev.clientY,p:{...state.positions[t.id]},box,moved:false};
   try{b.setPointerCapture(ev.pointerId);}catch{}
  });
  b.addEventListener('pointermove',ev=>{
   if(!drag||drag.id!==ev.pointerId)return;
   const dx=ev.clientX-drag.sx,dy=ev.clientY-drag.sy;
   if(!drag.moved&&Math.hypot(dx,dy)<7)return;
   drag.moved=true;b.classList.add('is-dragging');
   const x=Math.max(b.offsetWidth/2+3,Math.min(drag.box.width-b.offsetWidth/2-3,drag.p.x*drag.box.width/100+dx));
   const y=Math.max(b.offsetHeight/2+3,Math.min(drag.box.height-b.offsetHeight/2-3,drag.p.y*drag.box.height/100+dy));
   state.positions[t.id]={x:x/drag.box.width*100,y:y/drag.box.height*100};
   b.style.left=state.positions[t.id].x+'%';b.style.top=state.positions[t.id].y+'%';
   const target=findTarget(t.id);
   layer.querySelectorAll('.is-target').forEach(el=>el.classList.remove('is-target'));
   if(target)layer.querySelector(`[data-id="${target}"]`)?.classList.add('is-target');
   drawThreads();
  });
  const finish=ev=>{
   if(!drag||drag.id!==ev.pointerId)return;
   const moved=drag.moved;drag=null;
   if(!moved)return;
   dragSuppress=true;
   const target=findTarget(t.id);
   if(target){combine(t.id,target);}else{renderNotes();toast('Заметка передвинута. Свяжи её с другой.');}
   // A synthetic click may follow pointerup on some browsers.
   setTimeout(()=>{dragSuppress=false;},0);
  };
  b.addEventListener('pointerup',finish);
  b.addEventListener('pointercancel',ev=>{if(drag&&ev.pointerId===drag.id){drag=null;renderNotes();}});
  b.addEventListener('click',()=>{if(!dragSuppress)pick(t.id);});
  return b;
 }));
 drawThreads();renderCentral();
 if(focusedId)layer.querySelector(`[data-id="${focusedId}"]`)?.focus({preventScroll:true});
 updateMobileUI();
}
function findTarget(id){
 const mine=$('notes').querySelector(`[data-id="${id}"]`);if(!mine)return null;
 const a=mine.getBoundingClientRect(),cx=a.left+a.width/2,cy=a.top+a.height/2;
 let best=null,min=Infinity;
 $('notes').querySelectorAll('.idea').forEach(n=>{
  if(n.dataset.id===id)return;
  const r=n.getBoundingClientRect(),d=Math.hypot(cx-r.left-r.width/2,cy-r.top-r.height/2);
  if(d<Math.max(74,(a.width+r.width)*.56)&&d<min){min=d;best=n.dataset.id;}
 });
 return best;
}
function pick(id){
 if(state.parts.length>=2){
  if(state.parts.includes(id)){
   state.parts=state.parts.filter(v=>v!==id);
   if(state.parts.length<2){state.parts=[];state.route=[];}
   state.selected=null;render();toast('Связь изменилась');return;
  }
  if(state.parts.length>=4){toast('В одной связи может быть до четырёх идей');return;}
  state.parts.push(id);state.selected=null;render();toast('Добавили «'+topicName(id)+'» — подборка изменилась');return;
 }
 if(state.selected===id){state.selected=null;renderNotes();return;}
 if(state.selected){combine(state.selected,id);return;}
 state.selected=id;renderNotes();$('board-foot').textContent='Теперь выбери вторую идею';
}
function combine(a,b){
 if(a===b){pick(a);return;}
 if(!state.parts.length){state.parts=[a,b];state.route=[];}
 else{state.parts=[...new Set([...state.parts,a,b])].slice(0,4);}
 state.selected=null;render();toast('Новая связь: '+title());
 if(isMobile())setTimeout(()=>$('central-card').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'}),180);
}
function drawThreads(){
 const board=$('board'),svg=$('threads'),w=board.clientWidth,h=board.clientHeight;
 if(!w||!h)return;
 svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
 if(state.parts.length<2){svg.replaceChildren();prevPartsKey='';return;}
 const threadKey=state.parts.join('|');const newConnection=threadKey!==prevPartsKey;prevPartsKey=threadKey;
 const b=board.getBoundingClientRect();
 const cr=$('central-card').getBoundingClientRect();
 const center=isMobile()?{x:cr.left-b.left+cr.width/2,y:cr.top-b.top+18}:{x:w*.5,y:h*.5};
 const markup=state.parts.map((id,i)=>{
  let x,y;
  if(isMobile()){
   const el=$('notes').querySelector(`[data-id="${id}"]`);
   if(!el)return '';
   const r=el.getBoundingClientRect();
   x=r.left-b.left+r.width/2;y=r.top-b.top+r.height/2;
  }else{
   const p=state.positions[id];x=p.x*w/100;y=p.y*h/100;
  }
  const mid={x:(x+center.x)/2,y:(y+center.y)/2+(isMobile()?0:Math.sin(i*2.5)*10)};
  const d=`M ${x.toFixed(1)} ${y.toFixed(1)} Q ${mid.x.toFixed(1)} ${mid.y.toFixed(1)} ${center.x.toFixed(1)} ${center.y.toFixed(1)}`;
  return `<path class="thread-shadow" d="${d}"/><path class="thread-line${newConnection?' new-thread':''}" d="${d}"/><circle class="thread-dot" cx="${x}" cy="${y}" r="4"/>`;
 }).join('');
 svg.innerHTML=markup;
}
function renderCentral(){
 const el=$('central-card');
 el.classList.toggle('has-fusion',state.parts.length>=2);
 if(state.parts.length<2){el.innerHTML=`<div class="central-pin" aria-hidden="true"></div><div class="central-empty"><span class="central-overline">ТВОЯ ПЕРВАЯ СВЯЗЬ</span><strong>Соедини две<br>идеи</strong><span>Здесь появится новая тема — твоя собственная.</span></div>`;
  $('board-foot').textContent=state.selected?'Выбрано: '+topicName(state.selected)+'. Теперь вторая идея.':'Все начинается с двух стикеров';return;
 }
 el.innerHTML=`<div class="central-pin" aria-hidden="true"></div><span class="fusion-overline">НОВАЯ ТЕМА</span><div class="fusion-title">${safe(title())}</div><div class="fusion-combo">${state.parts.map((id,i)=>`${i?'<b>+</b>':''}<span>${safe(topicName(id))}</span>`).join('')}</div><button id="break-connection" type="button" class="fusion-remove">Разъединить нить ↶</button>`;
 $('break-connection').addEventListener('click',()=>{state.parts=[];state.selected=null;state.route=[];render();toast('Нити убраны');});
 $('board-foot').textContent='Добавь к связи ещё одну тему — подборка изменится';
}
function suggestions(){
 if(state.parts.length<2)return [];
 const base=PLACES.map(p=>{
  const hits=state.parts.filter(id=>p.tags.includes(id));
  return {...p,hits,score:hits.length*12+(state.slow&&p.quiet?5:0)};
 }).filter(p=>p.hits.length>0);
 base.sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name,'ru'));
 // Coverage: the suggestions should reflect every selected idea, not just one generic tag.
 const chosen=[];
 for(const id of state.parts){const next=base.find(p=>p.hits.includes(id)&&!chosen.some(x=>x.id===p.id));if(next)chosen.push(next);}
 for(const p of base){if(chosen.length>=6)break;if(!chosen.some(x=>x.id===p.id))chosen.push(p);}
 return chosen.slice(0,6);
}
function mapLink(p){return 'https://yandex.ru/maps/?text='+encodeURIComponent('Уфа, '+p.name+', '+p.address);}
function renderResults(){
 const el=$('results');
 if(state.parts.length<2){el.innerHTML=`<div class="blank-note"><span class="note-kicker">ПОКА ЧИСТЫЙ ЛИСТ</span><h2>Город — это<br>не только точки<br>на карте.</h2><p>Попробуй связать два интереса. Мы покажем настоящие места Уфы, которые могут стать началом твоего маршрута.</p><div class="example-handdrawn" aria-hidden="true"><span>природа</span><i></i><span>кофе</span></div></div>`;return;}
 const candidates=suggestions();
 el.innerHTML=`<span class="result-overline">ИЗ ТВОИХ ИДЕЙ ПОЛУЧИЛОСЬ</span><h2 class="result-title">${safe(title())}</h2><p class="result-description">${safe(description())}</p><div class="formula">${state.parts.map((id,i)=>`${i?'<b>+</b>':''}<span>${safe(topicName(id))}</span>`).join('')}</div><div class="places-heading"><h3>Можно заглянуть</h3><small>${candidates.length} мест</small></div>${candidates.map(p=>`<article class="place"><div class="place-top"><span class="place-marker" aria-hidden="true"></span><div><div class="place-name">${safe(p.name)}</div><div class="place-address">${safe(p.address)}</div><p class="place-desc">${safe(p.desc)}</p></div></div><div class="place-links"><button type="button" data-add="${p.id}" class="${state.route.includes(p.id)?'is-added':''}">${state.route.includes(p.id)?'✓ В твоём маршруте':'+ Прикрепить к маршруту'}</button><a href="${safe(mapLink(p))}" target="_blank" rel="noopener noreferrer" aria-label="Посмотреть ${safe(p.name)} в Яндекс Картах">На карте ↗</a></div></article>`).join('')||'<p class="no-matches">Для этих тем пока нет мест. Попробуй другую связь.</p>'}<p class="next-step">Нажми на другой стикер — новая тема и подборка изменятся вместе.</p>`;
 el.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>togglePlace(b.dataset.add)));
}
function togglePlace(id){
 if(state.route.includes(id))state.route=state.route.filter(p=>p!==id);
 else if(state.route.length>=state.limit){toast('Ты выбрал '+state.limit+' остановки. Увеличь лимит или убери одну.');return;}
 else state.route.push(id);
 renderResults();renderRoute();toast(state.route.includes(id)?'Остановка прикреплена к маршруту':'Остановка откреплена');
}
function routeText(){
 return ['СДВИГ — прогулка по Уфе',`Тема: ${title()}`,`Интересы: ${state.parts.map(topicName).join(' + ')}`,'',...state.route.map((id,i)=>{const p=PLACES.find(x=>x.id===id);return `${i+1}. ${p.name}\n   ${p.address}\n   ${mapLink(p)}`;}),'','Маршрут составлен вручную. Проверьте дорогу и актуальные условия посещения в картах.'].join('\n');
}
function renderRoute(){
 const el=$('route');el.hidden=state.parts.length<2;
 if(el.hidden)return;
 const chosen=state.route.map(id=>PLACES.find(p=>p.id===id)).filter(Boolean);
 el.innerHTML=`<div class="route-head"><h3>Твой маршрут</h3><span>${chosen.length} из ${state.limit}</span></div>${chosen.length?`<ol class="route-list">${chosen.map((p,i)=>`<li class="route-stop"><span class="route-bullet">${i+1}.</span><span class="route-stop-name">${safe(p.name)}</span><button type="button" data-remove="${p.id}" aria-label="Убрать ${safe(p.name)} из маршрута">×</button></li>`).join('')}</ol>`:'<p class="route-empty">Прикрепляй места выше. Они останутся здесь, даже если поменяешь интересы на доске.</p>'}<div class="route-actions"><button type="button" id="save-route" ${chosen.length?'':'disabled'}>Скачать маршрут ↗</button><button type="button" id="copy-route" class="outline" ${chosen.length?'':'disabled'}>Копировать</button></div>`;
 el.querySelectorAll('[data-remove]').forEach(b=>b.addEventListener('click',()=>togglePlace(b.dataset.remove)));
 $('save-route').addEventListener('click',saveRoute);$('copy-route').addEventListener('click',copyRoute);
}
function saveRoute(){
 if(!state.route.length)return;
 const blob=new Blob(['\ufeff'+routeText()],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='СДВИГ-маршрут-Уфа.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),6000);toast('Маршрут сохранён в файле');
}
async function copyRoute(){
 if(!state.route.length)return;
 try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(routeText());else{
  const input=document.createElement('textarea');input.value=routeText();input.style.position='fixed';input.style.opacity='0';document.body.appendChild(input);input.select();if(!document.execCommand('copy'))throw new Error('copy failed');input.remove();
 }toast('Маршрут скопирован');}catch{toast('Не удалось скопировать. Скачай маршрут файлом.');}
}
function renderControls(){
 document.querySelectorAll('[data-limit]').forEach(b=>{const on=Number(b.dataset.limit)===state.limit;b.classList.toggle('is-on',on);b.setAttribute('aria-pressed',String(on));});
 $('slow-mode').classList.toggle('is-on',state.slow);$('slow-mode').setAttribute('aria-pressed',String(state.slow));
}
function updateMobileUI(){
 const guide=$('mobile-guidance'),go=$('mobile-go-results');
 go.disabled=state.parts.length<2;
 if(state.parts.length>=2)guide.textContent='Нить соединена. Коснись ещё одного стикера, чтобы дополнить прогулку.';
 else if(state.selected)guide.textContent='Выбрано «'+topicName(state.selected)+'». Теперь коснись второго стикера.';
 else guide.textContent='Коснись двух стикеров — они соединятся красной нитью.';
}
function render(){renderNotes();renderResults();renderRoute();renderControls();updateMobileUI();}

function example(){state.parts=['nature','coffee'];state.selected=null;state.route=[];state.positions=posDefault();render();toast('Природа и кофе связаны красной нитью');if(isMobile())setTimeout(()=>$('central-card').scrollIntoView({behavior:'smooth',block:'center'}),100);}
function reset(){state.parts=[];state.selected=null;state.route=[];state.positions=posDefault();state.limit=3;state.slow=false;render();toast('Доска очищена');}
$('start-example').addEventListener('click',example);
$('reset-all').addEventListener('click',reset);
$('mobile-go-board').addEventListener('click',()=>{$('board').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
$('mobile-go-results').addEventListener('click',()=>{if(state.parts.length>=2)$('notebook').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});});
document.querySelectorAll('[data-limit]').forEach(b=>b.addEventListener('click',()=>{state.limit=Number(b.dataset.limit);if(state.route.length>state.limit){state.route=state.route.slice(0,state.limit);toast('Лишние остановки убраны');}renderControls();renderRoute();}));
$('slow-mode').addEventListener('click',()=>{state.slow=!state.slow;renderControls();renderResults();toast(state.slow?'Спокойные места выше в подборке':'Показаны разные варианты');});
if('ResizeObserver' in window)new ResizeObserver(()=>drawThreads()).observe($('board'));else window.addEventListener('resize',drawThreads);
window.addEventListener('resize',()=>{const n=isMobile();if(n!==lastMobile){lastMobile=n;state.positions=posDefault();renderNotes();}});
render();
