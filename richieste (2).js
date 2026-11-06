(()=>{
/* Access Key di Web3Forms */
const ACCESS_KEY="3df13f8d-1a8d-48a7-a40b-c0f703116979";
const f=document.querySelector("form"),ok=document.getElementById("ok"),err=document.getElementById("err"),b=f.querySelector("button[type=submit]");
const t0=new Date();t0.setDate(t0.getDate()+1);
document.querySelectorAll("[data-date]").forEach(i=>i.min=t0.toISOString().slice(0,10));
const ref=()=>{const n=new Date(),p=x=>String(x).padStart(2,"0");return"GC-"+String(n.getFullYear()).slice(2)+p(n.getMonth()+1)+p(n.getDate())+"-"+Math.random().toString(36).slice(2,6).toUpperCase()};
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* coppie [etichetta, valore] dei campi compilati */
const pairs=fd=>{const out=[],seen=new Set();for(const k of fd.keys()){if(seen.has(k))continue;seen.add(k);const el=f.querySelector('[name="'+k+'"]');if(!el||!el.dataset.l)continue;const v=fd.getAll(k).filter(Boolean).join(", ");if(v)out.push([el.dataset.l,v])}return out};
const tipo=()=>f.querySelector("[name=tipo_richiesta]").value;
f.addEventListener("submit",async e=>{
 e.preventDefault();err.hidden=true;
 for(const i of f.querySelectorAll("[data-date]")){if(i.value&&new Date(i.value+"T12:00").getDay()===0)i.setCustomValidity("La domenica non siamo operativi: scegli un altro giorno.");else i.setCustomValidity("")}
 const ck=f.querySelector("[data-one]");if(ck){const any=ck.querySelector("input:checked");ck.querySelector("input").setCustomValidity(any?"":"Seleziona almeno una voce.");ck.querySelectorAll("input").forEach(i=>i.onchange=()=>ck.querySelector("input").setCustomValidity(""))}
 if(!f.reportValidity())return;
 const r=ref();f.querySelector("[name=riferimento]").value=r;
 const fd=new FormData(f),old=b.textContent;b.disabled=true;b.textContent="Invio in corso…";
 try{
  if(!/^[0-9a-f-]{36}$/i.test(ACCESS_KEY))throw new Error("chiave mancante");
  const pl={access_key:ACCESS_KEY,subject:"[GymCare sito] "+tipo(),from_name:"Sito GymCare","Tipo di richiesta":tipo(),"Riferimento":r,name:fd.get("nome")||"Cliente sito"};
  pairs(fd).forEach(([l,v])=>{if(l!=="Riferimento")pl[l==="Email"?"email":l]=v});
  if(fd.get("botcheck"))pl.botcheck="1";
  let res;try{res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(pl)})}catch(x){throw new Error("rete bloccata o non raggiungibile ("+(x&&x.message||x)+")")}
  let jr={};try{jr=await res.json()}catch(_){}
  if(!res.ok||jr.success!==true)throw new Error("risposta "+res.status+": "+(jr.message||"nessun dettaglio"));
  document.getElementById("rec").innerHTML=pairs(fd).map(([l,v])=>"<div><dt>"+esc(l)+"</dt><dd>"+esc(v)+"</dd></div>").join("");
  document.querySelectorAll(".ref b").forEach(x=>x.textContent=r);
  const w=document.getElementById("wa");if(w)w.href=w.href.replace("RIF",r);
  f.closest(".card").hidden=true;ok.hidden=false;ok.focus();scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});
 }catch(x){
  console.error("Invio GymCare non riuscito:",x);
  let d=err.querySelector(".why");if(!d){d=document.createElement("div");d.className="why";d.style.cssText="margin-top:8px;font-size:12px;opacity:.8";err.append(d)}
  d.textContent="Dettaglio tecnico: "+(x&&x.message||x);
  let a=err.querySelector(".wa2");if(!a){a=document.createElement("a");a.className="wa2";a.style.cssText="display:inline-block;margin-top:10px;font-weight:700;text-decoration:underline";a.target="_blank";a.rel="noopener";a.textContent="Invia la richiesta su WhatsApp";err.append(a)}
  a.href="https://wa.me/393883053433?text="+encodeURIComponent("Richiesta dal sito ("+tipo()+") — "+r+"\n"+pairs(fd).filter(p=>p[0]!=="Riferimento").map(p=>p[0]+": "+p[1]).join("\n"));
  err.hidden=false;err.focus();
 }
 finally{b.disabled=false;b.textContent=old}
});
document.getElementById("again")?.addEventListener("click",()=>{f.reset();ok.hidden=true;f.closest(".card").hidden=false;f.querySelector("input,select,textarea").focus()});
document.getElementById("print")?.addEventListener("click",()=>print());
})();
