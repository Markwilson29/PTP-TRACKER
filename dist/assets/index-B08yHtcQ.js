(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const N="/api";async function u(l,e={}){const t={credentials:"include",headers:{"Content-Type":"application/json"},...e};t.body&&typeof t.body=="object"&&(t.body=JSON.stringify(t.body));let s;try{s=await fetch(`${N}${l}`,t)}catch{throw new Error("Cannot connect to server. Please ensure the server is running.")}let r;const a=await s.text();if(a)try{r=JSON.parse(a)}catch{throw new Error("Unexpected server response")}else r={};if(!s.ok)throw new Error(r.error||`Request failed (${s.status})`);return r}const z=(l,e)=>u("/auth/login",{method:"POST",body:{username:l,password:e}}),f=()=>u("/auth/logout",{method:"POST"}),_=()=>u("/columns"),O=l=>u("/columns",{method:"POST",body:l}),M=(l,e)=>u(`/columns/${l}`,{method:"PUT",body:e}),V=l=>u(`/columns/${l}`,{method:"DELETE"}),w=l=>u(`/records/${l}`),H=(l,e)=>u(`/records/${l}`,{method:"POST",body:e}),h=(l,e,t)=>u(`/records/${l}/${e}`,{method:"PUT",body:t}),A=(l,e)=>u(`/records/${l}/${e}`,{method:"DELETE"}),D=()=>u("/users"),W=l=>u(`/campaign/${encodeURIComponent(l)}/users`),Q=l=>u("/users",{method:"POST",body:l}),G=l=>u(`/users/${l}`,{method:"DELETE"}),q=(l,e)=>u(`/users/${l}/campaign`,{method:"PUT",body:{campaign:e}}),J=(l,e)=>u(`/users/${l}/password`,{method:"PUT",body:{password:e}}),Y=()=>u("/campaigns-config"),K=l=>u("/campaigns-config",{method:"POST",body:{name:l}}),$=(l,e)=>u(`/campaigns-config/${l}`,{method:"PUT",body:{name:e}}),X=l=>u(`/campaigns-config/${l}`,{method:"DELETE"}),Z=(l,e)=>u(`/campaigns-config/${l}/buckets`,{method:"POST",body:{name:e}}),ee=(l,e)=>u(`/buckets/${l}`,{method:"PUT",body:{name:e}}),te=l=>u(`/buckets/${l}`,{method:"DELETE"}),E=(l,e)=>u(`/campaigns-config/${l}/assignments`,{method:"PUT",body:{assignments:e}});class se{constructor(e){this.app=e}render(){const e=document.createElement("div");e.className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4",e.innerHTML=`
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white">CIMB Account Monitoring</h1>
          <p class="text-blue-100 mt-2">Sign in to your account</p>
        </div>

        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <form id="loginForm" class="space-y-5">
            <div id="errorMessage" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input 
                type="text" 
                id="username" 
                required 
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                id="password" 
                required 
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button 
              type="submit" 
              id="loginBtn"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200"
            >
              Sign In
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-gray-100">
            <p class="text-xs text-gray-400 text-center">Contact administrator for credentials</p>
          </div>
        </div>
      </div>
    `;const t=e.querySelector("#loginForm"),s=e.querySelector("#errorMessage"),r=e.querySelector("#loginBtn");return t.addEventListener("submit",async a=>{a.preventDefault();const o=e.querySelector("#username").value.trim(),i=e.querySelector("#password").value;if(!o||!i){s.textContent="Please fill in all fields",s.classList.remove("hidden");return}r.disabled=!0,r.textContent="Signing in...",s.classList.add("hidden");try{const n=await z(o,i);this.app.setUser(n.user),n.user.role==="admin"?this.app.navigate("/admin"):this.app.navigate("/dashboard")}catch(n){s.textContent=n.message,s.classList.remove("hidden"),r.disabled=!1,r.textContent="Sign In"}}),e}}let b=null;async function k(){return b||(b=(await _()).columns||[],b)}function re(){b=null}function C(l,e){return l.filter(t=>!t.applies_to||t.applies_to==="both"||t.applies_to===e)}function x(l,e){return l.find(t=>t.role===e)||null}function S(l,e){if(e==null||e==="")return l.type==="number"||l.type==="amount"?0:"";if(l.type==="number"||l.type==="amount"){const t=parseFloat(e);return isNaN(t)?0:t}return String(e)}function R(l,e){const t=S(l,e);return l.type==="amount"?"₱"+t.toLocaleString("en-PH",{minimumFractionDigits:2}):l.type==="number"?`<span class="text-sm font-semibold text-gray-800">${t}</span>`:t?`<span class="text-sm text-gray-800">${L(t)}</span>`:'<span class="text-gray-300">—</span>'}function I(l,e="",t=""){const s="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors",r=`col_${l.id}${t}`;let a="";switch(l.type){case"number":case"amount":a=`<input type="number" step="any" id="${r}" class="${s}" value="${e}" placeholder="0" />`;break;case"date":a=`<input type="date" id="${r}" class="${s}" value="${e}" />`;break;case"select":a=`<select id="${r}" class="${s}"></select>`;break;default:a=`<input type="text" id="${r}" class="${s}" value="${e}" />`}const o=l.required?" *":"";return`
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">${L(l.name)}${o}</label>
      ${a}
    </div>`}function F(l,e){const t=l.querySelector(`#col_${e.id}, #col_${e.id}_edit`);return t?e.type==="number"||e.type==="amount"?t.value===""?"":String(parseFloat(t.value)):t.value.trim():""}function L(l){return String(l).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function m(l){return L(l)}const B=["Campaigns & Columns","Users & Agents","Admin Panel"];class v{constructor(e,t){this.app=e,this.sidebarItems=t}render(e){var o,i,n,d,p,g;const t=document.createElement("div");t.className="min-h-screen bg-gray-50 flex relative";const s=localStorage.getItem("sidebarClosed")==="true",r=this.sidebarItems.filter(c=>!B.includes(c.label)),a=this.sidebarItems.filter(c=>B.includes(c.label));return t.innerHTML=`
      <!-- Sidebar Toggle Button (always visible) -->
      <button id="sidebarToggle" class="fixed top-5 z-50 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 rounded-full p-2.5 hover:from-blue-600 hover:to-blue-700 transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-110 ${s?"left-3":"left-[260px]"}">
        <svg id="toggleIcon" class="w-4 h-4 transition-transform duration-500 ${s?"rotate-180":""}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Sidebar -->
      <aside id="sidebar" class="bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${s?"w-0 overflow-hidden opacity-0":"w-64 opacity-100"}">
        <!-- Sidebar Header -->
        <div class="p-5 border-b border-slate-700">
          <div class="flex items-center gap-3">
            <div class="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex-shrink-0 shadow-lg shadow-indigo-500/30">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">PTP Monitoring</h2>
              <p class="text-xs text-slate-400">Promise to Pay</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Main</p>
          <ul class="space-y-1">
            ${r.map(c=>`
              <li class="sidebar-item" data-path="${c.path}">
                <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 justify-between
                  ${c.active?"bg-indigo-600 text-white shadow-lg shadow-indigo-600/30":"text-slate-300 hover:bg-slate-700/50 hover:text-white"}">
                  <span class="flex items-center gap-3 flex-1">
                    ${c.icon?`<span class="w-5 h-5 flex items-center justify-center">${c.icon}</span>`:""}
                    <span>${c.label}</span>
                  </span>
                  ${c.active?'<svg class="w-4 h-4 text-white/80 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>':'<span class="w-4 h-4 flex-shrink-0"></span>'}
                </button>
              </li>
            `).join("")}
          </ul>
          ${a.length?`
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 mt-6 px-3">Administration</p>
          <ul class="space-y-1">
            ${a.map(c=>`
              <li class="sidebar-item" data-path="${c.path}">
                <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 justify-between
                  ${c.active?"bg-indigo-600 text-white shadow-lg shadow-indigo-600/30":"text-slate-300 hover:bg-slate-700/50 hover:text-white"}">
                  <span class="flex items-center gap-3 flex-1">
                    ${c.icon?`<span class="w-5 h-5 flex items-center justify-center">${c.icon}</span>`:""}
                    <span>${c.label}</span>
                  </span>
                  ${c.active?'<svg class="w-4 h-4 text-white/80 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>':'<span class="w-4 h-4 flex-shrink-0"></span>'}
                </button>
              </li>
            `).join("")}
          </ul>
          `:""}
        </nav>

        <!-- User Profile & Logout -->
        <div class="p-4 border-t border-slate-700">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span class="text-white font-bold text-sm">${((i=(o=this.app.currentUser)==null?void 0:o.full_name)==null?void 0:i.charAt(0))||"?"}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">${((n=this.app.currentUser)==null?void 0:n.full_name)||""}</p>
              <p class="text-xs text-slate-400 truncate">${((d=this.app.currentUser)==null?void 0:d.username)||""}</p>
            </div>
          </div>
          <button id="logoutBtn" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white hover:bg-red-500/20 transition-all duration-200 rounded-xl border border-transparent hover:border-red-500/30" title="Logout">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col">
        <!-- Navbar -->
        <nav class="bg-white shadow-sm border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center gap-3">
                <div class="w-10"></div>
                <h1 class="text-xl font-bold text-gray-800">${((p=this.sidebarItems.find(c=>c.active))==null?void 0:p.label)||""}</h1>
              </div>
              <div class="flex items-center gap-3">
                ${(g=this.app.currentUser)!=null&&g.campaign?`
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
        <main class="flex-1">
          ${e}
        </main>
      </div>
    `,this.bindEvents(t),t}bindEvents(e){e.querySelector("#sidebarToggle").addEventListener("click",()=>{const t=e.querySelector("#sidebar"),s=e.querySelector("#sidebarToggle"),r=e.querySelector("#toggleIcon");t.classList.contains("w-0")?(t.classList.remove("w-0","overflow-hidden","opacity-0"),t.classList.add("w-64","opacity-100"),s.classList.remove("left-3"),s.classList.add("left-[260px]"),r.classList.remove("rotate-180"),localStorage.setItem("sidebarClosed","false")):(t.classList.remove("w-64","opacity-100"),t.classList.add("w-0","overflow-hidden","opacity-0"),s.classList.remove("left-[260px]"),s.classList.add("left-3"),r.classList.add("rotate-180"),localStorage.setItem("sidebarClosed","true"))}),e.querySelectorAll(".sidebar-item button").forEach(t=>{t.addEventListener("click",()=>{const s=t.closest(".sidebar-item").dataset.path;this.app.navigate(s)})}),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await f(),this.app.logout()})}}class ae{constructor(e){this.app=e,this.records=[],this.columns=[],this.editingId=null,this.filterCampaign=null,this.searchQuery=""}render(){const t=this.app.currentUser.role==="admin",s=[{label:"Daily Tracker",path:"/dashboard",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>'},{label:"Confirmed Tracker",path:"/confirmed",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'},...t?[{label:"Campaigns & Columns",path:"/campaigns",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>'},{label:"Users & Agents",path:"/admin",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'}]:[]],o=new v(this.app,s).render(`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Account Monitoring</h2>
            <p class="text-gray-500 mt-1">Monitor account activities and confirmations</p>
          </div>
          <button id="addRecordBtn" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors shadow-lg shadow-blue-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Record
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Records</p>
                <p id="totalRecords" class="text-2xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Amount</p>
                <p id="totalAmount" class="text-2xl font-bold text-gray-800">₱0.00</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Today's Records</p>
                <p id="todayCount" class="text-2xl font-bold text-gray-800">0</p>
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
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Search records..." />
          </div>
        </div>

        <!-- Records Table -->
        <div id="allRecordsTable" class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="overflow-x-auto">
            <table class="w-full">
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
              <button type="submit" id="submitBtn" class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">Save Record</button>
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
    `);return this.bindEvents(o),this.init(o),o}async init(e){try{const[t,s]=await Promise.all([k(),w("ptp")]);this.columns=C(t,"ptp"),this.records=s.records,this.renderCampaignFilters(e),this.renderHeader(e),this.renderTable(e,this.records),this.updateStats(e,this.records),this.initCampaignFilters(e,this.app.currentUser)}catch(t){console.error("Failed to load tracker data:",t),e.querySelector("#recordsTableBody").innerHTML='<tr><td class="px-6 py-12 text-center text-red-600">Failed to load records. Is the server running?</td></tr>'}}renderCampaignFilters(e){const t=e.querySelector("#campaignFilterButtons");if(!t)return;const s=[...new Set(this.records.map(r=>r.campaign).filter(Boolean))].sort();t.innerHTML=`
      <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="all" style="background: #eef2f6; color: #1e293b;">All Campaigns</button>
      ${s.map(r=>`<button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="${m(r)}" style="background: #eef2f6; color: #1e293b;">${r}</button>`).join("")}
    `}initCampaignFilters(e,t){const s=e.querySelector("#campaignFilterButtons"),r=e.querySelector("#userCampaignBadge"),a=e.querySelector("#userCampaignName");if(t.role!=="admin"&&t.campaign){s.classList.add("hidden"),r.classList.remove("hidden");const o=t.campaign.includes(" - ")?t.campaign.split(" - ")[0]:t.campaign;a.textContent=o,this.applyCampaignFilter(e,o)}else s.classList.remove("hidden"),r.classList.add("hidden")}applyCampaignFilter(e,t){this.filterCampaign=t==="all"?null:t,e.querySelectorAll(".campaign-filter-btn").forEach(r=>{const a=r.dataset.campaign===t;r.style.background=a?"#5c52ff":"#eef2f6",r.style.color=a?"white":"#1e293b"});const s=this.filterCampaign?this.records.filter(r=>(r.campaign||"").startsWith(this.filterCampaign)):this.records;this.renderTable(e,s),this.updateStats(e,s)}renderHeader(e){const t=e.querySelector("#tableHeaderRow");t&&(t.innerHTML=`
      <th class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-12">#</th>
      <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[140px]">Campaign</th>
      ${this.columns.map(s=>`<th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[110px]" title="${m(s.role?`Role: ${s.role}`:s.name)}">${s.name}${s.required?' <span class="text-red-400">*</span>':""}</th>`).join("")}
      <th class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-28">Actions</th>
    `)}cellForRecord(e,t){const s=(e.values||{})[t.id],r=t.role==="agent"||t.role==="date";return`
      <td class="px-4 py-3 ${t.type==="amount"||t.type==="number"?"text-right":"text-left"}">
        ${r?R(t,s):`<input type="${t.type==="number"||t.type==="amount"?"number":t.type==="date"?"date":"text"}" step="any"
              class="cell-input w-full min-w-[90px] text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:border-blue-400 focus:outline-none ${t.type==="amount"||t.type==="number"?"text-right":""}"
              data-record-id="${e.id}" data-col-id="${t.id}" value="${m(s??"")}" placeholder="—" />`}
      </td>`}renderTable(e,t){const s=e.querySelector("#recordsTableBody"),r=(this.searchQuery||"").toLowerCase();let a=t;if(r&&(a=t.filter(o=>(o.campaign||"").toLowerCase().includes(r)?!0:this.columns.some(i=>String((o.values||{})[i.id]??"").toLowerCase().includes(r)))),this.columns.length===0){s.innerHTML=`
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No columns defined</p>
          <p class="text-sm text-gray-400 mt-1">An admin must add columns on the Campaigns &amp; Columns page first.</p>
        </td></tr>`;return}if(a.length===0){s.innerHTML=`
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No records found</p>
          <p class="text-sm text-gray-400 mt-1">Click "Add Record" to create one</p>
        </td></tr>`;return}s.innerHTML=a.map((o,i)=>`
      <tr class="hover:bg-blue-50/50 transition-colors">
        <td class="px-4 py-3 text-sm text-gray-500 text-center font-medium">${i+1}</td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${o.campaign||"—"}</span>
        </td>
        ${this.columns.map(n=>this.cellForRecord(o,n)).join("")}
        <td class="px-4 py-3">
          <div class="flex gap-1.5 justify-center">
            <button class="edit-btn px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium text-xs" data-id="${o.id}">Edit</button>
            <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs" data-id="${o.id}">Delete</button>
          </div>
        </td>
      </tr>
    `).join(""),s.querySelectorAll(".cell-input").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.recordId,n=o.dataset.colId;try{await h("ptp",i,{values:{[n]:o.value}});const d=this.records.find(p=>p.id===Number(i));d&&(d.values=d.values||{},d.values[n]=o.value),this.updateStats(e,this.records)}catch(d){console.error("Failed to save cell:",d),alert(d.message)}})}),s.querySelectorAll(".edit-btn").forEach(o=>o.addEventListener("click",()=>this.editRecord(e,Number(o.dataset.id)))),s.querySelectorAll(".delete-btn").forEach(o=>o.addEventListener("click",()=>this.confirmDelete(e,Number(o.dataset.id))))}updateStats(e,t){const s=x(this.columns,"amount"),r=x(this.columns,"date"),a=new Date().toISOString().split("T")[0];let o=0;s&&(o=t.reduce((n,d)=>n+S(s,(d.values||{})[s.id]),0));let i=0;r&&(i=t.filter(n=>(n.values||{})[r.id]===a).length),e.querySelector("#totalRecords").textContent=t.length,e.querySelector("#totalAmount").textContent="₱"+o.toLocaleString("en-PH",{minimumFractionDigits:2}),e.querySelector("#todayCount").textContent=i}openModal(e,t=null){const s=this.app.currentUser;x(this.columns,"agent");const r=e.querySelector("#dynamicFields"),a=`
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
        <select id="rec_campaign" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
          <option value="">Select Campaign</option>
          ${this.campaignList(s).map(i=>`<option value="${m(i)}" ${(t==null?void 0:t.campaign)===i?"selected":""}>${i}</option>`).join("")}
        </select>
      </div>`,o=this.columns.map(i=>{const n=t?(t.values||{})[i.id]??"":"";let d=I(i,m(n),t?"_edit":"");return i.role==="agent"&&!t&&(d=d.replace("<input ",`<input value="${m(s.full_name)}" readonly `),d=d.replace('class="','class="bg-gray-50 ')),d}).join("");r.innerHTML=a+o,e.querySelector("#modalTitle").textContent=t?"Edit Record":"Add New Record",e.querySelector("#submitBtn").textContent=t?"Update Record":"Save Record",e.querySelector("#formError").classList.add("hidden"),e.querySelector("#modal").classList.remove("hidden")}campaignList(e){const t=["Revi Credit","Personal Loan","GCredit","LazPay"],s=["Pre-Charge-Off","Charge-Off"],r=t.flatMap(a=>s.map(o=>`${a} - ${o}`));return e.role==="admin"||!e.campaign?[...t,...r]:[e.campaign]}collectForm(e){var s;const t={};return this.columns.forEach(r=>{t[r.id]=F(e,r)}),{campaign:((s=e.querySelector("#rec_campaign"))==null?void 0:s.value)||"",values:t}}bindEvents(e){e.querySelector("#addRecordBtn").addEventListener("click",()=>this.openModal(e,null)),e.querySelector("#closeModal").addEventListener("click",()=>e.querySelector("#modal").classList.add("hidden")),e.querySelector("#cancelBtn").addEventListener("click",()=>e.querySelector("#modal").classList.add("hidden")),e.querySelector("#modal").addEventListener("click",t=>{t.target===e.querySelector("#modal")&&e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#recordForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#formError");s.classList.add("hidden");const r=this.collectForm(e);if(!r.campaign){s.textContent="Please select a campaign",s.classList.remove("hidden");return}const a=e.querySelector("#submitBtn");a.disabled=!0,a.textContent="Saving...";try{this.editingId?await h("ptp",this.editingId,r):await H("ptp",r),e.querySelector("#modal").classList.add("hidden"),this.editingId=null,await this.init(e)}catch(o){s.textContent=o.message,s.classList.remove("hidden")}finally{a.disabled=!1,a.textContent=this.editingId?"Update Record":"Save Record"}}),e.querySelector("#cancelDelete").addEventListener("click",()=>e.querySelector("#deleteModal").classList.add("hidden")),e.querySelector("#deleteModal").addEventListener("click",t=>{t.target===e.querySelector("#deleteModal")&&e.querySelector("#deleteModal").classList.add("hidden")}),e.querySelector("#searchInput").addEventListener("input",t=>{this.searchQuery=t.target.value,this.renderTable(e,this.filteredRecords()),this.updateStats(e,this.filteredRecords())}),e.querySelector("#campaignFilterButtons").addEventListener("click",t=>{const s=t.target.closest(".campaign-filter-btn");s&&this.applyCampaignFilter(e,s.dataset.campaign)})}filteredRecords(){return this.filterCampaign?this.records.filter(e=>(e.campaign||"").startsWith(this.filterCampaign)):this.records}editRecord(e,t){const s=this.records.find(r=>r.id===t);s&&(this.editingId=t,this.openModal(e,s))}confirmDelete(e,t){const s=e.querySelector("#deleteModal");s.classList.remove("hidden");const r=e.querySelector("#confirmDelete"),a=r.cloneNode(!0);r.parentNode.replaceChild(a,r),a.addEventListener("click",async()=>{try{await A("ptp",t),s.classList.add("hidden"),await this.init(e)}catch{alert("Failed to delete record")}})}}const P=["Personal Loan","Revi Credit","LazPay","GCredit"];function y(l=""){return P.map(e=>`<option value="${e}"${e===l?" selected":""}>${e}</option>`).join(`
`)}function j(l=""){const e=['<option value="">No Campaign</option>',...P.map(s=>`<option value="${s}"${s===l?" selected":""}>${s}</option>`)].join(`
`),t=l?`<option value="${l} - Pre-Charge-Off">Pre-Charge-Off</option>
<option value="${l} - Charge-Off">Charge-Off</option>`:'<option value="">Select a base campaign first</option>';return{baseOptions:e,bucketOptions:t}}function oe(l,e){return!l||!e?"":e.includes("Pre-Charge-Off")?`${l} - Pre-Charge-Off`:e.includes("Charge-Off")?`${l} - Charge-Off`:""}class le{constructor(e){this.app=e,this.users=[]}render(){this.app.currentUser;const e=[{label:"Daily Tracker",path:"/dashboard",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>'},{label:"Campaigns & Columns",path:"/campaigns",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>'},{label:"Users & Agents",path:"/admin",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'}],t=new v(this.app,e),s=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <p class="text-xs font-bold tracking-widest text-indigo-500 uppercase">Administration</p>
            <h2 class="text-2xl font-bold text-gray-800">Users &amp; Agents</h2>
            <p class="text-gray-500 mt-1">Manage users, agents and system settings</p>
          </div>
          <button id="addUserBtn" class="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors shadow-lg shadow-purple-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
            Add User
          </button>
        </div>

        <!-- User Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Users</p>
                <p id="totalUsers" class="text-2xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Admins</p>
                <p id="adminCount" class="text-2xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Regular Users</p>
                <p id="userCount" class="text-2xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
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
                ${y()}
              </select>
            </div>
            <div id="formError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelUserBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitUserBtn" class="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors">Create User</button>
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
                ${y()}
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

      <!-- Edit Campaign Modal -->
      <div id="campaignModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-800">Edit Campaign</h3>
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
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign</label>
                <select id="assign_base_campaign" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors">
                  <option value="">No Campaign</option>
                  ${y()}
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Bucket</label>
                <select id="assign_bucket" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors" disabled>
                  <option value="">Select base first</option>
                </select>
              </div>
            </div>
            <div id="campaignError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelCampaignBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitCampaignBtn" class="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors" disabled>Update Campaign</button>
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
    `,r=t.render(s);return this.bindEvents(r),this.loadUsers(r),r}bindEvents(e){e.querySelector("#addUserBtn").addEventListener("click",()=>{e.querySelector("#userForm").reset(),e.querySelector("#formError").classList.add("hidden"),e.querySelector("#userModal").classList.remove("hidden")}),e.querySelector("#closeUserModal").addEventListener("click",()=>{e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#cancelUserBtn").addEventListener("click",()=>{e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#userModal").addEventListener("click",t=>{t.target===e.querySelector("#userModal")&&e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#userForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#formError");s.classList.add("hidden");const r={full_name:e.querySelector("#full_name").value.trim(),username:e.querySelector("#username").value.trim(),password:e.querySelector("#password").value,role:e.querySelector("#role").value,campaign:e.querySelector("#user_campaign").value},a=e.querySelector("#submitUserBtn");a.disabled=!0,a.textContent="Creating...";try{await Q(r),e.querySelector("#userModal").classList.add("hidden"),await this.loadUsers(e)}catch(o){s.textContent=o.message,s.classList.remove("hidden")}finally{a.disabled=!1,a.textContent="Create User"}}),e.querySelector("#closeEditUserModal").addEventListener("click",()=>{e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#cancelEditUserBtn").addEventListener("click",()=>{e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#editUserModal").addEventListener("click",t=>{t.target===e.querySelector("#editUserModal")&&e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#editUserForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#editFormError");s.classList.add("hidden");const r=e.querySelector("#editUserId").value,a={full_name:e.querySelector("#edit_full_name").value.trim(),username:e.querySelector("#edit_username").value.trim(),role:e.querySelector("#edit_role").value,campaign:e.querySelector("#edit_campaign").value},o=e.querySelector("#submitEditUserBtn");o.disabled=!0,o.textContent="Updating...";try{await q(r,a.campaign),await this.loadUsers(e),e.querySelector("#editUserModal").classList.add("hidden")}catch(i){s.textContent=i.message,s.classList.remove("hidden")}finally{o.disabled=!1,o.textContent="Save Changes"}}),e.querySelector("#closeCampaignModal").addEventListener("click",()=>{e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#cancelCampaignBtn").addEventListener("click",()=>{e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#campaignModal").addEventListener("click",t=>{t.target===e.querySelector("#campaignModal")&&e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#assign_base_campaign").addEventListener("change",()=>{const t=e.querySelector("#assign_base_campaign").value,s=e.querySelector("#assign_bucket"),r=e.querySelector("#submitCampaignBtn");if(!t){s.innerHTML='<option value="">Select base first</option>',s.disabled=!0,r.disabled=!0;return}const{bucketOptions:a}=j(t);s.innerHTML=a,s.disabled=!1,r.disabled=!0}),e.querySelector("#assign_bucket").addEventListener("change",()=>{const t=e.querySelector("#assign_base_campaign").value,s=e.querySelector("#assign_bucket").value,r=e.querySelector("#submitCampaignBtn");r.disabled=!(t&&s)}),e.querySelector("#campaignForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#campaignError");s.classList.add("hidden");const r=e.querySelector("#campaignForm").dataset.userId,a=e.querySelector("#assign_base_campaign").value,o=e.querySelector("#assign_bucket").value;if(!a||!o){s.textContent="Please select a campaign and a bucket.",s.classList.remove("hidden");return}const i=oe(a,o);if(!i){s.textContent="Invalid campaign selection. Please try again.",s.classList.remove("hidden"),n.disabled=!1,n.textContent="Update Campaign";return}const n=e.querySelector("#submitCampaignBtn");n.disabled=!0,n.textContent="Updating...";try{await q(r,i);const d=this.users.find(c=>c.id===Number(r)),p=`Campaign updated: ${d==null?void 0:d.full_name} → ${i}`;s.textContent=p,s.className=s.className.replace("hidden bg-red-50 border-red-200 text-red-700","bg-green-50 border-green-200 text-green-700"),s.classList.remove("hidden");const g=setTimeout(()=>{e.querySelector("#campaignModal").classList.add("hidden"),s.classList.add("hidden"),s.className=s.className.replace("bg-green-50 border-green-200 text-green-700","bg-red-50 border-red-200 text-red-700")},1200);try{await this.loadUsers(e)}catch(c){console.warn("User list reload failed:",c.message)}clearTimeout(g)}catch(d){s.textContent=d.message,s.classList.remove("hidden"),n.disabled=!1,n.textContent="Update Campaign"}}),e.querySelector("#cancelDeleteUser").addEventListener("click",()=>{e.querySelector("#deleteUserModal").classList.add("hidden")}),e.querySelector("#deleteUserModal").addEventListener("click",t=>{t.target===e.querySelector("#deleteUserModal")&&e.querySelector("#deleteUserModal").classList.add("hidden")}),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await f(),this.app.logout()}),e.querySelector("#closePasswordModal").addEventListener("click",()=>{e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#cancelPasswordBtn").addEventListener("click",()=>{e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#passwordModal").addEventListener("click",t=>{t.target===e.querySelector("#passwordModal")&&e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#passwordForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#passwordError");s.classList.add("hidden");const r=e.querySelector("#passwordForm").dataset.userId,a=e.querySelector("#new_password").value,o=e.querySelector("#confirm_password").value;if(a!==o){s.textContent="Passwords do not match",s.classList.remove("hidden");return}const i=e.querySelector("#submitPasswordBtn");i.disabled=!0,i.textContent="Updating...";try{await J(r,a),e.querySelector("#passwordModal").classList.add("hidden")}catch(n){s.textContent=n.message,s.classList.remove("hidden")}finally{i.disabled=!1,i.textContent="Update Password"}})}async loadUsers(e){try{const t=await D();this.users=t.users,this.renderTable(e,this.users),this.updateStats(e,this.users)}catch(t){console.error("Failed to load users:",t)}}renderTable(e,t){const s=e.querySelector("#usersTableBody"),r=this.app.currentUser.id;if(t.length===0){s.innerHTML=`
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
      `;return}s.innerHTML=t.map((a,o)=>`
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4 text-sm text-gray-500">${o+1}</td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 ${a.role==="admin"?"bg-purple-100":"bg-blue-100"} rounded-full flex items-center justify-center">
              <span class="${a.role==="admin"?"text-purple-700":"text-blue-700"} font-bold text-sm">${a.full_name.charAt(0)}</span>
            </div>
            <span class="text-sm font-medium text-gray-800">${a.full_name}</span>
            ${a.id===r?'<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">You</span>':""}
          </div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-600 font-mono">${a.username}</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${a.role==="admin"?"bg-purple-100 text-purple-700":"bg-blue-100 text-blue-700"}">
            ${a.role==="admin"?"Admin":"User"}
          </span>
        </td>
        <td class="px-6 py-4">
          ${a.campaign?`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${a.campaign}</span>`:'<span class="text-xs text-gray-400 italic">Not assigned</span>'}
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">${a.created_at?new Date(a.created_at).toLocaleDateString():"-"}</td>
        <td class="px-6 py-4 text-sm">
          <div class="flex gap-2">
            <button class="edit-user-btn px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium" data-id="${a.id}">Edit</button>
            <button class="assign-campaign-btn px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium" data-id="${a.id}">Campaign</button>
            <button class="reset-password-btn px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium" data-id="${a.id}">Password</button>
            ${a.id!==r?`
              <button class="delete-user-btn px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium" data-id="${a.id}">Delete</button>
            `:""}
          </div>
        </td>
      </tr>
    `).join(""),s.querySelectorAll(".edit-user-btn").forEach(a=>{a.addEventListener("click",()=>{const o=parseInt(a.dataset.id);this.openEditUserModal(e,o)})}),s.querySelectorAll(".assign-campaign-btn").forEach(a=>{a.addEventListener("click",()=>{const o=parseInt(a.dataset.id);this.openCampaignModal(e,o)})}),s.querySelectorAll(".reset-password-btn").forEach(a=>{a.addEventListener("click",()=>{const o=parseInt(a.dataset.id);this.openResetPasswordModal(e,o)})}),s.querySelectorAll(".delete-user-btn").forEach(a=>{a.addEventListener("click",()=>{const o=parseInt(a.dataset.id);this.confirmDelete(e,o)})})}updateStats(e,t){const s=t.length,r=t.filter(o=>o.role==="admin").length,a=t.filter(o=>o.role==="user").length;e.querySelector("#totalUsers").textContent=s,e.querySelector("#adminCount").textContent=r,e.querySelector("#userCount").textContent=a}openEditUserModal(e,t){const s=this.users.find(r=>r.id===t);s&&(e.querySelector("#editUserId").value=t,e.querySelector("#edit_full_name").value=s.full_name,e.querySelector("#edit_username").value=s.username,e.querySelector("#edit_role").value=s.role,e.querySelector("#edit_campaign").value=s.campaign||"",e.querySelector("#editFormError").classList.add("hidden"),e.querySelector("#editUserModal").classList.remove("hidden"))}openResetPasswordModal(e,t){const s=this.users.find(a=>a.id===t);if(!s)return;const r=e.querySelector("#passwordForm");r.dataset.userId=t,e.querySelector("#password_user_name").value=`${s.full_name} (${s.username})`,e.querySelector("#passwordError").classList.add("hidden"),e.querySelector("#passwordModal").classList.remove("hidden"),e.querySelector("#new_password").focus()}openCampaignModal(e,t){const s=this.users.find(n=>n.id===t);if(!s)return;const r=e.querySelector("#campaignForm");r.dataset.userId=t,e.querySelector("#campaign_user_name").value=`${s.full_name} (${s.username})`;const a=s.campaign||"";let o="",i="";if(a){const n=a.lastIndexOf(" - ");n>0&&(o=a.slice(0,n),i=a.slice(n+3))}if(e.querySelector("#assign_base_campaign").value=o,e.querySelector("#campaignError").classList.add("hidden"),o){const{bucketOptions:n}=j(o);e.querySelector("#assign_bucket").innerHTML=n,e.querySelector("#assign_bucket").disabled=!1,e.querySelector("#assign_bucket").value=i,e.querySelector("#submitCampaignBtn").disabled=!1}else e.querySelector("#assign_bucket").innerHTML='<option value="">Select base first</option>',e.querySelector("#assign_bucket").disabled=!0,e.querySelector("#submitCampaignBtn").disabled=!0;e.querySelector("#campaignModal").classList.remove("hidden")}confirmDelete(e,t){const s=e.querySelector("#deleteUserModal");s.classList.remove("hidden");const r=e.querySelector("#confirmDeleteUser"),a=r.cloneNode(!0);r.parentNode.replaceChild(a,r),a.addEventListener("click",async()=>{try{await G(t),s.classList.add("hidden"),await this.loadUsers(e)}catch(o){alert("Failed to delete user: "+o.message)}})}}class ie{constructor(e,t){this.app=e,this.campaign=t,this.users=[],this.records=[]}render(){const e=this.app.currentUser,t=document.createElement("div");return t.className="min-h-screen bg-gray-50",t.innerHTML=`
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
    `,this.bindEvents(t),this.loadData(t),t}bindEvents(e){e.querySelector("#adminHomeBtn").addEventListener("click",()=>this.app.navigate("/admin")),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await f(),this.app.logout()})}async loadData(e){await Promise.all([this.loadUsers(e),this.loadRecords(e)])}async loadUsers(e){try{const t=await W(this.campaign);this.users=t.users,this.renderUsersTable(e,this.users),e.querySelector("#userCount").textContent=`${this.users.length} user${this.users.length===1?"":"s"}`}catch(t){console.error("Failed to load campaign users:",t),e.querySelector("#campaignUsersTableBody").innerHTML=`
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
      `;return}s.innerHTML=t.map(r=>`
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 ${r.role==="admin"?"bg-purple-100":"bg-blue-100"} rounded-full flex items-center justify-center">
              <span class="${r.role==="admin"?"text-purple-700":"text-blue-700"} font-bold text-sm">${r.full_name.charAt(0)}</span>
            </div>
            <span class="text-sm font-medium text-gray-800">${r.full_name}</span>
          </div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-600 font-mono">${r.username}</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${r.role==="admin"?"bg-purple-100 text-purple-700":"bg-blue-100 text-blue-700"}">
            ${r.role==="admin"?"👑 Admin":"👤 User"}
          </span>
        </td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${r.campaign||"-"}</span>
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">${r.created_at?new Date(r.created_at).toLocaleDateString():"-"}</td>
      </tr>
    `).join("")}async loadRecords(e){try{const[t,s]=await Promise.all([w("ptp"),k()]);this.records=t.records.filter(r=>(r.campaign||"").startsWith(this.campaign)),this.columns=C(s,"ptp"),this.renderRecordsTable(e,this.records),e.querySelector("#recordCount").textContent=`${this.records.length} record${this.records.length===1?"":"s"}`}catch(t){console.error("Failed to load campaign records:",t),e.querySelector("#campaignRecordsTableBody").innerHTML=`
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-red-600">
            <p class="font-medium">Failed to load records</p>
          </td>
        </tr>
      `}}renderRecordsTable(e,t){const s=e.querySelector("#campaignRecordsTableBody"),r=e.querySelector("#campaignRecordsHeadRow");if(r.innerHTML=`
      <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Campaign</th>
      ${this.columns.map(a=>`<th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">${a.name}</th>`).join("")}
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
      `;return}s.innerHTML=t.map(a=>`
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4"><span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${a.campaign||"—"}</span></td>
        ${this.columns.map(o=>`<td class="px-6 py-4">${R(o,(a.values||{})[o.id])}</td>`).join("")}
      </tr>
    `).join("")}}class ne{constructor(e){this.app=e,this.records=[],this.columns=[],this.editingId=null,this.filterCampaign=null,this.searchQuery=""}render(){const t=this.app.currentUser.role==="admin",s=[{label:"Daily Tracker",path:"/dashboard",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>'},{label:"Confirmed Tracker",path:"/confirmed",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'},...t?[{label:"Campaigns & Columns",path:"/campaigns",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>'},{label:"Users & Agents",path:"/admin",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'}]:[]],o=new v(this.app,s).render(`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Confirmed Payments</h2>
            <p class="text-gray-500 mt-1">Monitor confirmed account payments</p>
          </div>
          <button id="addRecordBtn" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl transition-colors shadow-lg shadow-emerald-200">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Confirmed
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Confirmed</p>
                <p id="totalRecords" class="text-2xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Total Amount</p>
                <p id="totalAmount" class="text-2xl font-bold text-gray-800">₱0.00</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Today's Confirmed</p>
                <p id="todayCount" class="text-2xl font-bold text-gray-800">0</p>
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
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="Search confirmed records..." />
          </div>
        </div>

        <!-- Records Table -->
        <div id="allRecordsTable" class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="overflow-x-auto">
            <table class="w-full">
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
              <button type="submit" id="submitBtn" class="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors">Save Record</button>
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
    `);return this.bindEvents(o),this.init(o),o}async init(e){try{const[t,s]=await Promise.all([k(),w("confirmed")]);this.columns=C(t,"confirmed"),this.records=s.records,this.renderCampaignFilters(e),this.renderHeader(e),this.renderTable(e,this.records),this.updateStats(e,this.records),this.initCampaignFilters(e,this.app.currentUser)}catch(t){console.error("Failed to load confirmed data:",t),e.querySelector("#recordsTableBody").innerHTML='<tr><td class="px-6 py-12 text-center text-red-600">Failed to load records. Is the server running?</td></tr>'}}renderCampaignFilters(e){const t=e.querySelector("#campaignFilterButtons");if(!t)return;const s=[...new Set(this.records.map(r=>r.campaign).filter(Boolean))].sort();t.innerHTML=`
      <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="all" style="background: #eef2f6; color: #1e293b;">All Campaigns</button>
      ${s.map(r=>`<button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="${m(r)}" style="background: #eef2f6; color: #1e293b;">${r}</button>`).join("")}
    `}initCampaignFilters(e,t){const s=e.querySelector("#campaignFilterButtons"),r=e.querySelector("#userCampaignBadge"),a=e.querySelector("#userCampaignName");if(t.role!=="admin"&&t.campaign){s.classList.add("hidden"),r.classList.remove("hidden");const o=t.campaign.includes(" - ")?t.campaign.split(" - ")[0]:t.campaign;a.textContent=o,this.applyCampaignFilter(e,o)}else s.classList.remove("hidden"),r.classList.add("hidden")}applyCampaignFilter(e,t){this.filterCampaign=t==="all"?null:t,e.querySelectorAll(".campaign-filter-btn").forEach(r=>{const a=r.dataset.campaign===t;r.style.background=a?"#059669":"#eef2f6",r.style.color=a?"white":"#1e293b"});const s=this.filterCampaign?this.records.filter(r=>(r.campaign||"").startsWith(this.filterCampaign)):this.records;this.renderTable(e,s),this.updateStats(e,s)}renderHeader(e){const t=e.querySelector("#tableHeaderRow");t&&(t.innerHTML=`
      <th class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-12">#</th>
      <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[140px]">Campaign</th>
      ${this.columns.map(s=>`<th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[110px]" title="${m(s.role?`Role: ${s.role}`:s.name)}">${s.name}${s.required?' <span class="text-red-400">*</span>':""}</th>`).join("")}
      <th class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-28">Actions</th>
    `)}cellForRecord(e,t){const s=(e.values||{})[t.id],r=t.role==="agent"||t.role==="date";return`
      <td class="px-4 py-3 ${t.type==="amount"||t.type==="number"?"text-right":"text-left"}">
        ${r?`<span class="text-sm text-gray-800">${s??"—"}</span>`:`<input type="${t.type==="number"||t.type==="amount"?"number":t.type==="date"?"date":"text"}" step="any"
              class="cell-input w-full min-w-[90px] text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:border-emerald-400 focus:outline-none ${t.type==="amount"||t.type==="number"?"text-right":""}"
              data-record-id="${e.id}" data-col-id="${t.id}" value="${m(s??"")}" placeholder="—" />`}
      </td>`}renderTable(e,t){const s=e.querySelector("#recordsTableBody"),r=(this.searchQuery||"").toLowerCase();let a=t;if(r&&(a=t.filter(o=>(o.campaign||"").toLowerCase().includes(r)?!0:this.columns.some(i=>String((o.values||{})[i.id]??"").toLowerCase().includes(r)))),this.columns.length===0){s.innerHTML=`
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No columns defined</p>
          <p class="text-sm text-gray-400 mt-1">An admin must add columns on the Campaigns &amp; Columns page first.</p>
        </td></tr>`;return}if(a.length===0){s.innerHTML=`
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No confirmed records found</p>
          <p class="text-sm text-gray-400 mt-1">Click "Add Confirmed" to create one</p>
        </td></tr>`;return}s.innerHTML=a.map((o,i)=>`
      <tr class="hover:bg-emerald-50/50 transition-colors">
        <td class="px-4 py-3 text-sm text-gray-500 text-center font-medium">${i+1}</td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${o.campaign||"—"}</span>
        </td>
        ${this.columns.map(n=>this.cellForRecord(o,n)).join("")}
        <td class="px-4 py-3">
          <div class="flex gap-1.5 justify-center">
            <button class="edit-btn px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all font-medium text-xs" data-id="${o.id}">Edit</button>
            <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs" data-id="${o.id}">Delete</button>
          </div>
        </td>
      </tr>
    `).join(""),s.querySelectorAll(".cell-input").forEach(o=>{o.addEventListener("change",async()=>{const i=o.dataset.recordId,n=o.dataset.colId;try{await h("confirmed",i,{values:{[n]:o.value}});const d=this.records.find(p=>p.id===Number(i));d&&(d.values=d.values||{},d.values[n]=o.value),this.updateStats(e,this.records)}catch(d){console.error("Failed to save cell:",d),alert(d.message)}})}),s.querySelectorAll(".edit-btn").forEach(o=>o.addEventListener("click",()=>this.editRecord(e,Number(o.dataset.id)))),s.querySelectorAll(".delete-btn").forEach(o=>o.addEventListener("click",()=>this.confirmDelete(e,Number(o.dataset.id))))}updateStats(e,t){const s=x(this.columns,"amount"),r=x(this.columns,"date"),a=new Date().toISOString().split("T")[0];let o=0;s&&(o=t.reduce((n,d)=>n+S(s,(d.values||{})[s.id]),0));let i=0;r&&(i=t.filter(n=>(n.values||{})[r.id]===a).length),e.querySelector("#totalRecords").textContent=t.length,e.querySelector("#totalAmount").textContent="₱"+o.toLocaleString("en-PH",{minimumFractionDigits:2}),e.querySelector("#todayCount").textContent=i}openModal(e,t=null){const s=this.app.currentUser,r=e.querySelector("#dynamicFields"),a=`
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
        <select id="rec_campaign" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors">
          <option value="">Select Campaign</option>
          ${this.campaignList(s).map(i=>`<option value="${m(i)}" ${(t==null?void 0:t.campaign)===i?"selected":""}>${i}</option>`).join("")}
        </select>
      </div>`,o=this.columns.map(i=>{const n=t?(t.values||{})[i.id]??"":"";let d=I(i,m(n),t?"_edit":"");return i.role==="agent"&&!t&&(d=d.replace("<input ",`<input value="${m(s.full_name)}" readonly `),d=d.replace('class="','class="bg-gray-50 ')),d}).join("");r.innerHTML=a+o,e.querySelector("#modalTitle").textContent=t?"Edit Confirmed Record":"Add Confirmed Record",e.querySelector("#submitBtn").textContent=t?"Update Record":"Save Record",e.querySelector("#formError").classList.add("hidden"),e.querySelector("#modal").classList.remove("hidden")}campaignList(e){const t=["Revi Credit","Personal Loan","GCredit","LazPay"],s=["Pre-Charge-Off","Charge-Off"],r=t.flatMap(a=>s.map(o=>`${a} - ${o}`));return e.role==="admin"||!e.campaign?[...t,...r]:[e.campaign]}collectForm(e){var s;const t={};return this.columns.forEach(r=>{t[r.id]=F(e,r)}),{campaign:((s=e.querySelector("#rec_campaign"))==null?void 0:s.value)||"",values:t}}bindEvents(e){e.querySelector("#addRecordBtn").addEventListener("click",()=>this.openModal(e,null)),e.querySelector("#closeModal").addEventListener("click",()=>e.querySelector("#modal").classList.add("hidden")),e.querySelector("#cancelBtn").addEventListener("click",()=>e.querySelector("#modal").classList.add("hidden")),e.querySelector("#modal").addEventListener("click",t=>{t.target===e.querySelector("#modal")&&e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#recordForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#formError");s.classList.add("hidden");const r=this.collectForm(e);if(!r.campaign){s.textContent="Please select a campaign",s.classList.remove("hidden");return}const a=e.querySelector("#submitBtn");a.disabled=!0,a.textContent="Saving...";try{this.editingId?await h("confirmed",this.editingId,r):await H("confirmed",r),e.querySelector("#modal").classList.add("hidden"),this.editingId=null,await this.init(e)}catch(o){s.textContent=o.message,s.classList.remove("hidden")}finally{a.disabled=!1,a.textContent=this.editingId?"Update Record":"Save Record"}}),e.querySelector("#cancelDelete").addEventListener("click",()=>e.querySelector("#deleteModal").classList.add("hidden")),e.querySelector("#deleteModal").addEventListener("click",t=>{t.target===e.querySelector("#deleteModal")&&e.querySelector("#deleteModal").classList.add("hidden")}),e.querySelector("#searchInput").addEventListener("input",t=>{this.searchQuery=t.target.value,this.renderTable(e,this.filteredRecords())}),e.querySelector("#campaignFilterButtons").addEventListener("click",t=>{const s=t.target.closest(".campaign-filter-btn");s&&this.applyCampaignFilter(e,s.dataset.campaign)})}filteredRecords(){return this.filterCampaign?this.records.filter(e=>(e.campaign||"").startsWith(this.filterCampaign)):this.records}editRecord(e,t){const s=this.records.find(r=>r.id===t);s&&(this.editingId=t,this.openModal(e,s))}confirmDelete(e,t){const s=e.querySelector("#deleteModal");s.classList.remove("hidden");const r=e.querySelector("#confirmDelete"),a=r.cloneNode(!0);r.parentNode.replaceChild(a,r),a.addEventListener("click",async()=>{try{await A("confirmed",t),s.classList.add("hidden"),await this.init(e)}catch{alert("Failed to delete record")}})}}const U=[{value:"text",label:"Text"},{value:"number",label:"Number"},{value:"amount",label:"Money"},{value:"date",label:"Date"}],T=[{value:"",label:"No role"},{value:"agent",label:"Agent name (auto-fill)"},{value:"amount",label:"Amount (feeds Total)"},{value:"date",label:'Date (feeds "Today")'}];class de{constructor(e){this.app=e,this.campaigns=[],this.columns=[],this.users=[],this.expandedId=null,this.renamingId=null,this.container=null}render(){const e=[{label:"Daily Tracker",path:"/dashboard",active:!1,icon:this.icon("grid")},{label:"Campaigns & Columns",path:"/campaigns",active:!0,icon:this.icon("tag")},{label:"Users & Agents",path:"/admin",active:!1,icon:this.icon("users")}],t=new v(this.app,e),s=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-2">
          <p class="text-xs font-bold tracking-widest text-indigo-500 uppercase">Admin</p>
          <h2 class="text-3xl font-extrabold text-gray-900">Campaigns &amp; Columns</h2>
          <p class="text-gray-500 mt-1">Define the tracker table columns and manage campaigns, buckets, and agents.</p>
        </div>

        <!-- Table Columns (global) -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mt-6">
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <h3 class="text-lg font-bold text-gray-900">Table Columns</h3>
          </div>
          <p class="text-sm text-gray-400 mb-4">These columns appear in the Daily Tracker and Confirmed Tracker tables. Every field in a record is defined here.</p>

          <div class="space-y-2 mb-4" id="columnList">
            <div class="text-sm text-gray-400">Loading columns…</div>
          </div>

          <div class="flex flex-wrap gap-2 items-center pt-3 border-t border-gray-100">
            <input type="text" placeholder="New column name" class="new-col-input flex-1 min-w-[180px] px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none" />
            <select class="new-col-type text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
              ${U.map(r=>`<option value="${r.value}">${r.label}</option>`).join("")}
            </select>
            <select class="new-col-role text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none" title="Role drives automatic behavior">
              ${T.map(r=>`<option value="${r.value}">${r.label}</option>`).join("")}
            </select>
            <select class="new-col-applies text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
              <option value="both" selected>Both tables</option>
              <option value="ptp">Daily Tracker only</option>
              <option value="confirmed">Confirmed only</option>
            </select>
            <label class="inline-flex items-center gap-1.5 text-sm text-gray-600">
              <input type="checkbox" class="new-col-required accent-indigo-500" /> Required
            </label>
            <button class="add-col-btn h-10 px-5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors">+ Add Column</button>
          </div>
        </div>

        <!-- Campaigns -->
        <div class="flex justify-end items-center gap-2 mb-4 mt-8">
          <input type="text" id="newCampaignName" placeholder="New campaign name"
            class="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors w-64" />
          <button id="addCampaignBtn" class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-200">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            Add
          </button>
        </div>

        <div id="campaignList" class="space-y-4">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">Loading campaigns…</div>
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
    `;return this.container=t.render(s),this.bindEvents(),this.loadData(),this.container}icon(e){return`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${{grid:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>',tag:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>',users:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>'}[e]}</svg>`}confirmAction(e,t,s){return new Promise(r=>{const a=this.container.querySelector("#confirmModal");if(!a)return r(!1);const o=a.querySelector("#confirmTitle"),i=a.querySelector("#confirmMessage"),n=a.querySelector("#confirmOk");o.textContent=e,i.textContent=t,n.textContent=s||"Delete",a.classList.remove("hidden");const d=p=>{a.classList.add("hidden"),n.replaceWith(n.cloneNode(!0)),a.querySelector("#confirmCancel").replaceWith(a.querySelector("#confirmCancel").cloneNode(!0)),r(p)};a.querySelector("#confirmOk").addEventListener("click",()=>d(!0),{once:!0}),a.querySelector("#confirmCancel").addEventListener("click",()=>d(!1),{once:!0}),a.addEventListener("click",p=>{p.target===a&&d(!1)},{once:!0})})}bindEvents(){const e=this.container;e&&(e.querySelector(".add-col-btn").addEventListener("click",async()=>{const t=e.querySelector(".new-col-input"),s=((t==null?void 0:t.value)||"").trim();if(!s){t==null||t.focus(),t==null||t.classList.add("border-red-400"),setTimeout(()=>t==null?void 0:t.classList.remove("border-red-400"),1500);return}try{await O({name:s,type:e.querySelector(".new-col-type").value,role:e.querySelector(".new-col-role").value,applies_to:e.querySelector(".new-col-applies").value,required:e.querySelector(".new-col-required").checked}),t.value="",e.querySelector(".new-col-required").checked=!1,await this.loadData()}catch(r){alert(r.message)}}),e.querySelector(".new-col-input").addEventListener("keydown",t=>{t.key==="Enter"&&e.querySelector(".add-col-btn").click()}),e.querySelector("#columnList").addEventListener("click",async t=>{const s=t.target.closest("button");if(s){if(s.classList.contains("save-col-btn")){const r=s.closest("[data-col-id]");if(!r)return;try{await M(r.dataset.colId,this.readColumnForm(r)),await this.loadData()}catch(a){alert(a.message)}return}if(s.classList.contains("del-col-btn")){const r=s.closest("[data-col-id]");if(!r)return;await this.confirmAction("Delete Column?",`"${r.dataset.colName}" and all values saved under it will be permanently removed.`,"Delete")&&(await V(r.dataset.colId),await this.loadData());return}}}),e.querySelector("#columnList").addEventListener("change",async t=>{const s=t.target;if(!s.classList.contains("col-type-select")&&!s.classList.contains("col-role-select")&&!s.classList.contains("col-applies-select")&&!s.classList.contains("col-required-check"))return;const r=s.closest("[data-col-id]");if(r)try{await M(r.dataset.colId,this.readColumnForm(r)),await this.loadData()}catch(a){alert(a.message),await this.loadData()}}),e.querySelector("#addCampaignBtn").addEventListener("click",async()=>{const t=e.querySelector("#newCampaignName"),s=((t==null?void 0:t.value)||"").trim();if(!s){t==null||t.focus(),t==null||t.classList.add("border-red-400"),setTimeout(()=>t==null?void 0:t.classList.remove("border-red-400"),1500);return}try{await K(s),t.value="",await this.loadData()}catch(r){alert(r.message)}}),e.querySelector("#newCampaignName").addEventListener("keydown",t=>{t.key==="Enter"&&e.querySelector("#addCampaignBtn").click()}),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await f(),this.app.logout()}),e.querySelector("#campaignList").addEventListener("click",async t=>{const s=t.target.closest("button, [data-action]");if(!s){const a=t.target.closest(".expand-toggle");if(a){t.preventDefault();const o=a.closest(".campaign-card");if(o){const i=Number(o.dataset.id);this.expandedId=this.expandedId===i?null:i,this.renderList()}}return}const r=s.closest(".campaign-card");if(s.classList.contains("rename-campaign-btn")&&r){t.stopPropagation(),this.renamingId=Number(r.dataset.id),this.renderList();const a=e.querySelector(".campaign-rename-input");a&&(a.focus(),a.select());return}if(s.classList.contains("delete-campaign-btn")&&r){t.stopPropagation();const a=Number(r.dataset.id);await this.confirmAction("Delete Campaign?","This will delete all buckets and agent assignments for this campaign.","Delete")&&(await X(a),this.expandedId===a&&(this.expandedId=null),await this.loadData());return}if(s.classList.contains("add-bucket-btn")&&r){const a=r.querySelector(".new-bucket-input"),o=((a==null?void 0:a.value)||"").trim();if(!o){a==null||a.focus();return}await Z(Number(r.dataset.id),o),await this.loadData();return}if(s.classList.contains("save-bucket-btn")){const a=s.closest("div").querySelector(".bucket-name-input");a!=null&&a.value.trim()&&(await ee(s.dataset.bucketId,a.value.trim()),await this.loadData());return}if(s.classList.contains("del-bucket-btn")){await this.confirmAction("Delete Bucket?","Users assigned to this bucket will be unassigned.","Delete")&&(await te(s.dataset.bucketId),await this.loadData());return}if(s.classList.contains("assign-bucket-chip")&&r){const a=Number(r.dataset.id),o=Number(s.dataset.userId),i=Number(s.dataset.bucketId),n=this.campaigns.find(c=>c.id===a),p=n.assignments.find(c=>c.user_id===o).bucket_id===i?null:i,g=n.assignments.map(c=>c.user_id===o?{user_id:o,bucket_id:p}:{user_id:c.user_id,bucket_id:c.bucket_id});await E(a,g),await this.loadData();return}if(s.classList.contains("add-agent-btn")&&r){const a=r.querySelector(".add-agent-select");if(a!=null&&a.value){const o=Number(r.dataset.id),n=[...this.campaigns.find(d=>d.id===o).assignments.map(d=>({user_id:d.user_id,bucket_id:d.bucket_id})),{user_id:Number(a.value),bucket_id:null}];await E(o,n),await this.loadData()}return}}),e.querySelector("#campaignList").addEventListener("keydown",async t=>{var r,a;const s=t.target;if(s.classList.contains("campaign-rename-input")&&(t.key==="Enter"||t.key==="Escape")){if(t.preventDefault(),t.key==="Escape"){this.renamingId=null,this.renderList();return}const o=Number(s.dataset.campaignId),i=s.value.trim();this.renamingId=null,i&&i!==((r=this.campaigns.find(n=>n.id===o))==null?void 0:r.name)?(await $(o,i),await this.loadData()):this.renderList()}if(s.classList.contains("new-bucket-input")&&t.key==="Enter"){t.preventDefault();const o=s.closest(".campaign-card");o&&((a=o.querySelector(".add-bucket-btn"))==null||a.click())}}),e.querySelector("#campaignList").addEventListener("focusout",async t=>{if(!t.target.classList.contains("campaign-rename-input"))return;const s=t.target;setTimeout(async()=>{var o;if(this.renamingId!==Number(s.dataset.campaignId))return;const r=Number(s.dataset.campaignId),a=s.value.trim();this.renamingId=null,a&&a!==((o=this.campaigns.find(i=>i.id===r))==null?void 0:o.name)?(await $(r,a),await this.loadData()):this.renderList()},150)}))}readColumnForm(e){return{name:e.querySelector(".col-name-input").value.trim(),type:e.querySelector(".col-type-select").value,role:e.querySelector(".col-role-select").value,applies_to:e.querySelector(".col-applies-select").value,required:e.querySelector(".col-required-check").checked}}async loadData(){try{const[e,t,s]=await Promise.all([Y(),D(),_()]);this.campaigns=e.campaigns||[],this.users=t.users||[],this.columns=s.columns||[],this.renderColumns(),this.renderList()}catch(e){console.error("Failed to load campaign config:",e),this.container.querySelector("#campaignList").innerHTML='<div class="bg-white rounded-xl shadow-sm border border-red-200 p-12 text-center text-red-600">Failed to load data</div>'}}renderColumns(){re();const e=this.container.querySelector("#columnList");if(e){if(this.columns.length===0){e.innerHTML='<div class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">No columns yet. The tracker tables will be empty until you add columns above.</div>';return}e.innerHTML=this.columns.map((t,s)=>`
      <div class="border border-gray-200 rounded-xl px-3 py-2.5 flex flex-wrap items-center gap-2" data-col-id="${t.id}" data-col-name="${t.name}">
        <span class="w-6 h-6 rounded-md bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">${s+1}</span>
        <input class="col-name-input flex-1 min-w-[140px] text-sm font-semibold text-gray-800 bg-transparent focus:outline-none" value="${t.name}" />
        <span class="flex gap-1.5 items-center">
          ${t.role?`<span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-600" title="Role: ${t.role}">⚙ ${t.role}</span>`:""}
          ${t.required?'<span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-red-100 text-red-600">required</span>':""}
        </span>
        <select class="col-type-select text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-500 focus:outline-none">
          ${U.map(r=>`<option value="${r.value}" ${t.type===r.value?"selected":""}>${r.label}</option>`).join("")}
        </select>
        <select class="col-role-select text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-500 focus:outline-none" title="Role">
          ${T.map(r=>`<option value="${r.value}" ${t.role===r.value?"selected":""}>${r.label}</option>`).join("")}
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
      </div>`).join("")}}renderList(){const t=this.container.querySelector("#campaignList");if(this.campaigns.length===0){t.innerHTML='<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">No campaigns yet. Add one above.</div>';return}t.innerHTML=this.campaigns.map((s,r)=>{const a=this.expandedId===s.id,o=this.renamingId===s.id;return`
      <div class="campaign-card bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden" data-id="${s.id}">
        <div class="expand-toggle flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center flex-shrink-0">${r+1}</div>
            <div class="flex-1 min-w-0">
              ${o?`<input type="text" class="campaign-rename-input w-full text-lg font-bold text-gray-900 bg-gray-50 border-2 border-indigo-300 rounded-lg px-2 py-0.5 focus:outline-none focus:border-indigo-500" value="${s.name}" data-campaign-id="${s.id}" />`:`<h3 class="text-lg font-bold text-gray-900">${s.name}</h3>`}
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
            <svg class="w-5 h-5 text-gray-400 transition-transform ${a?"rotate-90":""}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>

        ${a?`
        <div class="border-t border-gray-100 p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <!-- Buckets -->
          <div class="bg-white rounded-xl border border-gray-200 p-4">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 112 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 112 0z"/></svg>
              <h4 class="font-bold text-gray-800">Buckets</h4>
            </div>
            <div class="space-y-2 mb-3">
              ${s.buckets.map((i,n)=>`
              <div class="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <span class="w-6 h-6 rounded-md bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">${n+1}</span>
                <input class="bucket-name-input flex-1 text-sm font-semibold text-gray-800 bg-transparent focus:outline-none" data-bucket-id="${i.id}" value="${i.name}" />
                <button class="save-bucket-btn text-gray-300 hover:text-green-600 transition-colors" data-bucket-id="${i.id}" title="Save">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </button>
                <button class="del-bucket-btn text-gray-300 hover:text-red-500 transition-colors" data-bucket-id="${i.id}" title="Delete">
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
              ${s.assignments.length===0?'<p class="text-sm text-gray-400 italic">No agents assigned yet.</p>':s.assignments.map(i=>`
              <div class="border border-gray-200 rounded-xl px-3 py-2.5">
                <p class="text-sm font-bold text-gray-800 mb-2">${i.full_name}</p>
                <div class="flex flex-wrap gap-1.5">
                  ${s.buckets.map(n=>`
                  <button class="assign-bucket-chip px-3 py-1 rounded-full text-xs font-semibold border-2 transition-all
                    ${i.bucket_id===n.id?"bg-indigo-600 border-indigo-600 text-white":"bg-white border-gray-200 text-gray-500 hover:border-indigo-300"}"
                    data-user-id="${i.user_id}" data-bucket-id="${n.id}">
                    ${n.name}
                  </button>`).join("")}
                </div>
              </div>`).join("")}
            </div>
            <div class="mt-3 pt-3 border-t border-gray-100">
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Add agent</label>
              <div class="flex gap-2">
                <select class="add-agent-select flex-1 text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
                  <option value="">Select user…</option>
                  ${this.users.filter(i=>!s.assignments.some(n=>n.user_id===i.id)).map(i=>`<option value="${i.id}">${i.full_name}</option>`).join("")}
                </select>
                <button class="add-agent-btn w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors flex-shrink-0">+</button>
              </div>
            </div>
          </div>
        </div>`:""}
      </div>`}).join("")}}class ce{constructor(){this.currentUser=null,this.routes={"/":()=>this.renderLogin(),"/login":()=>this.renderLogin(),"/dashboard":()=>this.renderDashboard(),"/admin":()=>this.renderAdmin(),"/campaigns":()=>this.renderCampaigns(),"/confirmed":()=>this.renderConfirmed(),"/campaign/:campaign":()=>this.renderCampaign()},this.init()}async init(){try{const e=await fetch("/api/auth/me",{credentials:"include"});if(e.ok){const t=await e.json();this.currentUser=t.user,this.navigate("/dashboard")}else this.currentUser=null,this.navigate("/login")}catch(e){console.warn("Auth check failed, redirecting to login:",e.message),this.currentUser=null,this.navigate("/login")}window.addEventListener("popstate",()=>this.route())}navigate(e){window.history.pushState({},"",e),this.route()}route(){const e=window.location.pathname;if(this.routes[e]){this.routes[e]();return}for(const[t,s]of Object.entries(this.routes))if(t.startsWith("/campaign/")){const r="/campaign/";if(e.startsWith(r)&&e.length>r.length){s();return}}this.navigate("/login")}renderLogin(){const e=document.getElementById("app");e.innerHTML="";const t=new se(this);e.appendChild(t.render())}renderDashboard(){if(!this.currentUser){this.navigate("/login");return}const e=document.getElementById("app");e.innerHTML="";const t=new ae(this);e.appendChild(t.render())}renderAdmin(){if(!this.currentUser||this.currentUser.role!=="admin"){this.navigate("/dashboard");return}const e=document.getElementById("app");e.innerHTML="";const t=new le(this);e.appendChild(t.render())}renderCampaigns(){if(!this.currentUser||this.currentUser.role!=="admin"){this.navigate("/dashboard");return}const e=document.getElementById("app");e.innerHTML="";const t=new de(this);e.appendChild(t.render())}renderCampaign(){if(!this.currentUser||this.currentUser.role!=="admin"){this.navigate("/dashboard");return}const e=window.location.pathname.split("/").slice(-1)[0],t=document.getElementById("app");t.innerHTML="";const s=new ie(this,decodeURIComponent(e));t.appendChild(s.render())}renderConfirmed(){if(console.log("renderConfirmed called"),!this.currentUser){console.log("No currentUser, redirecting to login"),this.navigate("/login");return}const e=document.getElementById("app");console.log("Clearing app innerHTML"),e.innerHTML="";const t=new ne(this);console.log("Appending ConfirmedTrackerPage"),e.appendChild(t.render()),console.log("ConfirmedTrackerPage rendered")}setUser(e){this.currentUser=e}logout(){this.currentUser=null,this.navigate("/login")}}new ce;
