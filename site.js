(function(){
 var q=document.getElementById('q'),r=document.getElementById('res');
 var n=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
 q.addEventListener('input',function(){var v=n(q.value.trim());if(!v){r.style.display='none';return}
  var h=INDEX.map(function(p){var t=n(p.t),x=n(p.x);return{p:p,s:t===v?0:t.indexOf(v)===0?1:t.indexOf(v)>=0?2:x.indexOf(v)>=0?3:9}}).filter(a=>a.s<9).sort((a,b)=>a.s-b.s).slice(0,10);
  r.innerHTML=h.map(a=>'<a href="'+a.p.u+'">'+a.p.t+'<small>'+a.p.x.slice(0,80)+'</small></a>').join('')||'<a>No results</a>';r.style.display='block'});
 document.addEventListener('click',e=>{if(!e.target.closest('.search'))r.style.display='none'});
 if(innerWidth<820){var m=document.querySelector('.menu');if(m)m.removeAttribute('open')}
 document.querySelectorAll('table.sortable').forEach(function(t){t.querySelectorAll('th').forEach(function(th,i){th.style.cursor='pointer';th.onclick=function(){
  var b=t.tBodies[0]||t,rows=[].slice.call(t.rows).slice(1),d=th.dataset.d=th.dataset.d==='1'?'-1':'1';
  rows.sort(function(a,c){var x=a.cells[i].textContent.trim(),y=c.cells[i].textContent.trim(),nx=parseFloat(x.replace(',','.')),ny=parseFloat(y.replace(',','.'));
   return(isNaN(nx)||isNaN(ny)?x.localeCompare(y):nx-ny)*d});rows.forEach(r=>b.appendChild(r))}})});
})();
