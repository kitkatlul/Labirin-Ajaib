# Membuat Suara Narator Anak (TTS) - V3
Saya (Claude) tidak bisa membuat file suara di lingkungan ini; bagian ini Anda kerjakan. Game sudah siap memutar file Anda.
**Kabar baik:** dari 96 kalimat V3, **45 sama dengan V2** (status TETAP). Jika file V2 Anda sudah ada, jangan dibuat ulang; cukup buat **51 kalimat BARU**.
1. Buka `docs/NASKAH-SUARA.md` (atau `naskah-suara.csv`). Kolom *Status* menunjukkan TETAP atau BARU.
2. Pakai layanan TTS (mis. ElevenLabs atau sejenis) dengan **suara anak/ceria berbahasa Indonesia**, lisensi yang boleh dipakai untuk game/pendidikan, dan **suara yang SAMA** dengan file V2. Cek lisensi dan biaya sendiri; jangan taruh API key di file game.
3. Simpan tiap kalimat BARU sebagai **mp3**, nama persis `ID.mp3` (contoh `l1b.mp3`, `q-cnt-pisang-1.mp3`).
4. Unggah ke folder `assets/voice/` di GitHub (Add file -> Upload files).
5. Buka `alamat-situs-anda/cek-suara.html` untuk melihat file mana yang ADA / BELUM ADA.
File yang belum ada tidak membuat game macet; suara bawaan browser dipakai sementara. Soal baru (hewan baru, bentuk baru, benda hitung baru) tetap tampil benar; hanya suaranya yang memakai cadangan sampai file dibuat.
