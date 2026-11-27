(()=>{
const T=32,cv=Q('#cv'),ctx=cv.getContext('2d'),C=CONFIG;
const LEVELS=[
{title:'Level 1: Labirin Sahabat Hewan',line:'l1b'},
{title:'Level 2: Labirin Tantangan Logika',line:'l2b'},
{title:'Level 3: Gelembung Angka',line:'l3b',boss:true}];
const PROLOG=[['s1','p1','Selamat datang di Labirin Ajaib!'],['s2','p2','Kelinci butuh pertolongan!'],['s3','p3','Ayo mulai misi!'],['s4','p4','Yuk, kita mulai petualangan!']];
const STAR='<svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.5 5.8 21l1.4-7L2 9.3l7-.8z"/></svg>';
const HEART='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5.5-8 11-8 11z"/></svg>';
const PRAISE=['pr1','pr2','pr3','pr4'],LM={r:'tRock',m:'tMush',s:'tStump'};
let lvl=0,grid=null,state='none',mistakes=0,locked=false,boss=null,P={},last=0,insDone=false,vw=7,vh=7,cam={x:0,y:0},run={fast:false,layouts:[0,0]};
if(navigator.maxTouchPoints>0||'ontouchstart' in window)document.body.classList.add('touch');
document.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
document.addEventListener('contextmenu',e=>e.preventDefault());
document.addEventListener('visibilitychange',()=>{if(document.hidden){Voice.stop();Snd.suspend(true);}else Snd.suspend(false);});
Q('#cast').innerHTML=imgTag('monkeyHappy')+imgTag('rabbitHappy')+imgTag('monster');
const fade=fn=>{const f=Q('#fade');f.classList.add('on');setTimeout(()=>{fn();f.classList.remove('on');},C.fadeMs);};
const hide=s=>Q(s).classList.add('hidden'),show=s=>Q(s).classList.remove('hidden'),click=()=>Snd.sfx('click');
// ---- kontrol ----
const held=[],DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
const press=d=>{if(!held.includes(d))held.push(d);},release=d=>{const i=held.indexOf(d);if(i>=0)held.splice(i,1);};
const KEYS={ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'};
addEventListener('keydown',e=>{const d=KEYS[e.key];if(d){e.preventDefault();press(d);}});
addEventListener('keyup',e=>{const d=KEYS[e.key];if(d)release(d);});
addEventListener('blur',()=>held.length=0);
document.querySelectorAll('#dpad button').forEach(b=>{const d=b.dataset.d;
 b.addEventListener('pointerdown',e=>{e.preventDefault();press(d);b.classList.add('on');});
 ['pointerup','pointercancel','pointerleave'].forEach(ev=>b.addEventListener(ev,()=>{release(d);b.classList.remove('on');}));});
// ---- pengaturan suara ----
const sync=()=>{const s=Snd.get();Q('#snd').classList.toggle('off',s.mute);Q('#vm').value=s.music;Q('#vv').value=s.voice;Q('#vs').value=s.sfx;};
Q('#snd').onclick=()=>{Snd.toggleMute();sync();};Q('#gear').onclick=()=>{sync();show('#set');};Q('#sclose').onclick=()=>hide('#set');
[['#vm','music'],['#vv','voice'],['#vs','sfx']].forEach(([s,k])=>Q(s).oninput=e=>Snd.set(k,+e.target.value));sync();
// ---- menu utama ----
function showMenu(){Voice.stop();const seen=Store.get('seenProlog',false);Q('#mStart').classList.toggle('primary',!seen);Q('#mQuick').classList.toggle('primary',seen);Q('#firstmsg').classList.toggle('hidden',seen);show('#start');Snd.music('story');}
function newRun(fast){const last=Store.get('lastLayout',[-1,-1]),res=[];
 [['level1',0],['level2',1]].forEach(([k,i])=>{const L=MAZES[k];let idx,n=0;do{idx=Math.floor(Math.random()*L.length);n++;}while(n<60&&((idx===last[i]&&L.length>1)||!validateMaze(L[idx].grid).ok));
  if(!validateMaze(L[idx].grid).ok)idx=L.findIndex(m=>validateMaze(m.grid).ok);res.push(idx);});   // layout dipilih saat permainan baru, tidak berubah di tengah permainan
 Store.set('lastLayout',res);run={fast,layouts:res};}
Q('#mStart').onclick=()=>{if(!Nav.ok())return;Snd.init();click();newRun(false);hide('#start');Snd.music('story');prolog(0,'adv');};
Q('#mQuick').onclick=()=>{if(!Nav.ok())return;Snd.init();click();newRun(true);Snd.music('explore');fade(()=>{hide('#start');startLevel(0);});};
Q('#mStory').onclick=()=>{if(!Nav.ok())return;Snd.init();click();hide('#start');Snd.music('story');prolog(0,'view');};
Q('#mHow').onclick=()=>{Snd.init();click();openHow();};
Q('#mSet').onclick=()=>{Snd.init();click();sync();show('#set');};
Q('#hsteps').innerHTML=[[imgTag('monkey'),'Cari jalan di labirin'],[`<img src="${sprite('tDoor').toDataURL()}" alt="pintu">`,'Pintu terkunci? Jawab pertanyaannya'],[imgTag('star'),'Kumpulkan bintang']].map(([i,t])=>`<li>${i}<span>${t}</span></li>`).join('');
function openHow(){show('#how');Voice.chain(['ctl','guide']);}
Q('#hspk').onclick=()=>{click();Voice.chain(['ctl','guide']);};Q('#hclose').onclick=()=>{click();Voice.stop();hide('#how');};
// ---- prolog (dengan Lewati Cerita) ----
function endProlog(mode){Store.set('seenProlog',true);Story.hide();if(mode==='view')showMenu();else startLevel(0);}
function prolog(i,mode){const[s,l,cap]=PROLOG[i];Story.show(s,{line:l,cap,dots:[i,4],skip:true,btn:i===3?(mode==='view'?'Kembali ke Menu':'Mulai Petualangan'):'Lanjut',
 next:()=>fade(()=>{if(i<3)prolog(i+1,mode);else endProlog(mode);}),onSkip:()=>fade(()=>endProlog(mode))});}
// ---- level ----
function startLevel(i){lvl=i;mistakes=0;held.length=0;state='intro';const L=LEVELS[i];Q('#ltitle').textContent=L.title;
 ['#quiz','#reward','#helpm','#how','#intro'].forEach(hide);Snd.music(L.boss?'boss':'explore');
 document.body.classList.toggle('boss',!!L.boss);Q('#boss').classList.toggle('hidden',!L.boss);cv.classList.toggle('hidden',!!L.boss);
 if(L.boss)grid=null;else{const m=MAZES['level'+(i+1)][run.layouts[i]];grid=m.grid.map(r=>[...r]);grid.forEach((r,y)=>r.forEach((c,x)=>{if(c==='S'){P={x,y,tx:x,ty:y,t:0,moving:false,dir:'down'};r[x]='.';}}));fit();const[tx,ty]=camTarget();cam={x:tx,y:ty};}
 if(run.fast)beginLevel(i);else showIntro(L,i);}
function showIntro(L,i){Q('#itl').textContent=L.title;Q('#ictl').classList.toggle('hidden',!!L.boss);show('#intro');
 const nb=Q('#inext');btnSet(nb,'Lanjut');const play=()=>{setReady(nb,false);Voice.chain(i===0?[L.line,'ctl']:[L.line],()=>setReady(nb,true));};play();
 Q('#ispk').onclick=()=>{click();play();};
 const go=sk=>{Voice.stop();hide('#intro');beginLevel(i,sk);};
 nb.onclick=()=>{if(nb.disabled||!Nav.ok())return;click();go();};
 Q('#iskip').onclick=()=>{if(!Nav.skip())return;click();go(true);};}     // Lewati Petunjuk: hanya melewati instruksi, bukan kuis dan tidak membuka level lain
function beginLevel(i,skipped){Store.set('seenGuide',true);if(LEVELS[i].boss){state='boss';startBoss();}else{state='play';if(!run.fast&&!skipped&&i<2)Voice.say('search');}}
// ---- kamera: labirin besar tetap terlihat jelas, kamera mengikuti monyet dengan halus ----
function fit(){if(!grid)return;const r=Q('#view').getBoundingClientRect(),cols=grid[0].length,rows=grid.length;
 vw=Math.min(cols,Math.max(7,Math.floor(r.width/38)));vh=Math.min(rows,Math.max(7,Math.floor(r.height/38)));
 cv.width=vw*T;cv.height=vh*T;const s=Math.min(r.width/cv.width,r.height/cv.height);cv.style.width=cv.width*s+'px';cv.style.height=cv.height*s+'px';const[tx,ty]=camTarget();cam={x:tx,y:ty};}
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,200));
function camTarget(){if(!grid)return[0,0];const f=P.moving?P.t:0,px=P.x+(P.tx-P.x)*f,py=P.y+(P.ty-P.y)*f;
 return[Math.max(0,Math.min(grid[0].length-vw,px+.5-vw/2)),Math.max(0,Math.min(grid.length-vh,py+.5-vh/2))];}
// ---- gerak & collision (berbasis kotak: tidak bisa tersangkut) ----
const walk=(x,y)=>grid[y]&&grid[y][x]&&grid[y][x]!=='#'&&grid[y][x]!=='D';
function doorNear(){for(const[dx,dy]of[[0,-1],[0,1],[-1,0],[1,0]])if(grid[P.y+dy]&&grid[P.y+dy][P.x+dx]==='D')return[P.x+dx,P.y+dy];}
function update(dt){if(state!=='play')return;
 if(!P.moving){const d=doorNear();
  if(d){state='quiz';held.length=0;runQuiz(buildSet(lvl+1,LEVELS[lvl].n),()=>{grid[d[1]][d[0]]='o';Snd.sfx('door');Voice.say('door-open');state='play';});return;}
  const k=held[held.length-1];if(k){P.dir=k;const[dx,dy]=DIRS[k];if(walk(P.x+dx,P.y+dy)){P.tx=P.x+dx;P.ty=P.y+dy;P.moving=true;P.t=0;}}}
 if(P.moving){P.t+=dt*C.speed;if(P.t>=1){P.x=P.tx;P.y=P.ty;P.moving=false;Snd.sfx('step');arrive();}}}
function arrive(){const c=grid[P.y][P.x];
 if(c==='R'){state='done';held.length=0;Snd.sfx('rescue');setTimeout(()=>fade(()=>Story.show('rescue',{line:['rescue-n','rescue-r'],cap:'Kelinci selamat!',btn:'Lanjut',next:()=>fade(()=>{Story.hide();reward('Kelinci selamat!','Kamu berhasil menyelamatkan kelinci!','Lanjut ke Level 2','w1',()=>startLevel(1));})})),700);}
 if(c==='E'){state='done';held.length=0;Snd.sfx('rescue');setTimeout(()=>reward('Jalan terbuka!','Jalan menuju Monster Penjaga sudah terbuka!','Lanjut ke Level 3','w2',()=>startLevel(2)),600);}}
function render(t){ctx.imageSmoothingEnabled=false;ctx.clearRect(0,0,cv.width,cv.height);const rows=grid.length,cols=grid[0].length,ox=Math.round(-cam.x*T),oy=Math.round(-cam.y*T),sad=grid.some(r=>r.includes('D'));
 for(let y=Math.floor(cam.y);y<Math.min(rows,Math.floor(cam.y)+vh+2);y++)for(let x=Math.floor(cam.x);x<Math.min(cols,Math.floor(cam.x)+vw+2);x++){const c=grid[y][x],X=x*T+ox,Y=y*T+oy;
  let k=c==='#'?'tWall':c==='D'?'tDoor':'RoE'.includes(c)?'tSand':LM[c]||'tGrass';if(k==='tGrass'&&(x*7+y*13)%11===0)k='tFlower';ctx.drawImage(sprite(k),X,Y,T,T);
  if(c==='E'){ctx.fillStyle='#fdd835';ctx.beginPath();ctx.arc(X+16,Y+16,9+Math.sin(t*5)*2,0,7);ctx.fill();ctx.fillStyle='#fff6a8';ctx.beginPath();ctx.arc(X+16,Y+16,4,0,7);ctx.fill();}
  if(c==='R'){const n=!sad?'rabbitHappy':Math.floor(t*1.5)%2?'rabbitSad':'rabbitSad2';ctx.drawImage(sprite(n),X+3,Y+3-(sad?0:Math.abs(Math.sin(t*4))*3),26,26);}}
 const f=P.moving?P.t:0,px=(P.x+(P.tx-P.x)*f)*T+ox,py=(P.y+(P.ty-P.y)*f)*T+oy,bob=P.moving?Math.abs(Math.sin(t*16))*3:Math.sin(t*3)*.8;
 const base=P.dir==='up'?'monkeyBack':P.dir==='down'?'monkey':'monkeySide',nm=base+(P.moving&&Math.floor(t*9)%2?'_w':'');
 ctx.fillStyle='rgba(0,0,0,.2)';ctx.beginPath();ctx.ellipse(px+16,py+28,9,3,0,0,7);ctx.fill();
 ctx.save();ctx.translate(px+16,py+16-bob);ctx.scale(P.dir==='left'?-1:1,1);ctx.drawImage(sprite(nm),-14,-14,28,28);ctx.restore();}
function loop(ts){requestAnimationFrame(loop);const dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(!grid)return;update(dt);
 const[tx,ty]=camTarget(),k=Math.min(1,dt*7);cam.x+=(tx-cam.x)*k;cam.y+=(ty-cam.y)*k;render(ts/1000);}
requestAnimationFrame(loop);
// ---- bantuan bertahap (tidak menunjukkan solusi, tidak mengurangi bintang) ----
Q('#help').onclick=()=>{if(state!=='play'||!Nav.ok())return;click();state='help';held.length=0;show('#helpm');};
const closeHelp=()=>{Voice.stop();hide('#helpm');state='play';};
Q('#hClose').onclick=()=>{click();closeHelp();};Q('#hAgain').onclick=()=>{click();Voice.chain([LEVELS[lvl].line,'ctl']);};
Q('#hThink').onclick=()=>{click();const n=[[0,-1],[0,1],[-1,0],[1,0]].filter(([dx,dy])=>walk(P.x+dx,P.y+dy)).length;Voice.say(n<=1?'help-dead':n>=3?'help-junc':rand1(['help-look','help-try']));};
// ---- kuis ----
function runQuiz(qs,done){let i=0,tried;const nb=Q('#qnext');
 function show1(){const q=qs[i];tried=new Set();locked=false;q.choices=q.choices||makeChoices(q);Q('#qtext').textContent=q.text;Q('#qvis').innerHTML=q.visual?q.visual():'';hide('#qpraise');nb.classList.add('hidden');
  Q('#qdots').innerHTML=qs.length>1?qs.map((_,k)=>`<i class="${k<i?'done':k===i?'cur':''}"></i>`).join(''):'';
  const box=Q('#qch');box.innerHTML='';q.choices.forEach(key=>{const b=document.createElement('button');b.className='choice';
   b.innerHTML=choiceHTML(q.kind,key)+(q.kind==='num'?'':`<small>${key}</small>`);b.onclick=()=>pick(b,key,q);box.appendChild(b);});
  Q('#qsay').onclick=()=>{click();Voice.say(q.vid);};show('#quiz');Snd.sfx('appear');
  Voice.chain(insDone?[q.vid]:[q.vid,'quiz-ins']);insDone=true;}
 function pick(b,key,q){if(locked)return;
  if(key!==q.answer){if(!tried.has(key)){tried.add(key);mistakes++;}b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),500);Snd.sfx('wrong');Voice.say(rand1(['r1','r2']));return;}
  locked=true;b.classList.add('right');Q('#qch').querySelectorAll('.choice').forEach(x=>{if(x!==b)x.classList.add('dim');});Snd.sfx('correct');
  const p=Q('#qpraise');show('#qpraise');p.innerHTML=STAR+STAR+STAR;
  Voice.say(rand1(PRAISE),()=>{btnSet(nb,i<qs.length-1?'Lanjut':'Buka Pintu');nb.classList.remove('hidden');setReady(nb,true);});}
 nb.onclick=()=>{if(nb.disabled||!Nav.ok())return;click();Voice.stop();setReady(nb,false);i++;if(i<qs.length)show1();else{hide('#quiz');done();}};
 show1();}
