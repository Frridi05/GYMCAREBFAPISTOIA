(()=>{
/* Access Key di Web3Forms (arriva per email): incollala tra le virgolette */
const ACCESS_KEY="3df13f8d-1a8d-48a7-a40b-c0f703116979";
const f=document.querySelector("form"),ok=document.getElementById("ok"),err=document.getElementById("err"),b=f.querySelector("button[type=submit]");
const d=document.querySelector("[data-date]");
if(d){const t=new Date();t.setDate(t.getDate()+1);document.querySelectorAll("[data-date]").forEach(i=>i.min=t.toISOString().slice(0,10))}
const ref=()=>{const n=new Date(),p=x=>String(x).padStart(2,"0");return"GC-"+String(n.getFullYear()).slice(2)+p(n.getMonth()+1)+p(n.getDate())+"-"+Math.random().toString(36).slice(2,6).toUpperCase()};
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
f.addEventListener("submit",async e=>{
 e.preventDefault();err.hidden=true;
 for(const i of f.querySelectorAll("[data-date]")){if(i.value&&new Date(i.value+"T12:00").getDay()===0){i.setCustomValidity("La domenica non siamo operativi: scegli un altro giorno.")}else i.setCustomValidity("")}
 const ck=f.querySelector("[data-one]");if(ck){const any=ck.querySelector("input:checked");ck.querySelector("input").setCustomValidity(any?"":"Seleziona almeno una voce.");ck.querySelectorAll("input").forEach(i=>i.onchange=()=>ck.querySelector("input").setCustomValidity(""))}
 if(!f.reportValidity())return;
 const r=ref();f.querySelector("[name=riferimento]").value=r;
 const fd=new FormData(f),old=b.textContent;b.disabled=true;b.textContent="Invio in corso…";
 try{
  if(!/^[0-9a-f-]{36}$/i.test(ACCESS_KEY))throw 0;
  const pl={access_key:ACCESS_KEY},seenk=new Set();
  for(const k of fd.keys()){if(seenk.has(k))continue;seenk.add(k);const el=f.querySelector('[name="'+k+'"]'),v=fd.getAll(k).filter(Boolean).join(", ");
   if(k==="email"||k==="subject"||k==="from_name"||k==="botcheck"){pl[k]=v;continue}
   if(k==="privacy"||k==="riferimento"){pl[k==="privacy"?"Privacy":"Riferimento"]=v;continue}
   if(k==="tipo_richiesta"){pl["Tipo di richiesta"]=v;continue}
   if(v)pl[(el&&el.dataset.l)||k]=v}
  pl.name=fd.get("nome")||"Cliente sito";
  const res=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(pl)});
  const jr=await res.json();if(!res.ok||jr.success!==true)throw 0;
  const rows=[],seen=new Set();
  for(const k of fd.keys()){if(seen.has(k))continue;seen.add(k);const el=f.querySelector('[name="'+k+'"]');if(!el||!el.dataset.l)continue;const v=fd.getAll(k).filter(Boolean).join(", ");if(v)rows.push("<div><dt>"+esc(el.dataset.l)+"</dt><dd>"+esc(v)+"</dd></div>")}
  document.getElementById("rec").innerHTML=rows.join("");
  document.querySelectorAll(".ref b").forEach(x=>x.textContent=r);
  const w=document.getElementById("wa");if(w)w.href=w.href.replace("RIF",r);
  f.closest(".card").hidden=true;ok.hidden=false;ok.focus();scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});
 }catch(_){err.hidden=false;err.focus()}
 finally{b.disabled=false;b.textContent=old}
});
document.getElementById("again")?.addEventListener("click",()=>{f.reset();ok.hidden=true;f.closest(".card").hidden=false;f.querySelector("input,select,textarea").focus()});
document.getElementById("print")?.addEventListener("click",()=>print());
})();
