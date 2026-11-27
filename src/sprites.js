// Semua gambar dibuat dari kode (pixel art orisinal). Tidak ada file gambar eksternal.
const Q=s=>document.querySelector(s);
const PAL={b:'#8d5a2b',t:'#f3c98b',k:'#2b1b12',w:'#ffffff',p:'#f9a8c9',r:'#e53935',R:'#a8161a',q:'#ff8a7e',z:'rgba(0,0,0,.22)',y:'#fcd34d',o:'#fb923c',n:'#6b3e1b',g:'#9ca3af',m:'#8e6bd8',e:'#5cb85c',E:'#2e7d32',c:'#8fd3ff',G:'#9bd36b',H:'#86c45a',D:'#2e7d32',L:'#4caf50',W:'#c68642',S:'#f3dfae',s:'#e8cd8e',f:'#fff6a8'};
const MAPS={
monkey:['..bbbbbbbb..','.bbbbbbbbbb.','bttbbbbbbttb','bttbttttbttb','.bbttttttbb.','..btkttktb..','..bttttttb..','..bttkkttb..','...bbbbbb...','..bbbbbbbb..','..bbbbbbbb..','..bb....bb..'],
monkeyBack:['..bbbbbbbb..','.bbbbbbbbbb.','bttbbbbbbttb','bttbbbbbbttb','.bbbbbbbbbb.','..bbbbbbbb..','..bbbbbbbb..','..bbbbbbbb..','...bbbbbb...','..bbbbbbbb..','..bbbbbbbb..','..bb....bb..'],
monkeySide:['...bbbbbb...','..bbbbbbbb..','.bttbbbbbbb.','.bttbbtttkb.','..bbbtttttb.','..bbbtttkkb.','...bbtttttb.','...bbbbbbb..','..bbbbbbbb..','.bbbbbbbbbb.','..bbbbbbbb..','..bb....bb..'],
rabbit:['..ww....ww..','..wp....pw..','..wp....pw..','..ww....ww..','..wwwwwwww..','.wwwwwwwwww.','.wwkwwwwkww.','.wwwwppwwww.','.wwwwwwwwww.','..wwwwwwww..','..wwwwwwww..','..ww....ww..'],
monster:['.mm........mm.','.mmm......mmm.','.mmmmmmmmmmmm.','mmmmmmmmmmmmmm','mwwwmmmmmmwwwm','mwkwmmmmmmwkwm','mwwwmmmmmmwwwm','mmmpmmmmmmpmmm','mmmmppppppmmmm','mmmmmmmmmmmmmm','.mmmmmmmmmmmm.','.mm..mmmm..mm.'],
kucing:['oo......oo','ooo....ooo','oooooooooo','ookooookoo','oooooooooo','ooooppoooo','oowwwwwwoo','ooowwwwooo','.oooooooo.','..oo..oo..'],
anjing:['..tttttttt','.tttttttt.','nttttttttn','nntkttkknn','nnttttttnn','nnttkkttnn','.tttttttt.','.ttttpptt.','..tttttt..','..tt..tt..'],
ayam:['....rr....','...rrrr...','..wwwwww..','.wwkwwkww.','.wwwyywww.','.wwwyywww.','wwwwrrwwww','wwwwwwwwww','.wwwwwwww.','..yy..yy..'],
sapi:['g........g','gwwwwwwwwg','wwwwwwwwww','wwkwwwwkww','wkkwwwwwww','wwppppppww','wwpkppkpww','wwppppppww','.wwwwwwww.','..ww..ww..'],
bebek:['...yyyy...','..yyyyyy..','..yyyyyy..','..ykyykyy.','..yooooyy.','...yyyyyy.','.yyyyyyyyy','yyyyyyyyyy','.yyyyyyyy.','..oo..oo..'],
kambing:['.g......g.','.gwwwwwwg.','wwwwwwwwww','wwkwwwwkww','wwwwwwwwww','wwwppppwww','.wwwwwwww.','..wwkkww..','...wwww...','...w..w...'],
babi:['pp......pp','ppp....ppp','pppppppppp','ppkppppkpp','pppqqqqppp','pppqkkqppp','pppqqqqppp','.pppppppp.','..pppppp..','..pp..pp..'],
kuda:['.nn....nn.','.bbbbbbbb.','nbbbbbbbbn','nbkbbbbkbn','nbbbbbbbbn','.bbttttbb.','..bttttb..','..btkktb..','..bbbbbb..','...bb.bb..'],
burung:['...cccc...','..cccccc..','.cckcckcc.','.cccyyccc.','.cwwwwwwc.','ccwwwwwwcc','.cwwwwwwc.','..cccccc..','...y..y...','..yy..yy..'],
singa:['.oooooooo.','oooyyyyooo','ooyyyyyyoo','oyykyykyyo','oyyyyyyyyo','oyyyppyyyo','ooyykkyyoo','.ooyyyyoo.','..oooooo..','..yy..yy..'],
tRock:['GGGGGGGG','GGGGGGGG','GGgggGGG','GggwggGG','GgggggGG','GGgggGGG','GGGGGGGG','GGGGGGGG'],
tMush:['GGGGGGGG','GGrrrrGG','GrrwrrrG','GrwrrwrG','GGGwwGGG','GGGwwGGG','GGGGGGGG','GGGGGGGG'],
tStump:['GGGGGGGG','GGnnnnGG','GnWWWWnG','GnWnnWnG','GnWWWWnG','GGnnnnGG','GGGGGGGG','GGGGGGGG'],
tGrass:['GGGGGGGG','GGHGGGGG','GGGGGGHG','GGGGGGGG','GGGHGGGG','GHGGGGGG','GGGGGGGG','GGGGGHGG'],
tFlower:['GGGGGGGG','GGHGGGGG','GGGGfGGG','GGGfyfGG','GGGGfGGG','GHGGGGGG','GGGGGGHG','GGGGGHGG'],
tWall:['DLLDDLLD','LLLLLLLL','DLLLDLLL','DDLLLLDD','DLLDDLLD','LLLLLLLL','DDLDDLDD','DDDDDDDD'],
tDoor:['nnnnnnnn','nWWWWWWn','nWnWWnWn','nWWWWWWn','nWWWyyWn','nWWWyyWn','nWnWWnWn','nnnnnnnn'],
tSand:['SSSSSSSS','SSsSSSSS','SSSSSSsS','SSSSSSSS','SSSsSSSS','SsSSSSSS','SSSSSSSS','SSSSSsSS']};
// varian = gambar dasar + perubahan piksel [x,y,warna]  (ekspresi & animasi)
const LEG=[[2,11,'.'],[9,11,'.'],[4,11,'b'],[7,11,'b']];
const VARS={
 monkey_w:['monkey',LEG],monkeyBack_w:['monkeyBack',LEG],monkeySide_w:['monkeySide',LEG],
 monkeyHappy:['monkey',[[4,5,'t'],[7,5,'t'],[4,4,'k'],[7,4,'k'],[4,7,'k'],[7,7,'k']]],
 monkeyWave:['monkeyHappy',[[11,10,'b'],[11,9,'b'],[11,8,'b'],[11,7,'b'],[11,6,'b'],[11,5,'t'],[11,4,'t']]],
 monkeyWave2:['monkeyHappy',[[11,10,'b'],[11,9,'b'],[11,8,'b'],[11,7,'t'],[10,6,'t']]],
 monkeyCheer:['monkeyHappy',[[0,10,'b'],[0,9,'b'],[0,8,'b'],[0,7,'b'],[0,6,'b'],[0,5,'t'],[0,4,'t'],[11,10,'b'],[11,9,'b'],[11,8,'b'],[11,7,'b'],[11,6,'b'],[11,5,'t'],[11,4,'t']]],
 rabbitSad:['rabbit',[[3,7,'c'],[8,7,'c'],[5,8,'k'],[6,8,'k']]],
 rabbitSad2:['rabbit',[[3,8,'c'],[8,8,'c'],[5,8,'k'],[6,8,'k']]],
 rabbitHappy:['rabbit',[[3,5,'k'],[8,5,'k'],[3,6,'w'],[8,6,'w'],[2,7,'p'],[9,7,'p'],[4,8,'k'],[7,8,'k']]],
 monsterHit:['monster',[[1,4,'m'],[2,4,'m'],[3,4,'m'],[1,6,'m'],[2,6,'m'],[3,6,'m'],[1,5,'k'],[2,5,'k'],[3,5,'k'],[10,4,'m'],[11,4,'m'],[12,4,'m'],[10,6,'m'],[11,6,'m'],[12,6,'m'],[10,5,'k'],[11,5,'k'],[12,5,'k'],[5,8,'k'],[6,8,'k'],[7,8,'k'],[8,8,'k']]]};