// ---- reward ----
function reward(title,sub,btn,line,next){const s=mistakes===0?3:mistakes<=2?2:1,rb=Q('#rb');Q('#rt').textContent=title;Q('#rs').textContent=sub;btnSet(rb,btn);setReady(rb,false);
 const st=Q('#stars');st.innerHTML=STAR+STAR+STAR;show('#reward');Snd.music('win');Snd.sfx('win');
 let pend=2;const ok=()=>{if(--pend===0)setReady(rb,true);};Voice.say(line,ok);
 for(let i=0;i<s;i++)setTimeout(()=>{st.children[i].classList.add('on');Snd.sfx('star',i);},700+i*700);setTimeout(ok,900+s*700);
 rb.onclick=()=>{if(rb.disabled||!Nav.ok())return;click();Voice.stop();hide('#reward');Snd.music(lvl===2?'story':'explore');next();};}
function finalPage(){fade(()=>Story.show('final',{line:'final',cap:'Selamat! Petualangan selesai!',btn:'Main Lagi',next:()=>fade(()=>{Story.hide();hide('#boss');document.body.classList.remove('boss');showMenu();})}));}
// ---- boss: gelembung angka ----
function hearts(){Q('#bh').innerHTML=Array.from({length:boss.max},(_,i)=>HEART.replace('<svg',`<svg class="${i<boss.lives?'':'lost'}"`)).join('');}
function startBoss(){boss={lives:C.lives,max:C.lives,qs:buildSet(3,C.lives),i:0,busy:false};
 const m=Q('#bmon');m.className='';Q('#bmon img').src=sprite('monster').toDataURL();void m.offsetWidth;m.classList.add('enter');Snd.sfx('appear');hearts();Q('#bf').innerHTML='';Q('#bnext').classList.add('hidden');
 Q('#bt').textContent='';Q('#bq').innerHTML='';Voice.say('m-hi',bossQ);}
