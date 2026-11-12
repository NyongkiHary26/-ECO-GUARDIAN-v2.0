/* v2: alur tes, paket game custom, leaderboard + PDF, timer, privasi. Item gambar: tulis @nama (Pustaka Gambar atau assets/icon/nama.png). */
var TS=null,tt;let NM=ld('egnm',''),LB=ld('eglb',[]),CG={k:'',pi:0,pn:''},GT=0;
const IMGS=()=>ld('egim',{});
const vi=s=>{s=String(s).trim();if(s[0]!='@')return esc(s);const k=s.slice(1),m=IMGS()[k];return`<img class=ig src="${m||'assets/icon/'+esc(k)+'.png'}" alt="${esc(k)}" onerror="this.replaceWith('${esc(k)}')">`};
const pv=n=>ld('egpv',0)?String(n).split(/\s+/).map(w=>w[0].toUpperCase()+'.').join(' '):n;
const fmt=ms=>{const s=Math.floor(ms/1000);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const plain=s=>String(s).replace(/[^\x20-\x7E\u00C0-\u024F]/g,'').trim()||'-';
const setL=()=>{const r=R.find(x=>x.id==TS);if(r&&!r.l){r.l=1;sv('egr',R)}};
const post=()=>{const r=R.find(x=>x.id==TS);if(r)quiz(r.id,'post')};
const t0=V.tes;V.tes=()=>{TS=null;t0()};
GM.push(['⚡','Kuis Kilat','10 soal dari bank soal','kilat']);
const gn=k=>(GM.find(x=>x[3]==k)||[0,k])[1];
const TK=['habitat','chain','flag','body','hunt','kilat'];
const timer=k=>{clearInterval(tt);const e=$('#tm');if(!TK.includes(k)){e.textContent='';return}tt=setInterval(()=>e.textContent='⏱ '+fmt(Date.now()-GT),500)};
const confetti=()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;for(let i=0;i<24;i++){const s=document.createElement('span');s.className='cf';s.textContent=['🍃','⭐','🌿','🌸'][i%4];s.style.left=Math.random()*100+'vw';s.style.animationDelay=Math.random()*.8+'s';document.body.append(s);setTimeout(()=>s.remove(),3300)}};

/* ===== Paket game (default) ===== */
const FL=[['Indonesia','linear-gradient(#e70011 50%,#fff 50%)'],['Jepang','radial-gradient(circle,#bc002d 28%,#fff 29%)'],['Jerman','linear-gradient(#000 33%,#d00 33% 66%,#ffce00 66%)'],['Prancis','linear-gradient(90deg,#0055a4 33%,#fff 33% 66%,#ef4135 66%)'],['Italia','linear-gradient(90deg,#009246 33%,#fff 33% 66%,#ce2b37 66%)'],['Belanda','linear-gradient(#ae1c28 33%,#fff 33% 66%,#21468b 66%)'],['Polandia','linear-gradient(#fff 50%,#dc143c 50%)'],['Rusia','linear-gradient(#fff 33%,#0039a6 33% 66%,#d52b1e 66%)'],['Irlandia','linear-gradient(90deg,#169b62 33%,#fff 33% 66%,#ff883e 66%)'],['Ukraina','linear-gradient(#0057b7 50%,#ffd700 50%)']];
const DEFPK={
habitat:[{n:'Mini Game #1 - Hewan dan Habitat Sumba',t:'🦜 Kakatua Sumba | 🌳 Hutan\n🐢 Penyu | 🏖️ Pantai\n🐎 Kuda | 🌾 Savana\n🐟 Ikan | 🌊 Laut'}],
body:[{n:'Mini Game #1 - Organ Tubuh',t:'🧠 Otak | Mengatur seluruh tubuh\n❤️ Jantung | Memompa darah\n🫁 Paru-paru | Tempat bernapas\n👀 Mata | Untuk melihat\n👂 Telinga | Untuk mendengar\n🦷 Gigi | Mengunyah makanan'}],
chain:[{n:'Mini Game #1 - Rantai Makanan Savana',t:'🌾 Rumput > 🦗 Belalang > 🐸 Katak > 🐍 Ular\n🌱 Padi > 🐁 Tikus > 🐍 Ular > 🦅 Elang'}],
flag:[{n:'Mini Game #1 - Bendera Dunia',t:FL.map(x=>x.join(' | ')).join('\n')}],
hunt:[{n:'Mini Game #1 - Misi Ekosistem',t:'💧 | Komponen abiotik\n☀️ | Komponen abiotik\n🪨 | Komponen abiotik\n🌳 | Produsen\n🌾 | Produsen\n🌱 | Produsen\n🦜 | Hewan\n🐢 | Hewan\n🐎 | Hewan\n🐟 | Hewan\n🍌 | Sampah organik\n🔋 | Sampah B3'}],
memory:[{n:'Mini Game #1 - Flora dan Fauna',t:'🦜\n🐢\n🐎\n🌳\n🌾\n💧'}],
puzzle:[{n:'Mini Game #1 - Savana Sumba',t:'☁️\n☀️\n🦅\n🌳\n🦜\n🌳\n🌾\n🐎\n🌾'}],
forest:[{n:'Mini Game #1 - Selamatkan Hutan',t:'🪓 | 🌳'}],
fire:[{n:'Mini Game #1 - Padamkan Api',t:'🔥 | 🌲'}],
trash:[{n:'Mini Game #1 - Pilah Sampah',t:'🍌 | o\n🍎 | o\n🍂 | o\n🍃 | o\n🥤 | a\n🧴 | a\n🥫 | a\n📦 | a\n🔋 | b\n🧪 | b'}]};
let PK=ld('egpk',null)||JSON.parse(JSON.stringify(DEFPK));
const LN=()=>PK[CG.k][CG.pi].t.split('\n').map(x=>x.trim()).filter(Boolean),SP=(l,s='|')=>l.split(s).map(x=>x.trim());