function getMap(n){if(MAPS[n])return MAPS[n];const[b,ed]=VARS[n],m=getMap(b).map(r=>[...r]);ed.forEach(([x,y,ch])=>m[y][x]=ch);return MAPS[n]=m.map(r=>r.join(''));}
// ===== APEL: ilustrasi realistis non-pixel (digambar vektor halus 256x256, latar transparan) =====
function drawApple(){const W=256,cv=document.createElement('canvas');cv.width=cv.height=W;const c=cv.getContext('2d');c.imageSmoothingEnabled=true;
 const body=new Path2D();body.moveTo(128,68);body.bezierCurveTo(112,50,70,48,44,88);body.bezierCurveTo(14,134,40,200,78,226);body.bezierCurveTo(100,242,116,231,128,231);
 body.bezierCurveTo(140,231,156,242,178,226);body.bezierCurveTo(216,200,242,134,212,88);body.bezierCurveTo(186,48,144,50,128,68);body.closePath();
 const rg=(x,y,r,stops,x2=x,y2=y,r0=0)=>{const g=c.createRadialGradient(x2,y2,r0,x,y,r);stops.forEach(([o,col])=>g.addColorStop(o,col));return g;};
 // bayangan di bawah apel
 c.save();c.translate(128,236);c.scale(1,.16);c.fillStyle=rg(0,0,84,[[0,'rgba(60,25,10,.42)'],[.6,'rgba(60,25,10,.18)'],[1,'rgba(60,25,10,0)']]);c.beginPath();c.arc(0,0,84,0,7);c.fill();c.restore();
 // badan buah: gradasi merah terang -> merah tua
 c.save();c.fillStyle=rg(150,160,190,[[0,'#ff6f55'],[.3,'#e83a30'],[.7,'#b3171c'],[1,'#7d0f14']],96,104,10);c.fill(body);c.clip(body);
 c.fillStyle=rg(84,206,78,[[0,'rgba(255,200,70,.55)'],[.6,'rgba(255,170,60,.18)'],[1,'rgba(255,170,60,0)']]);c.fillRect(0,0,W,W);          // semburat kekuningan
 c.fillStyle=rg(210,150,120,[[0,'rgba(60,0,10,.0)'],[1,'rgba(60,0,10,.0)']]);
 const sh=c.createLinearGradient(120,0,246,0);sh.addColorStop(0,'rgba(50,0,10,0)');sh.addColorStop(1,'rgba(50,0,10,.45)');c.fillStyle=sh;c.fillRect(0,0,W,W);   // sisi gelap (3D)
 const bt=c.createLinearGradient(0,170,0,240);bt.addColorStop(0,'rgba(50,0,10,0)');bt.addColorStop(1,'rgba(50,0,10,.35)');c.fillStyle=bt;c.fillRect(0,0,W,W);
 c.fillStyle=rg(128,74,36,[[0,'rgba(70,0,10,.55)'],[1,'rgba(70,0,10,0)']]);c.fillRect(0,0,W,W);                                              // lekukan atas
 c.lineCap='round';for(let i=0;i<9;i++){const x=58+i*18;c.strokeStyle=i%2?'rgba(255,230,120,.10)':'rgba(120,0,15,.14)';c.lineWidth=3+(i%3);c.beginPath();c.moveTo(x+(i%3)*4,92);c.quadraticCurveTo(x-12+(i%4)*5,150,x+(i%2?6:-6),214);c.stroke();}  // serat kulit
 for(let i=0;i<34;i++){const x=48+((i*53)%160),y=92+((i*37)%130);c.fillStyle=`rgba(255,226,170,${.16+(i%4)*.05})`;c.beginPath();c.arc(x,y,1.2+(i%3)*.5,0,7);c.fill();}   // bintik kulit
 c.save();c.translate(86,100);c.rotate(-.35);c.fillStyle=rg(0,0,40,[[0,'rgba(255,255,255,.75)'],[.5,'rgba(255,255,255,.25)'],[1,'rgba(255,255,255,0)']]);c.scale(.6,1);c.beginPath();c.arc(0,0,40,0,7);c.fill();c.restore();   // pantulan lembut
 c.save();c.translate(80,84);c.rotate(-.4);c.fillStyle='rgba(255,255,255,.9)';c.beginPath();c.ellipse(0,0,6,13,0,0,7);c.fill();c.restore();                                           // kilau tajam
 c.restore();
 c.strokeStyle='rgba(90,5,10,.35)';c.lineWidth=1.5;c.stroke(body);
 // tangkai cokelat
 c.lineCap='round';const st=c.createLinearGradient(120,24,140,76);st.addColorStop(0,'#9a6a35');st.addColorStop(1,'#5a3517');c.strokeStyle=st;c.lineWidth=10;c.beginPath();c.moveTo(127,78);c.quadraticCurveTo(122,48,138,24);c.stroke();
 c.strokeStyle='rgba(255,220,160,.45)';c.lineWidth=2.5;c.beginPath();c.moveTo(125,70);c.quadraticCurveTo(121,48,134,28);c.stroke();
 // daun hijau
 const leaf=new Path2D();leaf.moveTo(136,46);leaf.bezierCurveTo(152,12,192,8,208,24);leaf.bezierCurveTo(194,58,154,66,136,46);leaf.closePath();
 const lg=c.createLinearGradient(140,50,206,16);lg.addColorStop(0,'#2f7d32');lg.addColorStop(.55,'#5dbb4a');lg.addColorStop(1,'#a6e07a');c.fillStyle=lg;c.fill(leaf);c.strokeStyle='rgba(20,80,25,.45)';c.lineWidth=1.5;c.stroke(leaf);
 c.strokeStyle='rgba(255,255,255,.4)';c.lineWidth=2;c.beginPath();c.moveTo(138,47);c.quadraticCurveTo(170,40,202,24);c.stroke();
 c.strokeStyle='rgba(255,255,255,.18)';c.lineWidth=1.2;[[160,40,168,24],[176,36,186,22],[154,43,158,54],[172,40,180,52]].forEach(([a,b,x,y])=>{c.beginPath();c.moveTo(a,b);c.lineTo(x,y);c.stroke();});
 return cv;}
