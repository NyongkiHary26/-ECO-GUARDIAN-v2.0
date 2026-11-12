
const $=s=>document.querySelector(s),A=$('#app'),V={};
const sh=a=>[...a].sort(()=>Math.random()-.5);
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ng=(a,b)=>a<100?+((b-a)/(100-a)).toFixed(2):'';
let pts=ld('egp',0),R=ld('egr',[]);
const addP=n=>{pts+=n;sv('egp',pts);$('#pt').textContent='⭐ '+pts};
const H=[];var tm;const go=(v,a,nb)=>{clearInterval(tm);clearInterval(tt);$('#tm').textContent='';scrollTo(0,0);$('#nav').style.display=v=='home'?'none':'flex';if(!nb)H.push([v,a]);V[v](a)};const back=()=>{H.pop();const p=H[H.length-1]||['home'];go(p[0],p[1],1)};const home=()=>{H.length=0;go('home')};
document.addEventListener('click',e=>{const t=e.target.closest('[data-go]');if(t)go(t.dataset.go)});

/* ===== KONTEN (ganti isi array ini untuk topik lain) ===== */
const DLS=[
['Apa itu ekosistem?','Ekosistem adalah hubungan antara makhluk hidup (komponen biotik) dan lingkungannya (komponen abiotik seperti air, tanah, cahaya matahari, dan udara). Tumbuhan hijau membuat makanan sendiri sehingga disebut produsen. Hewan yang memakan tumbuhan atau hewan lain disebut konsumen.','Apa yang terjadi pada hewan jika tumbuhan di sekitarnya hilang?'],
['Savana Sumba','Savana adalah padang rumput luas dengan pohon yang jarang. Di Sumba, pemandangan savana mudah ditemukan, terutama saat musim kemarau. Rumput berperan sebagai produsen, dan menjadi makanan hewan pemakan tumbuhan seperti kuda.','Apa saja komponen abiotik yang kamu lihat di savana?'],
['Hutan dan satwa Sumba','Kakatua Sumba adalah burung khas Sumba dengan jambul kuning. Satwa ini terancam karena habitatnya berkurang dan perburuan. Cendana adalah pohon bernilai tinggi dari wilayah Nusa Tenggara. Menjaga hutan berarti menjaga rumah bagi banyak makhluk hidup. (Guru: mohon verifikasi data spesies sebelum dipakai di kelas.)','Apa yang bisa kamu lakukan untuk menjaga hutan?'],
['Pesisir dan sampah','Pantai dan laut adalah rumah bagi ikan dan penyu. Sampah plastik dapat mengganggu hewan laut. Pilah sampah menjadi organik (mudah membusuk, misalnya kulit pisang), anorganik (sulit terurai, misalnya plastik), dan B3 (berbahaya, misalnya baterai).','Sampah apa yang paling sering kamu temui di sekitarmu?']];
const DFC=[
['Fauna','🦜','Kakatua Sumba','Burung khas Sumba berjambul kuning. Hidup di hutan dan terancam karena habitatnya berkurang.'],
['Fauna','🐢','Penyu','Reptil laut yang bertelur di pantai.'],
['Fauna','🐎','Kuda','Hewan pemakan tumbuhan (herbivora). Makanannya rumput.'],
['Fauna','🐟','Ikan','Hidup di air. Bernapas dengan insang.'],
['Flora','🌳','Cendana','Pohon bernilai tinggi dari wilayah Nusa Tenggara.'],
['Flora','🌾','Rumput','Produsen utama di savana. Makanan bagi hewan herbivora.'],
['Abiotik','💧','Air','Komponen tak hidup yang dibutuhkan semua makhluk hidup.'],
['Abiotik','☀️','Cahaya matahari','Sumber energi bagi tumbuhan untuk membuat makanan.'],
['Rantai makanan','🌱','Produsen','Makhluk hidup yang membuat makanan sendiri, yaitu tumbuhan hijau.'],
['Rantai makanan','🐸','Konsumen','Makhluk hidup yang makan makhluk hidup lain.'],
['Sampah','🍌','Sampah organik','Mudah membusuk dan bisa menjadi kompos.'],
['Sampah','🔋','Sampah B3','Berbahaya dan beracun, seperti baterai. Jangan dibuang sembarangan.']];
/* [soal, [pilihan], indeks jawaban benar, penjelasan] */
const DQS=[
['Manakah contoh komponen abiotik?',['Rumput','Air','Kakatua','Cendana'],1,'Air adalah benda tak hidup.'],
['Produsen dalam rantai makanan adalah...',['Tumbuhan hijau','Katak','Ular','Elang'],0,'Tumbuhan hijau membuat makanannya sendiri.'],
['Rumput → belalang → katak → ular. Belalang disebut...',['Produsen','Konsumen tingkat 1','Konsumen tingkat 2','Batu'],1,'Belalang memakan produsen.'],
['Kakatua Sumba adalah satwa khas pulau...',['Jawa','Sumba','Bali','Papua'],1,'Sesuai namanya, satwa khas Sumba.'],
['Kulit pisang termasuk sampah...',['Organik','Anorganik','B3','Logam'],0,'Mudah membusuk, jadi organik.'],
['Botol plastik termasuk sampah...',['Organik','Anorganik','B3','Hewan'],1,'Plastik sulit terurai.'],
['Hewan pemakan tumbuhan disebut...',['Karnivora','Omnivora','Herbivora','Produsen'],2,'Herbivora memakan tumbuhan.'],
['Penyu bertelur di...',['Hutan','Pantai','Savana','Sungai'],1,'Penyu naik ke pantai untuk bertelur.'],
['Sumber energi utama bagi tumbuhan adalah...',['Cahaya matahari','Batu','Plastik','Bulan'],0,'Tumbuhan memakai cahaya matahari untuk membuat makanan.'],
['Menebang hutan sembarangan akan...',['Mengurangi habitat hewan','Menambah burung','Membuat air bersih','Menyuburkan tanah selamanya'],0,'Hewan kehilangan tempat tinggal.']];

