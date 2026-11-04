(function () {
  const B = document.body.dataset, C = window.CFG || {}, $ = s => document.querySelector(s), secs = [...document.querySelectorAll('.tp')];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  $('#tabs').innerHTML = secs.map(s => '<a href="#' + s.id + '" data-id="' + s.id + '">' + s.dataset.t + '</a>').join('');
  let cekDone = false;
  function show() {
    const h = location.hash.slice(1), id = secs.some(s => s.id === h) ? h : secs[0].id;
    secs.forEach(s => s.hidden = s.id !== id);
    document.querySelectorAll('#tabs a').forEach(a => {
      const on = a.dataset.id === id; a.classList.toggle('on', on);
      if (on) { a.setAttribute('aria-current', 'page'); a.scrollIntoView({inline: 'center', block: 'nearest'}); } else a.removeAttribute('aria-current');
    });
    if (id === 'cek' && !cekDone) { cekDone = true; loadCek(); }
  }
  addEventListener('hashchange', show); show();

  function loadCek() {
    const box = $('#cek-box'); if (!box) return;
    if (!C.API) { box.innerHTML = '<p class="muted">Data belum tersambung (API belum diatur).</p>'; return; }
    fetch(C.API + '?action=list&l=' + B.l).then(r => r.json()).then(j => {
      if (!j.ok) throw 0;
      box.innerHTML = '<div class="box"><div class="big">' + j.total + '</div><span class="muted">pendaftar ' + esc(B.n) + '</span></div><input class="srch" id="q" placeholder="Cari nama atau asal sekolah…" aria-label="Cari"><div class="box wrap"><table class="tbl"><thead><tr><th>No</th><th>Nama Peserta</th><th>Asal Sekolah</th></tr></thead><tbody id="tb"></tbody></table></div>';
      const draw = q => { $('#tb').innerHTML = j.rows.filter(r => (r.nama + ' ' + r.asal).toLowerCase().includes(q)).map((r, i) => '<tr><td>' + (i + 1) + '</td><td>' + esc(r.nama) + '</td><td>' + esc(r.asal) + '</td></tr>').join('') || '<tr><td colspan="3" class="muted">Tidak ada data.</td></tr>'; };
      draw(''); $('#q').oninput = e => draw(e.target.value.toLowerCase());
    }).catch(() => { box.innerHTML = '<p class="muted err">Gagal memuat data. Coba lagi nanti.</p>'; });
  }

  const lb = $('#lb');
  document.addEventListener('click', e => {
    if (e.target.closest('[data-daftar]')) { if (B.open === 'true') location.href = B.form; else $('#soon').showModal(); return; }
    const z = e.target.closest('img[data-zoom]');
    if (z) { lb.querySelector('img').src = z.currentSrc || z.src; lb.showModal(); return; }
    if (e.target === lb || e.target === $('#soon')) e.target.close();
  });
})();