/* ===== Game memakai paket ===== */
function pair(t,P,again){const Lf=P.map((p,i)=>({t:p[0],i})),Rt=sh(P.map((p,i)=>({t:p[1],i}))),dn=new Set();let sel=null,tr=0;
const d=m=>{const btn=(o,s)=>`<button class="b ${dn.has(o.i)?'ok':''} ${sel&&sel.s==s&&sel.i==o.i?'sel':''}" data-s=${s} data-i=${o.i} ${dn.has(o.i)?'disabled':''}>${vi(o.t)}</button>`;
A.innerHTML=`<h2>${t}</h2><p>Ketuk satu kartu di kiri, lalu pasangannya di kanan.</p><p>${m||''}</p><div class=pair><div>${Lf.map(o=>btn(o,'l')).join('')}</div><div>${Rt.map(o=>btn(o,'r')).join('')}</div></div>`;
A.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const s=b.dataset.s,i=+b.dataset.i;if(!sel||sel.s==s){sel={s,i};return d()}tr++;if(sel.i==i){dn.add(i);sel=null;if(dn.size==P.length)return end(t,`Selesai dalam ${tr} percobaan`,Math.max(5,P.length*5-(tr-P.length)*2),again);d('✅ Cocok!')}else{sel=null;d('❌ Belum cocok, coba lagi.')}})};d()}
Object.assign(G,{
habitat(){pair('Habitat Match',LN().map(l=>SP(l)),G.habitat)},
body(){pair('Body Explorer',LN().map(l=>SP(l)),G.body)},
chain(){const C=sh(LN().map(l=>SP(l,'>')))[0],O=sh(C.map((t,i)=>({t,i})));let n=0,w=0;
 const d=m=>{A.innerHTML=`<h2>Food Chain Builder</h2><p>Ketuk urutan dari produsen sampai konsumen puncak.</p><div class=card>${C.slice(0,n).map(vi).join(' → ')||'Mulai dari produsen...'}</div><p>${m||''}</p><div class=pair>${O.map(o=>`<button class="b ${o.i<n?'ok':''}" data-i=${o.i} ${o.i<n?'disabled':''}>${vi(o.t)}</button>`).join('')}</div>`;
 A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{if(+b.dataset.i==n){n++;n==C.length?end('Food Chain Builder','Rantai tersusun!',Math.max(5,20-2*w),G.chain):d('✅ Benar!')}else{w++;d('❌ Belum tepat, coba lagi.')}})};d()},
flag(){const F=LN().map(l=>SP(l)),Q=sh(F).slice(0,8);let i=0,s=0;const fv=v=>v[0]=='@'?`<div class=flag>${vi(v)}</div>`:`<div class=flag style="background:${esc(v)}"></div>`;
 const d=()=>{if(i>=Q.length)return end('Flag Explorer',`Benar ${s} dari ${Q.length}`,s*5,G.flag);const q=Q[i],o=sh([q,...sh(F.filter(x=>x!=q)).slice(0,3)]);A.innerHTML=`<h2>Flag Explorer</h2><p>Soal ${i+1} dari ${Q.length}. Bendera negara apakah ini?</p>${fv(q[1])}${o.map(x=>`<button class="b alt" data-n="${esc(x[0])}">${esc(x[0])}</button>`).join('')}`;
 A.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{if(b.dataset.n==q[0])s++;i++;d()})};d()},
