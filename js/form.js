(function () {
  const k = document.body.dataset.l, S = window.SCHEMA, $ = s => document.querySelector(s), form = $('#f'), MAX = 5 * 1024 * 1024;
  if (!S) return;
  document.title = S.title; $('#ft').textContent = S.title; $('#fs').textContent = 'Tahun Ajaran ' + CFG.TA + ' · Kolom bertanda wajib harus diisi';

  function fld(x) {
    const n = x.k, o = x.o, rq = x.opt ? '' : ' required'; let c;
    if (x.t === 'c') return '<label class="rd cons"><input type="checkbox" name="' + n + '" value="SETUJU" required> ' + x.l + '</label>';
    if (x.t === 's') c = '<select name="' + n + '"' + rq + '><option value="">Pilih…</option>' + o.map(v => '<option>' + v + '</option>').join('') + '</select>';
    else if (x.t === 'r') c = '<div class="rg">' + o.map(v => '<label class="rd"><input type="radio" name="' + n + '" value="' + v + '"' + rq + '> ' + v + '</label>').join('') + '</div>';
    else if (x.t === 'x') c = '<textarea name="' + n + '" rows="3"></textarea>';
    else if (x.t === 'f') c = '<input type="file" name="' + n + '" accept=".pdf,image/*"' + rq + '>';
    else {
      const ty = {e: 'email', d: 'date', p: 'tel'}[x.t] || 'text';
      const at = x.t === 'n' ? ' inputmode="numeric" pattern="\\d' + (o ? '{' + o + '}' : '+') + '" title="Isi angka' + (o ? ' ' + o + ' digit' : '') + '"' : '';
      c = '<input type="' + ty + '" name="' + n + '"' + at + rq + '>';
    }
    return '<div class="fld"><label>' + x.l + (x.opt ? ' <em>(opsional)</em>' : '') + (x.t === 'n' && o ? ' <small>(' + o + ' digit)</small>' : '') + '</label>' + c + '</div>';
  }
  const secs = S.sections.map(s => { const fs = document.createElement('fieldset'); fs.innerHTML = '<legend>' + s.t + '</legend>' + s.f.map(fld).join(''); form.insertBefore(fs, $('#msg')); return [fs, s]; });
  function upd() {
    const d = Object.fromEntries(new FormData(form));
    secs.forEach(([el, s]) => { const v = !s.show || s.show(d); el.hidden = !v; el.querySelectorAll('input,select,textarea').forEach(i => i.disabled = !v); });
  }
  form.addEventListener('input', upd); form.addEventListener('change', upd); upd();

  const b64 = f => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result.split(',')[1]); r.onerror = no; r.readAsDataURL(f); });
  const say = (t, e) => { const m = $('#msg'); m.textContent = t; m.className = e ? 'err' : ''; };
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    if (!CFG.API) return say('Sistem penyimpanan belum tersambung (API belum diatur).', 1);
    const btn = $('#sub'); btn.disabled = true; say('Mengirim data & berkas, mohon tunggu…');
    try {
      const data = {}, files = [];
      for (const [n, v] of new FormData(form)) {
        if (v instanceof File) { if (!v.size) continue; if (v.size > MAX) throw 'Ukuran file ' + v.name + ' melebihi 5 MB.'; files.push({field: n, name: v.name, type: v.type, b64: await b64(v)}); }
        else data[n] = v;
      }
      const r = await fetch(CFG.API, {method: 'POST', body: JSON.stringify({lembaga: k, data, files})}), j = await r.json();
      if (!j.ok) throw j.error || 'Gagal menyimpan.';
      $('#box').innerHTML = '<div class="box" style="text-align:center"><div class="modal__ic"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></div><h2 style="text-align:center">Pendaftaran Berhasil</h2><p>Nomor pendaftaran: <strong>' + j.id + '</strong></p><p class="muted">Simpan nomor ini. Silakan bergabung ke grup WhatsApp untuk informasi selanjutnya.</p>' + (CFG.WA ? '<a class="btn btn--gold" href="' + CFG.WA + '" target="_blank" rel="noopener">Gabung Grup WhatsApp</a>' : '') + '</div>';
      scrollTo(0, 0);
    } catch (err) { say(typeof err === 'string' ? err : 'Gagal mengirim. Periksa koneksi lalu coba lagi.', 1); btn.disabled = false; }
  });
})();
