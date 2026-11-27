// Penyimpanan lokal ringan (localStorage). Jika tidak tersedia, game tetap jalan memakai memori sementara.
const Store=(()=>{const K='labirin-v3';let mem={},ok=true;
 try{localStorage.setItem('__t','1');localStorage.removeItem('__t');mem=JSON.parse(localStorage.getItem(K)||'{}')||{};}catch(e){ok=false;mem={};}
 return{get:(k,d)=>mem[k]===undefined?d:mem[k],set(k,v){mem[k]=v;if(ok)try{localStorage.setItem(K,JSON.stringify(mem));}catch(e){}},get persistent(){return ok;}};})();