hunt(){const O=LN().map(l=>SP(l)),C=sh([...new Set(O.map(x=>x[1]))]).slice(0,4);let r=0,lv=3,s=0,f=new Set(),G2=sh(O);
 const d=m=>{if(lv<=0||r>=C.length)return end('Eco Treasure Hunt',lv>0?'Semua misi selesai!':'Nyawa habis. Coba lagi!',s*5+lv*3,G.hunt);const cl=C[r],tg=O.filter(x=>x[1]==cl);
 A.innerHTML=`<h2>Eco Treasure Hunt</h2><p>Misi ${r+1} dari ${C.length}: temukan semua <b>${esc(cl)}</b> (${tg.length}). Nyawa: ${'❤️'.repeat(lv)}</p><p>${m||''}</p><div class=pair style="grid-template-columns:repeat(4,1fr)">${G2.map((x,i)=>`<button class="b ${f.has(x[0])?'ok':'alt'}" style="height:76px;font-size:36px" data-i=${i}>${vi(x[0])}</button>`).join('')}</div>`;
 A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const x=G2[+b.dataset.i];if(f.has(x[0]))return;if(x[1]==cl){f.add(x[0]);s++;if(tg.every(y=>f.has(y[0]))){r++;f=new Set();return d('✅ Misi selesai!')}d('✅ Ketemu!')}else{lv--;d('❌ Itu bukan '+cl)}})};d()},
memory(){const E=LN().slice(0,8);let D=sh([...E,...E]),o=[],ok=new Set(),tr=0,lk=0;
 const d=()=>{A.innerHTML=`<h2>Eco Memory</h2><p>Percobaan: ${tr}</p><div class=pair style="grid-template-columns:repeat(4,1fr)">${D.map((e,i)=>`<button class="b ${ok.has(i)?'ok':'alt'}" style="height:76px;font-size:36px" data-i=${i}>${ok.has(i)||o.includes(i)?vi(e):'❓'}</button>`).join('')}</div>`;
 A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(lk||ok.has(i)||o.includes(i))return;o.push(i);if(o.length<2)return d();tr++;const[a,c]=o;
  if(D[a]==D[c]){ok.add(a);ok.add(c);o=[];if(ok.size==D.length)return end('Eco Memory',`Selesai dalam ${tr} percobaan`,Math.max(5,30-tr*2),G.memory);d()}else{lk=1;d();setTimeout(()=>{o=[];lk=0;d()},800)}})};d()},
puzzle(){const S=LN().slice(0,9);let D=sh(S),a=-1,m=0;while(D.every((e,i)=>e==S[i]))D=sh(S);
 const d=()=>{A.innerHTML=`<h2>Nature Puzzle</h2><p>Susun gambar sesuai urutan yang benar. Ketuk dua kotak untuk menukar. Langkah: ${m}</p><div class=pair style="grid-template-columns:repeat(3,1fr)">${D.map((e,i)=>`<button class="b alt ${a==i?'sel':''}" style="height:84px;font-size:40px" data-i=${i}>${vi(e)}</button>`).join('')}</div>`;
 A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(a<0){a=i;return d()}if(a!=i){[D[a],D[i]]=[D[i],D[a]];m++}a=-1;if(D.every((e,k)=>e==S[k]))return end('Nature Puzzle',`Selesai dalam ${m} langkah`,Math.max(5,30-m),G.puzzle);d()})};d()},
