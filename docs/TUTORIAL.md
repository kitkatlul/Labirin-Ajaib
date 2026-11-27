# Tutorial Update ke V3 (GitHub + Vercel), tanpa terminal
## Tahap 1 - Persiapan
1. Unduh `Misi-Penyelamatan-Labirin-Ajaib-V3-Final.zip` (lengkap) lalu ekstrak. Folder utama adalah yang berisi `index.html` dan folder `src`. Alternatif: `...-V3-HANYA-PERUBAHAN.zip` berisi hanya file yang berubah/baru (lihat `docs/DAFTAR-FILE-DIUBAH.md`).
2. **Cadangan:** di GitHub buka repository -> **Code** -> **Download ZIP**. Simpan.
## Tahap 2 - Update GitHub
1. github.com -> buka repository game. Branch Vercel: Vercel -> proyek -> **Settings -> Git -> Production Branch** (biasanya `main`); samakan dengan branch di GitHub.
2. **Add file -> Upload files**. Seret isi folder (atau isi paket perubahan). File bernama sama otomatis tertimpa. File BARU: `src/mazes.js`, `src/storage.js`, `cek-labirin.html`, `tools/`.
3. Tulis pesan "Update V3" -> **Commit changes**.
4. Tidak ada file yang wajib dihapus. Jangan hapus `assets/voice/` beserta file suara Anda.
5. Cek: `index.html`, `src`, `assets` terlihat langsung di halaman utama repository.
## Tahap 3 - Vercel
1. vercel.com -> **Continue with GitHub** -> buka proyek yang sama. **Deployments**: tunggu **Ready**.
2. **Settings -> Build & Development**: Framework **Other**, Build Command dan Output Directory kosong. URL lama tetap karena proyek sama.
3. Error: buka deployment -> **Build Logs**; penyebab umum `index.html` berada di dalam folder lain.
## Tahap 4 - Verifikasi
Buka URL di HP (muat ulang keras). Periksa: menu 5 tombol; **Langsung Bermain** langsung ke Level 1; **Lihat Cerita** + **Lewati Cerita** (suara berhenti); intro + **Lewati Petunjuk**; tombol **?** memberi bantuan; labirin Level 1 dan 2 (kamera bergerak, ada jalan buntu); soal hitung berganti benda (apel, pisang, jeruk, wortel, bunga, bintang); soal penjumlahan; apel realistis; musik dan suara; reward; halaman akhir. Buka `/cek-labirin.html` untuk melihat semua labirin dan `/cek-suara.html` untuk status file suara.
## Tahap 5 - Alternatif: repository baru
GitHub -> **+ -> New repository** -> **uploading an existing file** -> seret isi folder -> **Commit changes**. Vercel -> **Add New -> Project -> Import** -> Framework **Other** -> **Deploy**.
## Suara
Ikuti `docs/PANDUAN-SUARA-ANAK.md`: buat 51 file BARU saja.