/* ===== HOME ===== */
V.home=()=>{A.innerHTML=`<h2>Halo, Penjaga Alam! 🌿</h2><p>Pilih petualanganmu hari ini.</p><div class=grid>${[['materi','📖','Materi','Belajar ekosistem Sumba'],['flash','🃏','Flashcard','Balik kartu, ingat konsep'],['game','🎮','Mini-game','3 permainan seru'],['tes','📝','Mode Tes','Pretest dan posttest'],['rekap','📊','Rekap Guru','Nilai, CSV, cetak PDF'],['admin','⚙️','Kelola Konten','Materi, flashcard, soal, gambar'],['agm','🎮','Kelola Game','Paket game, gambar, privasi']].map(x=>`<button class=tile data-go=${x[0]}><span>${x[1]}</span><b>${x[2]}</b><br>${x[3]}</button>`).join('')}</div>`};

/* ===== MATERI ===== */
V.materi=(i=0)=>{const l=LS[i],last=i==LS.length-1;A.innerHTML=`<div class=prog><i style="width:${(i+1)/LS.length*100}%"></i></div><div class=card><h2>${l[0]}</h2>${l[3]?`<img src="${l[3]}" style="max-width:100%;border-radius:12px">`:''}<p>${l[1]}</p><p><b>Renungkan:</b> ${l[2]}</p></div><div class=row><button class="b alt" id=pv ${i?'':'disabled'}>Sebelumnya</button><button class=b id=nx>${last?'Selesai (+10 poin)':'Berikutnya'}</button></div>${last&&TS?'<button class=b id=t1>🃏 Lanjut ke Flashcard</button><button class="b gold" id=t2>✅ Langsung ke Posttest</button>':''}`;$('#pv').onclick=()=>V.materi(i-1);$('#nx').onclick=()=>last?(addP(10),go('home')):V.materi(i+1);if(last&&TS){$('#nx').style.display='none';setL();$('#t1').onclick=()=>go('flash');$('#t2').onclick=post}};