forest(){const[a,b]=SP(LN()[0]);arcade('Forest Guardian',a,1200,1000,5,b||a,'Ketuk penebang sebelum menghilang. Tiap yang lolos menebang satu pohon!',G.forest)},
fire(){const[a,b]=SP(LN()[0]);arcade('Fire Rescue',a,3000,900,4,b||a,'Padamkan titik api sebelum menyebar dan membakar hutan!',G.fire)},
trash(){const I=sh(LN().map(l=>SP(l))),N={o:'Organik',a:'Anorganik',b:'B3'};let i=0,s=0;
 const d=m=>{if(i>=I.length)return end('Trash Hero',`Benar ${s} dari ${I.length}`,s*10,G.trash);A.innerHTML=`<h2>Trash Hero</h2><p>Sampah ${i+1} dari ${I.length}. Skor ${s}</p><div class=big>${vi(I[i][0])}</div><p>${m||'Pilih tempat sampah yang tepat.'}</p>${Object.keys(N).map(k=>`<button class=b data-k=${k}>${N[k]}</button>`).join('')}`;
 A.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const ok=b.dataset.k==I[i][1];if(ok)s++;const k=I[i][1];i++;d(ok?'✅ Benar!':'❌ Seharusnya '+N[k])})};d()},
kilat(){const Q=sh(QS).slice(0,10);let i=0,s=0;const d=()=>{if(i>=Q.length)return end('Kuis Kilat',`Benar ${s} dari ${Q.length}`,s*10,G.kilat);const q=Q[i];A.innerHTML=`<h2>Kuis Kilat</h2><p>Soal ${i+1} dari ${Q.length}. Jawab secepat mungkin!</p><p class=q>${esc(q[0])}</p>${q[1].map((t,j)=>`<button class="b alt" data-j=${j}>${esc(t)}</button>`).join('')}`;
 A.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>{if(+b.dataset.j==q[2])s++;i++;d()})};d()}});

/* ===== Menu, mulai, hasil ===== */
V.game=()=>{A.innerHTML=`<h2>Mini-game</h2><button class="b alt" id=cp>Pemain: ${esc(NM||'(belum ada)')} (ganti)</button><div class=grid>${GM.map(x=>`<button class=tile data-p=${x[3]}><span>${x[0]}</span><b>${x[1]}</b><br>${x[2]}</button>`).join('')}<button class=tile data-go=lb><span>🏆</span><b>Papan Peringkat</b><br>Skor tertinggi dan PDF</button></div>`;
 $('#cp').onclick=()=>{NM='';sv('egnm','');V.game()};A.querySelectorAll('[data-p]').forEach(b=>b.onclick=()=>go('play',b.dataset.p))};
V.play=k=>{const run=pi=>{CG={k,pi,pn:PK[k]?PK[k][pi].n:'Bank soal'};GT=Date.now();timer(k);G[k]()},pick=()=>{const P=PK[k];if(P&&!P.length)return alert('Belum ada paket untuk game ini. Guru perlu menambahkannya di Kelola Game.');if(!P||P.length<2)return run(0);
 A.innerHTML=`<h2>${gn(k)}</h2><p>Pilih paket:</p>${P.map((p,i)=>`<button class=b data-i=${i}>${esc(p.n)}</button>`).join('')}`;A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>run(+b.dataset.i))};
 if(NM)return pick();A.innerHTML=`<h2>Siapa namamu?</h2><div class=card><label>Nama panggilan<input id=nm maxlength=20 autocomplete=off></label><p><small>Dipakai untuk papan peringkat. Cukup nama panggilan.</small></p><button class=b id=ok>Mulai</button></div>`;
 $('#ok').onclick=()=>{const v=$('#nm').value.trim();if(!v)return alert('Isi nama dulu.');NM=v;sv('egnm',v);pick()}};