// ===== BENDA HITUNG LAIN (pisang, jeruk, wortel, bunga, bintang): ilustrasi halus non-pixel, selaras dengan apel =====
function objCanvas(draw){const cv=document.createElement('canvas');cv.width=cv.height=256;const c=cv.getContext('2d');c.imageSmoothingEnabled=true;draw(c);return cv;}
const oShadow=c=>{c.save();c.translate(128,238);c.scale(1,.15);const g=c.createRadialGradient(0,0,0,0,0,80);g.addColorStop(0,'rgba(60,25,10,.4)');g.addColorStop(1,'rgba(60,25,10,0)');c.fillStyle=g;c.beginPath();c.arc(0,0,80,0,7);c.fill();c.restore();};
const oLin=(c,x1,y1,x2,y2,st)=>{const g=c.createLinearGradient(x1,y1,x2,y2);st.forEach(([o,col])=>g.addColorStop(o,col));return g;};
const oRad=(c,x,y,r,st,x0=x,y0=y)=>{const g=c.createRadialGradient(x0,y0,0,x,y,r);st.forEach(([o,col])=>g.addColorStop(o,col));return g;};
const oLeaf=(c,x,y,rx,ry,rot)=>{c.save();c.translate(x,y);c.rotate(rot);c.fillStyle=oLin(c,-rx,0,rx,0,[[0,'#2f7d32'],[1,'#8fd467']]);c.beginPath();c.ellipse(0,0,rx,ry,0,0,7);c.fill();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2;c.beginPath();c.moveTo(-rx,0);c.lineTo(rx,0);c.stroke();c.restore();};
const OBJ_DRAW={
 apple:drawApple,
 banana:()=>objCanvas(c=>{oShadow(c);c.save();c.translate(128,134);c.scale(1.2,1.2);c.translate(-128,-134);const p=new Path2D();p.moveTo(70,62);p.bezierCurveTo(52,160,118,236,208,196);p.bezierCurveTo(222,190,216,172,200,174);p.bezierCurveTo(134,194,104,136,104,60);p.closePath();
  c.fillStyle=oLin(c,60,60,210,210,[[0,'#fff3a0'],[.45,'#ffd93a'],[1,'#e0a100']]);c.fill(p);c.strokeStyle='rgba(120,80,0,.4)';c.lineWidth=2;c.stroke(p);
  c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=7;c.lineCap='round';c.beginPath();c.moveTo(84,90);c.bezierCurveTo(80,150,112,200,170,206);c.stroke();
  c.strokeStyle='rgba(150,100,0,.3)';c.lineWidth=3;c.beginPath();c.moveTo(96,70);c.bezierCurveTo(100,130,130,172,190,184);c.stroke();
  c.fillStyle='#6b4a1e';c.beginPath();c.roundRect(72,40,32,26,6);c.fill();c.fillStyle='#4a2f10';c.beginPath();c.ellipse(208,187,10,7,-.3,0,7);c.fill();c.restore();}),
 orange:()=>objCanvas(c=>{oShadow(c);c.fillStyle=oRad(c,128,140,100,[[0,'#ffd88a'],[.4,'#ffa733'],[.8,'#ee7f0f'],[1,'#c25e00']],98,108);c.beginPath();c.arc(128,140,94,0,7);c.fill();
  for(let i=0;i<60;i++){const a=i*2.4,r=(i*37%80)+6;c.fillStyle='rgba(160,70,0,.22)';c.beginPath();c.arc(128+Math.cos(a)*r,140+Math.sin(a)*r*.95,1.6,0,7);c.fill();}
  c.fillStyle=oRad(c,150,170,90,[[0,'rgba(80,20,0,0)'],[1,'rgba(80,20,0,.22)']]);c.beginPath();c.arc(128,140,94,0,7);c.fill();
  c.save();c.translate(90,98);c.rotate(-.5);c.fillStyle=oRad(c,0,0,34,[[0,'rgba(255,255,255,.75)'],[1,'rgba(255,255,255,0)']]);c.scale(.6,1);c.beginPath();c.arc(0,0,34,0,7);c.fill();c.restore();
  c.fillStyle='#6b4a1e';c.beginPath();c.ellipse(128,48,9,6,0,0,7);c.fill();oLeaf(c,152,44,30,13,-.35);}),
 carrot:()=>objCanvas(c=>{oShadow(c);const p=new Path2D();p.moveTo(86,90);p.bezierCurveTo(82,160,122,214,140,240);p.bezierCurveTo(160,214,190,156,180,90);p.bezierCurveTo(160,72,106,72,86,90);p.closePath();
  c.fillStyle=oLin(c,86,80,186,230,[[0,'#ffb04d'],[.5,'#f2791a'],[1,'#c4510a']]);c.fill(p);c.save();c.clip(p);c.strokeStyle='rgba(150,60,0,.3)';c.lineWidth=3;
  [112,140,166,196].forEach((y,i)=>{c.beginPath();c.moveTo(80+i*6,y);c.quadraticCurveTo(133,y+10,190-i*6,y-2);c.stroke();});
  c.strokeStyle='rgba(255,230,180,.55)';c.lineWidth=8;c.beginPath();c.moveTo(104,100);c.quadraticCurveTo(100,150,124,200);c.stroke();c.restore();
  [[-.5,112],[0,132],[.5,154]].forEach(([r,x])=>oLeaf(c,x,56,12,34,r+Math.PI/2*0+0));}),
 flower:()=>objCanvas(c=>{oShadow(c);c.strokeStyle='#3f8f3a';c.lineWidth=10;c.lineCap='round';c.beginPath();c.moveTo(128,150);c.quadraticCurveTo(120,200,128,236);c.stroke();oLeaf(c,152,200,28,11,-.6);oLeaf(c,102,186,26,10,.6);
  for(let i=0;i<6;i++){c.save();c.translate(128,100);c.rotate(i*Math.PI/3);c.fillStyle=oRad(c,0,-44,40,[[0,'#ffe3ee'],[.6,'#ff8fb5'],[1,'#e0457f']],0,-30);c.beginPath();c.ellipse(0,-42,24,40,0,0,7);c.fill();c.restore();}
  c.fillStyle=oRad(c,128,100,26,[[0,'#fff6a8'],[.6,'#ffc72c'],[1,'#d98f00']],122,94);c.beginPath();c.arc(128,100,24,0,7);c.fill();c.fillStyle='rgba(160,90,0,.35)';[[120,96],[134,94],[126,108],[138,106],[118,106]].forEach(([x,y])=>{c.beginPath();c.arc(x,y,2,0,7);c.fill();});}),
 star:()=>objCanvas(c=>{oShadow(c);const p=new Path2D();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?46:104,x=128+Math.cos(a)*r,y=134+Math.sin(a)*r;i?p.lineTo(x,y):p.moveTo(x,y);}p.closePath();
  c.lineJoin='round';c.lineWidth=14;c.strokeStyle='#f0a000';c.stroke(p);c.fillStyle=oRad(c,128,134,104,[[0,'#fff7b0'],[.55,'#ffd93a'],[1,'#f5a300']],110,110);c.fill(p);c.lineWidth=2;c.strokeStyle='rgba(200,120,0,.5)';c.stroke(p);
  c.fillStyle='rgba(255,255,255,.7)';c.beginPath();c.ellipse(104,96,10,18,-.5,0,7);c.fill();})};
