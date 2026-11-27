// ===== BANK SOAL + GENERATOR + RANDOMISASI TERKONTROL =====
// Setiap soal: id, level, cat (kategori), diff (1-3), text, vid (ID narasi), kind, answer, pool, meta, visual(), variant (identitas variasi)
const BANK={level1:[],level2:[],level3:[]};
const addQ=q=>BANK['level'+q.level].push(q);
const arrange=(spr,n,layout)=>{const im=imgTag(spr);
 if(layout==='row')return `<span class="ar1">${im.repeat(n)}</span>`;
 if(layout==='rows2'){const a=Math.ceil(n/2),b=n-a;return `<span class="ar2"><span>${im.repeat(a)}</span>${b?`<span>${im.repeat(b)}</span>`:''}</span>`;}
 if(layout==='pairs')return `<span class="arp">${im.repeat(n)}</span>`;
 const POS={1:[1],2:[0,5],3:[0,2,4],4:[0,2,3,5],5:[0,2,3,4,5]};return `<span class="ars">${[0,1,2,3,4,5].map(i=>POS[n].includes(i)?im:'<i></i>').join('')}</span>`;};
Object.keys(ANIMAL_SOUND).forEach(a=>addQ({id:'L1-animal-'+a,level:1,cat:'animal',diff:1,kind:'animal',text:VOICE_LINES[ID.animal(a)],vid:ID.animal(a),answer:a,pool:Object.keys(ANIMAL_SOUND),meta:{},variant:'animal:'+a}));
SHAPES.forEach((s,i)=>SHAPE_PHRASE.forEach((f,p)=>addQ({id:`L1-shape-${s}-${p}`,level:1,cat:'shape',diff:i<3?1:2,kind:'shape',text:f(s),vid:ID.shape(s,p),answer:s,pool:SHAPES,meta:{},variant:`shape:${s}:${p}`})));
PATTERNS.forEach((p,i)=>addQ({id:`L2-pattern-${i}`,level:2,cat:'pattern',diff:p.diff,kind:'color',text:'Warna apa yang melanjutkan pola ini?',vid:ID.pattern(i%2),answer:p.answer,pool:COLOR_NAMES,meta:{ptype:p.type,seq:p.seq},
 visual:()=>p.seq.map(svgDot).join('')+'<b>?</b>',variant:`pattern:${p.seq.join('-')}`}));
OBJECTS.forEach((o,oi)=>[1,2,3,4,5].forEach(n=>LAYOUTS.forEach((lay,li)=>{const ph=(oi+n+li)%3;
 addQ({id:`L2-count-${o}-${n}-${lay}`,level:2,cat:'count',diff:n<=2?1:n===3?2:3,kind:'num',text:COUNT_PHRASE[ph](o),vid:ID.count(o,ph),answer:String(n),pool:['1','2','3','4','5'],meta:{obj:o,n,layout:lay},
  visual:()=>arrange(OBJ_SPRITE[o],n,lay),variant:`count:${o}:${n}:${lay}`});})));
OBJECTS.forEach(o=>ADD_PAIRS.forEach(([a,b])=>addQ({id:`L3-add-${o}-${a}-${b}`,level:3,cat:'add',diff:a+b<=4?1:a+b<=6?2:3,kind:'num',text:`${a} + ${b} = ?`,vid:ID.add(a,b),answer:String(a+b),pool:[],meta:{obj:o,a,b,sum:a+b},
 visual:()=>`${arrange(OBJ_SPRITE[o],a,'row')}<b>+</b>${arrange(OBJ_SPRITE[o],b,'row')}<b>=</b><b>?</b>`,variant:`add:${o}:${a}:${b}`})));
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const makeChoices=q=>shuffle([q.answer,...shuffle(q.pool.filter(x=>x!==q.answer)).slice(0,2)]);      // 3 pilihan unik, jawaban benar SELALU ada, posisi diacak
function makeBubbles(q){const ans=+q.answer,n=[ans];while(n.length<5){const r=1+Math.floor(Math.random()*10);if(!n.includes(r))n.push(r);}return shuffle(n);}
function choiceHTML(kind,k){return kind==='animal'?imgTag(k):kind==='shape'?svgShape(k):kind==='color'?svgDot(k):`<span class="num">${k}</span>`;}
// ---- validasi soal sebelum ditampilkan ----
function validateQuestion(q){try{
 if(!q||!q.id||!q.text||!VOICE_LINES[q.vid]||!q.answer)return false;
 if(q.cat==='add'){if(q.meta.a+q.meta.b!==+q.answer||+q.answer>10||+q.answer<1)return false;const html=q.visual();if((html.match(/<img/g)||[]).length!==q.meta.a+q.meta.b)return false;
  if(!VOICE_LINES[q.vid].startsWith(NUM[q.meta.a]+' tambah '+NUM[q.meta.b]))return false;const b=makeBubbles(q);return new Set(b).size===5&&b.includes(+q.answer);}
 const ch=makeChoices(q);if(ch.length!==3||new Set(ch).size!==3||!ch.includes(q.answer))return false;
 if(q.cat==='count'){if((q.visual().match(/<img/g)||[]).length!==q.meta.n||q.meta.n!==+q.answer)return false;if(!VOICE_LINES[q.vid].includes(q.meta.obj))return false;}
 if(q.cat==='pattern'&&(q.meta.seq.length<3||!COLOR_NAMES.includes(q.answer)))return false;
 return true;}catch(e){return false;}}