const rank=k=>LB.filter(x=>x.g==k).sort((a,b)=>b.s-a.s||a.w-b.w);
var end=(t,msg,p,again)=>{clearInterval(tt);const w=Math.round((Date.now()-GT)/1000);addP(p);LB.push({g:CG.k,p:CG.pn,n:NM,s:p,w,d:new Date().toLocaleDateString('id-ID')});sv('eglb',LB);
 A.innerHTML=`<h2>${t} selesai! 🎉</h2><div class=big>+${p}</div><p style="text-align:center">${msg}<br>Waktu ${fmt(w*1000)}</p><div class=card><b>🏆 5 besar</b><ol>${rank(CG.k).slice(0,5).map(x=>`<li>${esc(pv(x.n))}: ${x.s} poin, ${x.w} dtk</li>`).join('')}</ol></div><button class=b id=ag>Main lagi</button><button class="b alt" id=lb1>Papan peringkat</button><button class="b alt" data-go=game>Menu game</button>`;
 confetti();$('#ag').onclick=()=>{GT=Date.now();timer(CG.k);again()};$('#lb1').onclick=()=>go('lb',CG.k)};
const pdf=ks=>{try{const d=new jspdf.jsPDF();ks.forEach((k,i)=>{if(i)d.addPage();d.setFontSize(16);d.text('ECO GUARDIAN - Papan Peringkat: '+plain(gn(k)),14,18);d.setFontSize(10);d.text('Dicetak '+new Date().toLocaleDateString('id-ID'),14,25);
 d.autoTable({startY:30,head:[['#','Nama','Paket','Skor','Waktu (dtk)','Tanggal']],body:rank(k).map((x,j)=>[j+1,plain(pv(x.n)),plain(x.p),x.s,x.w,x.d])})});d.save('peringkat-eco-guardian.pdf')}catch(e){alert('Library PDF tidak termuat. Pastikan folder lib/ ikut tersalin.')}};
V.lb=k=>{if(!k){A.innerHTML=`<h2>🏆 Papan Peringkat</h2><div class=grid>${GM.map(x=>`<button class=tile data-l=${x[3]}><span>${x[0]}</span><b>${x[1]}</b></button>`).join('')}</div><button class="b gold" id=pa>Ekspor PDF semua game</button>`;
 A.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>go('lb',b.dataset.l));$('#pa').onclick=()=>pdf(GM.map(x=>x[3]));return}
 A.innerHTML=`<h2>${gn(k)}</h2><div style="overflow-x:auto"><table><tr><th>#<th>Nama<th>Paket<th>Skor<th>Waktu</tr>${rank(k).slice(0,20).map((x,i)=>`<tr><td>${i+1}<td>${esc(pv(x.n))}<td><small>${esc(x.p)}</small><td>${x.s}<td>${fmt(x.w*1000)}</tr>`).join('')||'<tr><td colspan=5>Belum ada skor.</tr>'}</table></div><button class="b gold" id=pd>Ekspor PDF</button><button class="b bad" id=cl>Hapus papan ini (guru)</button>`;
 $('#pd').onclick=()=>pdf([k]);$('#cl').onclick=()=>{if(okAuth()&&confirm('Hapus semua skor game ini?')){LB=LB.filter(x=>x.g!=k);sv('eglb',LB);V.lb(k)}}};

