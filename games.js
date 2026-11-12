/* 10 mini-game sesuai PRD. Semua berbasis ketuk (aman untuk layar sentuh). */
const GM=[['🗑️','Trash Hero','Pilah sampah','trash'],['🏞️','Habitat Match','Hewan dan habitatnya','habitat'],['🔗','Food Chain Builder','Susun rantai makanan','chain'],['🪓','Forest Guardian','Hentikan penebang','forest'],['🚒','Fire Rescue','Padamkan api','fire'],['🃏','Eco Memory','Cari pasangan kartu','memory'],['🧩','Nature Puzzle','Susun gambar alam','puzzle'],['🏳️','Flag Explorer','Tebak bendera','flag'],['🫀','Body Explorer','Organ dan fungsinya','body'],['🗺️','Eco Treasure Hunt','Misi pencarian','hunt']];
V.game=()=>{A.innerHTML=`<h2>Mini-game</h2><div class=grid>${GM.map(x=>`<button class=tile data-g=${x[3]}><span>${x[0]}</span><b>${x[1]}</b><br>${x[2]}</button>`).join('')}</div>`;A.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>G[b.dataset.g]())};

/* Mesin game arcade: Forest Guardian & Fire Rescue */
function arcade(t,ic,life,sp,lv,lifeIc,msg,again){let s=0,L=lv,left=30,T=0,c=Array(9).fill(0);
A.innerHTML=`<h2>${t}</h2><p>${msg}</p><p id=in></p><div class=pair style="grid-template-columns:repeat(3,1fr)">${c.map((_,i)=>`<button class="b alt" style="height:84px;font-size:40px" data-i=${i}>·</button>`).join('')}</div>`;
const B=[...A.querySelectorAll('[data-i]')],up=()=>{$('#in').innerHTML=`⏱ ${left}s   ${vi(lifeIc).repeat(Math.max(L,0))}   ⭐ ${s}`;B.forEach((b,i)=>{b.innerHTML=c[i]?vi(ic):'·';b.className='b '+(c[i]?'gold':'alt')})};
B.forEach((b,i)=>b.onclick=()=>{if(c[i]){c[i]=0;s++;up()}});up();clearInterval(tm);
tm=setInterval(()=>{T+=100;const n=Date.now();
 if(T%sp==0){const e=c.map((v,i)=>v?-1:i).filter(i=>i>=0);if(e.length)c[e[Math.random()*e.length|0]]=n+life}
 c.forEach((v,i)=>{if(v&&v<n){c[i]=0;L--}});if(T%1000==0)left--;up();
 if(L<=0||left<=0){clearInterval(tm);end(t,L>0?`Kamu berhasil! Skor ${s}`:`Permainan berakhir. Skor ${s}`,s*3+(L>0?10:0),again)}},100)}

Object.assign(G,{
forest(){arcade('Forest Guardian','🪓',1200,1000,5,'🌳','Ketuk penebang 🪓 sebelum menghilang. Tiap yang lolos menebang satu pohon!',G.forest)},
fire(){arcade('Fire Rescue','🔥',3000,900,4,'🌲','Padamkan titik api 🔥 sebelum menyebar dan membakar hutan!',G.fire)},
memory(){const E=['🦜','🐢','🐎','🌳','🌾','💧'];let D=sh([...E,...E]),o=[],ok=new Set(),tr=0,lk=0;
 const d=()=>{A.innerHTML=`<h2>Eco Memory</h2><p>Percobaan: ${tr}</p><div class=pair style="grid-template-columns:repeat(4,1fr)">${D.map((e,i)=>`<button class="b ${ok.has(i)?'ok':'alt'}" style="height:76px;font-size:36px" data-i=${i}>${ok.has(i)||o.includes(i)?e:'❓'}</button>`).join('')}</div>`;
 A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(lk||ok.has(i)||o.includes(i))return;o.push(i);if(o.length<2)return d();tr++;const[a,c]=o;
  if(D[a]==D[c]){ok.add(a);ok.add(c);o=[];if(ok.size==D.length)return end('Eco Memory',`Selesai dalam ${tr} percobaan`,Math.max(5,30-tr*2),G.memory);d()}
  else{lk=1;d();setTimeout(()=>{o=[];lk=0;d()},800)}})};d()},