/* ===== FLASHCARD ===== */
V.flash=()=>{let cat='Semua',i=0,f=0,L=FC;const cats=['Semua',...new Set(FC.map(x=>x[0]))];
const d=()=>{const c=L[i];A.innerHTML=`<select id=ct aria-label=Kategori>${cats.map(x=>`<option ${x==cat?'selected':''}>${x}`).join('')}</select><p>Kartu ${i+1} dari ${L.length}</p><div class=fc id=fc tabindex=0>${f?`<div>${c[3]}</div>`:`${c[4]?`<img src="${c[4]}" style="max-height:140px;max-width:100%;border-radius:12px">`:`<div style="font-size:64px">${c[1]}</div>`}<b>${c[2]}</b><small>${c[0]}. Ketuk untuk membalik.</small>`}</div><div class=row><button class="b alt" id=p>◀</button><button class="b gold" id=r>Acak</button><button class="b alt" id=n>▶</button></div>${TS?'<button class=b id=t1>📖 Lihat Materi</button><button class="b gold" id=t2>✅ Langsung ke Posttest</button>':''}`;
const fl=()=>{f=!f;d()};$('#fc').onclick=fl;$('#fc').onkeydown=e=>e.key=='Enter'&&fl();
$('#p').onclick=()=>{i=(i-1+L.length)%L.length;f=0;d()};$('#n').onclick=()=>{i=(i+1)%L.length;f=0;d()};
$('#r').onclick=()=>{L=sh(L);i=0;f=0;d()};
if(TS){setL();$('#t1').onclick=()=>go('materi');$('#t2').onclick=post}$('#ct').onchange=e=>{cat=e.target.value;L=cat=='Semua'?FC:FC.filter(x=>x[0]==cat);i=0;f=0;d()}};d()};

/* ===== TES ===== */
V.tes=()=>{A.innerHTML=`<h2>Mode Tes</h2><p>Isi identitas, lalu kerjakan pretest.</p><div class=card><label>Nama<input id=n autocomplete=off></label><label>Kelas<select id=k>${[3,4,5,6].map(x=>`<option>${x}`).join('')}</select></label><label>Sekolah<input id=s autocomplete=off></label><button class=b id=st>Mulai pretest</button></div>`;
$('#st').onclick=()=>{const n=$('#n').value.trim(),s=$('#s').value.trim();if(!n||!s)return alert('Isi nama dan sekolah dulu.');const r={id:Date.now().toString(36),nama:n,kelas:$('#k').value,sekolah:s,pre:null,post:null,tgl:new Date().toLocaleDateString('id-ID')};R.push(r);sv('egr',R);quiz(r.id,'pre')}};

function quiz(id,t){const r=R.find(x=>x.id==id),Q=sh(QS),W=[];let i=0,c=0;
const d=()=>{if(i>=Q.length)return fin();const q=Q[i];A.innerHTML=`<div class=prog><i style="width:${i/Q.length*100}%"></i></div><h2>${t=='pre'?'Pretest':'Posttest'}: ${esc(r.nama)}</h2><p>Soal ${i+1} dari ${Q.length}</p><p class=q>${q[0]}</p>${q[1].map((o,j)=>`<button class="b alt" data-j=${j}>${o}</button>`).join('')}`;
A.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{if(+b.dataset.j==q[2])c++;else W.push(q);i++;d()})};
const fin=()=>{r[t]=Math.round(c/Q.length*100);r[t+'_n']=c;sv('egr',R);
if(t=='pre')return TS=id,A.innerHTML=`<h2>Pretest selesai 🎉</h2><p>Benar ${c} dari ${Q.length}. Sebelum posttest, belajar dulu ya. Pilih salah satu.</p><button class=b data-go=materi>📖 Lihat Materi</button><button class="b alt" data-go=flash>🃏 Flashcard</button>`;
const dl=r.post-r.pre;A.innerHTML=`<h2>Hasil belajar ${esc(r.nama)}</h2><div class=grid><div class=card><small>Pretest</small><div class=big style="font-size:48px;margin:0">${r.pre}</div>${r.pre_n??'-'} dari ${Q.length} benar</div><div class=card><small>Posttest</small><div class=big style="font-size:48px;margin:0">${r.post}</div>${c} dari ${Q.length} benar</div><div class=card><small>Peningkatan</small><div class=big style="font-size:48px;margin:0">${dl>0?'+':''}${dl}</div>N-Gain: ${ng(r.pre,r.post)||'-'}</div></div>${W.length?`<h3>Pembahasan soal yang salah</h3>`+W.map(q=>`<div class=card><b>${q[0]}</b><br>Jawaban benar: ${q[1][q[2]]}. ${q[3]}</div>`).join(''):'<p>Semua jawaban benar. Hebat!</p>'}<button class=b data-go=rekap>Lihat rekap</button><button class="b alt" data-go=home>Ke beranda</button>`};d()}

