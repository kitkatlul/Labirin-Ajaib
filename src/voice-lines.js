// ===== NASKAH SUARA: ID -> kalimat. Nama file audio = ID + ".mp3" di folder assets/voice/ =====
const VOICE_LINES={
 'p1':'Halo, teman-teman! Hari ini kita akan berpetualang ke sebuah tempat yang sangat ajaib. Namanya adalah Labirin Ajaib!',
 'p2':'Di dalam labirin ini, ada seekor kelinci kecil yang sedang terjebak. Kelinci itu ingin sekali keluar, tetapi jalannya tertutup oleh pintu yang terkunci.',
 'p3':'Untungnya, ada seekor monyet pemberani yang siap membantu! Tapi, untuk menyelamatkan kelinci, kita harus melewati labirin dan menjawab beberapa pertanyaan.',
 'p4':'Nah, teman-teman, mau ikut membantu monyet menyelamatkan kelinci? Yuk, kita mulai petualangannya! Ayo, cari jalan yang benar dan selesaikan semua tantangannya!',
 'l1b':'Yuk, bantu monyet mencari kelinci! Perhatikan jalan di dalam labirin. Kalau menemukan jalan buntu, coba kembali dan pilih jalan yang lain. Jika menemukan pintu terkunci, jawab pertanyaannya dengan benar, ya!',
 'ctl':'Tekan tombol panah untuk menggerakkan monyet. Di laptop, kamu bisa pakai tombol panah atau W A S D.',
 'guide':'Cari jalan di dalam labirin. Kalau ada pintu terkunci, jawab pertanyaannya. Kumpulkan bintang sebanyak-banyaknya!',
 'l2b':'Hebat! Kelinci sudah berhasil diselamatkan. Sekarang, kita harus mencari jalan keluar. Labirinnya lebih besar, jadi perhatikan setiap jalan dengan baik. Yuk, selesaikan tantangan pola warna dan menghitung benda!',
 'l3b':'Wah, ada Monster Penjaga di depan kita! Jangan takut, ya! Kita bisa melewatinya dengan menjawab soal penjumlahan. Hitung semua benda, lalu pilih gelembung yang berisi angka yang benar!',
 'search':'Ayo, kita cari jalan yang benar!',
 'help-dead':'Hmm, jalan ini buntu. Yuk, kembali dan coba jalan yang lain!',
 'help-junc':'Coba perhatikan persimpangannya. Kira-kira kita harus ke mana, ya?',
 'help-look':'Ayo, lihat sekeliling. Ada jalan yang belum kita coba?',
 'help-try':'Yuk, coba jalan yang lain!',
 'quiz-ins':'Ketuk gambar jawaban yang benar, ya!',
 'door-open':'Pintunya terbuka!',
 'pr1':'Hebat sekali!','pr2':'Jawabanmu benar!','pr3':'Wah, kamu pintar!','pr4':'Bagus sekali!',
 'r1':'Coba lagi ya!','r2':'Sedikit lagi! Kamu pasti bisa!',
 'rescue-n':'Kamu berhasil menyelamatkan kelinci!',
 'rescue-r':'Terima kasih, Monyet! Kamu baik sekali!',
 'w1':'Hore! Kamu mendapat bintang! Yuk, lanjut ke Level dua!',
 'w2':'Keren! Jalan menuju Monster Penjaga sudah terbuka!',
 'w3':'Monster Penjaga sudah pergi! Kamu hebat sekali!',
 'm-hi':'Halo! Aku Monster Penjaga. Ayo kita main tebak angka!',
 'm-bye':'Aku pergi dulu, ya! Sampai jumpa!',
 'final':'Selamat! Kamu berhasil menyelesaikan permainan!'};
Object.keys(ANIMAL_SOUND).forEach(a=>VOICE_LINES[ID.animal(a)]=`Hewan apa yang bersuara ${ANIMAL_SOUND[a]}?`);
SHAPES.forEach(s=>SHAPE_PHRASE.forEach((f,p)=>VOICE_LINES[ID.shape(s,p)]=f(s)));
PATTERN_PHRASE.forEach((t,p)=>VOICE_LINES[ID.pattern(p)]=t);
OBJECTS.forEach(o=>COUNT_PHRASE.forEach((f,p)=>VOICE_LINES[ID.count(o,p)]=f(o)));
ADD_PAIRS.forEach(([a,b])=>VOICE_LINES[ID.add(a,b)]=`${NUM[a]} tambah ${NUM[b]} sama dengan berapa?`);