// ---- pemilihan soal terkontrol (tanpa pengembalian + riwayat localStorage) ----
const HIST_MAX=30;
const histOf=lv=>Store.get('hist'+lv,[]);
function remember(lv,ids){Store.set('hist'+lv,[...histOf(lv),...ids].slice(-HIST_MAX));}
const rand1=a=>a[Math.floor(Math.random()*a.length)];
function clash(q,prev,chosen){if(chosen.some(c=>c.id===q.id||c.variant===q.variant))return true;
 if(q.cat==='add'&&chosen.some(c=>c.meta.sum===q.meta.sum&&Math.min(c.meta.a,c.meta.b)===Math.min(q.meta.a,q.meta.b)))return true;   // 1+2 dan 2+1 tidak dalam satu rangkaian
 if(!prev)return false;
 if(q.cat==='count'&&prev.cat==='count')return q.meta.obj===prev.meta.obj||q.meta.n===prev.meta.n;
 if(q.cat==='pattern'&&prev.cat==='pattern')return q.meta.ptype===prev.meta.ptype;
 if(q.cat==='add'&&prev.cat==='add')return q.meta.obj===prev.meta.obj||q.meta.sum===prev.meta.sum;
 return false;}
function chooseOne(pool,lv,prev,chosen,want){const hist=histOf(lv),ok=q=>validateQuestion(q);
 const tries=[q=>want(q)&&!hist.includes(q.id)&&!clash(q,prev,chosen),q=>want(q)&&!clash(q,prev,chosen),q=>!clash(q,prev,chosen),q=>!chosen.some(c=>c.id===q.id)];
 for(const f of tries){const c=pool.filter(q=>f(q));const v=shuffle(c).find(ok);if(v)return v;}return null;}
// Rangkaian soal untuk satu tantangan. lv=1: 1 soal | lv=2: 3 soal (pola + hitung) | lv=3: n soal penjumlahan bertahap
function buildSet(lv,n){const pool=BANK['level'+lv],chosen=[];
 if(lv===1){const last=Store.get('lastCat1',''),cat=rand1(['animal','shape'].filter(c=>c!==last).concat(['animal','shape'].filter(c=>c===last).slice(0,Math.random()<.3?1:0)));
  const q=chooseOne(pool,1,null,chosen,x=>x.cat===cat)||chooseOne(pool,1,null,chosen,()=>true);Store.set('lastCat1',q.cat);chosen.push(q);}
 else if(lv===2){const cats=shuffle(['pattern','count',rand1(['pattern','count'])]),dt=[1,2,3];
  cats.forEach((cat,i)=>{const q=chooseOne(pool,2,chosen[i-1],chosen,x=>x.cat===cat&&x.diff===dt[i])||chooseOne(pool,2,chosen[i-1],chosen,x=>x.cat===cat&&x.diff<=dt[i]+1);chosen.push(q);});}
 else{const R=[[2,4],[3,5],[4,6],[5,8],[3,6]];for(let i=0;i<n;i++){const[lo,hi]=R[Math.min(i,R.length-1)];
  chosen.push(chooseOne(pool,3,chosen[i-1],chosen,x=>x.meta.sum>=lo&&x.meta.sum<=hi));}}
 remember(lv,chosen.map(q=>q.id));return chosen;}
