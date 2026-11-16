(function(){
 'use strict';
 var d=document,B=d.body;
 var q=d.getElementById('q'),r=d.getElementById('res');
 var n=function(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase()};

 /* ---- page context: accent colours are driven by section + page slug ---- */
 var pg=(location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'')||'index';
 var kick=d.querySelector('main .kicker');
 if(kick&&kick.textContent.trim())B.setAttribute('data-sec',kick.textContent.trim());
 B.setAttribute('data-pg',pg);

 /* ---- search ---- */
 if(q&&r&&typeof INDEX!=='undefined'){
  q.addEventListener('input',function(){var v=n(q.value.trim());if(!v){r.style.display='none';return}
   var h=INDEX.map(function(p){var t=n(p.t),x=n(p.x);return{p:p,s:t===v?0:t.indexOf(v)===0?1:t.indexOf(v)>=0?2:x.indexOf(v)>=0?3:9}}).filter(function(a){return a.s<9}).sort(function(a,b){return a.s-b.s}).slice(0,10);
   r.innerHTML=h.map(function(a){return '<a href="'+a.p.u+'">'+a.p.t+'<small>'+a.p.x.slice(0,80)+'</small></a>'}).join('')||'<a>No results</a>';r.style.display='block'});
  d.addEventListener('click',function(e){if(!e.target.closest('.search'))r.style.display='none'});
  q.addEventListener('keydown',function(e){if(e.key==='Enter'){var a=r.querySelector('a[href]');if(a)location.href=a.getAttribute('href')}if(e.key==='Escape'){r.style.display='none';q.blur()}});
  d.addEventListener('keydown',function(e){if((e.key==='/'||(e.key==='k'&&(e.ctrlKey||e.metaKey)))&&!/input|textarea/i.test((d.activeElement||{}).tagName||'')){e.preventDefault();q.focus();q.select()}});
 }

 /* ---- sidebar: open the group that holds the current page ---- */
 var side=d.querySelector('.side');
 if(side){
  var menu=side.querySelector('details.menu');if(menu)menu.setAttribute('open','');
  [].forEach.call(side.querySelectorAll('details details'),function(g){
   var has=!!g.querySelector('li a[href="'+pg+'.html"]');
   if(has){g.setAttribute('open','');g.classList.add('has-cur');var li=g.querySelector('li a[href="'+pg+'.html"]').parentNode;li.classList.add('cur')}
   else if(kick&&g.querySelector('summary')&&n(g.querySelector('summary').textContent)===n(kick.textContent.trim()))g.setAttribute('open','');
   else g.removeAttribute('open');
  });
  var cur=side.querySelector('li.cur');if(cur&&cur.scrollIntoView&&side.scrollHeight>side.clientHeight){side.scrollTop=Math.max(0,cur.offsetTop-side.clientHeight/3)}
 }
 /* mobile drawer */
 var bg=d.querySelector('.burger');
 if(bg){var sc=d.createElement('div');sc.className='scrim';B.appendChild(sc);
  var tog=function(f){B.classList.toggle('nav-open',f);bg.setAttribute('aria-expanded',B.classList.contains('nav-open'))};
  bg.addEventListener('click',function(){tog()});sc.addEventListener('click',function(){tog(false)});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')tog(false)});
  if(side)side.addEventListener('click',function(e){if(e.target.closest('li a'))tog(false)});}

 /* ---- top nav active state ---- */
 var secMap={'Bosses':'bosses.html','Dragons':'dragons.html','Hostile Creatures':'hostile-creatures.html','NPCs':'npcs.html','Items':'items.html','Structures':'structures.html','World':'structures.html','Guides':'getting-started.html','Lore':'lore.html'};
 if(kick){var tgt=secMap[kick.textContent.trim()];[].forEach.call(d.querySelectorAll('.topnav a'),function(a){if(a.getAttribute('href')===tgt)a.classList.add('on')})}

 /* ---- sortable tables ---- */
 [].forEach.call(d.querySelectorAll('table.sortable'),function(t){[].forEach.call(t.querySelectorAll('th'),function(th,i){th.onclick=function(){
  var b=t.tBodies[0]||t,rows=[].slice.call(t.rows).slice(1),dir=th.dataset.d=th.dataset.d==='1'?'-1':'1';
  rows.sort(function(a,c){var x=a.cells[i].textContent.trim(),y=c.cells[i].textContent.trim(),nx=parseFloat(x.replace(',','.')),ny=parseFloat(y.replace(',','.'));
   return(isNaN(nx)||isNaN(ny)?x.localeCompare(y):nx-ny)*dir});rows.forEach(function(r){b.appendChild(r)})}})});

 /* ---- right rail: "On this page" ---- */
 var main=d.querySelector('main'),lay=d.querySelector('.layout');
 if(main&&lay){
  var hs=[].slice.call(main.querySelectorAll('h2[id]'));
  if(hs.length>=3){
   var rail=d.createElement('nav');rail.className='toc-rail';rail.setAttribute('aria-label','On this page');
   rail.innerHTML='<h4>On this page</h4>'+hs.map(function(h){return '<a href="#'+h.id+'">'+h.textContent+'</a>'}).join('');
   lay.appendChild(rail);
   var links=[].slice.call(rail.querySelectorAll('a'));
   if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-90px 0px -70% 0px'});
    hs.forEach(function(h){io.observe(h)});
   }
  }
 }

 /* ---- back to top ---- */
 var tt=d.querySelector('.totop');
 if(tt){tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
  var onS=function(){tt.classList.toggle('on',window.scrollY>600)};window.addEventListener('scroll',onS,{passive:true});onS()}

 /* ---- card spotlight + reveal ---- */
 [].forEach.call(d.querySelectorAll('.card'),function(c){c.addEventListener('pointermove',function(e){var b=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-b.left)+'px')})});
 var rv=[].slice.call(d.querySelectorAll('.stats>div,.card,.gal,.aviso,.tw,.craft'));
 if('IntersectionObserver' in window){
  var o2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');o2.unobserve(e.target)}})},{rootMargin:'0px 0px -6% 0px'});
  rv.forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%6)*45+'ms';o2.observe(el)});
 }
})();
