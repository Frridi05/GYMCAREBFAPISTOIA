(()=>{
const GA="G-DQXE5RQ8M1",TEL="+393883053433",KEY="gc_consent";
const get=()=>{try{return localStorage.getItem(KEY)}catch(_){return null}},set=v=>{try{localStorage.setItem(KEY,v)}catch(_){}};
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
const st=v=>({ad_storage:v,analytics_storage:v,ad_user_data:v,ad_personalization:v});
gtag("consent","default",Object.assign(st(get()==="ok"?"granted":"denied"),{wait_for_update:500}));
const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+GA;document.head.append(s);
gtag("js",new Date());gtag("config",GA);
window.gcLead=t=>gtag("event","generate_lead",{form_name:t});
document.addEventListener("click",e=>{const a=e.target.closest("a");if(!a)return;const h=a.getAttribute("href")||"";
 if(h.startsWith("tel:"))gtag("event","click_to_call");else if(h.includes("wa.me"))gtag("event","click_whatsapp");
 if(a.hasAttribute("data-cookie-reset")){e.preventDefault();banner(true)}});
const css=`
.gcb{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;background:#0e0f14;color:#fff;font:17px/1.45 "Space Grotesk",system-ui,sans-serif;padding:20px clamp(16px,3vw,40px) calc(20px + env(safe-area-inset-bottom));border-top:3px solid #02d2e3;display:flex;gap:20px;align-items:center;flex-wrap:wrap}
.gcb p{margin:0;flex:1 1 420px;text-transform:none}.gcb a{color:#02d2e3;text-decoration:underline}
.gcb div{display:flex;gap:12px;flex-wrap:wrap}
.gcb button{font:700 17px "Space Grotesk",system-ui,sans-serif;min-height:52px;padding:0 26px;cursor:pointer;border:2px solid #02d2e3;background:#02d2e3;color:#0e0f14}
.gcb button.n{background:transparent;color:#fff}
.gcb button:focus-visible{outline:3px solid #fff;outline-offset:2px}
.gcq{position:fixed;z-index:2147482000;display:flex;font:700 17px "Space Grotesk",system-ui,sans-serif;text-transform:uppercase}
.gcq a{display:flex;align-items:center;justify-content:center;gap:8px;min-height:56px;color:#0e0f14;background:#02d2e3;text-decoration:none}
.gcq a:hover{color:#0e0f14;background:#fff}
.gcq a{white-space:nowrap}.gcq .d{display:none}
@media(min-width:821px){.gcq{right:20px;bottom:20px}.gcq a{padding:0 22px;box-shadow:0 4px 18px rgba(0,0,0,.25)}.gcq .d{display:inline;margin-left:4px}.gcq a+a{display:none}}
@media(max-width:820px){.gcq{left:0;right:0;bottom:0;padding-bottom:env(safe-area-inset-bottom);background:#0e0f14}.gcq a{flex:1;font-size:15px;border-right:2px solid #0e0f14}body{padding-bottom:calc(56px + env(safe-area-inset-bottom))}}
@media print{.gcq,.gcb{display:none}}`;
const st2=document.createElement("style");st2.textContent=css;document.head.append(st2);
function banner(force){
 if(!force&&get())return;document.querySelector(".gcb")?.remove();
 const d=document.createElement("div");d.className="gcb";d.setAttribute("role","dialog");d.setAttribute("aria-label","Cookie");
 d.innerHTML='<p>Usiamo cookie di misurazione (Google Analytics) per capire come viene usato il sito, solo se sei d’accordo. Puoi cambiare idea quando vuoi. <a href="privacy.html#cookie">Informativa</a></p><div><button type="button" data-v="ok">Accetta</button><button type="button" class="n" data-v="no">Rifiuta</button></div>';
 d.addEventListener("click",e=>{const v=e.target.dataset&&e.target.dataset.v;if(!v)return;set(v);gtag("consent","update",st(v==="ok"?"granted":"denied"));d.remove()});
 document.body.append(d);
}
function bar(){
 const q=document.createElement("nav");q.className="gcq";q.setAttribute("aria-label","Contatti rapidi");
 const pv=/preventivo\.html/.test(location.pathname);
 q.innerHTML='<a href="tel:'+TEL+'"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.300.2 2.500.6 3.600.1.3 0 .7-.2 1l-2.300 2.200z"/></svg>Chiama<span class="d">388 305 3433</span></a><a href="https://wa.me/393883053433">WhatsApp</a>'+(pv?'':'<a href="preventivo.html">Preventivo</a>');
 document.body.append(q);
}
const go=()=>{bar();banner(false)};
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",go):go();
})();