/* ===== Kelola Game (guru) ===== */
const HT={habitat:'kiri | kanan, min. 3 baris',body:'kiri | kanan, min. 3 baris',chain:'a > b > c > d, satu rantai per baris, urut dari produsen',flag:'Nama negara | warna CSS atau @gambar, min. 4 baris',hunt:'ikon | kategori, min. 6 baris',memory:'satu ikon per baris, min. 4',puzzle:'tepat 9 ikon, urut kiri-kanan lalu atas-bawah',forest:'ikon penebang | ikon nyawa',fire:'ikon api | ikon nyawa',trash:'ikon | o (organik) atau a (anorganik) atau b (B3), min. 4 baris'};
const MN={habitat:3,body:3,chain:1,flag:4,hunt:6,memory:4,puzzle:9,forest:1,fire:1,trash:4},SEPR={chain:'>',memory:0,puzzle:0};
V.agm=(g='habitat',ed=-1)=>{if(!okAuth())return home();const P=PK[g]||(PK[g]=[]),r=ed>=0?P[ed]:null,IM=IMGS(),save=()=>sv('egpk',PK);
 A.innerHTML=`<h2>Kelola Game</h2><label>Jenis game<select id=gs>${Object.keys(HT).map(k=>`<option value=${k} ${k==g?'selected':''}>${gn(k)}</option>`).join('')}</select></label>
 <div class=card><h3>${r?'Ubah':'Tambah'} paket</h3><label>Nama paket<input id=pn2 value="${esc(r?r.n:'')}" placeholder="Mini Game #2 - Hewan Endemik"></label><label>Isi item<textarea id=pt2 style="min-height:150px">${esc(r?r.t:'')}</textarea></label><p><small>Format: ${HT[g]}. Teks, emoji, atau gambar: tulis @nama (lihat Pustaka Gambar).</small></p><button class=b id=sv2>Simpan</button>${r?'<button class="b alt" id=cn2>Batal</button>':''}</div>
 <h3>Paket (${P.length})</h3>${P.map((p,i)=>`<div class=card>${esc(p.n)}<div class=row><button class="b alt" data-e=${i}>Ubah</button><button class="b bad" data-x=${i}>Hapus</button></div></div>`).join('')}
 <div class=card><h3>Pustaka Gambar</h3><label>Nama gambar<input id=in2 placeholder="kakatua"></label><label>File<input id=if2 type=file accept="image/*"></label><button class=b id=ui>Unggah</button><div>${Object.keys(IM).map(k=>`<span style="display:inline-block;margin:4px;text-align:center"><img class=thumb src="${IM[k]}"><br>@${esc(k)} <button data-di="${esc(k)}">x</button></span>`).join('')||'<small>Belum ada gambar.</small>'}</div></div>
 <div class=card><h3>Privasi dan data</h3><label><input type=checkbox id=pvk ${ld('egpv',0)?'checked':''} style="display:inline;width:auto"> Tampilkan inisial saja di papan peringkat</label><button class="b alt" id=rg>Kembalikan paket game ke contoh awal</button></div>`;
 $('#gs').onchange=e=>V.agm(e.target.value);
 A.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>{V.agm(g,+b.dataset.e);scrollTo(0,0)});
 A.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{if(confirm('Hapus paket ini?')){P.splice(+b.dataset.x,1);save();V.agm(g)}});
 A.querySelectorAll('[data-di]').forEach(b=>b.onclick=()=>{delete IM[b.dataset.di];sv('egim',IM);V.agm(g)});
 if(r)$('#cn2').onclick=()=>V.agm(g);
 $('#sv2').onclick=()=>{const n=$('#pn2').value.trim(),t=$('#pt2').value.split('\n').map(x=>x.trim()).filter(Boolean),sp=g in SEPR?SEPR[g]:'|';
  if(!n)return alert('Isi nama paket.');if(t.length<MN[g])return alert('Minimal '+MN[g]+' baris.');if(g=='puzzle'&&t.length!=9)return alert('Puzzle harus tepat 9 item.');
  if(sp&&t.some(l=>!l.includes(sp)))return alert('Setiap baris harus memakai tanda '+sp);if(g=='trash'&&t.some(l=>!/\|\s*[oab]$/.test(l)))return alert('Akhir baris harus | o, | a, atau | b');
  const o={n,t:t.join('\n')};r?P[ed]=o:P.push(o);save();V.agm(g)};
 $('#ui').onclick=()=>{const k=$('#in2').value.trim().replace(/[^a-z0-9_-]/gi,''),f=$('#if2').files[0];if(!k||!f)return alert('Isi nama (huruf/angka) dan pilih file.');shrink(f,u=>{IM[k]=u;try{sv('egim',IM)}catch{}V.agm(g)})};
 $('#pvk').onchange=e=>sv('egpv',e.target.checked?1:0);
 $('#rg').onclick=()=>{if(confirm('Semua paket game buatan guru diganti contoh awal?')){PK=JSON.parse(JSON.stringify(DEFPK));save();V.agm(g)}}};
