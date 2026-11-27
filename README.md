# Misi Penyelamatan di Labirin Ajaib - V3 Final
Game edukatif 2D top-down (TK A, 4-5 tahun). HTML + CSS + JavaScript murni (Canvas). Tanpa build, npm, atau backend; langsung jalan di Vercel sebagai situs statis.

## Yang baru di V3
Menu utama (Mulai Petualangan, Langsung Bermain, Lihat Cerita, Cara Bermain, Pengaturan Suara); tombol **Lewati Cerita** dan **Lewati Petunjuk**; penyimpanan lokal; labirin lebih menantang (4 layout Level 1 13x13, 4 layout Level 2 19x19, kamera mengikuti, landmark, tombol Bantuan); bank soal besar (336 variasi) dengan generator, validasi, dan anti-pengulangan; 6 jenis benda hitung; apel realistis tetap dipakai.

## Struktur
- `index.html`, `style.css`
- `src/config.js` kecepatan, transisi, volume | `src/data.js` **data soal** | `src/mazes.js` **layout labirin + validator** | `src/voice-lines.js` **naskah suara**
- `src/questions.js` bank, generator, acak terkontrol | `src/storage.js` penyimpanan lokal | `src/sprites.js` gambar | `src/audio.js` musik & efek | `src/voice.js` narasi | `src/scenes.js` adegan cerita | `src/game.js` gameplay
- `tools/gen_mazes.py` perancang labirin (hanya untuk membuat layout baru; tidak dipakai saat bermain)
- `cek-labirin.html` lihat semua labirin + hasil validasi | `cek-suara.html` cek file suara
- `assets/voice/` tempat file suara narator (.mp3) | `docs/` tutorial, naskah suara, laporan

## Menambah / mengubah soal
Buka `src/data.js`: hewan (`ANIMAL_SOUND`), bentuk (`SHAPES`), pola (`COLOR_NAMES`), benda hitung (`OBJECTS`), pasangan penjumlahan (`ADD_PAIRS`). Soal baru butuh kalimat suara: tambahkan di `src/voice-lines.js` dan buat file mp3-nya (lihat docs/NASKAH-SUARA.md).

## Suara narator
Game memutar `assets/voice/<ID>.mp3`. Jika file belum ada, memakai suara bawaan browser (id-ID) sebagai cadangan; itu suara dewasa, bukan suara anak. Lihat `docs/PANDUAN-SUARA-ANAK.md`.