/* ===== REKAP GURU ===== */
V.rekap=()=>{R=ld('egr',[]);const D=R.filter(r=>r.pre!=null&&r.post!=null),av=k=>D.length?Math.round(D.reduce((a,r)=>a+r[k],0)/D.length):'-';
A.innerHTML=`<h2>Rekap Hasil</h2><div class=card>Peserta lengkap: <b>${D.length}</b> dari ${R.length}<br>Rata-rata pretest <b>${av('pre')}</b>, posttest <b>${av('post')}</b>, peningkatan <b>${D.length?av('post')-av('pre'):'-'}</b></div><div style="overflow-x:auto"><table><tr><th>Nama<th>Kls<th>Pre<th>Post<th>Naik<th class=np>Aksi</tr>${R.map(r=>{const ok=r.pre!=null&&r.post!=null;return`<tr><td>${esc(r.nama)}<br><small>${esc(r.sekolah)}</small><td>${r.kelas}<td>${r.pre??'-'}<td>${r.post??'-'}<td>${ok?r.post-r.pre:'-'}<td class=np>${ok?'':`<button data-p=${r.id}>${r.pre==null?'Pretest':'Posttest'}</button> `}<button data-d=${r.id} aria-label=Hapus>🗑</button></tr>`}).join('')||'<tr><td colspan=6>Belum ada data. Mulai dari Mode Tes.</tr>'}</table></div>
<div class="row np"><button class=b id=ex>Ekspor CSV</button><button class="b gold" id=pr>Cetak / simpan PDF</button></div><button class="b bad np" id=da>Hapus semua hasil</button>`;
A.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>{const r=R.find(x=>x.id==b.dataset.p);r.pre==null?quiz(r.id,'pre'):r.l?quiz(r.id,'post'):(TS=r.id,go('materi'))});
A.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{if(confirm('Hapus hasil siswa ini? Tidak bisa dibatalkan.')){R=R.filter(x=>x.id!=b.dataset.d);sv('egr',R);V.rekap()}});
$('#da').onclick=()=>{if(confirm('Hapus SEMUA hasil siswa? Tidak bisa dibatalkan.')){R=[];sv('egr',R);V.rekap()}};
$('#pr').onclick=()=>print();
$('#ex').onclick=()=>{const q=v=>{v=String(v??'');if(/^[=+\-@]/.test(v))v="'"+v;return'"'+v.replace(/"/g,'""')+'"'};
const rows=R.map(r=>{const ok=r.pre!=null&&r.post!=null;return[r.id,r.nama,r.kelas,r.sekolah,r.tgl,r.pre,r.post,ok?r.post-r.pre:'',ok?ng(r.pre,r.post):''].map(q).join(',')});
const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(['\ufeff'+['id,nama,kelas,sekolah,tanggal,pretest,posttest,peningkatan,n_gain',...rows].join('\n')],{type:'text/csv'}));a.download='hasil-eco-guardian.csv';a.click()}};