const _c={};
function sprite(n){if(_c[n])return _c[n];if(OBJ_DRAW[n])return _c[n]=OBJ_DRAW[n]();const m=getMap(n),c=document.createElement('canvas');c.width=m[0].length;c.height=m.length;const x=c.getContext('2d');
 m.forEach((row,j)=>[...row].forEach((ch,i)=>{if(ch!=='.'){x.fillStyle=PAL[ch];x.fillRect(i,j,1,1);}}));return _c[n]=c;}
const _objURL={};
const imgTag=n=>OBJ_DRAW[n]?`<img src="${_objURL[n]||(_objURL[n]=sprite(n).toDataURL())}" alt="${n}" style="image-rendering:auto">`:`<img src="${sprite(n).toDataURL()}" alt="${n}">`;
const COLORS={merah:'#e53935',biru:'#1e88e5',kuning:'#fdd835',hijau:'#43a047'};
const svgDot=c=>`<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${COLORS[c]}" stroke="#4a2c10" stroke-width="5"/></svg>`;
function svgShape(n){const c='#1e88e5',s={lingkaran:`<circle cx="50" cy="50" r="38" fill="${c}"/>`,segitiga:`<polygon points="50,12 90,86 10,86" fill="${c}"/>`,persegi:`<rect x="16" y="16" width="68" height="68" fill="${c}"/>`,'persegi panjang':`<rect x="6" y="28" width="88" height="44" fill="${c}"/>`,oval:`<ellipse cx="50" cy="50" rx="42" ry="28" fill="${c}"/>`,hati:`<path d="M50 86C16 60 8 40 18 26c10-14 28-10 32 4 4-14 22-18 32-4 10 14 2 34-32 60z" fill="${c}"/>`,bintang:`<polygon points="${[...Array(10)].map((_,i)=>{const a=-Math.PI/2+i*Math.PI/5,r=i%2?20:44;return (50+Math.cos(a)*r).toFixed(1)+','+(54+Math.sin(a)*r).toFixed(1);}).join(' ')}" fill="${c}"/>`}[n];
 return `<svg viewBox="0 0 100 100" stroke="#4a2c10" stroke-width="5" stroke-linejoin="round">${s}</svg>`;}
// ---- pembantu UI bersama ----
const ARROW='<svg class="ar" viewBox="0 0 24 24"><path d="M4 12h13M12 5l7 7-7 7" stroke="#4a2c10" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const btnSet=(b,t)=>{b.innerHTML=`<span>${t}</span>${ARROW}`;};
const setReady=(b,on)=>{b.disabled=!on;b.classList.toggle('ready',on);};
const Nav={until:0,su:0,ok(){if(Date.now()<this.until)return false;this.until=Date.now()+CONFIG.nextLockMs;return true;},   // anti double-tap untuk Lanjut
 skip(){if(Date.now()<this.su)return false;this.su=Date.now()+600;return true;}};   // Lewati: tidak tergantung tombol lain, hanya mencegah ketukan ganda
const rand=a=>a[Math.floor(Math.random()*a.length)];
