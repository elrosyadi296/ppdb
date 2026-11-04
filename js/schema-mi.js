/* Skema form. Kolom di spreadsheet = nama field (k). Tambah/ubah field cukup di sini. */
(function () {
  const Y = ['Iya', 'Tidak'], N = n => Array.from({length: n}, (_, i) => String(i + 1));
  // f(key, label, tipe, opsi, opsional) tipe: t teks, e email, d tanggal, n angka(opsi=jumlah digit), p telp, s pilihan, r radio, x area, f file, c centang
  const f = (k, l, t, o, opt) => ({k, l, t: t || 't', o, opt}), yn = (k, l) => f(k, l, 'r', Y);
  const JOB = ['Tidak Bekerja','Pensiunan','PNS','TNI/Polisi','Guru/Dosen','Pegawai Swasta','Wiraswasta','Pengacara/Jaksa/Hakim/Notaris','Seniman/Pelukis/Artis/Sejenis','Dokter/Bidan/Perawat','Pilot/Pramugara','Pedagang','Petani/Peternak','Nelayan','Buruh (Tani/Pabrik/Bangunan)','Sopir/Masinis/Kondektur','Politikus','Lainnya'];
  const EDU = ['SD/Sederajat','SMP/Sederajat','SMA/Sederajat','D1','D2','D3','D4/S1','S2','S3','Tidak Bersekolah'];
  const INC = ['Di bawah Rp800.000','Rp800.000–Rp1.200.000','Rp1.200.000–Rp1.800.000','Rp1.800.000–Rp2.500.000','Rp2.500.000–Rp3.500.000','Rp3.500.000–Rp5.000.000','Rp5.000.000–Rp7.500.000','Rp7.500.000–Rp10.000.000','Rp10.000.000–Rp15.000.000','Di atas Rp15.000.000'];
  const HID = ['Masih hidup', 'Sudah meninggal', 'Tidak diketahui'];
  const P = (w, s, req) => [f('nik_' + w, 'No. KTP/NIK ' + s, 'n', 16), f('tl_' + w, 'Tempat lahir ' + s), f('tgl_' + w, 'Tanggal lahir ' + s, 'd'), f('kerja_' + w, 'Pekerjaan ' + s, 's', JOB), f('pend_' + w, 'Pendidikan terakhir ' + s, 's', EDU), f('hasil_' + w, 'Penghasilan ' + s + ' per bulan', 's', INC), f('hp_' + w, 'No. HP ' + s, 'p', 0, !req)];
  const alive = k => d => d[k] === 'Masih hidup';

  /* Contoh awal. Lengkapi / ubah sesuai kebutuhan formulir MI NU YAPIKA. */
  window.SCHEMA = { title: 'Formulir Pendaftaran MI NU YAPIKA', sections: [
    {t: 'Informasi Pendaftaran', f: [f('email', 'Email address', 'e'), f('jenis', 'Jenis pendaftaran', 'r', ['Siswa baru', 'Pindahan'])]},
    {t: 'Identitas Calon Siswa', f: [f('nama', 'Nama lengkap'), f('tempat_lahir', 'Tempat lahir'), f('tgl_lahir', 'Tanggal lahir', 'd'), f('jk', 'Jenis kelamin', 'r', ['Laki-laki', 'Perempuan']), f('nik', 'NIK', 'n', 16), f('nama_asal', 'Nama sekolah/TK asal', 't', 0, 1), f('alamat', 'Alamat lengkap'), f('hp', 'Nomor HP', 'p')]},
    {t: 'Data Orang Tua', f: [f('no_kk', 'Nomor Kartu Keluarga (KK)', 'n', 16), f('ayah', 'Nama ayah'), f('ibu', 'Nama ibu'), f('kerja_ayah', 'Pekerjaan ayah', 's', JOB), f('kerja_ibu', 'Pekerjaan ibu', 's', JOB)]},
    {t: 'Pernyataan & Persetujuan', f: [f('setuju', 'SETUJU – Saya bertanggung jawab bahwa data yang saya kirim adalah benar dan berlaku di muka hukum dan peraturan yang ada!', 'c')]}
  ]};
})();
