/* Konten dinamis + CRUD. Data tersimpan di localStorage (PIN default: 1234, hanya pengaman sisi-browser). */
const K=typeof KONTEN!='undefined'?KONTEN:{materi:DLS,flash:DFC,soal:DQS};
let LS=ld('egL',K.materi),FC=ld('egF',K.flash),QS=ld('egQ',K.soal);
const SC={
materi:{n:'Materi',l:()=>LS,s:v=>{LS=v;sv('egL',v)},d:()=>K.materi,t:r=>r[0],f:[['Judul',0],['Isi materi',1,'ta'],['Pertanyaan refleksi',2],['Gambar (opsional)',3,'img']]},
flash:{n:'Flashcard',l:()=>FC,s:v=>{FC=v;sv('egF',v)},d:()=>K.flash,t:r=>r[1]+' '+r[2],f:[['Kategori',0],['Emoji',1],['Nama (depan kartu)',2],['Penjelasan (belakang kartu)',3,'ta'],['Gambar (opsional, menggantikan emoji)',4,'img']]},
soal:{n:'Soal',l:()=>QS,s:v=>{QS=v;sv('egQ',v)},d:()=>K.soal,t:r=>r[0],f:[['Pertanyaan',0],['Pilihan jawaban (1 per baris, min. 2)',1,'opt'],['Nomor jawaban benar',2,'num'],['Penjelasan',3]]}};
const okAuth=()=>{if(sessionStorage.getItem('egok'))return 1;const p=prompt('Masukkan PIN guru:');if(p!==null&&p===ld('egpin','1234')){sessionStorage.setItem('egok',1);return 1}if(p!==null)alert('PIN salah.');return 0};
const shrink=(file,cb)=>{const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,640/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*k;c.height=im.height*k;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.7))};im.onerror=()=>alert('File bukan gambar yang valid.');im.src=fr.result};fr.readAsDataURL(file)};

V.admin=(tab='materi',ed=-1)=>{
 if(!okAuth())return home();
 const S=SC[tab],L=S.l(),r=ed>=0?L[ed]:null;let img=r&&S.f.find(f=>f[2]=='img')?r[S.f.find(f=>f[2]=='img')[1]]:'';
 const fld=f=>{const v=r?r[f[1]]:'',id='f'+f[1];
  if(f[2]=='ta')return`<label>${f[0]}<textarea id=${id}>${esc(v??'')}</textarea></label>`;
  if(f[2]=='opt')return`<label>${f[0]}<textarea id=${id}>${esc(r?v.join('\n'):'')}</textarea></label>`;
  if(f[2]=='num')return`<label>${f[0]}<input id=${id} type=number min=1 value="${r?v+1:1}"></label>`;
  if(f[2]=='img')return`<label>${f[0]}<input id=${id} type=file accept="image/*"></label><div id=pv>${img?`<img class=thumb src="${img}"> <button class=b id=ri style="display:inline-block;width:auto">Hapus gambar</button>`:''}</div>`;
  return`<label>${f[0]}<input id=${id} value="${esc(v??'')}"></label>`};
 A.innerHTML=`<h2>Kelola Konten</h2><div class=tabs>${Object.keys(SC).map(k=>`<button class="b ${k==tab?'':'alt'}" data-t=${k}>${SC[k].n}</button>`).join('')}</div>
 <div class=card><h3>${r?'Ubah':'Tambah'} ${S.n}</h3>${S.f.map(fld).join('')}<button class=b id=sv>Simpan</button>${r?'<button class="b alt" id=cn>Batal</button>':''}</div>
 <h3>Daftar ${S.n} (${L.length})</h3>${L.map((x,i)=>`<div class=card>${S.n=='Flashcard'&&x[4]||S.n=='Materi'&&x[3]?'🖼 ':''}${esc(S.t(x))}<div class=row><button class="b alt" data-e=${i}>Ubah</button><button class="b bad" data-x=${i}>Hapus</button></div></div>`).join('')||'<p>Belum ada data.</p>'}
 <div class=card><b>Pengaturan</b><button class="b alt" id=pn>Ganti PIN</button><button class="b alt" id=rs>Kembalikan ${S.n} ke contoh awal</button></div>`;
 A.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>V.admin(b.dataset.t));
 A.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{V.admin(tab,+b.dataset.e);scrollTo(0,0)});
 A.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{if(confirm('Hapus data ini?')){const n=[...L];n.splice(+b.dataset.x,1);S.s(n);V.admin(tab)}});
 const fi=S.f.find(f=>f[2]=='img');
 if(fi){$('#f'+fi[1]).onchange=e=>e.target.files[0]&&shrink(e.target.files[0],u=>{img=u;$('#pv').innerHTML=`<img class=thumb src="${u}"> (siap disimpan)`});const ri=$('#ri');if(ri)ri.onclick=()=>{img='';$('#pv').innerHTML=''}}
 if(r)$('#cn').onclick=()=>V.admin(tab);
 $('#pn').onclick=()=>{const p=prompt('PIN baru (min. 4 karakter):');if(p&&p.length>=4){sv('egpin',p);alert('PIN diganti.')}};
 $('#rs').onclick=()=>{if(confirm('Semua '+S.n+' buatanmu akan diganti contoh awal. Lanjutkan?')){S.s(S.d());V.admin(tab)}};
 $('#sv').onclick=()=>{const n=[];
  for(const f of S.f){const id='f'+f[1];let v;
   if(f[2]=='img')v=img;else{v=$('#'+id).value.trim();
    if(f[2]=='opt'){v=v.split('\n').map(x=>x.trim()).filter(Boolean);if(v.length<2)return alert('Isi minimal 2 pilihan jawaban.')}
    else if(f[2]=='num'){v=parseInt(v)-1;if(!(v>=0&&v<(n[1]||[]).length))return alert('Nomor jawaban benar di luar jumlah pilihan.')}
    else if(!v&&f[1]!=3&&!(tab=='materi'&&f[1]==2))return alert('Kolom "'+f[0]+'" wajib diisi.')}
   n[f[1]]=v}
  const nl=[...L];ed>=0?nl[ed]=n:nl.push(n);
  try{S.s(nl)}catch{return alert('Penyimpanan penuh. Hapus beberapa gambar.')}
  if(localStorage.getItem({materi:'egL',flash:'egF',soal:'egQ'}[tab])===null)return alert('Gagal menyimpan. Penyimpanan browser mungkin penuh.');
  V.admin(tab)}};
