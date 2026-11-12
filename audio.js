/* Audio: musik latar dan efek suara dibuat langsung oleh browser (tanpa file, offline, bebas hak cipta).
   Opsional: taruh file assets/audio/bgm.mp3 untuk memakai musik sendiri (pastikan lisensinya jelas). */
let AC,MB,XB,bt,fa,ch=0,AU=ld('egau',{m:1,s:1});
const initA=()=>{if(AC)return;AC=new(window.AudioContext||window.webkitAudioContext)();MB=AC.createGain();MB.gain.value=.35;MB.connect(AC.destination);XB=AC.createGain();XB.gain.value=.6;XB.connect(AC.destination)};
const nt=(f,t,d,ty,v,o)=>{const s=AC.createOscillator(),g=AC.createGain();s.type=ty;s.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(g);g.connect(o);s.start(t);s.stop(t+d+.05)};
const CH=[[261.63,329.63,392,523.25],[220,261.63,329.63,440],[174.61,261.63,349.23,440],[196,293.66,392,493.88]];
const bar=()=>{if(AC.state!='running')return;const c=CH[ch++%4],t=AC.currentTime+.1;nt(c[0]/2,t,2.2,'sine',.12,MB);[0,1,2,3,2,1,2,1].forEach((k,i)=>nt(c[k],t+i*.3,.5,'triangle',.07,MB))};
const bgm=()=>{if(bt||fa)return;fa=new Audio('assets/audio/bgm.mp3');fa.loop=true;fa.volume=.35;fa.onerror=()=>{fa=null;if(!bt){bar();bt=setInterval(bar,2400)}};fa.play().catch(()=>{})};
const stopB=()=>{clearInterval(bt);bt=0;if(fa){fa.pause();fa=null}};
const sfx=k=>{if(!AU.s||!AC||AC.state!='running')return;const t=AC.currentTime;
 if(k=='tap')nt(660,t,.08,'sine',.15,XB);
 else if(k=='ok'){nt(523,t,.15,'triangle',.25,XB);nt(784,t+.1,.25,'triangle',.25,XB)}
 else if(k=='bad'){nt(220,t,.25,'sawtooth',.12,XB);nt(165,t+.12,.3,'sawtooth',.12,XB)}
 else if(k=='win')[523,659,784,1047].forEach((f,i)=>nt(f,t+i*.12,.35,'triangle',.25,XB))};

/* Tombol di header */
const bx=document.createElement('div');bx.style.cssText='display:flex;gap:8px;align-items:center';
bx.innerHTML='<button id=am></button><button id=as></button>';$('header').append(bx);bx.append($('#tm'),$('#pt'));
const upd=()=>{[['am',AU.m,'🎵','🔇','Musik'],['as',AU.s,'🔊','🔕','Efek suara']].forEach(([i,on,a,b,l])=>{const e=$('#'+i);e.textContent=on?a:b;e.setAttribute('aria-label',l);e.setAttribute('aria-pressed',!!on);e.style.cssText='background:var(--li);color:var(--f);border:0;border-radius:10px;padding:6px 10px;font-size:18px;cursor:pointer'})};
$('#am').onclick=()=>{AU.m=!AU.m;sv('egau',AU);initA();AC.resume();AU.m?bgm():stopB();upd()};
$('#as').onclick=()=>{AU.s=!AU.s;sv('egau',AU);initA();AC.resume();upd();sfx('tap')};
upd();
/* Browser baru mengizinkan suara setelah ketukan pertama */
addEventListener('pointerdown',()=>{initA();AC.resume();if(AU.m)bgm()},{once:true});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(b&&!b.disabled&&b.id!='am'&&b.id!='as')sfx('tap')},true);
new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType!=1)continue;for(const p of n.matches('p')?[n]:[...n.querySelectorAll('p')]){const x=p.textContent.trim();if(x.startsWith('✅'))return sfx('ok');if(x.startsWith('❌'))return sfx('bad')}}}).observe(A,{childList:true});
document.addEventListener('visibilitychange',()=>{if(AC)document.hidden?AC.suspend():AC.resume();if(fa)document.hidden?fa.pause():AU.m&&fa.play().catch(()=>{})});
const e1=end;end=(...a)=>{e1(...a);sfx('win')};
