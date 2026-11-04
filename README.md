# Portal PPDB
1. Buat Spreadsheet + folder Google Drive. Salin ID keduanya ke apps-script/Code.gs.
2. script.google.com > proyek baru > tempel Code.gs > Deploy > Web app (Execute as: Me, Access: Anyone) > izinkan akses.
3. Salin URL /exec ke js/config.js (API). Isi juga WA, kontak, biaya, jadwal.
4. Buka lembaga.html?l=mts. Set open:true di config.js saat pendaftaran dibuka.
5. Taruh brosur di assets/brosur/, rincian biaya (PDF) di assets/biaya/, gambar keperluan santri di assets/img/keperluan-santri.jpg.
Setiap kali Code.gs diubah, Deploy > Manage deployments > edit versi baru.