puzzle(){const S=['☁️','☀️','🦅','🌳','🦜','🌳','🌾','🐎','🌾'];let D=sh(S),a=-1,m=0;while(D.every((e,i)=>e==S[i]))D=sh(S);
 const d=()=>{A.innerHTML=`<h2>Nature Puzzle</h2><p>Susun pemandangan savana: langit di atas, pohon dan burung di tengah, rumput dan kuda di bawah. Ketuk dua kotak untuk menukar. Langkah: ${m}</p><div class=pair style="grid-template-columns:repeat(3,1fr)">${D.map((e,i)=>`<button class="b alt ${a==i?'sel':''}" style="height:84px;font-size:40px" data-i=${i}>${e}</button>`).join('')}</div>`;
 A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(a<0){a=i;return d()}if(a!=i){[D[a],D[i]]=[D[i],D[a]];m++}a=-1;if(D.every((e,k)=>e==S[k]))return end('Nature Puzzle',`Selesai dalam ${m} langkah`,Math.max(5,30-m),G.puzzle);d()})};d()},
flag(){const F=[['Indonesia','linear-gradient(#e70011 50%,#fff 50%)'],['Jepang','radial-gradient(circle,#bc002d 28%,#fff 29%)'],['Jerman','linear-gradient(#000 33%,#d00 33% 66%,#ffce00 66%)'],['Prancis','linear-gradient(90deg,#0055a4 33%,#fff 33% 66%,#ef4135 66%)'],['Italia','linear-gradient(90deg,#009246 33%,#fff 33% 66%,#ce2b37 66%)'],['Belanda','linear-gradient(#ae1c28 33%,#fff 33% 66%,#21468b 66%)'],['Polandia','linear-gradient(#fff 50%,#dc143c 50%)'],['Rusia','linear-gradient(#fff 33%,#0039a6 33% 66%,#d52b1e 66%)'],['Irlandia','linear-gradient(90deg,#169b62 33%,#fff 33% 66%,#ff883e 66%)'],['Ukraina','linear-gradient(#0057b7 50%,#ffd700 50%)']],Q=sh(F).slice(0,8);let i=0,s=0;
 const d=()=>{if(i>=Q.length)return end('Flag Explorer',`Benar ${s} dari ${Q.length}`,s*5,G.flag);const q=Q[i],o=sh([q,...sh(F.filter(x=>x!=q)).slice(0,3)]);A.innerHTML=`<h2>Flag Explorer</h2><p>Soal ${i+1} dari ${Q.length}. Bendera negara apakah ini?</p><div class=flag style="background:${q[1]}"></div>${o.map(x=>`<button class="b alt" data-n="${x[0]}">${x[0]}</button>`).join('')}`;
 A.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>{if(b.dataset.n==q[0])s++;i++;d()})};d()},
body(){pair('Body Explorer',[['🧠 Otak','Mengatur seluruh tubuh'],['❤️ Jantung','Memompa darah'],['🫁 Paru-paru','Tempat bernapas'],['👀 Mata','Untuk melihat'],['👂 Telinga','Untuk mendengar'],['🦷 Gigi','Mengunyah makanan']],G.body)},
hunt(){const O=[['💧','Komponen abiotik'],['☀️','Komponen abiotik'],['🪨','Komponen abiotik'],['🌳','Produsen'],['🌾','Produsen'],['🌱','Produsen'],['🦜','Hewan'],['🐢','Hewan'],['🐎','Hewan'],['🐟','Hewan'],['🍌','Sampah organik'],['🔋','Sampah B3']],C=sh([...new Set(O.map(x=>x[1]))]).slice(0,4);let r=0,lv=3,s=0,f=new Set(),G2=sh(O);
 const d=m=>{if(lv<=0||r>=C.length)return end('Eco Treasure Hunt',lv>0?'Semua misi selesai!':'Nyawa habis. Coba lagi!',s*5+lv*3,G.hunt);const cl=C[r],tg=O.filter(x=>x[1]==cl);
 A.innerHTML=`<h2>Eco Treasure Hunt</h2><p>Misi ${r+1} dari ${C.length}: temukan semua <b>${cl}</b> (${tg.length}). Nyawa: ${'❤️'.repeat(lv)}</p><p>${m||''}</p><div class=pair style="grid-template-columns:repeat(4,1fr)">${G2.map((x,i)=>`<button class="b ${f.has(x[0])?'ok':'alt'}" style="height:76px;font-size:36px" data-i=${i}>${x[0]}</button>`).join('')}</div>`;
 A.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const x=G2[+b.dataset.i];if(f.has(x[0]))return;if(x[1]==cl){f.add(x[0]);s++;if(tg.every(y=>f.has(y[0]))){r++;f=new Set();return d('✅ Misi selesai!')}d('✅ Ketemu!')}else{lv--;d('❌ Itu bukan '+cl)}})};d()}});
