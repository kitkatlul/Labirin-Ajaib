# Laporan Pengujian V3 (jujur)
## Sudah diuji otomatis (Chromium, layar HP 390x844 dan desktop 1280x720)
- **Alur lengkap sampai selesai:** menu -> Cara Bermain; Lihat Cerita + Lewati Cerita; Mulai Petualangan -> Lewati Cerita -> intro Level 1 -> Lewati Petunjuk; tombol Bantuan; Level 1 diselesaikan lewat jalur terhitung (layout acak terpilih), kuis, adegan penyelamatan, reward; Level 2 diselesaikan penuh dari awal (98 langkah, kuis 3 soal, gerbang, reward); Level 3 (4 soal, 4 hati, monster pergi, reward); halaman akhir; kembali ke menu. Tidak ada error JavaScript. Halaman tidak bergulir.
- **Skip:** narasi prolog berhenti seketika saat Lewati Cerita ditekan (diuji dengan TTS tiruan yang sedang membaca; `speechSynthesis.cancel` terpanggil); narasi intro berhenti saat Lewati Petunjuk; ketukan ganda Lanjut hanya maju satu adegan.
- **Penyimpanan lokal:** setelah memuat ulang, tombol utama berganti ke Langsung Bermain dan prolog tidak diputar otomatis; riwayat soal tersimpan; dengan localStorage diblokir, game tetap berjalan.
- **Labirin:** 8 layout lolos validasi BFS (awal, pintu, tujuan terjangkau; tujuan tidak terjangkau tanpa pintu; tidak ada ruang terbuka 2x2). Lihat `cek-labirin.html`.
- **Bank soal:** 336 variasi (24 + 180 + 132), 0 soal tidak valid, 0 ID ganda. 600 simulasi permainan: tidak ada soal ganda dalam satu rangkaian, benda dan jumlah tidak berturut-turut sama, 1+2 dan 2+1 tidak muncul bersamaan, jawaban benar selalu tersedia, jumlah gambar = angka soal, posisi jawaban benar tersebar merata, riwayat mengurangi pengulangan.
- **Regresi visual:** 17 sprite lama dan apel realistis identik dengan versi sebelumnya (dibandingkan piksel demi piksel).
## Belum bisa diuji / diverifikasi
1. **File suara narator anak belum ada** (Anda yang membuat; 51 baru). Tanpa itu game memakai suara bawaan browser (dewasa). Karena itu juga: kesesuaian suara dengan gambar pada soal baru baru bisa dinilai setelah file dibuat.
2. Pendengaran langsung musik, efek suara, dan TTS tidak bisa saya lakukan.
3. Safari iPhone/iPad, Chrome Android asli, Edge belum diuji. Autoplay audio ditangani lewat tombol di menu, belum dicoba di Safari iOS.
4. Deploy ke Vercel belum saya lakukan.
5. **Evaluasi kesesuaian untuk anak 4-5 tahun adalah evaluasi desain dan teknis, bukan uji pengguna anak.** Belum ada bukti bahwa game meningkatkan kemampuan berpikir kritis. Tingkat kesulitan labirin (terutama Level 2, 19x19, jalur 80-100 petak) perlu dicoba bersama anak; angkanya dapat disetel dengan layout/ukuran lain.
6. Metrik Level 2 melebihi acuan persimpangan (13-15 dibanding acuan 6-10) karena jalur alternatif dihitung; jalan buntu 6-7 dan panjang jalur sesuai acuan. Level 1: 4 persimpangan dan 3-5 jalan buntu sesuai acuan.
7. Petunjuk memutar layar tidak dibuat (tampilan potret terlihat nyaman pada pengujian).
Game tidak dinyatakan bebas bug.
## Kriteria penerimaan (hanya yang terverifikasi dicentang)
Labirin: [x] L1 menantang [x] L2 lebih kompleks [x] persimpangan & jalan buntu [x] bisa kembali [x] semua layout selesai [x] collision [x] tanpa hukuman/waktu [ ] kesesuaian usia (perlu uji anak).
Skip: [x] semua item (diuji otomatis).
Bank soal: [x] bervariasi, tidak monoton, jawaban benar tersedia, ilustrasi sesuai [ ] narasi sesuai gambar untuk soal baru (menunggu file suara).
Apel: [x] semua.
Fitur utama: [x] Level 1-3, monyet, pintu/kuis, kelinci, monster, gelembung, reward, Lanjut, responsif (HP & desktop) [ ] narasi anak (menunggu file) [ ] musik/efek (belum didengar).
Penyerahan: [x] source, aset visual, ZIP, daftar file, tutorial, laporan [ ] aset audio narasi (belum ada) [ ] deploy Vercel (belum dilakukan).
