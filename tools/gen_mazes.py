# Generator labirin TERKONTROL (bukan acak saat bermain): hasilnya divalidasi lalu disimpan sebagai data tetap di src/mazes.js
import random,collections,json,sys
def gen(cw,ch,seed,loops,corner):
    r=random.Random(seed);W,H=2*cw+1,2*ch+1;g=[['#']*W for _ in range(H)]
    sx,sy=corner;st=[(sx,sy)];vis={(sx,sy)};g[2*sy+1][2*sx+1]='.'
    while st:
        x,y=st[-1];nb=[(x+dx,y+dy,dx,dy) for dx,dy in((1,0),(-1,0),(0,1),(0,-1)) if 0<=x+dx<cw and 0<=y+dy<ch and (x+dx,y+dy) not in vis]
        if nb:
            nx,ny,dx,dy=r.choice(nb);g[2*y+1+dy][2*x+1+dx]='.';g[2*ny+1][2*nx+1]='.';vis.add((nx,ny));st.append((nx,ny))
        else:st.pop()
    S=(2*sx+1,2*sy+1)
    def bfs(src):
        d={src:0};q=collections.deque([src])
        while q:
            x,y=q.popleft()
            for dx,dy in((1,0),(-1,0),(0,1),(0,-1)):
                n=(x+dx,y+dy)
                if g[n[1]][n[0]]!='#' and n not in d:d[n]=d[(x,y)]+1;q.append(n)
        return d
    d=bfs(S);cells=[p for p in d if p[0]%2==1 and p[1]%2==1 and p!=S]
    G=max(cells,key=lambda p:(d[p],r.random()))
    nbrs=[(G[0]+dx,G[1]+dy) for dx,dy in((1,0),(-1,0),(0,1),(0,-1)) if g[G[1]+dy][G[0]+dx]!='#']
    if len(nbrs)!=1:return None
    Dt=nbrs[0]
    # jalur alternatif (loop): buka beberapa dinding antar-sel, jauh dari pintu
    cand=[(x,y) for y in range(1,H-1) for x in range(1,W-1) if g[y][x]=='#' and ((x%2==0 and y%2==1) or (x%2==1 and y%2==0)) and abs(x-Dt[0])+abs(y-Dt[1])>4]
    r.shuffle(cand);k=0
    for x,y in cand:
        if k>=loops:break
        a,b=((x-1,y),(x+1,y)) if x%2==0 else ((x,y-1),(x,y+1))
        if g[a[1]][a[0]]!='#' and g[b[1]][b[0]]!='#':g[y][x]='.';k+=1
    return g,S,G,Dt
def metrics(g,S,G,Dt):
    H,W=len(g),len(g[0]);walk=lambda x,y:g[y][x]!='#'
    deg={(x,y):sum(walk(x+dx,y+dy) for dx,dy in((1,0),(-1,0),(0,1),(0,-1))) for y in range(H) for x in range(W) if walk(x,y)}
    J=[p for p,v in deg.items() if v>=3];DE=[p for p,v in deg.items() if v==1 and p not in(S,G)]
    prev={S:None};q=collections.deque([S])
    while q:
        p=q.popleft()
        for dx,dy in((1,0),(-1,0),(0,1),(0,-1)):
            n=(p[0]+dx,p[1]+dy)
            if walk(*n) and n not in prev:prev[n]=p;q.append(n)
    path=[];p=G
    while p:path.append(p);p=prev[p]
    path=path[::-1];turns=sum(1 for i in range(2,len(path)) if (path[i][0]-path[i-1][0],path[i][1]-path[i-1][1])!=(path[i-1][0]-path[i-2][0],path[i-1][1]-path[i-2][1]))
    return dict(junc=len(J),dead=len(DE),plen=len(path),turns=turns,J=J,path=path)
def pack(g,S,G,Dt,kind):
    g=[r[:] for r in g];m=metrics(g,S,G,Dt);
    sol=set(m['path'])
    for i,p in enumerate(m['J']):
        if p not in(S,) and abs(p[0]-Dt[0])+abs(p[1]-Dt[1])>1:g[p[1]][p[0]]='rms'[i%3]      # landmark di persimpangan
    g[S[1]][S[0]]='S';g[Dt[1]][Dt[0]]='D';g[G[1]][G[0]]='R' if kind==1 else 'E'
    return [''.join(r) for r in g],m
out={}
for kind,cw,loops,lim in((1,6,0,dict(j=(4,7),d=(3,6),p=(48,64))),(2,9,4,dict(j=(10,22),d=(6,12),p=(80,140)))):
    pick=[];seed=1;corners=[(0,0),(cw-1,0),(0,cw-1),(cw-1,cw-1)]
    while len(pick)<4 and seed<20000:
        c=corners[len(pick)%4];res=gen(cw,cw,seed*7+kind,loops,c);seed+=1
        if not res:continue
        g,S,G,Dt=res;m=metrics(g,S,G,Dt)
        if lim['j'][0]<=m['junc']<=lim['j'][1] and lim['d'][0]<=m['dead']<=lim['d'][1] and lim['p'][0]<=m['plen']<=lim['p'][1]:
            rows,m=pack(g,S,G,Dt,kind);pick.append(dict(name=f'L{kind}-{len(pick)+1}',grid=rows,j=m['junc'],d=m['dead'],p=m['plen'],t=m['turns']))
    out[kind]=pick
    for x in pick:print(kind,x['name'],'junc',x['j'],'dead',x['d'],'path',x['p'],'turns',x['t'],len(x['grid'][0]),'x',len(x['grid']))
json.dump(out,open('/home/claude/mazes.json','w'))
