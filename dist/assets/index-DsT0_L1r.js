var Oe=r=>{throw TypeError(r)};var We=(r,e,t)=>e.has(r)||Oe("Cannot "+t);var P=(r,e,t)=>(We(r,e,"read from private field"),t?t.call(r):e.get(r)),de=(r,e,t)=>e.has(r)?Oe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(r):e.set(r,t),ce=(r,e,t,s)=>(We(r,e,"write to private field"),s?s.call(r,t):e.set(r,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const Ot="/api";async function x(r,e={}){const t={credentials:"include",headers:{"Content-Type":"application/json"},...e};t.body&&typeof t.body=="object"&&(t.body=JSON.stringify(t.body));let s;try{s=await fetch(`${Ot}${r}`,t)}catch{throw new Error("Cannot connect to server. Please ensure the server is running.")}let a;const o=await s.text();if(o)try{a=JSON.parse(o)}catch{throw new Error("Unexpected server response")}else a={};if(!s.ok)throw new Error(a.error||`Request failed (${s.status})`);return a}const Wt=(r,e)=>x("/auth/login",{method:"POST",body:{username:r,password:e}}),se=()=>x("/auth/logout",{method:"POST"}),lt=()=>x("/columns"),Yt=r=>x("/columns",{method:"POST",body:r}),Ye=(r,e)=>x(`/columns/${r}`,{method:"PUT",body:e}),Qt=r=>x(`/columns/${r}`,{method:"DELETE"}),we=r=>x(`/records/${r}`),dt=(r,e)=>x(`/records/${r}`,{method:"POST",body:e}),X=(r,e,t)=>x(`/records/${r}/${e}`,{method:"PUT",body:t}),ct=(r,e)=>x(`/records/${r}/${e}`,{method:"DELETE"}),ut=()=>x("/users"),Jt=r=>x(`/campaign/${encodeURIComponent(r)}/users`),Gt=r=>x("/users",{method:"POST",body:r}),Kt=r=>x(`/users/${r}`,{method:"DELETE"}),Zt=(r,e)=>x(`/users/${r}`,{method:"PUT",body:e}),Xt=(r,e,t=null)=>x(`/users/${r}/assignment`,{method:"PUT",body:{campaign_id:e,bucket_id:t}}),es=(r,e)=>x(`/users/${r}/password`,{method:"PUT",body:{password:e}}),pt=()=>x("/campaigns-config"),ts=r=>x("/campaigns-config",{method:"POST",body:{name:r}}),Qe=(r,e)=>x(`/campaigns-config/${r}`,{method:"PUT",body:{name:e}}),ss=r=>x(`/campaigns-config/${r}`,{method:"DELETE"}),rs=(r,e)=>x(`/campaigns-config/${r}/buckets`,{method:"POST",body:{name:e}}),as=(r,e)=>x(`/buckets/${r}`,{method:"PUT",body:{name:e}}),os=r=>x(`/buckets/${r}`,{method:"DELETE"}),Je=(r,e)=>x(`/campaigns-config/${r}/assignments`,{method:"PUT",body:{assignments:e}});class ns{constructor(e){this.app=e}render(){const e=document.createElement("div");e.className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden",e.innerHTML=`
      <!-- Decorative background glows -->
      <div class="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] bg-indigo-600/20 rounded-full blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-40 -right-24 w-[520px] h-[520px] bg-purple-600/15 rounded-full blur-3xl"></div>

      <div class="w-full max-w-4xl grid md:grid-cols-2 bg-white/95 backdrop-blur rounded-3xl shadow-2xl overflow-hidden relative z-10 ring-1 ring-white/10">
        <!-- Left: brand panel -->
        <div class="hidden md:flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-10 text-white">
          <div>
            <div class="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-2xl ring-1 ring-white/20 mb-8">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <h1 class="text-2xl font-bold leading-snug tracking-tight">CIMB Account<br/>Monitoring</h1>
            <p class="text-indigo-200 text-sm mt-3 leading-relaxed">Track promise-to-pay commitments and confirmed payments across every campaign and bucket.</p>
          </div>

          <ul class="space-y-4 text-sm text-indigo-100">
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Live tracker for daily PTP entries
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Confirmed payment monitoring
            </li>
            <li class="flex items-start gap-3">
              <svg class="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Compiled view across all agents
            </li>
          </ul>

          <p class="text-[11px] text-indigo-300/70">PTP Monitoring · Promise to Pay system</p>
        </div>

        <!-- Right: form -->
        <div class="p-8 sm:p-10 flex flex-col justify-center">
          <div class="md:hidden text-center mb-8">
            <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <h1 class="text-xl font-bold text-gray-900">CIMB Account Monitoring</h1>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
          <p class="text-gray-500 text-sm mt-1 mb-8">Sign in to your account to continue</p>

          <form id="loginForm" class="space-y-5">
            <div id="errorMessage" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>

            <div>
              <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                </span>
                <input
                  type="text"
                  id="username"
                  required
                  autocomplete="username"
                  class="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </span>
                <input
                  type="password"
                  id="password"
                  required
                  autocomplete="current-password"
                  class="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  placeholder="Enter your password"
                />
                <button type="button" id="togglePw" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600" aria-label="Show password">
                  <svg id="eyeOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  <svg id="eyeClosed" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/></svg>
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="loginBtn"
              class="btn-primary w-full font-semibold py-3 rounded-xl transition-all"
            >
              Sign In
            </button>
          </form>

          <div class="mt-8 pt-6 border-t border-gray-100">
            <p class="text-xs text-gray-400 text-center">Contact administrator for credentials</p>
          </div>
        </div>
      </div>
    `;const t=e.querySelector("#loginForm"),s=e.querySelector("#errorMessage"),a=e.querySelector("#loginBtn"),o=e.querySelector("#password");return e.querySelector("#togglePw").addEventListener("click",()=>{const n=o.type==="password";o.type=n?"text":"password",e.querySelector("#eyeOpen").classList.toggle("hidden",n),e.querySelector("#eyeClosed").classList.toggle("hidden",!n)}),t.addEventListener("submit",async n=>{n.preventDefault();const d=e.querySelector("#username").value.trim(),i=o.value;if(!d||!i){s.textContent="Please fill in all fields",s.classList.remove("hidden");return}a.disabled=!0,a.textContent="Signing in...",s.classList.add("hidden");try{const l=await Wt(d,i);this.app.setUser(l.user),l.user.role==="admin"?this.app.navigate("/admin"):this.app.navigate("/dashboard")}catch(l){s.textContent=l.message,s.classList.remove("hidden"),a.disabled=!1,a.textContent="Sign In"}}),e}}var U,H;class is{constructor(e){de(this,U);de(this,H,new Set);ce(this,U,e)}get current(){return P(this,U)}set current(e){P(this,U)!=e&&(ce(this,U,e),P(this,H).forEach(t=>t(e)))}on(e){return P(this,H).add(e),()=>P(this,H).delete(e)}}U=new WeakMap,H=new WeakMap;const mt=r=>new is(r),fe=Symbol.for("atomico.hooks");globalThis[fe]=globalThis[fe]||{};let N=globalThis[fe];const ls=Symbol.for("Atomico.suspense"),gt=Symbol.for("Atomico.effect"),ds=Symbol.for("Atomico.layoutEffect"),ht=Symbol.for("Atomico.insertionEffect"),F=(r,e,t)=>{const{i:s,hooks:a}=N.c,o=a[s]=a[s]||{};return o.value=r(o.value),o.effect=e,o.tag=t,N.c.i++,a[s].value},ft=r=>F((e=mt(r))=>e),re=()=>F((r=mt(N.c.host))=>r),bt=()=>N.c.update,cs=(r,e,t=0)=>{let s={},a=!1;const o=()=>a,n=(d,i)=>{for(const l in s){const c=s[l];c.effect&&c.tag===d&&(c.value=c.effect(c.value,i))}};return{load:d=>{N.c={host:e,hooks:s,update:r,i:0,id:t};let i;try{a=!1,i=d()}catch(l){if(l!==ls)throw l;a=!0}finally{N.c=null}return i},cleanEffects:d=>(n(ht,d),()=>(n(ds,d),()=>{n(gt,d)})),isSuspense:o}},Q=Symbol.for;function vt(r,e){const t=r.length;if(t!==e.length)return!1;for(let s=0;s<t;s++){let a=r[s],o=e[s];if(a!==o)return!1}return!0}const q=r=>typeof r=="function",V=r=>typeof r=="object",{isArray:us}=Array,be=(r,e)=>(e?r instanceof HTMLStyleElement:!0)&&"hydrate"in((r==null?void 0:r.dataset)||{});function xt(r,e){let t;const s=a=>{let{length:o}=a;for(let n=0;n<o;n++){const d=a[n];if(d&&Array.isArray(d))s(d);else{const i=typeof d;if(d==null||i==="function"||i==="boolean")continue;i==="string"||i==="number"?(t==null&&(t=""),t+=d):(t!=null&&(e(t),t=null),e(d))}}};s(r),t!=null&&e(t)}const yt=(r,e,t)=>(r.addEventListener(e,t),()=>r.removeEventListener(e,t));class wt{constructor(e,t,s){this.message=t,this.target=e,this.value=s}}class kt extends wt{}class ps extends wt{}const ee="Custom",ms=null,gs={true:1,"":1,1:1};function hs(r,e,t,s,a){const{type:o,reflect:n,event:d,value:i,attr:l=fs(e)}=(t==null?void 0:t.name)!=ee&&V(t)&&t!=ms?t:{type:t},c=(o==null?void 0:o.name)===ee&&o.map,p=i!=null?o==Function||!q(i)?()=>i:i:null;Object.defineProperty(r,e,{configurable:!0,set(u){const g=this[e];p&&o!=Boolean&&u==null&&(u=p());const{error:b,value:m}=(c?xs:ys)(o,u);if(b&&m!=null)throw new kt(this,`The value defined for prop '${e}' must be of type '${o.name}'`,m);g!=m&&(this._props[e]=m??void 0,this.update(),d&&Ct(this,d),this.updated.then(()=>{n&&(this._ignoreAttr=l,bs(this,o,l,this[e]),this._ignoreAttr=null)}))},get(){return this._props[e]}}),p&&(a[e]=p()),s[l]={prop:e,type:o}}const Ct=(r,{type:e,base:t=CustomEvent,...s})=>r.dispatchEvent(new t(e,s)),fs=r=>r.replace(/([A-Z])/g,"-$1").toLowerCase(),bs=(r,e,t,s)=>s==null||e==Boolean&&!s?r.removeAttribute(t):r.setAttribute(t,(e==null?void 0:e.name)===ee&&(e!=null&&e.serialize)?e==null?void 0:e.serialize(s):V(s)?JSON.stringify(s):e==Boolean?"":s),vs=(r,e)=>r==Boolean?!!gs[e]:r==Number?Number(e):r==String?e:r==Array||r==Object?JSON.parse(e):r.name==ee?e:new r(e),xs=({map:r},e)=>{try{return{value:r(e),error:!1}}catch{return{value:e,error:!0}}},ys=(r,e)=>r==null||e==null?{value:e,error:!1}:r!=String&&e===""?{value:void 0,error:!1}:r==Object||r==Array||r==Symbol?{value:e,error:{}.toString.call(e)!==`[object ${r.name}]`}:e instanceof r?{value:e,error:r==Number&&Number.isNaN(e.valueOf())}:r==String||r==Number||r==Boolean?{value:e,error:r==Number?typeof e!="number"?!0:Number.isNaN(e):r==String?typeof e!="string":typeof e!="boolean"}:{value:e,error:!0};let ws=0;const ks=r=>{var t;return((t=(r==null?void 0:r.dataset)||{})==null?void 0:t.hydrate)||""||"c"+ws++},D=(r,e=HTMLElement)=>{const t={},s={},a="prototype"in e&&e.prototype instanceof Element,o=a?e:"base"in e?e.base:HTMLElement,{props:n,styles:d}=a?r:e;class i extends o{constructor(){super(),this._setup(),this._render=()=>r({...this._props});for(const c in s)this[c]=s[c]}static get styles(){return[super.styles,d]}async _setup(){if(this._props)return;this._props={};let c,p;this.mounted=new Promise(v=>this.mount=()=>{v(),c!=this.parentNode&&(p!=c?this.unmounted.then(this.update):this.update()),c=this.parentNode}),this.unmounted=new Promise(v=>this.unmount=()=>{v(),(c!=this.parentNode||!this.isConnected)&&(u.cleanEffects(!0)()(),p=this.parentNode,c=null)}),this.symbolId=this.symbolId||Symbol(),this.symbolIdParent=Symbol();const u=cs(()=>this.update(),this,ks(this));let g,b=!0;const m=be(this);this.update=()=>(g||(g=!0,this.updated=(this.updated||this.mounted).then(()=>{try{const v=u.load(this._render),f=u.cleanEffects();return v&&v.render(this,this.symbolId,m),g=!1,b&&!u.isSuspense()&&(b=!1,!m&&Cs(this)),f()}finally{g=!1}}).then(v=>{v&&v()})),this.updated),this.update()}connectedCallback(){this.mount(),super.connectedCallback&&super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.unmount()}attributeChangedCallback(c,p,u){if(t[c]){if(c===this._ignoreAttr||p===u)return;const{prop:g,type:b}=t[c];try{this[g]=vs(b,u)}catch{throw new ps(this,`The value defined as attr '${c}' cannot be parsed by type '${b.name}'`,u)}}else super.attributeChangedCallback(c,p,u)}static get props(){return{...super.props,...n}}static get observedAttributes(){const c=super.observedAttributes||[];for(const p in n)hs(this.prototype,p,n[p],t,s);return Object.keys(t).concat(c)}}return i};function Cs(r){const{styles:e}=r.constructor,{shadowRoot:t}=r;if(t&&e.length){const s=[];xt(e,a=>{a&&(a instanceof Element?t.appendChild(a.cloneNode(!0)):s.push(a))}),s.length&&(t.adoptedStyleSheets=s)}}const St=r=>(e,t)=>{F(([s,a]=[])=>((a||!a)&&(a&&vt(a,t)?s=s||!0:(q(s)&&s(),s=null)),[s,t]),([s,a],o)=>o?(q(s)&&s(),[]):[s||e(),a],r)},Y=St(gt),Ss=St(ht);class Mt extends Array{constructor(e,t){let s=!0;const a=o=>{try{t(o,this,s)}finally{s=!1}};super(void 0,a,t),a(e)}}const ke=r=>{const e=bt();return F((t=new Mt(r,(s,a,o)=>{s=q(s)?s(a[0]):s,s!==a[0]&&(a[0]=s,o||e())}))=>t)},L=(r,e)=>{const[t]=F(([s,a,o=0]=[])=>((!a||a&&!vt(a,e))&&(s=r()),[s,e,o]));return t},Ce=r=>{const{current:e}=re();if(!(r in e))throw new kt(e,`For useProp("${r}"), the prop does not exist on the host.`,r);return F((t=new Mt(e[r],(s,a)=>{s=q(s)?s(e[r]):s,e[r]=s}))=>(t[0]=e[r],t))},E=(r,e={})=>{const t=re();return t[r]||(t[r]=(s=e.detail)=>Ct(t.current,{type:r,...e,detail:s})),t[r]},ve=Q("atomico/options");globalThis[ve]=globalThis[ve]||{sheet:!!document.adoptedStyleSheets};const ae=globalThis[ve],Ms=new Promise(r=>{ae.ssr||(document.readyState==="loading"?yt(document,"DOMContentLoaded",r):r())}),Ls={checked:1,value:1,selected:1},$s={list:1,type:1,size:1,form:1,width:1,height:1,src:1,href:1,slot:1},qs={shadowDom:1,staticNode:1,cloneNode:1,children:1,key:1},Z={},xe=[];class ye extends Text{}const Es=Q("atomico/id"),O=Q("atomico/type"),ue=Q("atomico/ref"),Lt=Q("atomico/vnode"),$t=()=>{};function Bs(r,e,t){return Et(this,r,e,t)}const qt=(r,e,...t)=>{const s=e||Z;let{children:a}=s;if(a=a??(t.length?t:xe),r===$t)return a;const o=r?r instanceof Node?1:r.prototype instanceof HTMLElement&&2:0;if(o===!1&&r instanceof Function)return r(a!=xe?{children:a,...s}:s);const n=ae.render||Bs;return{[O]:Lt,type:r,props:s,children:a,key:s.key,shadow:s.shadowDom,static:s.staticNode,raw:o,is:s.is,clone:s.cloneNode,render:n}};function Et(r,e,t=Es,s,a){let o;if(e&&e[t]&&e[t].vnode==r||r[O]!=Lt)return e;(r||!e)&&(a=a||r.type=="svg",o=r.type!="host"&&(r.raw==1?(e&&r.clone?e[ue]:e)!=r.type:r.raw==2?!(e instanceof r.type):e?e[ue]||e.localName!=r.type:!e),o&&r.type!=null&&(r.raw==1&&r.clone?(s=!0,e=r.type.cloneNode(!0),e[ue]=r.type):e=r.raw==1?r.type:r.raw==2?new r.type:a?document.createElementNS("http://www.w3.org/2000/svg",r.type):document.createElement(r.type,r.is?{is:r.is}:void 0)));const n=e[t]?e[t]:Z,{vnode:d=Z,cycle:i=0}=n;let{fragment:l,handlers:c}=n;const{children:p=xe,props:u=Z}=d;if(c=o?{}:c||{},r.static&&!o)return e;if(r.shadow&&!e.shadowRoot&&e.attachShadow({mode:"open",...r.shadow}),r.props!=u&&Us(e,u,r.props,c,a),r.children!==p){const g=r.shadow?e.shadowRoot:e;l=js(r.children,l,g,t,!i&&s,a&&r.type=="foreignObject"?!1:a)}return e[t]={vnode:r,handlers:c,fragment:l,cycle:i+1},e}function Ts(r,e){const t=new ye(""),s=new ye("");let a;if(r[e?"prepend":"append"](t),e){let{lastElementChild:o}=r;for(;o;){const{previousElementSibling:n}=o;if(be(o,!0)&&!be(n,!0)){a=o;break}o=n}}return a?a.before(s):r.append(s),{markStart:t,markEnd:s}}function js(r,e,t,s,a,o){r=r==null?null:us(r)?r:[r];const n=e||Ts(t,a),{markStart:d,markEnd:i,keyes:l}=n;let c;const p=l&&new Set;let u=d;if(r&&xt(r,g=>{if(typeof g=="object"&&!g[O])return;const b=g[O]&&g.key,m=l&&b!=null&&l.get(b);u!=i&&u===m?p.delete(u):u=u==i?i:u.nextSibling;const v=l?m:u;let f=v;if(g[O])f=Et(g,v,s,a,o);else{const M=g+"";!(f instanceof Text)||f instanceof ye?f=new Text(M):f.data!=M&&(f.data=M)}f!=u&&(l&&p.delete(f),!v||l?(t.insertBefore(f,u),l&&u!=i&&p.add(u)):v==i?t.insertBefore(f,i):(t.replaceChild(f,v),u=f)),b!=null&&(c=c||new Map,c.set(b,f))}),u=u==i?i:u.nextSibling,e&&u!=i)for(;u!=i;){const g=u;u=u.nextSibling,g.remove()}return p&&p.forEach(g=>g.remove()),n.keyes=c,n}function Us(r,e,t,s,a){for(const o in e)!(o in t)&&Ge(r,o,e[o],null,a,s);for(const o in t)Ge(r,o,e[o],t[o],a,s)}function Ge(r,e,t,s,a,o){if(e=e=="class"&&!a?"className":e,t=t??null,s=s??null,e in r&&Ls[e]&&(t=r[e]),!(s===t||qs[e]||e[0]=="_"))if(r.localName==="slot"&&e==="assignNode"&&"assign"in r)r.assign(s);else if(e[0]=="o"&&e[1]=="n"&&(q(s)||q(t)))Ds(r,e.slice(2),s,o);else if(e=="ref")s&&(q(s)?s(r):s.current=r);else if(e=="style"){const{style:n}=r;t=t||"",s=s||"";const d=V(t),i=V(s);if(d)for(const l in t)if(i)!(l in s)&&Ke(n,l,null);else break;if(i)for(const l in s){const c=s[l];d&&t[l]===c||Ke(n,l,c)}else n.cssText=s}else{const n=e[0]=="$"?e.slice(1):e;n===e&&(!a&&!$s[e]&&e in r||q(s)||q(t))?r[e]=s??"":s==null?r.removeAttribute(n):r.setAttribute(n,V(s)?JSON.stringify(s):s)}}function Ds(r,e,t,s){if(s.handleEvent||(s.handleEvent=a=>s[a.type].call(r,a)),t){if(!s[e]){const a=t.capture||t.once||t.passive?Object.assign({},t):null;r.addEventListener(e,s,a)}s[e]=t}else s[e]&&(r.removeEventListener(e,s),delete s[e])}function Ke(r,e,t){let s="setProperty";t==null&&(s="removeProperty",t=null),~e.indexOf("-")?r[s](e,t):r[e]=t}const As=qt("host",{style:"display: contents"}),Bt="value",Ps=(r,e)=>{const t=re(),s=ft();Ss(()=>yt(t.current,"ConnectContext",a=>{a.composedPath().at(0)!==a.currentTarget&&r===a.detail.id&&(a.stopPropagation(),a.detail.connect(s))}),[r]),s.current=e},Se=r=>{const e=E("ConnectContext",{bubbles:!0,composed:!0}),[t,s]=ke(()=>{if(ae.ssr)return;let o;return e({id:r,connect(n){o=n}}),o}),a=bt();return Y(()=>{Ms.then(()=>e({id:r,connect:s}))},[r]),Y(()=>{if(t)return t.on(a)},[t]),(t==null?void 0:t.current)||r[Bt]},Tt=r=>{const e=D(({value:t})=>(Ps(e,t),As),{props:{value:{type:Object,value:()=>r}}});return e[Bt]=r,e};Tt({dispatch(r,e){}});const Ze={};function oe(r,...e){const t=(r.raw||r).reduce((s,a,o)=>s+a+(e[o]||""),"");return Ze[t]=Ze[t]||Hs(t)}function Hs(r){if(ae.sheet){const e=new CSSStyleSheet;return e.replaceSync(r),e}else{const e=document.createElement("style");return e.textContent=r,e}}const h=(r,e,t)=>(e==null?e={key:t}:e.key=t,qt(r,e)),$=h,Me=oe`*,*:before,*:after{box-sizing:border-box}button{padding:0;touch-action:manipulation;cursor:pointer;user-select:none}`,Le=oe`.vh{position:absolute;transform:scale(0)}`;function $e(){const r=new Date;return new w(r.getFullYear(),r.getMonth()+1,r.getDate())}const Ns=864e5;function _s(r){const e=S(r);e.setUTCDate(e.getUTCDate()+3-(e.getUTCDay()+6)%7);const t=new Date(Date.UTC(e.getUTCFullYear(),0,4));return 1+Math.round(((e.getTime()-t.getTime())/Ns-3+(t.getUTCDay()+6)%7)/7)}function qe(r,e=0){const t=S(r),s=t.getUTCDay(),a=(s<e?7:0)+s-e;return t.setUTCDate(t.getUTCDate()-a),w.from(t)}function jt(r,e=0){return qe(r,e).add({days:6})}function Ut(r){return w.from(new Date(Date.UTC(r.year,r.month,0)))}function ne(r,e,t){return e&&w.compare(r,e)<0?e:t&&w.compare(r,t)>0?t:r}const zs={days:1};function Fs(r,e=0){let t=qe(r.toPlainDate(),e);const s=jt(Ut(r),e),a=[];for(;w.compare(t,s)<0;){const o=[];for(let n=0;n<7;n++)o.push(t),t=t.add(zs);a.push(o)}return a}function S(r){return new Date(Date.UTC(r.year,r.month-1,r.day??1))}const Is=/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/,pe=(r,e)=>r.toString().padStart(e,"0");class w{constructor(e,t,s){this.year=e,this.month=t,this.day=s}add(e){const t=S(this);if("days"in e)return t.setUTCDate(this.day+e.days),w.from(t);let{year:s,month:a}=this;"months"in e?(a=this.month+e.months,t.setUTCMonth(a-1)):(s=this.year+e.years,t.setUTCFullYear(s));const o=w.from(S({year:s,month:a,day:1}));return ne(w.from(t),o,Ut(o))}toString(){return`${pe(this.year,4)}-${pe(this.month,2)}-${pe(this.day,2)}`}toPlainYearMonth(){return new _(this.year,this.month)}equals(e){return w.compare(this,e)===0}static compare(e,t){return e.year<t.year?-1:e.year>t.year?1:e.month<t.month?-1:e.month>t.month?1:e.day<t.day?-1:e.day>t.day?1:0}static from(e){if(typeof e=="string"){const t=e.match(Is);if(!t)throw new TypeError(e);const[,s,a,o]=t;return new w(parseInt(s,10),parseInt(a,10),parseInt(o,10))}return new w(e.getUTCFullYear(),e.getUTCMonth()+1,e.getUTCDate())}}class _{constructor(e,t){this.year=e,this.month=t}add(e){const t=S(this),s=(e.months??0)+(e.years??0)*12;return t.setUTCMonth(t.getUTCMonth()+s),new _(t.getUTCFullYear(),t.getUTCMonth()+1)}equals(e){return this.year===e.year&&this.month===e.month}toPlainDate(){return new w(this.year,this.month,1)}static compare(e,t){return e.year<t.year?-1:e.year>t.year?1:e.month<t.month?-1:e.month>t.month?1:0}}function te(r,e){if(e)try{return r.from(e)}catch{}}function B(r){const[e,t]=Ce(r);return[L(()=>te(w,e),[e]),s=>t(s==null?void 0:s.toString())]}function Rs(r){const[e="",t]=Ce(r);return[L(()=>{const[s,a]=e.split("/"),o=te(w,s),n=te(w,a);return o&&n?[o,n]:[]},[e]),s=>t(`${s[0]}/${s[1]}`)]}function Vs(r){const[e="",t]=Ce(r);return[L(()=>{const s=[];for(const a of e.trim().split(/\s+/)){const o=te(w,a);o&&s.push(o)}return s},[e]),s=>t(s.join(" "))]}function z(r,e){return L(()=>new Intl.DateTimeFormat(e,{timeZone:"UTC",...r}),[e,r])}function Xe(r,e,t){const s=z(r,t);return L(()=>{const a=[],o=new Date;for(var n=0;n<7;n++){const d=(o.getUTCDay()-e+7)%7;a[d]=s.format(o),o.setUTCDate(o.getUTCDate()+1)}return a},[e,s])}const et=(r,e,t)=>ne(r,e,t)===r,tt=r=>r.target.matches(":dir(ltr)"),Os={month:"long",day:"numeric"},Ws={month:"long"},Ys={weekday:"long"},me={bubbles:!0};function Qs({props:r,context:e}){const{offset:t}=r,{firstDayOfWeek:s,isDateDisallowed:a,min:o,max:n,today:d,page:i,locale:l,focusedDate:c,formatWeekday:p}=e,u=d??$e(),g=Xe(Ys,s,l),b=L(()=>({weekday:p}),[p]),m=Xe(b,s,l),v=z(Os,l),f=z(Ws,l),M=L(()=>i.start.add({months:t}),[i,t]),le=L(()=>Fs(M,s),[M,s]),_t=E("focusday",me),zt=E("selectday",me),Ft=E("hoverday",me);function He(y){_t(ne(y,o,n))}function It(y){let C;switch(y.key){case"ArrowRight":C=c.add({days:tt(y)?1:-1});break;case"ArrowLeft":C=c.add({days:tt(y)?-1:1});break;case"ArrowDown":C=c.add({days:7});break;case"ArrowUp":C=c.add({days:-7});break;case"PageUp":C=c.add(y.shiftKey?{years:-1}:{months:-1});break;case"PageDown":C=c.add(y.shiftKey?{years:1}:{months:1});break;case"Home":C=qe(c,s);break;case"End":C=jt(c,s);break;default:return}He(C),y.preventDefault()}function Rt(y){var Fe,Ie;const C=M.equals(y);if(!e.showOutsideDays&&!C)return;const Vt=y.equals(c),Ne=y.equals(u),G=S(y),K=a==null?void 0:a(G),_e=!et(y,o,n);let ze="",A;if(e.type==="range"){const[T,I]=e.value,Re=T==null?void 0:T.equals(y),Ve=I==null?void 0:I.equals(y);A=T&&I&&et(y,T,I),ze=`${Re?"range-start":""} ${Ve?"range-end":""} ${A&&!Re&&!Ve?"range-inner":""}`}else e.type==="multi"?A=e.value.some(T=>T.equals(y)):A=(Fe=e.value)==null?void 0:Fe.equals(y);return{part:`${`button day day-${G.getUTCDay()} ${C?A?"selected":"":"outside"} ${K?"disallowed":""} ${Ne?"today":""} ${((Ie=e.getDayParts)==null?void 0:Ie.call(e,G))??""}`} ${ze}`,tabindex:C&&Vt?0:-1,disabled:_e,"aria-disabled":K?"true":void 0,"aria-pressed":C&&A,"aria-current":Ne?"date":void 0,"aria-label":v.format(G),onkeydown:It,onclick(){K||zt(y),He(y)},onmouseover(){!K&&!_e&&Ft(y)}}}return{weeks:le,yearMonth:M,daysLong:g,daysVisible:m,formatter:f,getDayProps:Rt}}const ge=$e(),J=Tt({type:"date",firstDayOfWeek:1,focusedDate:ge,page:{start:ge.toPlainYearMonth(),end:ge.toPlainYearMonth()}});customElements.define("calendar-ctx",J);const Js=(r,e)=>(e+r)%7,Gs=D(r=>{const e=Se(J),t=ft(),s=Qs({props:r,context:e});function a(){var o;(o=t.current.querySelector("button[tabindex='0']"))==null||o.focus()}return $("host",{shadowDom:!0,focus:a,children:[h("div",{id:"h",part:"heading",children:s.formatter.format(S(s.yearMonth))}),$("table",{ref:t,"aria-labelledby":"h",part:"table",children:[$("colgroup",{children:[e.showWeekNumbers&&h("col",{part:"col-weeknumber"}),h("col",{part:"col-1"}),h("col",{part:"col-2"}),h("col",{part:"col-3"}),h("col",{part:"col-4"}),h("col",{part:"col-5"}),h("col",{part:"col-6"}),h("col",{part:"col-7"})]}),h("thead",{children:$("tr",{part:"tr head",children:[e.showWeekNumbers&&h("th",{part:"th weeknumber",children:$("slot",{name:"weeknumber",children:[h("span",{class:"vh",children:"Week"}),h("span",{"aria-hidden":"true",children:"#"})]})}),s.daysLong.map((o,n)=>$("th",{part:`th day day-${Js(e.firstDayOfWeek,n)}`,scope:"col",children:[h("span",{class:"vh",children:o}),h("span",{"aria-hidden":"true",children:s.daysVisible[n]})]}))]})}),h("tbody",{children:s.weeks.map((o,n)=>$("tr",{part:"tr week",children:[e.showWeekNumbers&&h("th",{class:"num",part:"th weeknumber",scope:"row",children:_s(o[0])}),o.map((d,i)=>{const l=s.getDayProps(d);return h("td",{part:"td",children:l&&h("button",{class:"num",...l,children:d.day})},i)})]},n))})]})]})},{props:{offset:{type:Number,value:0}},styles:[Me,Le,oe`:host{--color-accent: black;--color-text-on-accent: white;display:flex;flex-direction:column;gap:.25rem;text-align:center;inline-size:fit-content}table{border-collapse:collapse;font-size:.875rem}th{inline-size:2.25rem;block-size:2.25rem}td{padding-inline:0}.num{font-variant-numeric:tabular-nums}button{color:inherit;font-size:inherit;background:transparent;border:0;block-size:2.25rem;inline-size:2.25rem}button:hover:where(:not(:disabled,[aria-disabled])){background:#0000000d}button:is([aria-pressed=true],:focus-visible){background:var(--color-accent);color:var(--color-text-on-accent)}button:focus-visible{outline:1px solid var(--color-text-on-accent);outline-offset:-2px}button:disabled,:host::part(outside),:host::part(disallowed){cursor:default;opacity:.5}`]});customElements.define("calendar-month",Gs);function st(r){return h("button",{part:`button ${r.name} ${r.onclick?"":"disabled"}`,onclick:r.onclick,"aria-disabled":r.onclick?null:"true",children:h("slot",{name:r.name,children:r.children})})}function Ee(r){const e=S(r.page.start),t=S(r.page.end);return h(J,{value:r,onselectday:r.onSelect,onfocusday:r.onFocus,onhoverday:r.onHover,children:$("div",{role:"group","aria-labelledby":"h",part:"container",children:[h("div",{id:"h",class:"vh","aria-live":"polite","aria-atomic":"true",children:r.formatVerbose.formatRange(e,t)}),$("div",{part:"header",children:[h(st,{name:"previous",onclick:r.previous,children:"Previous"}),h("slot",{part:"heading",name:"heading",children:h("div",{"aria-hidden":"true",children:r.format.formatRange(e,t)})}),h(st,{name:"next",onclick:r.next,children:"Next"})]}),h("slot",{part:"months"})]})})}const Be={value:{type:String,value:""},min:{type:String,value:""},max:{type:String,value:""},today:{type:String,value:""},isDateDisallowed:{type:Function,value:r=>!1},formatWeekday:{type:String,value:()=>"narrow"},getDayParts:{type:Function,value:r=>""},firstDayOfWeek:{type:Number,value:()=>1},showOutsideDays:{type:Boolean,value:!1},locale:{type:String,value:()=>{}},months:{type:Number,value:1},focusedDate:{type:String,value:()=>{}},pageBy:{type:String,value:()=>"months"},showWeekNumbers:{type:Boolean,value:!1}},Te=[Me,Le,oe`:host{display:block;inline-size:fit-content}:host::part(container){display:flex;flex-direction:column;gap:1em}:host::part(header){display:flex;align-items:center;justify-content:space-between}:host::part(heading){font-weight:700;font-size:1.25em}:host::part(button){display:flex;align-items:center;justify-content:center}:host::part(button disabled){cursor:default;opacity:.5}`],Ks={year:"numeric"},Zs={year:"numeric",month:"long"};function he(r,e){return(e.year-r.year)*12+e.month-r.month}const rt=(r,e)=>(r=e===12?new _(r.year,1):r,{start:r,end:r.add({months:e-1})});function Xs({pageBy:r,focusedDate:e,months:t,max:s,min:a,goto:o}){const n=r==="single"?1:t,[d,i]=ke(()=>rt(e.toPlainYearMonth(),t)),l=p=>i(rt(d.start.add({months:p}),t)),c=p=>{const u=he(d.start,p.toPlainYearMonth());return u>=0&&u<t};return Y(()=>{if(c(e))return;const p=he(e.toPlainYearMonth(),d.start);o(e.add({months:p}))},[d.start]),Y(()=>{if(c(e))return;const p=he(d.start,e.toPlainYearMonth());l(p===-1?-n:p===t?n:Math.floor(p/t)*t)},[e,n,t]),{page:d,previous:!a||!c(a)?()=>l(-n):void 0,next:!s||!c(s)?()=>l(n):void 0}}function je({months:r,pageBy:e,locale:t,focusedDate:s,setFocusedDate:a}){const[o]=B("min"),[n]=B("max"),[d]=B("today"),i=E("focusday"),l=E("change"),c=L(()=>ne(s??d??$e(),o,n),[s,d,o,n]);function p(f){a(f),i(S(f))}const{next:u,previous:g,page:b}=Xs({pageBy:e,focusedDate:c,months:r,min:o,max:n,goto:p}),m=re();function v(f){const M=(f==null?void 0:f.target)??"day";M==="day"?m.current.querySelectorAll("calendar-month").forEach(le=>le.focus(f)):m.current.shadowRoot.querySelector(`[part~='${M}']`).focus(f)}return{format:z(Ks,t),formatVerbose:z(Zs,t),page:b,focusedDate:c,dispatch:l,onFocus(f){f.stopPropagation(),p(f.detail),setTimeout(v)},min:o,max:n,today:d,next:u,previous:g,focus:v}}const er=D(r=>{const[e,t]=B("value"),[s=e,a]=B("focusedDate"),o=je({...r,focusedDate:s,setFocusedDate:a});function n(d){t(d.detail),o.dispatch()}return h("host",{shadowDom:!0,focus:o.focus,children:h(Ee,{...r,...o,type:"date",value:e,onSelect:n})})},{props:Be,styles:Te});customElements.define("calendar-date",er);function Dt(r){return $($t,{children:[h("label",{part:"label",for:"s",children:h("slot",{name:"label",children:r.label})}),h("select",{id:"s",part:"select",onchange:r.onChange,children:r.options.map(e=>h("option",{part:"option",...e}))})]})}const At=[Me,Le];function tr(r,e){return Array.from({length:r},(t,s)=>e(s))}function sr(r){const{min:e,max:t,focusedDate:s}=Se(J),a=E("focusday",{bubbles:!0}),o=s.toPlainYearMonth(),n=o.year,d=Math.floor(r.maxYears/2),i=n-d,l=n+(r.maxYears-d-1),c=Math.max(i,(e==null?void 0:e.year)??-1/0),p=Math.min(l,(t==null?void 0:t.year)??1/0),u=tr(p-c+1,b=>{const m=c+b;return{label:`${m}`,value:`${m}`,selected:m===o.year}});function g(b){const m=parseInt(b.currentTarget.value)-o.year;a(s.add({years:m}))}return{options:u,onChange:g}}const rr=D(r=>{const e=sr(r);return h("host",{shadowDom:!0,children:h(Dt,{label:"Year",...e})})},{props:{maxYears:{type:Number,value:20}},styles:At});customElements.define("calendar-select-year",rr);function ar(r){const{min:e,max:t,focusedDate:s,locale:a}=Se(J),o=E("focusday",{bubbles:!0}),n=L(()=>({month:r.formatMonth}),[r.formatMonth]),d=z(n,a),i=L(()=>{const u=[],g=new Date;g.setUTCDate(1);for(var b=0;b<12;b++){const m=(g.getUTCMonth()+12)%12;u[m]=d.format(g),g.setUTCMonth(g.getUTCMonth()+1)}return u},[d]),l=s.toPlainYearMonth(),c=i.map((u,g)=>{const b=g+1,m=l.add({months:b-l.month}),v=e!=null&&_.compare(m,e)<0||t!=null&&_.compare(m,t)>0;return{label:u,value:`${b}`,disabled:v,selected:b===l.month}});function p(u){const g=parseInt(u.currentTarget.value)-l.month;o(s.add({months:g}))}return{options:c,onChange:p}}const or=D(r=>{const e=ar(r);return h("host",{shadowDom:!0,children:h(Dt,{label:"Month",...e})})},{props:{formatMonth:{type:String,value:()=>"long"}},styles:At});customElements.define("calendar-select-month",or);const at=(r,e)=>w.compare(r,e)<0?[r,e]:[e,r],nr=D(r=>{const[e,t]=Rs("value"),[s=e[0],a]=B("focusedDate"),o=je({...r,focusedDate:s,setFocusedDate:a}),n=E("rangestart"),d=E("rangeend"),[i,l]=B("tentative"),[c,p]=ke();Y(()=>p(void 0),[i]);function u(v){o.onFocus(v),g(v)}function g(v){v.stopPropagation(),i&&p(v.detail)}function b(v){const f=v.detail;v.stopPropagation(),i?(t(at(i,f)),l(void 0),d(S(f)),o.dispatch()):(l(f),n(S(f)))}const m=i?at(i,c??i):e;return h("host",{shadowDom:!0,focus:o.focus,children:h(Ee,{...r,...o,type:"range",value:m,onFocus:u,onHover:g,onSelect:b})})},{props:{...Be,tentative:{type:String,value:""}},styles:Te});customElements.define("calendar-range",nr);const ir=D(r=>{const[e,t]=Vs("value"),[s=e[0],a]=B("focusedDate"),o=je({...r,focusedDate:s,setFocusedDate:a});function n(d){const i=[...e],l=e.findIndex(c=>c.equals(d.detail));l<0?i.push(d.detail):i.splice(l,1),t(i),o.dispatch()}return h("host",{shadowDom:!0,focus:o.focus,children:h(Ee,{...r,...o,type:"multi",value:e,onSelect:n})})},{props:Be,styles:Te});customElements.define("calendar-multi",ir);let R=null;async function Ue(){return R||(R=(await lt()).columns||[],R)}function lr(){R=null}function De(r,e){return r.filter(t=>!t.applies_to||t.applies_to==="both"||t.applies_to===e)}function W(r,e){return r.find(t=>t.role===e)||null}function Ae(r,e){if(e==null||e==="")return r.type==="number"||r.type==="amount"?0:"";if(r.type==="number"||r.type==="amount"){const t=parseFloat(e);return isNaN(t)?0:t}return String(e)}function Pe(r,e){const t=Ae(r,e);return r.type==="amount"?"₱"+t.toLocaleString("en-PH",{minimumFractionDigits:2}):r.type==="number"?`<span class="text-sm font-semibold text-gray-800">${t}</span>`:t?`<span class="text-sm text-gray-800">${j(t)}</span>`:'<span class="text-gray-300">—</span>'}function Pt(r,e="",t="",s=!1){const a="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors",o=`col_${r.id}${t}`;let n="";switch(r.type){case"number":case"amount":n=`<input type="number" step="any" id="${o}" class="${a}${s?" bg-gray-50":""}" value="${e}" placeholder="0"${s?" readonly":""} />`;break;case"date":return dr(r,e,o,s);case"select":n=`<select id="${o}" class="${a}"${s?" disabled":""}></select>`;break;default:n=`<input type="text" id="${o}" class="${a}${s?" bg-gray-50":""}" value="${e}"${s?" readonly":""} />`}const d=r.required?" *":"",i=s?' <span class="text-[10px] text-gray-400 font-normal">(auto)</span>':"";return`
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">${j(r.name)}${d}${i}</label>
      ${n}
    </div>`}function dr(r,e,t,s=!1){const a=r.required?" *":"",o=s?' <span class="text-[10px] text-gray-400 font-normal">(auto)</span>':"";if(s){const c=e?new Date(e+"T00:00:00").toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"}):"—";return`
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">${j(r.name)}${a}${o}</label>
        <input type="hidden" id="${t}" value="${k(e)}" />
        <div class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between gap-2 text-left">
          <span class="text-gray-800">${j(c)}</span>
          <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
      </div>`}const n=`${t}_btn`,d=`${t}_pop`,i=`${t}_cal`,l=e?new Date(e+"T00:00:00").toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"}):"Pick a date";return`
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">${j(r.name)}${a}</label>
      <input type="hidden" id="${t}" value="${k(e)}" />
      <button type="button" popovertarget="${d}" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-white flex items-center justify-between gap-2 text-left transition-colors hover:border-blue-300" id="${n}">
        <span class="dp-label ${e?"text-gray-800":"text-gray-400"}">${j(l)}</span>
        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </button>
      <div popover id="${d}" class="dp-popover">
        <calendar-date class="cally dp-calendar" id="${i}" value="${k(e)}">
          <svg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
          <svg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
          <calendar-month></calendar-month>
        </calendar-date>
      </div>
    </div>`}function Ht(r){r.querySelectorAll(".dp-popover").forEach(e=>{if(e.dataset.bound)return;e.dataset.bound="1";const t=e.querySelector("calendar-date"),s=e.parentElement.querySelector('input[type="hidden"]'),a=e.parentElement.querySelector(".dp-label"),o=r.querySelector(`[popovertarget="${e.id}"]`);if(!t||!s||!a)return;const n=()=>{if(!o){e.classList.add("placed");return}const d=o.getBoundingClientRect(),i=e.offsetWidth||320,l=e.offsetHeight||340;let c=d.left;c+i>window.innerWidth-8&&(c=window.innerWidth-i-8),c<8&&(c=8);let p=d.bottom+6;p+l>window.innerHeight-8&&(p=Math.max(8,d.top-l-6)),e.style.position="fixed",e.style.left=`${c}px`,e.style.top=`${p}px`,e.style.margin="0",e.classList.add("placed")};e.addEventListener("toggle",d=>{d.newState==="open"&&(e.classList.remove("placed"),n())}),t.addEventListener("change",()=>{t.value&&(s.value=t.value,a.textContent=new Date(t.value+"T00:00:00").toLocaleDateString("en-PH",{year:"numeric",month:"short",day:"numeric"}),a.classList.remove("text-gray-400"),a.classList.add("text-gray-800"),e.hidePopover())})})}function Nt(r,e){const t=r.querySelector(`#col_${e.id}, #col_${e.id}_edit`);return t?e.type==="number"||e.type==="amount"?t.value===""?"":String(parseFloat(t.value)):t.value.trim():""}function j(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function k(r){return j(r)}const ot=["Campaigns & Columns","Users & Agents","Admin Panel"];class ie{constructor(e,t){this.app=e,this.sidebarItems=t}render(e){var l,c,p,u,g,b;const t=document.createElement("div");t.className="h-screen bg-gray-50 flex relative overflow-hidden";const s=localStorage.getItem("sidebarClosed")==="true",a=this.sidebarItems.filter(m=>!ot.includes(m.label)),o=this.sidebarItems.filter(m=>ot.includes(m.label)),n=this.sidebarItems.find(m=>m.active),d=m=>`
      <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 justify-between
        ${m.active?"bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25 ring-1 ring-white/10 ring-inset":"text-slate-300 hover:bg-white/5 hover:text-white"}">
        <span class="flex items-center gap-3 flex-1">
          ${m.icon?`<span class="w-5 h-5 flex items-center justify-center ${m.active?"text-white":"text-slate-400 group-hover/item:text-indigo-300"}">${m.icon}</span>`:""}
          <span>${m.label}</span>
        </span>
        ${m.active?'<span class="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse flex-shrink-0"></span>':'<span class="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0"></span>'}
      </button>`;t.innerHTML=`
      <!-- Sidebar Toggle Button (always visible) -->
      <button id="sidebarToggle" aria-label="Toggle sidebar" class="fixed top-5 z-50 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 rounded-full p-2.5 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-110 ${s?"left-3":"left-[260px]"}">
        <svg id="toggleIcon" class="w-4 h-4 transition-transform duration-500 ${s?"rotate-180":""}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Sidebar -->
      <aside id="sidebar" class="h-screen sticky top-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${s?"w-0 overflow-hidden opacity-0":"w-64 opacity-100"}">
        <!-- Brand -->
        <div class="p-5 border-b border-white/5">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex-shrink-0 shadow-lg shadow-indigo-500/30">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white tracking-tight">PTP Monitoring</h2>
              <p class="text-xs text-slate-400">Promise to Pay</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 min-h-0 overflow-y-auto p-4 space-y-6">
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Main</p>
            <ul class="space-y-1">
              ${a.map(m=>`
                <li class="sidebar-item group/item" data-path="${m.path}">
                  ${d(m)}
                </li>
              `).join("")}
            </ul>
          </div>
          ${o.length?`
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 mt-2 px-3">Administration</p>
            <ul class="space-y-1">
              ${o.map(m=>`
                <li class="sidebar-item group/item" data-path="${m.path}">
                  ${d(m)}
                </li>
              `).join("")}
            </ul>
          </div>
          `:""}
        </nav>

        <!-- User Profile & Logout -->
        <div class="p-4 border-t border-white/5 bg-white/[0.02]">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/10">
              <span class="text-white font-bold text-sm">${((c=(l=this.app.currentUser)==null?void 0:l.full_name)==null?void 0:c.charAt(0))||"?"}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">${((p=this.app.currentUser)==null?void 0:p.full_name)||""}</p>
              <p class="text-xs text-slate-400 truncate">${((u=this.app.currentUser)==null?void 0:u.username)||""}</p>
            </div>
            ${((g=this.app.currentUser)==null?void 0:g.role)==="admin"?'<span class="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">Admin</span>':""}
          </div>
          <button id="logoutBtn" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-red-500/15 rounded-xl border border-white/5 hover:border-red-500/30 transition-all duration-200" title="Logout">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Navbar -->
        <nav class="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/70 sticky top-0 z-40">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
              <div class="flex items-center gap-3">
                <div class="w-10"></div>
                <div>
                  <h1 class="text-lg font-bold text-gray-900 tracking-tight leading-tight">${(n==null?void 0:n.label)||""}</h1>
                  <p class="text-[11px] text-gray-400 leading-tight">CIMB Account Monitoring</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="hidden sm:flex items-center text-xs text-gray-400">
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span id="navDate"></span>
                </div>
                ${(b=this.app.currentUser)!=null&&b.campaign?`
                  <div class="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-sm text-indigo-700 font-medium">${this.app.currentUser.campaign}</span>
                  </div>
                `:""}
              </div>
            </div>
          </div>
        </nav>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto">
          ${e}
        </main>
      </div>
    `;const i=t.querySelector("#navDate");return i&&(i.textContent=new Date().toLocaleDateString("en-PH",{weekday:"short",year:"numeric",month:"short",day:"numeric"})),this.bindEvents(t),t}bindEvents(e){e.querySelector("#sidebarToggle").addEventListener("click",()=>{const t=e.querySelector("#sidebar"),s=e.querySelector("#sidebarToggle"),a=e.querySelector("#toggleIcon");t.classList.contains("w-0")?(t.classList.remove("w-0","overflow-hidden","opacity-0"),t.classList.add("w-64","opacity-100"),s.classList.remove("left-3"),s.classList.add("left-[260px]"),a.classList.remove("rotate-180"),localStorage.setItem("sidebarClosed","false")):(t.classList.remove("w-64","opacity-100"),t.classList.add("w-0","overflow-hidden","opacity-0"),s.classList.remove("left-[260px]"),s.classList.add("left-3"),a.classList.add("rotate-180"),localStorage.setItem("sidebarClosed","true"))}),e.querySelectorAll(".sidebar-item button").forEach(t=>{t.addEventListener("click",()=>{const s=t.closest(".sidebar-item").dataset.path;this.app.navigate(s)})}),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await se(),this.app.logout()})}}class cr{constructor(e){this.app=e,this.records=[],this.columns=[],this.editingId=null,this.filterCampaign=null,this.searchQuery=""}render(){const t=this.app.currentUser.role==="admin",s=[{label:"PTP Backtrack",path:"/dashboard",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>'},{label:"Confirmed Tracker",path:"/confirmed",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'},...t?[{label:"Campaigns & Columns",path:"/campaigns",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>'},{label:"Users & Agents",path:"/admin",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'}]:[]],n=new ie(this.app,s).render(`
      <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Account Monitoring</h2>
              <p class="text-gray-500 text-sm mt-0.5">Monitor account activities and confirmations</p>
            </div>
          </div>
          <button id="addRecordBtn" class="btn-primary inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-xl transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Record
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Records</p>
                <p id="totalRecords" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Amount</p>
                <p id="totalAmount" class="text-2xl font-bold text-gray-900 mt-0.5">₱0.00</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Today's Records</p>
                <p id="todayCount" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign Filter Buttons (Admin only) -->
        <div class="flex flex-wrap gap-2 mb-6 hidden" id="campaignFilterButtons"></div>

        <!-- User Campaign Badge (Non-admin only) -->
        <div class="hidden mb-6" id="userCampaignBadge">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-blue-700 font-semibold" id="userCampaignName"></span>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="mb-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" id="searchInput"
              class="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Search records..." />
          </div>
        </div>

        <!-- Records Table -->
        <div id="allRecordsTable" class="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full table-fixed">
              <thead>
                <tr id="tableHeaderRow" class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"></tr>
              </thead>
              <tbody id="recordsTableBody" class="divide-y divide-gray-100">
                <tr><td class="px-6 py-12 text-center text-gray-500">Loading records...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div id="modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
            <h3 id="modalTitle" class="text-lg font-bold text-gray-800">Add New Record</h3>
            <button id="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <form id="recordForm" class="p-6 space-y-4">
            <div id="dynamicFields" class="space-y-4"></div>
            <div id="formError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitBtn" class="btn-primary flex-1 px-4 py-3 font-semibold rounded-xl transition-all">Save Record</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div id="deleteModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Delete Record?</h3>
            <p class="text-gray-500 mb-6">This action cannot be undone.</p>
            <div class="flex gap-3">
              <button id="cancelDelete" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button id="confirmDelete" class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `);return this.bindEvents(n),this.init(n),n}async init(e){try{const[t,s]=await Promise.all([Ue(),we("ptp")]);this.columns=De(t,"ptp"),this.records=s.records,this.renderCampaignFilters(e),this.renderHeader(e),this.renderTable(e,this.records),this.updateStats(e,this.records),this.initCampaignFilters(e,this.app.currentUser)}catch(t){console.error("Failed to load tracker data:",t),e.querySelector("#recordsTableBody").innerHTML='<tr><td class="px-6 py-12 text-center text-red-600">Failed to load records. Is the server running?</td></tr>'}}renderCampaignFilters(e){const t=e.querySelector("#campaignFilterButtons");if(!t)return;const s=["Revi Credit","Personal Loan","GCredit","LazPay"],a=[...new Set(this.records.map(n=>n.campaign).filter(Boolean))].filter(n=>!s.some(d=>n===d||n.startsWith(d+" - "))),o=[...s,...a].sort();t.innerHTML=`
      <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="all" style="background: #eef2f6; color: #1e293b;">All Campaigns</button>
      ${o.map(n=>`<button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="${k(n)}" style="background: #eef2f6; color: #1e293b;">${n}</button>`).join("")}
    `}initCampaignFilters(e,t){const s=e.querySelector("#campaignFilterButtons"),a=e.querySelector("#userCampaignBadge"),o=e.querySelector("#userCampaignName");if(t.role!=="admin"&&t.campaign){s.classList.add("hidden"),a.classList.remove("hidden");const n=t.campaign.includes(" - ")?t.campaign.split(" - ")[0]:t.campaign;o.textContent=n}else s.classList.remove("hidden"),a.classList.add("hidden")}applyCampaignFilter(e,t){this.filterCampaign=t==="all"?null:t,e.querySelectorAll(".campaign-filter-btn").forEach(a=>{const o=a.dataset.campaign===t;a.style.background=o?"#5c52ff":"#eef2f6",a.style.color=o?"white":"#1e293b"});const s=this.filterCampaign?this.records.filter(a=>(a.campaign||"").startsWith(this.filterCampaign)):this.records;this.renderTable(e,s),this.updateStats(e,s)}renderHeader(e){var i;const t=e.querySelector("#tableHeaderRow");if(!t)return;const s=((i=this.app.currentUser)==null?void 0:i.role)==="admin",a=(l,c="")=>`<th class="px-3 py-3 text-left ${c} text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap overflow-hidden" title="${l.replace(/<[^>]+>/g,"").trim()}"><span class="th-label inline-block">${l}</span></th>`;t.innerHTML=`
      ${a("Agent")}
      ${a("Campaign")}
      ${this.columns.map(l=>a(`${l.name}${l.required?' <span class="text-red-400">*</span>':""}`)).join("")}
      ${s?a("Actions","text-center"):""}
    `;const o=Array.from(t.children),n=o.map(l=>{const c=l.querySelector(".th-label");return Math.max((c?c.getBoundingClientRect().width:l.scrollWidth)+36,120)}),d=n.reduce((l,c)=>l+c,0)||1;o.forEach((l,c)=>{l.style.width=`${(n[c]/d*100).toFixed(2)}%`})}cellForRecord(e,t){const s=(e.values||{})[t.id],a=t.role==="agent"||t.role==="date";return`
      <td class="px-3 py-2 ${t.type==="amount"||t.type==="number"?"text-right":"text-left"}">
        ${a?Pe(t,s):`<input type="${t.type==="number"||t.type==="amount"?"number":"text"}" step="any"
              class="cell-input w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:border-blue-400 focus:outline-none ${t.type==="amount"||t.type==="number"?"text-right":""}"
              data-record-id="${e.id}" data-col-id="${t.id}" value="${k(s??"")}" placeholder="—" />`}
      </td>`}renderTable(e,t){var d;const s=e.querySelector("#recordsTableBody"),a=(this.searchQuery||"").toLowerCase();let o=t;if(a&&(o=t.filter(i=>(i.campaign||"").toLowerCase().includes(a)?!0:this.columns.some(l=>String((i.values||{})[l.id]??"").toLowerCase().includes(a)))),this.columns.length===0){s.innerHTML=`
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No columns defined</p>
          <p class="text-sm text-gray-400 mt-1">An admin must add columns on the Campaigns &amp; Columns page first.</p>
        </td></tr>`;return}if(o.length===0){s.innerHTML=`
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No records found</p>
          <p class="text-sm text-gray-400 mt-1">Click "Add Record" to create one</p>
        </td></tr>`;return}const n=((d=this.app.currentUser)==null?void 0:d.role)==="admin";s.innerHTML=o.map(i=>`
      <tr class="hover:bg-blue-50/50 transition-colors">
        <td class="px-3 py-2">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">${(i.created_by_name||"?").charAt(0).toUpperCase()}</span>
            <span class="text-sm text-gray-700 font-medium break-words" title="${k(i.created_by_name||"Unknown")}">${i.created_by_name||"Unknown"}</span>
          </div>
        </td>
        <td class="px-3 py-2">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${i.campaign||"—"}</span>
        </td>
        ${this.columns.map(l=>this.cellForRecord(i,l)).join("")}
        ${n?`
        <td class="px-3 py-2">
          <div class="flex gap-1.5 justify-center">
            <button class="edit-btn px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium text-xs" data-id="${i.id}">Edit</button>
            <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs" data-id="${i.id}">Delete</button>
          </div>
        </td>`:""}
      </tr>
    `).join(""),s.querySelectorAll(".cell-input").forEach(i=>{i.addEventListener("change",async()=>{const l=i.dataset.recordId,c=i.dataset.colId;try{await X("ptp",l,{values:{[c]:i.value}});const p=this.records.find(u=>u.id===Number(l));p&&(p.values=p.values||{},p.values[c]=i.value),this.updateStats(e,this.records)}catch(p){console.error("Failed to save cell:",p),alert(p.message)}})}),s.querySelectorAll(".edit-btn").forEach(i=>i.addEventListener("click",()=>this.editRecord(e,Number(i.dataset.id)))),s.querySelectorAll(".delete-btn").forEach(i=>i.addEventListener("click",()=>this.confirmDelete(e,Number(i.dataset.id))))}updateStats(e,t){const s=W(this.columns,"amount"),a=W(this.columns,"date"),o=new Date().toISOString().split("T")[0];let n=0;s&&(n=t.reduce((i,l)=>i+Ae(s,(l.values||{})[s.id]),0));let d=0;a&&(d=t.filter(i=>(i.values||{})[a.id]===o).length),e.querySelector("#totalRecords").textContent=t.length,e.querySelector("#totalAmount").textContent="₱"+n.toLocaleString("en-PH",{minimumFractionDigits:2}),e.querySelector("#todayCount").textContent=d}openModal(e,t=null){const s=this.app.currentUser;W(this.columns,"agent");const a=e.querySelector("#dynamicFields"),n=s.role!=="admin"&&!!s.campaign?`
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
        <input type="hidden" id="rec_campaign" value="${k(s.campaign)}" />
        <div class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between gap-2 text-left">
          <span class="text-gray-800 font-medium">${s.campaign}</span>
          <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
      </div>`:`
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
        <select id="rec_campaign" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
          <option value="">Select Campaign</option>
          ${this.campaignList(s).map(l=>`<option value="${k(l)}" ${(t==null?void 0:t.campaign)===l?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>`,d=new Date().toLocaleDateString("sv-SE"),i=this.columns.map(l=>{let c=t?(t.values||{})[l.id]??"":"";!t&&l.role==="agent"&&(c=s.full_name),!t&&l.role==="date"&&(c=d);const p=!t&&(l.role==="agent"||l.role==="date");return Pt(l,k(c),t?"_edit":"",p)}).join("");a.innerHTML=n+i,Ht(a),e.querySelector("#modalTitle").textContent=t?"Edit Record":"Add New Record",e.querySelector("#submitBtn").textContent=t?"Update Record":"Save Record",e.querySelector("#formError").classList.add("hidden"),e.querySelector("#modal").classList.remove("hidden")}campaignList(e){const t=["Revi Credit","Personal Loan","GCredit","LazPay"],s=["Pre-Charge-Off","Charge-Off"],a=t.flatMap(o=>s.map(n=>`${o} - ${n}`));return e.role==="admin"||!e.campaign?[...t,...a]:[e.campaign]}collectForm(e){var s;const t={};return this.columns.forEach(a=>{t[a.id]=Nt(e,a)}),{campaign:((s=e.querySelector("#rec_campaign"))==null?void 0:s.value)||"",values:t}}bindEvents(e){e.querySelector("#addRecordBtn").addEventListener("click",()=>this.openModal(e,null)),e.querySelector("#closeModal").addEventListener("click",()=>e.querySelector("#modal").classList.add("hidden")),e.querySelector("#cancelBtn").addEventListener("click",()=>e.querySelector("#modal").classList.add("hidden")),e.querySelector("#modal").addEventListener("click",t=>{t.target===e.querySelector("#modal")&&e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#recordForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#formError");s.classList.add("hidden");const a=this.collectForm(e);if(!a.campaign){s.textContent="Please select a campaign",s.classList.remove("hidden");return}const o=e.querySelector("#submitBtn");o.disabled=!0,o.textContent="Saving...";try{this.editingId?await X("ptp",this.editingId,a):await dt("ptp",a),e.querySelector("#modal").classList.add("hidden"),this.editingId=null,await this.init(e)}catch(n){s.textContent=n.message,s.classList.remove("hidden")}finally{o.disabled=!1,o.textContent=this.editingId?"Update Record":"Save Record"}}),e.querySelector("#cancelDelete").addEventListener("click",()=>e.querySelector("#deleteModal").classList.add("hidden")),e.querySelector("#deleteModal").addEventListener("click",t=>{t.target===e.querySelector("#deleteModal")&&e.querySelector("#deleteModal").classList.add("hidden")}),e.querySelector("#searchInput").addEventListener("input",t=>{this.searchQuery=t.target.value,this.renderTable(e,this.filteredRecords()),this.updateStats(e,this.filteredRecords())}),e.querySelector("#campaignFilterButtons").addEventListener("click",t=>{const s=t.target.closest(".campaign-filter-btn");s&&this.applyCampaignFilter(e,s.dataset.campaign)})}filteredRecords(){return this.filterCampaign?this.records.filter(e=>(e.campaign||"").startsWith(this.filterCampaign)):this.records}editRecord(e,t){const s=this.records.find(a=>a.id===t);s&&(this.editingId=t,this.openModal(e,s))}confirmDelete(e,t){const s=e.querySelector("#deleteModal");s.classList.remove("hidden");const a=e.querySelector("#confirmDelete"),o=a.cloneNode(!0);a.parentNode.replaceChild(o,a),o.addEventListener("click",async()=>{try{await ct("ptp",t),s.classList.add("hidden"),await this.init(e)}catch{alert("Failed to delete record")}})}}class ur{constructor(e){this.app=e,this.container=null,this.users=[],this.campaigns=[]}render(){this.app.currentUser;const e=[{label:"PTP Backtrack",path:"/dashboard",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>'},{label:"Campaigns & Columns",path:"/campaigns",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>'},{label:"Users & Agents",path:"/admin",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'}],a=new ie(this.app,e).render(`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-bold tracking-widest text-violet-500 uppercase">Administration</p>
              <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Users &amp; Agents</h2>
              <p class="text-gray-500 text-sm mt-0.5">Manage users, agents and system settings</p>
            </div>
          </div>
          <button id="addUserBtn" class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-purple-500/40">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            Add User
          </button>
        </div>

        <!-- User Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Users</p>
                <p id="totalUsers" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Admins</p>
                <p id="adminCount" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Regular Users</p>
                <p id="userCount" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full table-fixed">
              <thead>
                <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th style="width:5%" class="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">#</th>
                  <th style="width:21%" class="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Full Name</th>
                  <th style="width:13%" class="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Username</th>
                  <th style="width:9%" class="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Role</th>
                  <th style="width:15%" class="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Campaign</th>
                  <th style="width:11%" class="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Created</th>
                  <th style="width:26%" class="px-3 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody id="usersTableBody" class="divide-y divide-gray-100">
                <tr>
                  <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                      </svg>
                      <p class="font-medium">Loading users...</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Toasts (page-level confirmations) -->
      <div id="toastContainer" class="fixed top-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center gap-2 pointer-events-none"></div>

      <!-- Add User Modal -->
      <div id="userModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-800">Create New User</h3>
            <button id="closeUserModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <form id="userForm" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input type="text" id="full_name" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="Enter full name"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Username *</label>
              <input type="text" id="username" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="Enter username"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Password *</label>
              <input type="password" id="password" required minlength="6" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="Min 6 characters"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Role *</label>
              <select id="role" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign</label>
              <select id="user_campaign" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors">
                <option value="">No Campaign</option>
              </select>
            </div>
            <div id="formError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelUserBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitUserBtn" class="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/30">Create User</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit User Modal -->
      <div id="editUserModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-800">Edit User</h3>
            <button id="closeEditUserModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <form id="editUserForm" class="p-6 space-y-4">
            <input type="hidden" id="editUserId"/>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
              <input type="text" id="edit_full_name" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Username *</label>
              <input type="text" id="edit_username" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Role *</label>
              <select id="edit_role" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign</label>
              <select id="edit_campaign" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors">
                <option value="">No Campaign</option>
              </select>
            </div>
            <div id="editFormError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelEditUserBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitEditUserBtn" class="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Assign Campaign & Bucket Modal -->
      <div id="campaignModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-800">Assign Campaign &amp; Bucket</h3>
            <button id="closeCampaignModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <form id="campaignForm" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">User</label>
              <input type="text" id="campaign_user_name" readonly class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign</label>
              <select id="assign_campaign" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors">
                <option value="">No Campaign</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Bucket <span class="text-gray-400 font-normal">(optional)</span></label>
              <select id="assign_bucket" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors" disabled>
                <option value="">Select a campaign first</option>
              </select>
            </div>
            <div id="campaignError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelCampaignBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitCampaignBtn" class="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors">Update Assignment</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Reset Password Modal -->
      <div id="passwordModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-800">Reset Password</h3>
            <button id="closePasswordModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <form id="passwordForm" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">User</label>
              <input type="text" id="password_user_name" readonly class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">New Password *</label>
              <input type="password" id="new_password" required minlength="6" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="Min 6 characters"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Confirm New Password *</label>
              <input type="password" id="confirm_password" required minlength="6" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="Re-enter new password"/>
            </div>
            <div id="passwordError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelPasswordBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitPasswordBtn" class="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors">Update Password</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete User Confirmation Modal -->
      <div id="deleteUserModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Delete User?</h3>
            <p class="text-gray-500 mb-6">This action cannot be undone.</p>
            <div class="flex gap-3">
              <button id="cancelDeleteUser" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button id="confirmDeleteUser" class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">Delete User</button>
            </div>
          </div>
        </div>
      </div>
    `);return this.container=a,this.bindEvents(a),this.loadData(a),a}async loadData(e){try{const[t,s]=await Promise.all([ut(),pt()]);this.users=t.users||[],this.campaigns=s.campaigns||[],this.populateCampaignSelects(e),this.renderTable(e,this.users),this.updateStats(e,this.users)}catch(t){console.error("Failed to load admin data:",t)}}populateCampaignSelects(e){const t=(n="")=>'<option value="">No Campaign</option>'+this.campaigns.map(d=>`<option value="${d.name}"${d.name===n?" selected":""}>${d.name}</option>`).join(""),s=e.querySelector("#user_campaign");s&&(s.innerHTML=t());const a=e.querySelector("#edit_campaign");a&&(a.innerHTML=t(a.dataset.selected||""));const o=e.querySelector("#assign_campaign");o&&(o.innerHTML='<option value="">No Campaign</option>'+this.campaigns.map(n=>`<option value="${n.id}"${String(n.id)===o.dataset.selected?" selected":""}>${n.name}</option>`).join(""))}showToast(e,t="success"){var o;const s=(o=this.container)==null?void 0:o.querySelector("#toastContainer");if(!s)return;const a=document.createElement("div");a.className=`flex items-center gap-2.5 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl border transition-all duration-300 opacity-0 -translate-y-2 ${t==="error"?"bg-red-600 border-red-500":"bg-green-600 border-green-500"}`,a.innerHTML=`
      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        ${t==="error"?'<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>':'<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'}
      </svg>
      <span class="toast-msg"></span>`,a.querySelector(".toast-msg").textContent=e,s.appendChild(a),requestAnimationFrame(()=>a.classList.remove("opacity-0","-translate-y-2")),setTimeout(()=>{a.classList.add("opacity-0","-translate-y-2"),setTimeout(()=>a.remove(),300)},3e3)}showModalMessage(e,t,s=!1){e.textContent=t,e.className=s?"bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm":"bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm",e.classList.remove("hidden")}hideModalMessage(e){e.classList.add("hidden")}bindEvents(e){e.querySelector("#addUserBtn").addEventListener("click",()=>{e.querySelector("#userForm").reset(),e.querySelector("#user_campaign").value="",this.hideModalMessage(e.querySelector("#formError")),e.querySelector("#userModal").classList.remove("hidden")}),e.querySelector("#closeUserModal").addEventListener("click",()=>{e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#cancelUserBtn").addEventListener("click",()=>{e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#userModal").addEventListener("click",t=>{t.target===e.querySelector("#userModal")&&e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#userForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#formError");this.hideModalMessage(s);const a={full_name:e.querySelector("#full_name").value.trim(),username:e.querySelector("#username").value.trim(),password:e.querySelector("#password").value,role:e.querySelector("#role").value,campaign:e.querySelector("#user_campaign").value},o=e.querySelector("#submitUserBtn");o.disabled=!0,o.textContent="Creating...";try{await Gt(a),e.querySelector("#userModal").classList.add("hidden"),await this.loadData(e),this.showToast(`User "${a.username}" created`)}catch(n){this.showModalMessage(s,n.message)}finally{o.disabled=!1,o.textContent="Create User"}}),e.querySelector("#closeEditUserModal").addEventListener("click",()=>{e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#cancelEditUserBtn").addEventListener("click",()=>{e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#editUserModal").addEventListener("click",t=>{t.target===e.querySelector("#editUserModal")&&e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#editUserForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#editFormError");this.hideModalMessage(s);const a=e.querySelector("#editUserId").value,o={full_name:e.querySelector("#edit_full_name").value.trim(),username:e.querySelector("#edit_username").value.trim(),role:e.querySelector("#edit_role").value,campaign:e.querySelector("#edit_campaign").value},n=e.querySelector("#submitEditUserBtn");n.disabled=!0,n.textContent="Updating...";try{await Zt(a,o),e.querySelector("#editUserModal").classList.add("hidden"),await this.loadData(e),this.showToast(`User "${o.username}" updated`)}catch(d){this.showModalMessage(s,d.message)}finally{n.disabled=!1,n.textContent="Save Changes"}}),e.querySelector("#closeCampaignModal").addEventListener("click",()=>{e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#cancelCampaignBtn").addEventListener("click",()=>{e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#campaignModal").addEventListener("click",t=>{t.target===e.querySelector("#campaignModal")&&e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#assign_campaign").addEventListener("change",()=>{const t=e.querySelector("#assign_campaign").value,s=e.querySelector("#assign_bucket");if(!t){s.innerHTML='<option value="">Select a campaign first</option>',s.disabled=!0;return}const a=this.campaigns.find(n=>String(n.id)===String(t)),o=a?a.buckets:[];s.innerHTML='<option value="">No bucket</option>'+o.map(n=>`<option value="${n.id}">${n.name}</option>`).join(""),s.disabled=o.length===0,s.value=""}),e.querySelector("#campaignForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#campaignError");this.hideModalMessage(s);const a=e.querySelector("#campaignForm").dataset.userId,o=e.querySelector("#assign_campaign").value||null,n=e.querySelector("#assign_bucket").value||null,d=e.querySelector("#submitCampaignBtn");d.disabled=!0,d.textContent="Updating...";try{await Xt(a,o,n);const i=this.users.find(u=>String(u.id)===String(a)),l=this.campaigns.find(u=>String(u.id)===String(o)),c=l&&n?(l.buckets||[]).find(u=>String(u.id)===String(n)):null,p=l?`${(i==null?void 0:i.full_name)||"User"} → ${l.name}${c?" · "+c.name:""}`:`${(i==null?void 0:i.full_name)||"User"} → No Campaign`;e.querySelector("#campaignModal").classList.add("hidden"),this.hideModalMessage(s),this.resetSubmitBtn("#submitCampaignBtn","Update Assignment"),await this.loadData(e),this.showToast(p)}catch(i){this.showModalMessage(s,i.message),d.disabled=!1,d.textContent="Update Assignment"}}),e.querySelector("#cancelDeleteUser").addEventListener("click",()=>{e.querySelector("#deleteUserModal").classList.add("hidden")}),e.querySelector("#deleteUserModal").addEventListener("click",t=>{t.target===e.querySelector("#deleteUserModal")&&e.querySelector("#deleteUserModal").classList.add("hidden")}),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await se(),this.app.logout()}),e.querySelector("#closePasswordModal").addEventListener("click",()=>{e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#cancelPasswordBtn").addEventListener("click",()=>{e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#passwordModal").addEventListener("click",t=>{t.target===e.querySelector("#passwordModal")&&e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#passwordForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#passwordError");this.hideModalMessage(s);const a=e.querySelector("#passwordForm").dataset.userId,o=e.querySelector("#new_password").value,n=e.querySelector("#confirm_password").value;if(o!==n){this.showModalMessage(s,"Passwords do not match");return}const d=e.querySelector("#submitPasswordBtn");d.disabled=!0,d.textContent="Updating...";try{await es(a,o),e.querySelector("#passwordModal").classList.add("hidden");const i=this.users.find(l=>String(l.id)===String(a));this.showToast(`Password updated for ${(i==null?void 0:i.full_name)||"user"}`)}catch(i){this.showModalMessage(s,i.message)}finally{d.disabled=!1,d.textContent="Update Password"}})}renderTable(e,t){const s=e.querySelector("#usersTableBody"),a=this.app.currentUser.id;if(t.length===0){s.innerHTML=`
        <tr>
          <td colspan="7" class="px-6 py-12 text-center text-gray-500">
            <div class="flex flex-col items-center">
              <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <p class="font-medium">No users found</p>
            </div>
          </td>
        </tr>
      `;return}s.innerHTML=t.map((o,n)=>`
      <tr class="hover:bg-violet-50/40 transition-colors">
        <td class="px-4 py-3 text-sm text-gray-500">${n+1}</td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 ${o.role==="admin"?"bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-purple-200":"bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-200"} rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-sm">${o.full_name.charAt(0)}</span>
            </div>
            <span class="text-sm font-medium text-gray-900">${o.full_name}</span>
            ${o.id===a?'<span class="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">You</span>':""}
          </div>
        </td>
        <td class="px-4 py-3 text-sm text-gray-600 font-mono break-all">${o.username}</td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${o.role==="admin"?"bg-purple-100 text-purple-700":"bg-blue-100 text-blue-700"}">
            ${o.role==="admin"?"Admin":"User"}
          </span>
        </td>
        <td class="px-4 py-3">
          ${o.campaign?`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${o.campaign}</span>`:'<span class="text-xs text-gray-400 italic">Not assigned</span>'}
        </td>
        <td class="px-4 py-3 text-sm text-gray-500">${o.created_at?new Date(o.created_at).toLocaleDateString():"-"}</td>
        <td class="px-4 py-3 text-sm">
          <div class="flex flex-wrap gap-1.5">
            <button class="edit-user-btn px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium" data-id="${o.id}">Edit</button>
            <button class="assign-campaign-btn px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium" data-id="${o.id}">Campaign</button>
            <button class="reset-password-btn px-2.5 py-1 text-xs bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium" data-id="${o.id}">Password</button>
            ${o.id!==a?`
              <button class="delete-user-btn px-2.5 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium" data-id="${o.id}">Delete</button>
            `:""}
          </div>
        </td>
      </tr>
    `).join(""),s.querySelectorAll(".edit-user-btn").forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.id);this.openEditUserModal(e,n)})}),s.querySelectorAll(".assign-campaign-btn").forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.id);this.openCampaignModal(e,n)})}),s.querySelectorAll(".reset-password-btn").forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.id);this.openResetPasswordModal(e,n)})}),s.querySelectorAll(".delete-user-btn").forEach(o=>{o.addEventListener("click",()=>{const n=parseInt(o.dataset.id);this.confirmDelete(e,n)})})}updateStats(e,t){const s=t.length,a=t.filter(n=>n.role==="admin").length,o=t.filter(n=>n.role==="user").length;e.querySelector("#totalUsers").textContent=s,e.querySelector("#adminCount").textContent=a,e.querySelector("#userCount").textContent=o}openEditUserModal(e,t){const s=this.users.find(o=>o.id===t);if(!s)return;e.querySelector("#editUserId").value=t,e.querySelector("#edit_full_name").value=s.full_name,e.querySelector("#edit_username").value=s.username,e.querySelector("#edit_role").value=s.role;const a=e.querySelector("#edit_campaign");a.dataset.selected=s.campaign||"",a.innerHTML='<option value="">No Campaign</option>'+this.campaigns.map(o=>`<option value="${o.name}"${o.name===s.campaign?" selected":""}>${o.name}</option>`).join(""),this.hideModalMessage(e.querySelector("#editFormError")),this.resetSubmitBtn("#submitEditUserBtn","Save Changes"),e.querySelector("#editUserModal").classList.remove("hidden")}openResetPasswordModal(e,t){const s=this.users.find(o=>o.id===t);if(!s)return;const a=e.querySelector("#passwordForm");a.dataset.userId=t,e.querySelector("#password_user_name").value=`${s.full_name} (${s.username})`,this.hideModalMessage(e.querySelector("#passwordError")),e.querySelector("#new_password").value="",e.querySelector("#confirm_password").value="",this.resetSubmitBtn("#submitPasswordBtn","Update Password"),e.querySelector("#passwordModal").classList.remove("hidden"),e.querySelector("#new_password").focus()}resetSubmitBtn(e,t){const s=this.container.querySelector(e);s&&(s.disabled=!1,s.textContent=t)}openCampaignModal(e,t){const s=this.users.find(i=>i.id===t);if(!s)return;const a=e.querySelector("#campaignForm");a.dataset.userId=t,e.querySelector("#campaign_user_name").value=`${s.full_name} (${s.username})`,this.hideModalMessage(e.querySelector("#campaignError"));const o=e.querySelector("#assign_campaign"),n=e.querySelector("#assign_bucket"),d=this.campaigns.find(i=>i.name===s.campaign);if(d){o.innerHTML='<option value="">No Campaign</option>'+this.campaigns.map(c=>`<option value="${c.id}"${c.id===d.id?" selected":""}>${c.name}</option>`).join("");const i=(d.assignments||[]).find(c=>String(c.user_id)===String(s.id)),l=d.buckets||[];n.innerHTML='<option value="">No bucket</option>'+l.map(c=>`<option value="${c.id}"${i&&i.bucket_id===c.id?" selected":""}>${c.name}</option>`).join(""),n.disabled=l.length===0}else o.innerHTML='<option value="">No Campaign</option>'+this.campaigns.map(i=>`<option value="${i.id}">${i.name}</option>`).join(""),o.value="",n.innerHTML='<option value="">Select a campaign first</option>',n.disabled=!0;this.resetSubmitBtn("#submitCampaignBtn","Update Assignment"),e.querySelector("#campaignModal").classList.remove("hidden")}confirmDelete(e,t){const s=e.querySelector("#deleteUserModal");s.classList.remove("hidden");const a=e.querySelector("#confirmDeleteUser"),o=a.cloneNode(!0);a.parentNode.replaceChild(o,a),o.addEventListener("click",async()=>{try{await Kt(t),s.classList.add("hidden"),await this.loadData(e),this.showToast("User deleted")}catch(n){s.classList.add("hidden"),this.showToast("Failed to delete user: "+n.message,"error")}})}}class pr{constructor(e,t){this.app=e,this.campaign=t,this.users=[],this.records=[]}render(){const e=this.app.currentUser,t=document.createElement("div");return t.className="min-h-screen bg-gray-50",t.innerHTML=`
      <!-- Navbar -->
      <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V7a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h1 class="text-xl font-bold text-gray-800">${this.campaign}</h1>
            </div>
            <div class="flex items-center gap-4">
              <button id="adminHomeBtn" class="text-sm bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors font-medium">Admin Panel</button>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span class="text-indigo-700 font-bold text-sm">${e.full_name.charAt(0)}</span>
                </div>
                <span class="text-sm font-medium text-gray-700">${e.full_name}</span>
                <span class="text-xs ${e.role==="admin"?"bg-purple-100 text-purple-700":"bg-gray-100 text-gray-600"} px-2 py-0.5 rounded-full font-semibold">${e.role==="admin"?"Admin":"User"}</span>
              </div>
              <button id="logoutBtn" class="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">${this.campaign}</h2>
            <p class="text-gray-500 mt-1">Users and promise-to-pay records for this campaign</p>
          </div>
        </div>

        <!-- Users Section -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-800">Assigned Users</h3>
            <span id="userCount" class="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">0 users</span>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody id="campaignUsersTableBody" class="divide-y divide-gray-100">
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                      <div class="flex flex-col items-center">
                        <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <p class="font-medium">Loading users...</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Records Section -->
        <div>
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-800">PTP Records</h3>
            <span id="recordCount" class="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">0 records</span>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr id="campaignRecordsHeadRow" class="bg-gray-50 border-b border-gray-200">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Loading…</th>
                  </tr>
                </thead>
                <tbody id="campaignRecordsTableBody" class="divide-y divide-gray-100">
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                      <div class="flex flex-col items-center">
                        <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        <p class="font-medium">Loading records...</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `,this.bindEvents(t),this.loadData(t),t}bindEvents(e){e.querySelector("#adminHomeBtn").addEventListener("click",()=>this.app.navigate("/admin")),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await se(),this.app.logout()})}async loadData(e){await Promise.all([this.loadUsers(e),this.loadRecords(e)])}async loadUsers(e){try{const t=await Jt(this.campaign);this.users=t.users,this.renderUsersTable(e,this.users),e.querySelector("#userCount").textContent=`${this.users.length} user${this.users.length===1?"":"s"}`}catch(t){console.error("Failed to load campaign users:",t),e.querySelector("#campaignUsersTableBody").innerHTML=`
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-red-600">
            <p class="font-medium">Failed to load users</p>
          </td>
        </tr>
      `}}renderUsersTable(e,t){const s=e.querySelector("#campaignUsersTableBody");if(t.length===0){s.innerHTML=`
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-gray-500">
            <div class="flex flex-col items-center">
              <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <p class="font-medium">No users assigned</p>
              <p class="text-sm text-gray-400 mt-1">Assign users from the Admin Panel</p>
            </div>
          </td>
        </tr>
      `;return}s.innerHTML=t.map(a=>`
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 ${a.role==="admin"?"bg-purple-100":"bg-blue-100"} rounded-full flex items-center justify-center">
              <span class="${a.role==="admin"?"text-purple-700":"text-blue-700"} font-bold text-sm">${a.full_name.charAt(0)}</span>
            </div>
            <span class="text-sm font-medium text-gray-800">${a.full_name}</span>
          </div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-600 font-mono">${a.username}</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${a.role==="admin"?"bg-purple-100 text-purple-700":"bg-blue-100 text-blue-700"}">
            ${a.role==="admin"?"👑 Admin":"👤 User"}
          </span>
        </td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${a.campaign||"-"}</span>
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">${a.created_at?new Date(a.created_at).toLocaleDateString():"-"}</td>
      </tr>
    `).join("")}async loadRecords(e){try{const[t,s]=await Promise.all([we("ptp"),Ue()]);this.records=t.records.filter(a=>(a.campaign||"").startsWith(this.campaign)),this.columns=De(s,"ptp"),this.renderRecordsTable(e,this.records),e.querySelector("#recordCount").textContent=`${this.records.length} record${this.records.length===1?"":"s"}`}catch(t){console.error("Failed to load campaign records:",t),e.querySelector("#campaignRecordsTableBody").innerHTML=`
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-red-600">
            <p class="font-medium">Failed to load records</p>
          </td>
        </tr>
      `}}renderRecordsTable(e,t){const s=e.querySelector("#campaignRecordsTableBody"),a=e.querySelector("#campaignRecordsHeadRow");if(a.innerHTML=`
      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
      ${this.columns.map(o=>`<th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">${o.name}</th>`).join("")}
    `,t.length===0){s.innerHTML=`
        <tr>
          <td colspan="99" class="px-6 py-12 text-center text-gray-500">
            <div class="flex flex-col items-center">
              <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p class="font-medium">No PTP records</p>
              <p class="text-sm text-gray-400 mt-1">Records for this campaign will appear here</p>
            </div>
          </td>
        </tr>
      `;return}s.innerHTML=t.map(o=>`
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4"><span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${o.campaign||"—"}</span></td>
        ${this.columns.map(n=>`<td class="px-6 py-4">${Pe(n,(o.values||{})[n.id])}</td>`).join("")}
      </tr>
    `).join("")}}class mr{constructor(e){this.app=e,this.records=[],this.columns=[],this.editingId=null,this.filterCampaign=null,this.searchQuery=""}render(){const t=this.app.currentUser.role==="admin",s=[{label:"PTP Backtrack",path:"/dashboard",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>'},{label:"Confirmed Tracker",path:"/confirmed",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'},...t?[{label:"Campaigns & Columns",path:"/campaigns",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>'},{label:"Users & Agents",path:"/admin",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'}]:[]],n=new ie(this.app,s).render(`
      <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Confirmed Payments</h2>
              <p class="text-gray-500 text-sm mt-0.5">Monitor confirmed account payments</p>
            </div>
          </div>
          <button id="addRecordBtn" class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/40">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Confirmed
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Confirmed</p>
                <p id="totalRecords" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Amount</p>
                <p id="totalAmount" class="text-2xl font-bold text-gray-900 mt-0.5">₱0.00</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Today's Confirmed</p>
                <p id="todayCount" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign Filter Buttons (Admin only) -->
        <div class="flex flex-wrap gap-2 mb-6 hidden" id="campaignFilterButtons"></div>

        <!-- User Campaign Badge (Non-admin only) -->
        <div class="hidden mb-6" id="userCampaignBadge">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-emerald-700 font-semibold" id="userCampaignName"></span>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="mb-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" id="searchInput"
              class="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="Search confirmed records..." />
          </div>
        </div>

        <!-- Records Table -->
        <div id="allRecordsTable" class="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full table-fixed">
              <thead>
                <tr id="tableHeaderRow" class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"></tr>
              </thead>
              <tbody id="recordsTableBody" class="divide-y divide-gray-100">
                <tr><td class="px-6 py-12 text-center text-gray-500">Loading records...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div id="modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
            <h3 id="modalTitle" class="text-lg font-bold text-gray-800">Add Confirmed Record</h3>
            <button id="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <form id="recordForm" class="p-6 space-y-4">
            <div id="dynamicFields" class="space-y-4"></div>
            <div id="formError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitBtn" class="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/30">Save Record</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div id="deleteModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <h3 class="text-lg font-bold text-gray-800 mb-2">Delete Record?</h3>
            <p class="text-gray-500 mb-6">This action cannot be undone.</p>
            <div class="flex gap-3">
              <button id="cancelDelete" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button id="confirmDelete" class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `);return this.bindEvents(n),this.init(n),n}async init(e){try{const[t,s]=await Promise.all([Ue(),we("confirmed")]);this.columns=De(t,"confirmed"),this.records=s.records,this.renderCampaignFilters(e),this.renderHeader(e),this.renderTable(e,this.records),this.updateStats(e,this.records),this.initCampaignFilters(e,this.app.currentUser)}catch(t){console.error("Failed to load confirmed data:",t),e.querySelector("#recordsTableBody").innerHTML='<tr><td class="px-6 py-12 text-center text-red-600">Failed to load records. Is the server running?</td></tr>'}}renderCampaignFilters(e){const t=e.querySelector("#campaignFilterButtons");if(!t)return;const s=["Revi Credit","Personal Loan","GCredit","LazPay"],a=[...new Set(this.records.map(n=>n.campaign).filter(Boolean))].filter(n=>!s.some(d=>n===d||n.startsWith(d+" - "))),o=[...s,...a].sort();t.innerHTML=`
      <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="all" style="background: #eef2f6; color: #1e293b;">All Campaigns</button>
      ${o.map(n=>`<button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="${k(n)}" style="background: #eef2f6; color: #1e293b;">${n}</button>`).join("")}
    `}initCampaignFilters(e,t){const s=e.querySelector("#campaignFilterButtons"),a=e.querySelector("#userCampaignBadge"),o=e.querySelector("#userCampaignName");if(t.role!=="admin"&&t.campaign){s.classList.add("hidden"),a.classList.remove("hidden");const n=t.campaign.includes(" - ")?t.campaign.split(" - ")[0]:t.campaign;o.textContent=n}else s.classList.remove("hidden"),a.classList.add("hidden")}applyCampaignFilter(e,t){this.filterCampaign=t==="all"?null:t,e.querySelectorAll(".campaign-filter-btn").forEach(a=>{const o=a.dataset.campaign===t;a.style.background=o?"#059669":"#eef2f6",a.style.color=o?"white":"#1e293b"});const s=this.filterCampaign?this.records.filter(a=>(a.campaign||"").startsWith(this.filterCampaign)):this.records;this.renderTable(e,s),this.updateStats(e,s)}renderHeader(e){var i;const t=e.querySelector("#tableHeaderRow");if(!t)return;const s=((i=this.app.currentUser)==null?void 0:i.role)==="admin",a=(l,c="")=>`<th class="px-3 py-3 text-left ${c} text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap overflow-hidden" title="${l.replace(/<[^>]+>/g,"").trim()}"><span class="th-label inline-block">${l}</span></th>`;t.innerHTML=`
      ${a("Agent")}
      ${a("Campaign")}
      ${this.columns.map(l=>a(`${l.name}${l.required?' <span class="text-red-400">*</span>':""}`)).join("")}
      ${s?a("Actions","text-center"):""}
    `;const o=Array.from(t.children),n=o.map(l=>{const c=l.querySelector(".th-label");return Math.max((c?c.getBoundingClientRect().width:l.scrollWidth)+36,120)}),d=n.reduce((l,c)=>l+c,0)||1;o.forEach((l,c)=>{l.style.width=`${(n[c]/d*100).toFixed(2)}%`})}cellForRecord(e,t){const s=(e.values||{})[t.id],a=t.role==="agent"||t.role==="date";return`
      <td class="px-3 py-2 ${t.type==="amount"||t.type==="number"?"text-right":"text-left"}">
        ${a?Pe(t,s):`<input type="${t.type==="number"||t.type==="amount"?"number":"text"}" step="any"
              class="cell-input w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:border-emerald-400 focus:outline-none ${t.type==="amount"||t.type==="number"?"text-right":""}"
              data-record-id="${e.id}" data-col-id="${t.id}" value="${k(s??"")}" placeholder="—" />`}
      </td>`}renderTable(e,t){var d;const s=e.querySelector("#recordsTableBody"),a=(this.searchQuery||"").toLowerCase();let o=t;if(a&&(o=t.filter(i=>(i.campaign||"").toLowerCase().includes(a)?!0:this.columns.some(l=>String((i.values||{})[l.id]??"").toLowerCase().includes(a)))),this.columns.length===0){s.innerHTML=`
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No columns defined</p>
          <p class="text-sm text-gray-400 mt-1">An admin must add columns on the Campaigns &amp; Columns page first.</p>
        </td></tr>`;return}if(o.length===0){s.innerHTML=`
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No confirmed records found</p>
          <p class="text-sm text-gray-400 mt-1">Click "Add Confirmed" to create one</p>
        </td></tr>`;return}const n=((d=this.app.currentUser)==null?void 0:d.role)==="admin";s.innerHTML=o.map(i=>`
      <tr class="hover:bg-emerald-50/50 transition-colors">
        <td class="px-3 py-2">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">${(i.created_by_name||"?").charAt(0).toUpperCase()}</span>
            <span class="text-sm text-gray-700 font-medium break-words" title="${k(i.created_by_name||"Unknown")}">${i.created_by_name||"Unknown"}</span>
          </div>
        </td>
        <td class="px-3 py-2">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${i.campaign||"—"}</span>
        </td>
        ${this.columns.map(l=>this.cellForRecord(i,l)).join("")}
        ${n?`
        <td class="px-3 py-2">
          <div class="flex gap-1.5 justify-center">
            <button class="edit-btn px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all font-medium text-xs" data-id="${i.id}">Edit</button>
            <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs" data-id="${i.id}">Delete</button>
          </div>
        </td>`:""}
      </tr>
    `).join(""),s.querySelectorAll(".cell-input").forEach(i=>{i.addEventListener("change",async()=>{const l=i.dataset.recordId,c=i.dataset.colId;try{await X("confirmed",l,{values:{[c]:i.value}});const p=this.records.find(u=>u.id===Number(l));p&&(p.values=p.values||{},p.values[c]=i.value),this.updateStats(e,this.records)}catch(p){console.error("Failed to save cell:",p),alert(p.message)}})}),s.querySelectorAll(".edit-btn").forEach(i=>i.addEventListener("click",()=>this.editRecord(e,Number(i.dataset.id)))),s.querySelectorAll(".delete-btn").forEach(i=>i.addEventListener("click",()=>this.confirmDelete(e,Number(i.dataset.id))))}updateStats(e,t){const s=W(this.columns,"amount"),a=W(this.columns,"date"),o=new Date().toISOString().split("T")[0];let n=0;s&&(n=t.reduce((i,l)=>i+Ae(s,(l.values||{})[s.id]),0));let d=0;a&&(d=t.filter(i=>(i.values||{})[a.id]===o).length),e.querySelector("#totalRecords").textContent=t.length,e.querySelector("#totalAmount").textContent="₱"+n.toLocaleString("en-PH",{minimumFractionDigits:2}),e.querySelector("#todayCount").textContent=d}openModal(e,t=null){const s=this.app.currentUser,a=e.querySelector("#dynamicFields"),n=s.role!=="admin"&&!!s.campaign?`
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
        <input type="hidden" id="rec_campaign" value="${k(s.campaign)}" />
        <div class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between gap-2 text-left">
          <span class="text-gray-800 font-medium">${s.campaign}</span>
          <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
      </div>`:`
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
        <select id="rec_campaign" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors">
          <option value="">Select Campaign</option>
          ${this.campaignList(s).map(l=>`<option value="${k(l)}" ${(t==null?void 0:t.campaign)===l?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>`,d=new Date().toLocaleDateString("sv-SE"),i=this.columns.map(l=>{let c=t?(t.values||{})[l.id]??"":"";!t&&l.role==="agent"&&(c=s.full_name),!t&&l.role==="date"&&(c=d);const p=!t&&(l.role==="agent"||l.role==="date");return Pt(l,k(c),t?"_edit":"",p)}).join("");a.innerHTML=n+i,Ht(a),e.querySelector("#modalTitle").textContent=t?"Edit Confirmed Record":"Add Confirmed Record",e.querySelector("#submitBtn").textContent=t?"Update Record":"Save Record",e.querySelector("#formError").classList.add("hidden"),e.querySelector("#modal").classList.remove("hidden")}campaignList(e){const t=["Revi Credit","Personal Loan","GCredit","LazPay"],s=["Pre-Charge-Off","Charge-Off"],a=t.flatMap(o=>s.map(n=>`${o} - ${n}`));return e.role==="admin"||!e.campaign?[...t,...a]:[e.campaign]}collectForm(e){var s;const t={};return this.columns.forEach(a=>{t[a.id]=Nt(e,a)}),{campaign:((s=e.querySelector("#rec_campaign"))==null?void 0:s.value)||"",values:t}}bindEvents(e){e.querySelector("#addRecordBtn").addEventListener("click",()=>this.openModal(e,null)),e.querySelector("#closeModal").addEventListener("click",()=>e.querySelector("#modal").classList.add("hidden")),e.querySelector("#cancelBtn").addEventListener("click",()=>e.querySelector("#modal").classList.add("hidden")),e.querySelector("#modal").addEventListener("click",t=>{t.target===e.querySelector("#modal")&&e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#recordForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#formError");s.classList.add("hidden");const a=this.collectForm(e);if(!a.campaign){s.textContent="Please select a campaign",s.classList.remove("hidden");return}const o=e.querySelector("#submitBtn");o.disabled=!0,o.textContent="Saving...";try{this.editingId?await X("confirmed",this.editingId,a):await dt("confirmed",a),e.querySelector("#modal").classList.add("hidden"),this.editingId=null,await this.init(e)}catch(n){s.textContent=n.message,s.classList.remove("hidden")}finally{o.disabled=!1,o.textContent=this.editingId?"Update Record":"Save Record"}}),e.querySelector("#cancelDelete").addEventListener("click",()=>e.querySelector("#deleteModal").classList.add("hidden")),e.querySelector("#deleteModal").addEventListener("click",t=>{t.target===e.querySelector("#deleteModal")&&e.querySelector("#deleteModal").classList.add("hidden")}),e.querySelector("#searchInput").addEventListener("input",t=>{this.searchQuery=t.target.value,this.renderTable(e,this.filteredRecords())}),e.querySelector("#campaignFilterButtons").addEventListener("click",t=>{const s=t.target.closest(".campaign-filter-btn");s&&this.applyCampaignFilter(e,s.dataset.campaign)})}filteredRecords(){return this.filterCampaign?this.records.filter(e=>(e.campaign||"").startsWith(this.filterCampaign)):this.records}editRecord(e,t){const s=this.records.find(a=>a.id===t);s&&(this.editingId=t,this.openModal(e,s))}confirmDelete(e,t){const s=e.querySelector("#deleteModal");s.classList.remove("hidden");const a=e.querySelector("#confirmDelete"),o=a.cloneNode(!0);a.parentNode.replaceChild(o,a),o.addEventListener("click",async()=>{try{await ct("confirmed",t),s.classList.add("hidden"),await this.init(e)}catch{alert("Failed to delete record")}})}}const nt=[{value:"text",label:"Text"},{value:"number",label:"Number"},{value:"amount",label:"Money"},{value:"date",label:"Date"}],it=[{value:"",label:"No role"},{value:"agent",label:"Agent name (auto-fill)"},{value:"amount",label:"Amount (feeds Total)"},{value:"date",label:'Date (feeds "Today")'}];class gr{constructor(e){this.app=e,this.campaigns=[],this.columns=[],this.users=[],this.expandedId=null,this.renamingId=null,this.container=null}render(){const e=[{label:"PTP Backtrack",path:"/dashboard",active:!1,icon:this.icon("grid")},{label:"Campaigns & Columns",path:"/campaigns",active:!0,icon:this.icon("tag")},{label:"Users & Agents",path:"/admin",active:!1,icon:this.icon("users")}],t=new ie(this.app,e),s=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
          </div>
          <div>
            <p class="text-xs font-bold tracking-widest text-indigo-500 uppercase">Admin</p>
            <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Campaigns &amp; Columns</h2>
            <p class="text-gray-500 text-sm mt-0.5">Define the tracker table columns and manage campaigns, buckets, and agents.</p>
          </div>
        </div>

        <!-- Table Columns (global) -->
        <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 mt-6 relative overflow-hidden">
          <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <h3 class="text-lg font-bold text-gray-900">Table Columns</h3>
          </div>
          <p class="text-sm text-gray-400 mb-4">These columns appear in the PTP Backtrack and Confirmed Tracker tables. Every field in a record is defined here.</p>

          <div class="space-y-2 mb-4" id="columnList">
            <div class="text-sm text-gray-400">Loading columns…</div>
          </div>

          <div class="flex flex-wrap gap-2 items-center pt-3 border-t border-gray-100">
            <input type="text" placeholder="New column name" class="new-col-input flex-1 min-w-[180px] px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none" />
            <select class="new-col-type text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
              ${nt.map(a=>`<option value="${a.value}">${a.label}</option>`).join("")}
            </select>
            <select class="new-col-role text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none" title="Role drives automatic behavior">
              ${it.map(a=>`<option value="${a.value}">${a.label}</option>`).join("")}
            </select>
            <select class="new-col-applies text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
              <option value="both" selected>Both tables</option>
              <option value="ptp">PTP Backtrack only</option>
              <option value="confirmed">Confirmed only</option>
            </select>
            <label class="inline-flex items-center gap-1.5 text-sm text-gray-600">
              <input type="checkbox" class="new-col-required accent-indigo-500" /> Required
            </label>
            <button class="add-col-btn h-10 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-500/30">+ Add Column</button>
          </div>
        </div>

        <!-- Campaigns -->
        <div class="flex justify-end items-center gap-2 mb-4 mt-8">
          <input type="text" id="newCampaignName" placeholder="New campaign name"
            class="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors w-64" />
          <button id="addCampaignBtn" class="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/30">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            Add
          </button>
        </div>

        <div id="campaignList" class="space-y-4">
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-12 text-center text-gray-500">Loading campaigns…</div>
        </div>
      </div>

      <!-- Delete Confirm Modal -->
      <div id="confirmModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <h3 id="confirmTitle" class="text-lg font-bold text-gray-800 mb-2"></h3>
            <p id="confirmMessage" class="text-gray-500 mb-6"></p>
            <div class="flex gap-3">
              <button id="confirmCancel" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button id="confirmOk" class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;return this.container=t.render(s),this.bindEvents(),this.loadData(),this.container}icon(e){return`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${{grid:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>',tag:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>',users:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>'}[e]}</svg>`}confirmAction(e,t,s){return new Promise(a=>{const o=this.container.querySelector("#confirmModal");if(!o)return a(!1);const n=o.querySelector("#confirmTitle"),d=o.querySelector("#confirmMessage"),i=o.querySelector("#confirmOk");n.textContent=e,d.textContent=t,i.textContent=s||"Delete",o.classList.remove("hidden");const l=c=>{o.classList.add("hidden"),i.replaceWith(i.cloneNode(!0)),o.querySelector("#confirmCancel").replaceWith(o.querySelector("#confirmCancel").cloneNode(!0)),a(c)};o.querySelector("#confirmOk").addEventListener("click",()=>l(!0),{once:!0}),o.querySelector("#confirmCancel").addEventListener("click",()=>l(!1),{once:!0}),o.addEventListener("click",c=>{c.target===o&&l(!1)},{once:!0})})}bindEvents(){const e=this.container;e&&(e.querySelector(".add-col-btn").addEventListener("click",async()=>{const t=e.querySelector(".new-col-input"),s=((t==null?void 0:t.value)||"").trim();if(!s){t==null||t.focus(),t==null||t.classList.add("border-red-400"),setTimeout(()=>t==null?void 0:t.classList.remove("border-red-400"),1500);return}try{await Yt({name:s,type:e.querySelector(".new-col-type").value,role:e.querySelector(".new-col-role").value,applies_to:e.querySelector(".new-col-applies").value,required:e.querySelector(".new-col-required").checked}),t.value="",e.querySelector(".new-col-required").checked=!1,await this.loadData()}catch(a){alert(a.message)}}),e.querySelector(".new-col-input").addEventListener("keydown",t=>{t.key==="Enter"&&e.querySelector(".add-col-btn").click()}),e.querySelector("#columnList").addEventListener("click",async t=>{const s=t.target.closest("button");if(s){if(s.classList.contains("save-col-btn")){const a=s.closest("[data-col-id]");if(!a)return;try{await Ye(a.dataset.colId,this.readColumnForm(a)),await this.loadData()}catch(o){alert(o.message)}return}if(s.classList.contains("del-col-btn")){const a=s.closest("[data-col-id]");if(!a)return;await this.confirmAction("Delete Column?",`"${a.dataset.colName}" and all values saved under it will be permanently removed.`,"Delete")&&(await Qt(a.dataset.colId),await this.loadData());return}}}),e.querySelector("#columnList").addEventListener("change",async t=>{const s=t.target;if(!s.classList.contains("col-type-select")&&!s.classList.contains("col-role-select")&&!s.classList.contains("col-applies-select")&&!s.classList.contains("col-required-check"))return;const a=s.closest("[data-col-id]");if(a)try{await Ye(a.dataset.colId,this.readColumnForm(a)),await this.loadData()}catch(o){alert(o.message),await this.loadData()}}),e.querySelector("#addCampaignBtn").addEventListener("click",async()=>{const t=e.querySelector("#newCampaignName"),s=((t==null?void 0:t.value)||"").trim();if(!s){t==null||t.focus(),t==null||t.classList.add("border-red-400"),setTimeout(()=>t==null?void 0:t.classList.remove("border-red-400"),1500);return}try{await ts(s),t.value="",await this.loadData()}catch(a){alert(a.message)}}),e.querySelector("#newCampaignName").addEventListener("keydown",t=>{t.key==="Enter"&&e.querySelector("#addCampaignBtn").click()}),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await se(),this.app.logout()}),e.querySelector("#campaignList").addEventListener("click",async t=>{const s=t.target.closest("button, [data-action]");if(!s){const o=t.target.closest(".expand-toggle");if(o){t.preventDefault();const n=o.closest(".campaign-card");if(n){const d=Number(n.dataset.id);this.expandedId=this.expandedId===d?null:d,this.renderList()}}return}const a=s.closest(".campaign-card");if(s.classList.contains("rename-campaign-btn")&&a){t.stopPropagation(),this.renamingId=Number(a.dataset.id),this.renderList();const o=e.querySelector(".campaign-rename-input");o&&(o.focus(),o.select());return}if(s.classList.contains("delete-campaign-btn")&&a){t.stopPropagation();const o=Number(a.dataset.id);await this.confirmAction("Delete Campaign?","This will delete all buckets and agent assignments for this campaign.","Delete")&&(await ss(o),this.expandedId===o&&(this.expandedId=null),await this.loadData());return}if(s.classList.contains("add-bucket-btn")&&a){const o=a.querySelector(".new-bucket-input"),n=((o==null?void 0:o.value)||"").trim();if(!n){o==null||o.focus();return}await rs(Number(a.dataset.id),n),await this.loadData();return}if(s.classList.contains("save-bucket-btn")){const o=s.closest("div").querySelector(".bucket-name-input");o!=null&&o.value.trim()&&(await as(s.dataset.bucketId,o.value.trim()),await this.loadData());return}if(s.classList.contains("del-bucket-btn")){await this.confirmAction("Delete Bucket?","Users assigned to this bucket will be unassigned.","Delete")&&(await os(s.dataset.bucketId),await this.loadData());return}if(s.classList.contains("assign-bucket-chip")&&a){const o=Number(a.dataset.id),n=Number(s.dataset.userId),d=Number(s.dataset.bucketId),i=this.campaigns.find(u=>u.id===o),c=i.assignments.find(u=>u.user_id===n).bucket_id===d?null:d,p=i.assignments.map(u=>u.user_id===n?{user_id:n,bucket_id:c}:{user_id:u.user_id,bucket_id:u.bucket_id});await Je(o,p),await this.loadData();return}if(s.classList.contains("add-agent-btn")&&a){const o=a.querySelector(".add-agent-select");if(o!=null&&o.value){const n=Number(a.dataset.id),i=[...this.campaigns.find(l=>l.id===n).assignments.map(l=>({user_id:l.user_id,bucket_id:l.bucket_id})),{user_id:Number(o.value),bucket_id:null}];await Je(n,i),await this.loadData()}return}}),e.querySelector("#campaignList").addEventListener("keydown",async t=>{var a,o;const s=t.target;if(s.classList.contains("campaign-rename-input")&&(t.key==="Enter"||t.key==="Escape")){if(t.preventDefault(),t.key==="Escape"){this.renamingId=null,this.renderList();return}const n=Number(s.dataset.campaignId),d=s.value.trim();this.renamingId=null,d&&d!==((a=this.campaigns.find(i=>i.id===n))==null?void 0:a.name)?(await Qe(n,d),await this.loadData()):this.renderList()}if(s.classList.contains("new-bucket-input")&&t.key==="Enter"){t.preventDefault();const n=s.closest(".campaign-card");n&&((o=n.querySelector(".add-bucket-btn"))==null||o.click())}}),e.querySelector("#campaignList").addEventListener("focusout",async t=>{if(!t.target.classList.contains("campaign-rename-input"))return;const s=t.target;setTimeout(async()=>{var n;if(this.renamingId!==Number(s.dataset.campaignId))return;const a=Number(s.dataset.campaignId),o=s.value.trim();this.renamingId=null,o&&o!==((n=this.campaigns.find(d=>d.id===a))==null?void 0:n.name)?(await Qe(a,o),await this.loadData()):this.renderList()},150)}))}readColumnForm(e){return{name:e.querySelector(".col-name-input").value.trim(),type:e.querySelector(".col-type-select").value,role:e.querySelector(".col-role-select").value,applies_to:e.querySelector(".col-applies-select").value,required:e.querySelector(".col-required-check").checked}}async loadData(){try{const[e,t,s]=await Promise.all([pt(),ut(),lt()]);this.campaigns=e.campaigns||[],this.users=t.users||[],this.columns=s.columns||[],this.renderColumns(),this.renderList()}catch(e){console.error("Failed to load campaign config:",e),this.container.querySelector("#campaignList").innerHTML='<div class="bg-white rounded-xl shadow-sm border border-red-200 p-12 text-center text-red-600">Failed to load data</div>'}}renderColumns(){lr();const e=this.container.querySelector("#columnList");if(e){if(this.columns.length===0){e.innerHTML='<div class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">No columns yet. The tracker tables will be empty until you add columns above.</div>';return}e.innerHTML=this.columns.map((t,s)=>`
      <div class="border border-gray-200 rounded-xl px-3 py-2.5 flex flex-wrap items-center gap-2" data-col-id="${t.id}" data-col-name="${t.name}">
        <span class="w-6 h-6 rounded-md bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">${s+1}</span>
        <input class="col-name-input flex-1 min-w-[140px] text-sm font-semibold text-gray-800 bg-transparent focus:outline-none" value="${t.name}" />
        <span class="flex gap-1.5 items-center">
          ${t.role?`<span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-600" title="Role: ${t.role}">⚙ ${t.role}</span>`:""}
          ${t.required?'<span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-red-100 text-red-600">required</span>':""}
        </span>
        <select class="col-type-select text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-500 focus:outline-none">
          ${nt.map(a=>`<option value="${a.value}" ${t.type===a.value?"selected":""}>${a.label}</option>`).join("")}
        </select>
        <select class="col-role-select text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-500 focus:outline-none" title="Role">
          ${it.map(a=>`<option value="${a.value}" ${t.role===a.value?"selected":""}>${a.label}</option>`).join("")}
        </select>
        <select class="col-applies-select text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-500 focus:outline-none" title="Show in table">
          <option value="both" ${t.applies_to==="both"?"selected":""}>All</option>
          <option value="ptp" ${t.applies_to==="ptp"?"selected":""}>PTP</option>
          <option value="confirmed" ${t.applies_to==="confirmed"?"selected":""}>Confirmed</option>
        </select>
        <label class="inline-flex items-center gap-1 text-xs text-gray-500" title="Must be filled in when adding a record">
          <input type="checkbox" class="col-required-check accent-indigo-500" ${t.required?"checked":""} /> req
        </label>
        <button class="save-col-btn text-gray-300 hover:text-green-600 transition-colors" title="Save">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </button>
        <button class="del-col-btn text-gray-300 hover:text-red-500 transition-colors" title="Delete">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>`).join("")}}renderList(){const t=this.container.querySelector("#campaignList");if(this.campaigns.length===0){t.innerHTML='<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">No campaigns yet. Add one above.</div>';return}t.innerHTML=this.campaigns.map((s,a)=>{const o=this.expandedId===s.id,n=this.renamingId===s.id;return`
      <div class="campaign-card bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden" data-id="${s.id}">
        <div class="expand-toggle flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-indigo-50/40 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200">${a+1}</div>
            <div class="flex-1 min-w-0">
              ${n?`<input type="text" class="campaign-rename-input w-full text-lg font-bold text-gray-900 bg-gray-50 border-2 border-indigo-300 rounded-lg px-2 py-0.5 focus:outline-none focus:border-indigo-500" value="${s.name}" data-campaign-id="${s.id}" />`:`<h3 class="text-lg font-bold text-gray-900">${s.name}</h3>`}
              <p class="text-sm text-gray-400">${s.buckets.length} buckets · ${s.assignments.length} agents</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 112 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 112 0z"/></svg>
              ${s.buckets.length}
            </span>
            <button class="rename-campaign-btn p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Rename campaign">
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button class="delete-campaign-btn p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete campaign">
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
            <svg class="w-5 h-5 text-gray-400 transition-transform ${o?"rotate-90":""}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>

        ${o?`
        <div class="border-t border-gray-100 p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <!-- Buckets -->
          <div class="bg-white rounded-xl border border-gray-200 p-4">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 112 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 112 0z"/></svg>
              <h4 class="font-bold text-gray-800">Buckets</h4>
            </div>
            <div class="space-y-2 mb-3">
              ${s.buckets.map((d,i)=>`
              <div class="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <span class="w-6 h-6 rounded-md bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">${i+1}</span>
                <input class="bucket-name-input flex-1 text-sm font-semibold text-gray-800 bg-transparent focus:outline-none" data-bucket-id="${d.id}" value="${d.name}" />
                <button class="save-bucket-btn text-gray-300 hover:text-green-600 transition-colors" data-bucket-id="${d.id}" title="Save">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </button>
                <button class="del-bucket-btn text-gray-300 hover:text-red-500 transition-colors" data-bucket-id="${d.id}" title="Delete">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>`).join("")}
            </div>
            <div class="flex gap-2">
              <input type="text" placeholder="Add bucket" class="new-bucket-input flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none" />
              <button class="add-bucket-btn w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors flex-shrink-0">+</button>
            </div>
          </div>

          <!-- Agents -->
          <div class="bg-white rounded-xl border border-gray-200 p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                <h4 class="font-bold text-gray-800">Agents</h4>
              </div>
              <span class="text-xs text-gray-400 font-semibold">${s.assignments.length} ASSIGNMENTS</span>
            </div>
            <div class="space-y-2 max-h-80 overflow-y-auto">
              ${s.assignments.length===0?'<p class="text-sm text-gray-400 italic">No agents assigned yet.</p>':s.assignments.map(d=>`
              <div class="border border-gray-200 rounded-xl px-3 py-2.5">
                <p class="text-sm font-bold text-gray-800 mb-2">${d.full_name}</p>
                <div class="flex flex-wrap gap-1.5">
                  ${s.buckets.map(i=>`
                  <button class="assign-bucket-chip px-3 py-1 rounded-full text-xs font-semibold border-2 transition-all
                    ${d.bucket_id===i.id?"bg-indigo-600 border-indigo-600 text-white":"bg-white border-gray-200 text-gray-500 hover:border-indigo-300"}"
                    data-user-id="${d.user_id}" data-bucket-id="${i.id}">
                    ${i.name}
                  </button>`).join("")}
                </div>
              </div>`).join("")}
            </div>
            <div class="mt-3 pt-3 border-t border-gray-100">
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Add agent</label>
              <div class="flex gap-2">
                <select class="add-agent-select flex-1 text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
                  <option value="">Select user…</option>
                  ${this.users.filter(d=>!s.assignments.some(i=>i.user_id===d.id)).map(d=>`<option value="${d.id}">${d.full_name}</option>`).join("")}
                </select>
                <button class="add-agent-btn w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors flex-shrink-0">+</button>
              </div>
            </div>
          </div>
        </div>`:""}
      </div>`}).join("")}}class hr{constructor(){this.currentUser=null,this.routes={"/":()=>this.renderLogin(),"/login":()=>this.renderLogin(),"/dashboard":()=>this.renderDashboard(),"/admin":()=>this.renderAdmin(),"/campaigns":()=>this.renderCampaigns(),"/confirmed":()=>this.renderConfirmed(),"/campaign/:campaign":()=>this.renderCampaign()},this.init()}async init(){try{const e=await fetch("/api/auth/me",{credentials:"include"});if(e.ok){const t=await e.json();this.currentUser=t.user,this.navigate("/dashboard")}else this.currentUser=null,this.navigate("/login")}catch(e){console.warn("Auth check failed, redirecting to login:",e.message),this.currentUser=null,this.navigate("/login")}window.addEventListener("popstate",()=>this.route())}navigate(e){window.history.pushState({},"",e),this.route()}route(){const e=window.location.pathname;if(this.routes[e]){this.routes[e]();return}for(const[t,s]of Object.entries(this.routes))if(t.startsWith("/campaign/")){const a="/campaign/";if(e.startsWith(a)&&e.length>a.length){s();return}}this.navigate("/login")}renderLogin(){const e=document.getElementById("app");e.innerHTML="";const t=new ns(this);e.appendChild(t.render())}renderDashboard(){if(!this.currentUser){this.navigate("/login");return}const e=document.getElementById("app");e.innerHTML="";const t=new cr(this);e.appendChild(t.render())}renderAdmin(){if(!this.currentUser||this.currentUser.role!=="admin"){this.navigate("/dashboard");return}const e=document.getElementById("app");e.innerHTML="";const t=new ur(this);e.appendChild(t.render())}renderCampaigns(){if(!this.currentUser||this.currentUser.role!=="admin"){this.navigate("/dashboard");return}const e=document.getElementById("app");e.innerHTML="";const t=new gr(this);e.appendChild(t.render())}renderCampaign(){if(!this.currentUser||this.currentUser.role!=="admin"){this.navigate("/dashboard");return}const e=window.location.pathname.split("/").slice(-1)[0],t=document.getElementById("app");t.innerHTML="";const s=new pr(this,decodeURIComponent(e));t.appendChild(s.render())}renderConfirmed(){if(console.log("renderConfirmed called"),!this.currentUser){console.log("No currentUser, redirecting to login"),this.navigate("/login");return}const e=document.getElementById("app");console.log("Clearing app innerHTML"),e.innerHTML="";const t=new mr(this);console.log("Appending ConfirmedTrackerPage"),e.appendChild(t.render()),console.log("ConfirmedTrackerPage rendered")}setUser(e){this.currentUser=e}logout(){this.currentUser=null,this.navigate("/login")}}new hr;