/* ===== MINI-GAME ===== */
V.game=()=>{A.innerHTML=`<h2>Mini-game</h2><div class=grid>${[['🗑️','Trash Hero','Pilah sampah dengan benar','trash'],['🏞️','Habitat Match','Pasangkan hewan dan habitatnya','habitat'],['🔗','Food Chain Builder','Susun rantai makanan','chain']].map(x=>`<button class=tile data-g=${x[3]}><span>${x[0]}</span><b>${x[1]}</b><br>${x[2]}</button>`).join('')}</div>`;A.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>G[b.dataset.g]())};
var end=(t,msg,p,again)=>{addP(p);A.innerHTML=`<h2>${t} selesai! 🎉</h2><div class=big>+${p}</div><p style="text-align:center">${msg}</p><button class=b id=ag>Main lagi</button><button class="b alt" data-go=game>Menu game</button>`;$('#ag').onclick=again};
const G={
trash(){const I=sh([['🍌','o'],['🍎','o'],['🍂','o'],['🍃','o'],['🥤','a'],['🧴','a'],['🥫','a'],['📦','a'],['🔋','b'],['🧪','b']]),N={o:'Organik',a:'Anorganik',b:'B3'};let i=0,s=0;
const d=m=>{if(i>=I.length)return end('Trash Hero',`Benar ${s} dari ${I.length}`,s*10,G.trash);A.innerHTML=`<h2>Trash Hero</h2><p>Sampah ${i+1} dari ${I.length}. Skor ${s}</p><div class=big>${I[i][0]}</div><p>${m||'Pilih tempat sampah yang tepat.'}</p>${Object.keys(N).map(k=>`<button class=b data-k=${k}>${N[k]}</button>`).join('')}`;
A.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const ok=b.dataset.k==I[i][1];if(ok)s++;const k=I[i][1];i++;d(ok?'✅ Benar!':'❌ Seharusnya '+N[k])})};d()},
habitat(){pair('Habitat Match',[['🦜 Kakatua Sumba','🌳 Hutan'],['🐢 Penyu','🏖️ Pantai'],['🐎 Kuda','🌾 Savana'],['🐟 Ikan','🌊 Laut']],G.habitat)},
chain(){const C=sh([['🌾 Rumput','🦗 Belalang','🐸 Katak','🐍 Ular'],['🌱 Padi','🐁 Tikus','🐍 Ular','🦅 Elang']])[0],O=sh(C.map((t,i)=>({t,i})));let n=0,w=0;
const d=m=>{A.innerHTML=`<h2>Food Chain Builder</h2><p>Ketuk urutan dari produsen sampai konsumen puncak.</p><div class=card>${C.slice(0,n).join(' → ')||'Mulai dari produsen...'}</div><p>${m||''}</p><div class=pair>${O.map(o=>`<button class="b ${o.i<n?'ok':''}" data-i=${o.i} ${o.i<n?'disabled':''}>${o.t}</button>`).join('')}</div>`;
A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{if(+b.dataset.i==n){n++;n==C.length?end('Food Chain Builder','Rantai: '+C.join(' → '),Math.max(5,20-2*w),G.chain):d('✅ Benar!')}else{w++;d('❌ Belum tepat, coba lagi.')}})};d()}};
function pair(t,P,again){const Lf=P.map((p,i)=>({t:p[0],i})),Rt=sh(P.map((p,i)=>({t:p[1],i}))),dn=new Set();let sel=null,tr=0;
const d=m=>{const btn=(o,s)=>`<button class="b ${dn.has(o.i)?'ok':''} ${sel&&sel.s==s&&sel.i==o.i?'sel':''}" data-s=${s} data-i=${o.i} ${dn.has(o.i)?'disabled':''}>${o.t}</button>`;
A.innerHTML=`<h2>${t}</h2><p>Ketuk satu kartu di kiri, lalu pasangannya di kanan.</p><p>${m||''}</p><div class=pair><div>${Lf.map(o=>btn(o,'l')).join('')}</div><div>${Rt.map(o=>btn(o,'r')).join('')}</div></div>`;
A.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const s=b.dataset.s,i=+b.dataset.i;if(!sel||sel.s==s){sel={s,i};return d()}tr++;if(sel.i==i){dn.add(i);sel=null;if(dn.size==P.length)return end(t,`Selesai dalam ${tr} percobaan`,Math.max(5,P.length*5-(tr-P.length)*2),again);d('✅ Cocok!')}else{sel=null;d('❌ Belum cocok, coba lagi.')}})};d()}

function start(){addP(0);V.home();setTimeout(()=>{const l=$('#load');l.style.opacity=0;setTimeout(()=>l.remove(),400)},1500)}