function bossQ(){const q=boss.qs[boss.i];boss.busy=false;Q('#bnext').classList.add('hidden');Q('#bt').textContent=q.text;Q('#bq').innerHTML=q.visual();Voice.say(q.vid);
 const ans=+q.answer,f=Q('#bf');f.innerHTML='';makeBubbles(q).forEach((n,i)=>{const o=document.createElement('div');o.className='bub';o.style.left=(2+i*19.5)+'%';o.style.top=(i%2?50:6)+'%';
  const b=document.createElement('div');b.className='bi';b.textContent=n;b.style.animationDelay=-Math.random()*3+'s';o.appendChild(b);o.onclick=()=>bubble(o,n===ans);f.appendChild(o);});Snd.sfx('pop');}
function bubble(o,ok){if(boss.busy)return;
 if(!ok){if(!o.dataset.t){o.dataset.t=1;mistakes++;}Snd.sfx('wrong');Voice.say(rand1(['r1','r2']));o.classList.remove('shake');void o.offsetWidth;o.classList.add('shake');return;}
 boss.busy=true;Snd.sfx('pop');const a=o.getBoundingClientRect(),m=Q('#bmon img').getBoundingClientRect();
 o.style.zIndex=5;o.style.transition='transform .7s ease-in';o.style.transform=`translate(${m.left+m.width/2-a.left-a.width/2}px,${m.top+m.height/2-a.top-a.height/2}px) scale(.3)`;
 setTimeout(()=>{o.remove();Snd.sfx('hit');const mon=Q('#bmon'),im=mon.querySelector('img');mon.classList.remove('enter','hit');void mon.offsetWidth;mon.classList.add('hit');im.src=sprite('monsterHit').toDataURL();
  setTimeout(()=>{im.src=sprite('monster').toDataURL();},700);boss.lives--;hearts();
  if(boss.lives>0){Voice.say(rand1(PRAISE),()=>{const nb=Q('#bnext');btnSet(nb,'Lanjut');nb.classList.remove('hidden');setReady(nb,true);});}
  else{Voice.say('pr2',()=>{mon.classList.remove('hit');mon.classList.add('vanish');Snd.sfx('win');Voice.say('m-bye',()=>setTimeout(()=>reward('Monster pergi! Hebat!','Kamu berhasil keluar dari labirin!','Lanjut','w3',finalPage),500));});}},750);}
Q('#bnext').onclick=()=>{const nb=Q('#bnext');if(nb.disabled||!Nav.ok())return;click();Voice.stop();setReady(nb,false);boss.i++;bossQ();};
showMenu();
window.Game={startLevel,get run(){return run;}};
})();
