// ===== DATA BANK SOAL (tanpa logika). Tambah/ubah isi tabel di sini. Peta labirin ada di mazes.js =====
const NUM=['nol','satu','dua','tiga','empat','lima','enam','tujuh','delapan','sembilan','sepuluh'];
// LEVEL 1 - hewan: nama (gambar harus ada di sprites.js) : bunyi          -> 10 variasi
const ANIMAL_SOUND={kucing:'meong',anjing:'guk guk',ayam:'kukuruyuk',sapi:'moo',bebek:'kwek kwek',kambing:'mbek',babi:'oink',kuda:'ihihi',burung:'cuit cuit',singa:'aum'};
// LEVEL 1 - bentuk geometri (gambar: svgShape di sprites.js) x 2 kalimat   -> 14 variasi
const SHAPES=['lingkaran','segitiga','persegi','persegi panjang','bintang','hati','oval'];
const SHAPE_PHRASE=[s=>`Manakah bentuk ${s}?`,s=>`Ketuk bentuk ${s}!`];
// LEVEL 2 - pola warna (dibuat dari 4 warna, tingkat: 1 mudah, 2 sedang, 3 lanjut) -> 60 variasi
const COLOR_NAMES=['merah','biru','kuning','hijau'];
const PATTERN_PHRASE=['Lengkapi polanya. Warna apa yang selanjutnya?','Perhatikan warnanya. Warna apa yang cocok di tempat tanda tanya?'];
const PATTERNS=[];
COLOR_NAMES.forEach(a=>COLOR_NAMES.forEach(b=>{if(a===b)return;
 PATTERNS.push({type:'ABA',diff:1,seq:[a,b,a],answer:b});PATTERNS.push({type:'ABAB',diff:1,seq:[a,b,a,b],answer:a});
 PATTERNS.push({type:'AABAA',diff:2,seq:[a,a,b,a,a],answer:b});
 COLOR_NAMES.forEach(c=>{if(c!==a&&c!==b)PATTERNS.push({type:'ABCAB',diff:3,seq:[a,b,c,a,b],answer:c});});}));
// LEVEL 2 - menghitung: benda (nama gambar di sprites.js), jumlah 1-5, susunan, kalimat  -> 6 x 5 x 4 = 120 variasi
const OBJECTS=['apel','pisang','jeruk','wortel','bunga','bintang'];
const OBJ_SPRITE={apel:'apple',pisang:'banana',jeruk:'orange',wortel:'carrot',bunga:'flower',bintang:'star'};
const COUNT_PHRASE=[o=>`Ada berapa ${o} pada gambar?`,o=>`Yuk, hitung jumlah ${o}!`,o=>`Berapa banyak ${o} yang kamu lihat?`];
const LAYOUTS=['row','rows2','pairs','spread'];     // satu baris, dua baris, dua kolom, menyebar teratur
// LEVEL 3 - penjumlahan a+b (1..5, hasil maksimal 8) x 6 benda                     -> 22 x 6 = 132 variasi
const ADD_PAIRS=[];for(let a=1;a<=5;a++)for(let b=1;b<=5;b++)if(a+b<=8)ADD_PAIRS.push([a,b]);
// ID narasi (nama file suara = ID + .mp3)
// (ID yang sama dengan V2 dipertahankan agar file suara lama tetap terpakai)
const ID={animal:a=>'q-animal-'+a,shape:(s,p)=>'q-shape-'+s.replace(' ','-')+(p?'-b':''),count:(o,p)=>o==='apel'&&p===0?'q-count':`q-cnt-${o}-${p+1}`,pattern:p=>p?'q-pattern-2':'q-pattern',add:(a,b)=>`q-add-${a}-${b}`};
// Peta kecil untuk adegan prolog (BUKAN labirin permainan)
const LEVEL_MAPS=[['###########','#S..#.....#','#.#.#.###.#','#.#...#...#','#.#####.###','#.....#...#','###.#.#.#D#','#...#...#R#','###########']];
