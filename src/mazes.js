// ===== LAYOUT LABIRIN (sudah divalidasi) =====
// Legenda: # dinding, . jalan, S awal, D pintu terkunci, R kelinci (Level 1), E gerbang keluar (Level 2),
// r m s = penanda landmark (batu, jamur, tunggul) di persimpangan - tetap bisa dilewati.
// Dibuat oleh tools/gen_mazes.py (perancang labirin terkontrol), BUKAN diacak saat bermain.
const MAZES={
 level1:[
 {name:"L1-1",grid:["#############", "#S..#.#.....#", "###.#.#.###.#", "#...#..r..#.#", "#.#########.#", "#..........m#", "###########.#", "#R#....s..#.#", "#D#.###.###.#", "#.#...#.#...#", "#.###.#.#.###", "#.....#..r..#", "#############"]},
 {name:"L1-2",grid:["#############", "#...#......S#", "#.#.#.#######", "#.#.#.....#.#", "#D#.#####.#.#", "#R#.....#..r#", "#######.###.#", "#......m..#.#", "#.#####.###.#", "#s..#...#...#", "#.#.#####.###", "#.#......r..#", "#############"]},
 {name:"L1-3",grid:["#############", "#.......#...#", "#.#####.#.#.#", "#.#RD.#.#.#.#", "#.###.#.###.#", "#r..#.#...#.#", "#.#.#.###.#.#", "#.#.#m..#..s#", "#.#.#.#.###.#", "#.#.#.#.#...#", "###.#.###.###", "#S..#....r..#", "#############"]},
 {name:"L1-4",grid:["#############", "#..r..#.....#", "###.#.#.###.#", "#...#.#...#.#", "#.###.#D###.#", "#.#...#R#..s#", "#.#.#####.#.#", "#.#.#.....#.#", "#.#.#.#######", "#.#...#.....#", "#.#####.###.#", "#......r..#S#", "#############"]}],
 level2:[
 {name:"L2-1",grid:["###################", "#S.....r.m....#...#", "#.#####.#.#####.#.#", "#.....#.#s......#.#", "#####.###.#######.#", "#...#..r.m..#....s#", "#.#.###.#####.###.#", "#.#r..#.......#.#.#", "#.#.#.#########.#.#", "#.#.#...#......m#.#", "#D#.###.#.#####.#.#", "#E#...#.#s.r....#.#", "#####.###.#.#####.#", "#.....#...#.....#.#", "#.#####.#######.#.#", "#m......#...#.#.#.#", "#.#######.#.#.#.#.#", "#........s.r..#...#", "###################"]},
 {name:"L2-2",grid:["###################", "#..r..#.......#..S#", "###.#.#.#####.#.###", "#...#.#.....#...#.#", "#.#########.#####.#", "#m..#..s..#......r#", "#.#.#.#.#########.#", "#.#...#.#.....#...#", "#.#####.#.###.#.###", "#.#..m.s#...#...#.#", "#.#.#.#.###.#####.#", "#.#.#.#.....#..r.m#", "#.#.#.#########.#.#", "#.#s.r.m.....s..#.#", "#.#.###.#####.###.#", "#r..#.#.....#.#...#", "#.###.#####.#.#.###", "#....m.....s..#.DE#", "###################"]},
 {name:"L2-3",grid:["###################", "#....r...m......#.#", "#.###.###.#####.#.#", "#.#...#..s....#.#.#", "#.#####.#####.#.#.#", "#r.m.s..#...#.#..r#", "#.#.#.###.#.#.###.#", "#m.s.r....#.#.#...#", "#.###########.#.###", "#...#.#...#...#...#", "###.#.#.#.#.#####.#", "#..m..#.#.#.#.DE#.#", "#.#####.#.#.#.###.#", "#.#.#...#...#.#...#", "#.#.#.#######.#.###", "#s..#.#.......#.#.#", "#.###.#.#######.#.#", "#S....#........r..#", "###################"]},
 {name:"L2-4",grid:["###################", "#...#.#........r..#", "#.#.#.#.#######.#.#", "#.#.#...#.......#.#", "#.#.#####.#######.#", "#m.s#.....#..r..#.#", "#.#.#.#####.#.###.#", "#.#...#...#.#.#...#", "#.#####.#.#.#.#.###", "#m..#...#.#.#s..#.#", "#.#.#.###.#.#.###.#", "#.#.#...#..r.m...s#", "#.#.###.#########.#", "#r..#ED...#..s..#.#", "#.#########.#.#.#.#", "#.#.......#..r#.#.#", "#.#.#####.###.#.###", "#..m....#.....#..S#", "###################"]}]};
const WALKABLE='.SRErms';
// Validasi: BFS dari S sampai pintu D dan tujuan (R/E); tidak ada ruang kosong 2x2; semua jalur 1 petak.
function validateMaze(grid){const H=grid.length,W=grid[0].length,at=(x,y)=>(grid[y]||'')[x]||'#';let S,D,G;
 grid.forEach((r,y)=>[...r].forEach((c,x)=>{if(c==='S')S=[x,y];if(c==='D')D=[x,y];if(c==='R'||c==='E')G=[x,y];}));
 if(!S||!D||!G)return{ok:false,why:'S/D/tujuan tidak ada'};
 const open=(x,y)=>at(x,y)!=='#',seen={},q=[S];seen[S]=0;
 while(q.length){const[x,y]=q.shift();for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(open(nx,ny)&&!(nx+','+ny in seen)){seen[nx+','+ny]=seen[x+','+y]+1;q.push([nx,ny]);}}}
 seen[S]=undefined;const dist=(p)=>{const s={};const qq=[S];s[S]=0;while(qq.length){const[x,y]=qq.shift();for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(open(nx,ny)&&!((nx+','+ny) in s)){s[nx+','+ny]=s[x+','+y]+1;qq.push([nx,ny]);}}}return s[p[0]+','+p[1]];};
 const dd=dist(D),dg=dist(G);if(dd==null||dg==null)return{ok:false,why:'pintu/tujuan tidak terjangkau'};
 // pintu harus bisa didekati dari petak jalan (bukan hanya dari sisi kelinci)
 let near=false;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const p=[D[0]+dx,D[1]+dy],c=at(p[0],p[1]);if(c!=='#'&&c!=='R'&&c!=='E'){const s=dist(p);if(s!=null&&s<dd)near=true;}}
 if(!near)return{ok:false,why:'pintu tidak bisa didekati'};
 // tanpa D, tujuan TIDAK boleh terjangkau (pintu wajib dibuka lewat kuis)
 const g2=grid.map(r=>r.replace('D','#')),o2=(x,y)=>((g2[y]||'')[x]||'#')!=='#',s2={},q2=[S];s2[S]=1;
 while(q2.length){const[x,y]=q2.shift();for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(o2(nx,ny)&&!s2[nx+','+ny]){s2[nx+','+ny]=1;q2.push([nx,ny]);}}}
 if(s2[G[0]+','+G[1]])return{ok:false,why:'tujuan terjangkau tanpa pintu'};
 for(let y=0;y<H-1;y++)for(let x=0;x<W-1;x++)if(open(x,y)&&open(x+1,y)&&open(x,y+1)&&open(x+1,y+1))return{ok:false,why:'ada ruang terbuka 2x2'};
 return{ok:true,pathLen:dg};}
