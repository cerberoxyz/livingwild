/* LivingWild Wiki — 3D viewer (WebGL, no dependencies). Renders the mod's real GeckoLib models baked into models/*.js */
(function(){
'use strict';
var MODELS={},WAIT={};
window.LW3D={reg:function(n,d){MODELS[n]=d;var w=WAIT[n]||[];WAIT[n]=[];w.forEach(function(f){f(d)})}};
function need(n,cb,err){
  if(MODELS[n]) return cb(MODELS[n]);
  var first=!WAIT[n]; (WAIT[n]=WAIT[n]||[]).push(cb);
  if(first){var s=document.createElement('script');s.src='models/'+n+'.js';s.onerror=function(){err&&err()};document.head.appendChild(s)}
}
function mul(a,b){var o=new Float32Array(16);for(var c=0;c<4;c++)for(var r=0;r<4;r++){var s=0;for(var k=0;k<4;k++)s+=a[k*4+r]*b[c*4+k];o[c*4+r]=s}return o}
function persp(f,asp,n,fa){var t=1/Math.tan(f/2),o=new Float32Array(16);o[0]=t/asp;o[5]=t;o[10]=(fa+n)/(n-fa);o[11]=-1;o[14]=2*fa*n/(n-fa);return o}
function trans(x,y,z){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1])}
function rotY(a){var c=Math.cos(a),s=Math.sin(a);return new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1])}
function rotX(a){var c=Math.cos(a),s=Math.sin(a);return new Float32Array([1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1])}
var VS='attribute vec3 p;attribute vec2 t;attribute vec3 n;uniform mat4 m;uniform vec3 L;varying vec2 vT;varying float vS;void main(){vT=t;vS=0.58+0.42*max(dot(n,L),0.0);gl_Position=m*vec4(p,1.0);}';
var FS='precision mediump float;varying vec2 vT;varying float vS;uniform sampler2D tx;void main(){vec4 c=texture2D(tx,vT);if(c.a<0.5)discard;gl_FragColor=vec4(c.rgb*vS,1.0);}';
function shader(gl,type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s}
function Viewer(host,opts){
  var self=this; this.host=host; this.cur=null; this.yaw=2.7; this.pitch=0.22; this.zoom=1; this.auto=true; this.idle=0; this.vis=false;
  var tabsEl=document.createElement('div'); tabsEl.className='v3d-tabs';
  var cv=document.createElement('canvas'); cv.className='v3d-canvas';
  var hint=document.createElement('div'); hint.className='v3d-hint'; hint.textContent='Loading 3D model…';
  host.appendChild(tabsEl); host.appendChild(cv); host.appendChild(hint);
  this.cv=cv; this.hint=hint;
  var gl=null; try{gl=cv.getContext('webgl',{antialias:true,alpha:true})||cv.getContext('experimental-webgl')}catch(e){}
  if(!gl){host.classList.add('v3d-off');hint.textContent='The 3D view needs WebGL.';return}
  this.gl=gl;
  var pr=gl.createProgram();gl.attachShader(pr,shader(gl,gl.VERTEX_SHADER,VS));gl.attachShader(pr,shader(gl,gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);gl.useProgram(pr);this.pr=pr;
  this.loc={p:gl.getAttribLocation(pr,'p'),t:gl.getAttribLocation(pr,'t'),n:gl.getAttribLocation(pr,'n'),m:gl.getUniformLocation(pr,'m'),L:gl.getUniformLocation(pr,'L')};
  gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);
  this.models=opts; this.cache={};
  if(opts.length>1) opts.forEach(function(o,i){var b=document.createElement('button');b.type='button';b.textContent=o[1];b.onclick=function(){self.show(i)};tabsEl.appendChild(b)});
  else tabsEl.style.display='none';
  this.tabs=tabsEl;
  var drag=null;
  cv.addEventListener('pointerdown',function(e){drag={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId);self.auto=false;self.idle=0;cv.classList.add('grab')});
  cv.addEventListener('pointermove',function(e){if(!drag)return;self.yaw+=(e.clientX-drag.x)*0.011;self.pitch=Math.max(-1.45,Math.min(1.45,self.pitch+(e.clientY-drag.y)*0.009));drag={x:e.clientX,y:e.clientY}});
  var up=function(){drag=null;self.idle=performance.now();cv.classList.remove('grab')};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
  cv.addEventListener('wheel',function(e){e.preventDefault();self.zoom=Math.max(.45,Math.min(3.2,self.zoom*(e.deltaY<0?1.1:.91)));self.auto=false;self.idle=performance.now()},{passive:false});
  cv.addEventListener('dblclick',function(){self.zoom=1;self.pitch=.22;self.auto=true});
  this.rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches; if(this.rm)this.auto=false;
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(en){self.vis=en[0].isIntersecting;if(self.vis&&!self.started){self.started=true;self.show(0)}if(self.vis)self.loop()},{rootMargin:'120px'}):null;
  if(io)io.observe(host);else{self.vis=true;self.started=true;self.show(0);self.loop()}
}
Viewer.prototype.build=function(d){
  var gl=this.gl,q=d.q,nq=q.length/20,buf=new Float32Array(nq*6*8),o=0,mn=[1e9,1e9,1e9],mx=[-1e9,-1e9,-1e9],V=[0,1,2,0,2,3];
  for(var i=0;i<nq;i++){
    var b=i*20,P=[];for(var j=0;j<4;j++){var x=q[b+j*5],y=q[b+j*5+1],z=q[b+j*5+2];P.push([x,y,z]);
      if(x<mn[0])mn[0]=x;if(y<mn[1])mn[1]=y;if(z<mn[2])mn[2]=z;if(x>mx[0])mx[0]=x;if(y>mx[1])mx[1]=y;if(z>mx[2])mx[2]=z}
    var a=[P[1][0]-P[0][0],P[1][1]-P[0][1],P[1][2]-P[0][2]],c=[P[3][0]-P[0][0],P[3][1]-P[0][1],P[3][2]-P[0][2]];
    var n=[c[1]*a[2]-c[2]*a[1],c[2]*a[0]-c[0]*a[2],c[0]*a[1]-c[1]*a[0]],l=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2])||1;n=[n[0]/l,n[1]/l,n[2]/l];
    for(var k=0;k<6;k++){var s=b+V[k]*5;buf[o++]=q[s];buf[o++]=q[s+1];buf[o++]=q[s+2];buf[o++]=q[s+3];buf[o++]=q[s+4];buf[o++]=n[0];buf[o++]=n[1];buf[o++]=n[2]}
  }
  var vb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,vb);gl.bufferData(gl.ARRAY_BUFFER,buf,gl.STATIC_DRAW);
  var cx=(mn[0]+mx[0])/2,cy=(mn[1]+mx[1])/2,cz=(mn[2]+mx[2])/2,R=0;
  for(var i2=0;i2<nq*4;i2++){var bb=Math.floor(i2/4)*20+(i2%4)*5,dx=q[bb]-cx,dy=q[bb+1]-cy,dz=q[bb+2]-cz,r=Math.sqrt(dx*dx+dy*dy+dz*dz);if(r>R)R=r}
  return {vb:vb,n:nq*6,c:[cx,cy,cz],R:R||1,tex:null};
};
Viewer.prototype.show=function(i){
  var self=this,o=this.models[i];if(!o)return;
  [].forEach.call(this.tabs.children,function(b,k){b.classList.toggle('on',k===i)});
  this.hint.textContent='Loading 3D model…';
  need(o[0],function(d){
    var m=self.cache[o[0]];
    if(!m){m=self.cache[o[0]]=self.build(d);var gl=self.gl,img=new Image();
      img.onload=function(){m.tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,m.tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        if(self.cur===m)self.hint.textContent='Drag to rotate · scroll to zoom · double-click to reset'};
      img.src=d.t}
    self.cur=m;self.zoom=1;
    if(m.tex)self.hint.textContent='Drag to rotate · scroll to zoom · double-click to reset';
    self.loop();
  },function(){self.hint.textContent='Could not load the 3D model.'});
};
Viewer.prototype.loop=function(){
  if(this.running)return;this.running=true;var self=this;
  (function f(t){if(!self.vis){self.running=false;return}self.draw(t);requestAnimationFrame(f)})(0);
};
Viewer.prototype.draw=function(t){
  var gl=this.gl,cv=this.cv,m=this.cur;if(!m||!m.tex)return;
  var dpr=Math.min(window.devicePixelRatio||1,2),w=Math.round(cv.clientWidth*dpr),h=Math.round(cv.clientHeight*dpr);
  if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h}
  gl.viewport(0,0,w,h);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  if(!this.rm&&!this.auto&&this.idle&&performance.now()-this.idle>3500){this.auto=true;this.idle=0}
  if(this.auto)this.yaw+=0.009;
  var fov=0.62,dist=m.R/Math.sin(fov/2)*1.08/this.zoom;
  var ry=rotY(this.yaw),rx=rotX(this.pitch);
  var mv=mul(trans(0,0,-dist),mul(rx,mul(ry,trans(-m.c[0],-m.c[1],-m.c[2]))));
  var mvp=mul(persp(fov,w/h,dist*0.05,dist*4),mv);
  var Lv=[-0.35,0.65,0.67],R=mul(rx,ry);
  var L=[R[0]*Lv[0]+R[1]*Lv[1]+R[2]*Lv[2],R[4]*Lv[0]+R[5]*Lv[1]+R[6]*Lv[2],R[8]*Lv[0]+R[9]*Lv[1]+R[10]*Lv[2]];
  gl.useProgram(this.pr);gl.uniformMatrix4fv(this.loc.m,false,mvp);gl.uniform3fv(this.loc.L,new Float32Array(L));
  gl.bindBuffer(gl.ARRAY_BUFFER,m.vb);
  gl.enableVertexAttribArray(this.loc.p);gl.vertexAttribPointer(this.loc.p,3,gl.FLOAT,false,32,0);
  gl.enableVertexAttribArray(this.loc.t);gl.vertexAttribPointer(this.loc.t,2,gl.FLOAT,false,32,12);
  gl.enableVertexAttribArray(this.loc.n);gl.vertexAttribPointer(this.loc.n,3,gl.FLOAT,false,32,20);
  gl.bindTexture(gl.TEXTURE_2D,m.tex);gl.drawArrays(gl.TRIANGLES,0,m.n);
};
function init(){
  [].forEach.call(document.querySelectorAll('.v3d[data-models]'),function(el){
    var list=el.getAttribute('data-models').split(',').map(function(s){var p=s.split(':');return [p[0],p[1]||'3D']});
    new Viewer(el,list);
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
