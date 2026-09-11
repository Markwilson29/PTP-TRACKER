(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const A="/api";async function b(n,e={}){const t={credentials:"include",headers:{"Content-Type":"application/json"},...e};t.body&&typeof t.body=="object"&&(t.body=JSON.stringify(t.body));let s;try{s=await fetch(`${A}${n}`,t)}catch{throw new Error("Cannot connect to server. Please ensure the server is running.")}let a;const r=await s.text();if(r)try{a=JSON.parse(r)}catch{throw new Error("Unexpected server response")}else a={};if(!s.ok)throw new Error(a.error||`Request failed (${s.status})`);return a}const H=(n,e)=>b("/auth/login",{method:"POST",body:{username:n,password:e}}),L=()=>b("/auth/logout",{method:"POST"}),D=()=>b("/records"),z=n=>b("/records",{method:"POST",body:n}),F=(n,e)=>b(`/records/${n}`,{method:"PUT",body:e}),I=n=>b(`/records/${n}`,{method:"DELETE"}),N=()=>b("/users"),O=n=>b(`/campaign/${encodeURIComponent(n)}/users`),V=n=>b("/users",{method:"POST",body:n}),G=n=>b(`/users/${n}`,{method:"DELETE"}),$=(n,e)=>b(`/users/${n}/campaign`,{method:"PUT",body:{campaign:e}}),K=(n,e)=>b(`/users/${n}/password`,{method:"PUT",body:{password:e}}),P=n=>b(`/campaign/${encodeURIComponent(n)}/records`),J=()=>b("/confirmed"),W=n=>b("/confirmed",{method:"POST",body:n}),Y=(n,e)=>b(`/confirmed/${n}`,{method:"PUT",body:e}),Q=n=>b(`/confirmed/${n}`,{method:"DELETE"}),X=n=>b(`/campaign/${encodeURIComponent(n)}/confirmed`);class Z{constructor(e){this.app=e}render(){const e=document.createElement("div");e.className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4",e.innerHTML=`
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
    `;const t=e.querySelector("#loginForm"),s=e.querySelector("#errorMessage"),a=e.querySelector("#loginBtn");return t.addEventListener("submit",async r=>{r.preventDefault();const o=e.querySelector("#username").value.trim(),d=e.querySelector("#password").value;if(!o||!d){s.textContent="Please fill in all fields",s.classList.remove("hidden");return}a.disabled=!0,a.textContent="Signing in...",s.classList.add("hidden");try{const i=await H(o,d);this.app.setUser(i.user),i.user.role==="admin"?this.app.navigate("/admin"):this.app.navigate("/dashboard")}catch(i){s.textContent=i.message,s.classList.remove("hidden"),a.disabled=!1,a.textContent="Sign In"}}),e}}const ee=["Personal Loan","Personal Loan - Pre-Charge-Off","Personal Loan - Charge-Off","Revi Credit","Revi Credit - Pre-Charge-Off","Revi Credit - Charge-Off","LazPay","LazPay - Pre-Charge-Off","LazPay - Charge-Off","GCredit","GCredit - Pre-Charge-Off","GCredit - Charge-Off"],T=["Personal Loan","Revi Credit","LazPay","GCredit"];function R(n=""){return ee.map(e=>`<option value="${e}"${e===n?" selected":""}>${e}</option>`).join(`
`)}function C(n=""){return T.map(e=>`<option value="${e}"${e===n?" selected":""}>${e}</option>`).join(`
`)}function U(n=""){const e=['<option value="">No Campaign</option>',...T.map(s=>`<option value="${s}"${s===n?" selected":""}>${s}</option>`)].join(`
`),t=n?`<option value="${n} - Pre-Charge-Off">Pre-Charge-Off</option>
<option value="${n} - Charge-Off">Charge-Off</option>`:'<option value="">Select a base campaign first</option>';return{baseOptions:e,bucketOptions:t}}function te(n,e){return!n||!e?"":e.includes("Pre-Charge-Off")?`${n} - Pre-Charge-Off`:e.includes("Charge-Off")?`${n} - Charge-Off`:""}class q{constructor(e,t){this.app=e,this.sidebarItems=t}render(e){var a,r,o,d,i,x;const t=document.createElement("div");t.className="min-h-screen bg-gray-50 flex relative";const s=localStorage.getItem("sidebarClosed")==="true";return t.innerHTML=`
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
            <div class="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex-shrink-0 shadow-lg shadow-blue-500/30">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">CIMB Account</h2>
              <p class="text-xs text-slate-400">Monitoring</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4">
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">Navigation</p>
          <ul class="space-y-1">
            ${this.sidebarItems.map(g=>`
              <li class="sidebar-item" data-path="${g.path}">
                <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 justify-between
                  ${g.active?"bg-blue-600 text-white shadow-lg shadow-blue-600/30":"text-slate-300 hover:bg-slate-700/50 hover:text-white"}">
                  <span class="flex items-center gap-3 flex-1">
                    ${g.icon?`<span class="w-5 h-5 flex items-center justify-center">${g.icon}</span>`:""}
                    <span>${g.label}</span>
                  </span>
                  ${g.active?'<svg class="w-4 h-4 text-white/80 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>':'<span class="w-4 h-4 flex-shrink-0"></span>'}
                </button>
              </li>
            `).join("")}
          </ul>
        </nav>

        <!-- User Profile & Logout -->
        <div class="p-4 border-t border-slate-700">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span class="text-white font-bold text-sm">${((r=(a=this.app.currentUser)==null?void 0:a.full_name)==null?void 0:r.charAt(0))||"?"}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">${((o=this.app.currentUser)==null?void 0:o.full_name)||""}</p>
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
                <h1 class="text-xl font-bold text-gray-800">${((i=this.sidebarItems.find(g=>g.active))==null?void 0:i.label)||""}</h1>
              </div>
              <div class="flex items-center gap-3">
                ${(x=this.app.currentUser)!=null&&x.campaign?`
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
    `,this.bindEvents(t),t}bindEvents(e){e.querySelector("#sidebarToggle").addEventListener("click",()=>{const t=e.querySelector("#sidebar"),s=e.querySelector("#sidebarToggle"),a=e.querySelector("#toggleIcon");t.classList.contains("w-0")?(t.classList.remove("w-0","overflow-hidden","opacity-0"),t.classList.add("w-64","opacity-100"),s.classList.remove("left-3"),s.classList.add("left-[260px]"),a.classList.remove("rotate-180"),localStorage.setItem("sidebarClosed","false")):(t.classList.remove("w-64","opacity-100"),t.classList.add("w-0","overflow-hidden","opacity-0"),s.classList.remove("left-[260px]"),s.classList.add("left-3"),a.classList.add("rotate-180"),localStorage.setItem("sidebarClosed","true"))}),e.querySelectorAll(".sidebar-item button").forEach(t=>{t.addEventListener("click",()=>{const s=t.closest(".sidebar-item").dataset.path;this.app.navigate(s)})}),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await L(),this.app.logout()})}}class se{constructor(e){this.app=e,this.records=[],this.editingId=null}render(){const t=this.app.currentUser.role==="admin",s=[{label:"PTP Backlog",path:"/dashboard",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>'},{label:"Confirmed Tracker",path:"/confirmed",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'},...t?[{label:"Admin Panel",path:"/admin",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'}]:[]],a=new q(this.app,s),r=`
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
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
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
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
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
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Today's PTPs</p>
                <p id="todayCount" class="text-2xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign Filter Buttons (Admin only) -->
        <div class="flex flex-wrap gap-2 mb-6 hidden" id="campaignFilterButtons">
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-campaign="all" style="background: #eef2f6; color: #1e293b;">
            All Campaigns
          </button>
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-campaign="Revi Credit" style="background: #eef2f6; color: #1e293b;">
            Revi Credit
          </button>
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-campaign="Personal Loan" style="background: #eef2f6; color: #1e293b;">
            Personal Loan
          </button>
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-campaign="GCredit" style="background: #eef2f6; color: #1e293b;">
            GCredit
          </button>
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  data-campaign="LazPay" style="background: #eef2f6; color: #1e293b;">
            LazPay
          </button>
        </div>

        <!-- User Campaign Badge (Non-admin only) -->
        <div class="hidden mb-6" id="userCampaignBadge">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-blue-700 font-semibold" id="userCampaignName"></span>
          </div>
        </div>

        <!-- Campaign Stats -->
        <div id="campaignStats" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <!-- Campaign stats will be rendered here -->
        </div>

        <!-- Search Bar -->
        <div class="mb-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              id="searchInput"
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Search records..."
            />
          </div>
        </div>

        <!-- Campaign Sections -->
        <div id="campaignSections" class="space-y-4">
          <!-- Campaign sections will be rendered here -->
        </div>

        <!-- Single Table (fallback) -->
        <div id="allRecordsTable" class="hidden bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px]">
              <thead>
                <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-12">#</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[110px]">Contact Date</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[140px]">Agent Name</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[150px]">Campaign</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[100px]">Loan Number</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[100px]">PTP Date</th>
                  <th class="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[120px]">PTP Amount</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[180px]">Remarks</th>
                  <th class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-28">Actions</th>
                </tr>
              </thead>
              <tbody id="recordsTableBody" class="divide-y divide-gray-100">
                <tr>
                  <td colspan="9" class="px-6 py-12 text-center text-gray-500">
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

      <!-- Modal -->
      <div id="modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h3 id="modalTitle" class="text-lg font-bold text-gray-800">Add New Record</h3>
            <button id="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <form id="recordForm" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Agent Name *</label>
              <input type="text" id="agent_name" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50" readonly/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
              <select id="campaign" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
                <option value="">Select Campaign</option>
                ${R()}
              </select>
              <p class="text-xs text-gray-400 mt-1">Campaign assigned by admin is auto-selected</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Contact Date *</label>
                <input type="date" id="contact_date" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"/>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">PTP Date *</label>
                <input type="date" id="ptp_date" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"/>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Loan Number *</label>
              <input type="text" id="loan_number" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" placeholder="Enter loan number"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">PTP Amount (₱) *</label>
              <input type="number" id="ptp_amount" required step="0.01" min="0" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" placeholder="0.00"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
              <textarea id="remarks" rows="3" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none" placeholder="Enter remarks (optional)"></textarea>
            </div>
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
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
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
    `,o=a.render(r);return this.bindEvents(o),this.loadRecords(o),o}bindEvents(e){this.app.currentUser,e.querySelector("#addRecordBtn").addEventListener("click",()=>{this.editingId=null,e.querySelector("#modalTitle").textContent="Add New Record",e.querySelector("#submitBtn").textContent="Save Record",this.clearForm(e);const t=this.app.currentUser;e.querySelector("#agent_name").value=t.full_name,t.campaign?(e.querySelector("#campaign").value=t.campaign,e.querySelector("#campaign").disabled=!0,e.querySelector("#campaign").classList.add("bg-gray-50","text-gray-500","cursor-not-allowed")):(e.querySelector("#campaign").disabled=!1,e.querySelector("#campaign").classList.remove("bg-gray-50","text-gray-500","cursor-not-allowed")),e.querySelector("#modal").classList.remove("hidden")}),e.querySelector("#closeModal").addEventListener("click",()=>{e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#cancelBtn").addEventListener("click",()=>{e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#modal").addEventListener("click",t=>{t.target===e.querySelector("#modal")&&e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#recordForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#formError");s.classList.add("hidden");const a={contact_date:e.querySelector("#contact_date").value,agent_name:e.querySelector("#agent_name").value.trim(),campaign:e.querySelector("#campaign").value,loan_number:e.querySelector("#loan_number").value.trim(),ptp_date:e.querySelector("#ptp_date").value,ptp_amount:parseFloat(e.querySelector("#ptp_amount").value),remarks:e.querySelector("#remarks").value.trim()},r=e.querySelector("#submitBtn");r.disabled=!0,r.textContent="Saving...";try{this.editingId?await F(this.editingId,a):await z(a),e.querySelector("#modal").classList.add("hidden"),await this.loadRecords(e)}catch(o){s.textContent=o.message,s.classList.remove("hidden")}finally{r.disabled=!1,r.textContent=this.editingId?"Update Record":"Save Record"}}),e.querySelector("#cancelDelete").addEventListener("click",()=>{e.querySelector("#deleteModal").classList.add("hidden")}),e.querySelector("#deleteModal").addEventListener("click",t=>{t.target===e.querySelector("#deleteModal")&&e.querySelector("#deleteModal").classList.add("hidden")}),e.querySelector("#searchInput").addEventListener("input",t=>{this.filterRecords(e,t.target.value)}),e.querySelectorAll(".campaign-filter-btn").forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.campaign,a=this.app.currentUser;if(a.role!=="admin"&&a.campaign){if(s!=="all"&&s!==a.campaign){const r=Array.from(e.querySelectorAll(".campaign-filter-btn")).find(o=>o.dataset.campaign===a.campaign);r&&r.click();return}s==="all"&&(s=a.campaign)}e.querySelectorAll(".campaign-filter-btn").forEach(r=>{r.style.background="#eef2f6",r.style.color="#1e293b",a.role!=="admin"&&r.dataset.campaign!=="all"&&r.dataset.campaign!==a.campaign?(r.style.opacity="0.5",r.style.pointerEvents="none"):(r.style.opacity="1",r.style.pointerEvents="auto")}),s==="all"?(t.style.background="#eef2f6",t.style.color="#1e293b"):(t.style.background="#5c52ff",t.style.color="white"),this.filterRecords(e,s==="all"?a.campaign||"":s)})})}clearForm(e){e.querySelector("#contact_date").value="",e.querySelector("#agent_name").value=this.app.currentUser.full_name,e.querySelector("#campaign").value=this.app.currentUser.campaign||"",e.querySelector("#loan_number").value="",e.querySelector("#ptp_date").value="",e.querySelector("#ptp_amount").value="",e.querySelector("#remarks").value="",e.querySelector("#formError").classList.add("hidden")}async loadRecords(e){try{let t;const s=this.app.currentUser;s.role!=="admin"&&s.campaign?t=await P(s.campaign):t=await D(),this.records=t.records,this.renderCampaignStats(e,this.records),this.renderTable(e,this.records),this.updateStats(e,this.records),this.initCampaignFilters(e,s)}catch(t){console.error("Failed to load records:",t)}}initCampaignFilters(e,t){const s=e.querySelector("#campaignFilterButtons"),a=e.querySelector("#userCampaignBadge"),r=e.querySelector("#userCampaignName");if(t.role!=="admin"&&t.campaign){s.classList.add("hidden"),a.classList.remove("hidden");const o=t.campaign.includes(" - ")?t.campaign.split(" - ")[0]:t.campaign;r.textContent=o,this.filterRecords(e,o)}else t.role==="admin"&&(s.classList.remove("hidden"),a.classList.add("hidden"))}renderCampaignStats(e,t){const s=e.querySelector("#campaignStats");if(!s)return;const a={};t.forEach(o=>{const d=o.campaign||"Unassigned";a[d]||(a[d]={count:0,amount:0}),a[d].count++,a[d].amount+=parseFloat(o.ptp_amount||0)});const r=Object.keys(a).sort();if(r.length===0){s.innerHTML="";return}s.innerHTML=r.map(o=>{const d=a[o],i=["blue","green","purple","indigo","pink","amber"],x=r.indexOf(o)%i.length,g=i[x];return`
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow campaign-stat-card"
             data-campaign="${o}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-${g}-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-${g}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-gray-500 truncate">${o}</p>
              <p class="text-lg font-bold text-gray-800">${d.count}</p>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2">₱${d.amount.toLocaleString("en-PH",{minimumFractionDigits:2})}</p>
        </div>
      `}).join(""),s.querySelectorAll(".campaign-stat-card").forEach(o=>{o.addEventListener("click",()=>{const d=o.dataset.campaign;this.filterRecords(e,d)})})}renderTable(e,t,s=null){const a=e.querySelector("#campaignSections"),r=e.querySelector("#allRecordsTable"),o=e.querySelector("#recordsTableBody"),d={};t.forEach(l=>{const u=l.campaign||"Unassigned";d[u]||(d[u]=[]),d[u].push(l)}),a.innerHTML="";const i=Object.keys(d).filter(l=>d[l].length>0),x=i.length>1&&!s;x?(r.classList.add("hidden"),a.classList.remove("hidden")):(r.classList.remove("hidden"),a.classList.add("hidden"));const g=s?d[s]||[]:t;if(g.length===0&&!s){x||(o.innerHTML=`
          <tr>
            <td colspan="9" class="px-6 py-12 text-center text-gray-500">
              <div class="flex flex-col items-center">
                <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <p class="font-medium">No records found</p>
                <p class="text-sm text-gray-400 mt-1">Click "Add Record" to create one</p>
              </div>
            </td>
          </tr>
        `);return}x?i.forEach((l,u)=>{const f=d[l],w=f.reduce((c,v)=>c+(parseFloat(v.ptp_amount)||0),0),k=new Date().toISOString().split("T")[0],S=f.filter(c=>c.ptp_date===k).length,m=document.createElement("div");m.className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden campaign-section",m.dataset.campaign=l,m.innerHTML=`
          <div class="bg-gradient-to-r from-${j(l)}-500 to-${j(l)}-600 px-6 py-4 flex justify-between items-center cursor-pointer hover:opacity-90 transition-opacity">
            <div class="flex items-center gap-4">
              <button class="collapse-btn p-1 hover:bg-white/20 rounded transition-colors collapse-btn-closed">
                <svg class="w-5 h-5 text-white collapse-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div>
                <h3 class="text-lg font-bold text-white">${l}</h3>
                <p class="text-sm text-white/80">${f.length} records · ₱${w.toLocaleString("en-PH",{minimumFractionDigits:2})}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-white/60">${S} today</span>
              <button class="view-all-campaign-btn text-xs bg-white/20 text-white px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors font-medium">View All</button>
            </div>
          </div>
          <div class="campaign-records-body px-4 pb-4">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[800px]">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-10">#</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Contact Date</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Agent Name</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Loan Number</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">PTP Date</th>
                    <th class="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">PTP Amount</th>
                    <th class="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Remarks</th>
                    <th class="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  ${f.map((c,v)=>{var M,_,E,B;return`
                    <tr class="hover:bg-blue-50/50 transition-colors border-b border-gray-50 last:border-0">
                      <td class="px-4 py-3 text-sm text-gray-500 text-center font-medium">${v+1}</td>
                      <td class="px-4 py-3">
                        <span class="text-sm text-gray-800 font-medium bg-gray-100 px-2 py-1 rounded-md">${c.contact_date||"-"}</span>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-2">
                          <div class="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white text-xs font-bold">${((M=c.agent_name)==null?void 0:M.charAt(0))||"?"}</span>
                          </div>
                          <span class="text-sm text-gray-800 font-medium">${c.agent_name}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <span class="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded-md">${c.loan_number}</span>
                      </td>
                      <td class="px-4 py-3">
                        ${(_=c.campaign)!=null&&_.includes("Pre-Charge-Off")?'<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Pre</span>':""}
                        ${(E=c.campaign)!=null&&E.includes("Charge-Off")&&!((B=c.campaign)!=null&&B.includes("Pre-Charge-Off"))?'<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Charge</span>':""}
                      </td>
                      <td class="px-4 py-3">
                        <span class="text-sm text-gray-800 font-medium bg-amber-50 px-2 py-1 rounded-md">${c.ptp_date||"-"}</span>
                      </td>
                      <td class="px-4 py-3 text-right">
                        <span class="text-sm font-bold text-green-600">₱${parseFloat(c.ptp_amount).toLocaleString("en-PH",{minimumFractionDigits:2})}</span>
                      </td>
                      <td class="px-4 py-3">
                        <p class="text-sm text-gray-600 max-w-[180px] break-words leading-relaxed">${c.remarks||"-"}</p>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex gap-1.5 justify-center">
                          <button class="edit-btn px-2 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium text-xs flex items-center gap-1" data-id="${c.id}">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                            Edit
                          </button>
                          <button class="delete-btn px-2 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs flex items-center gap-1" data-id="${c.id}">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `,a.appendChild(m);const h=m.querySelector(".collapse-btn"),y=m.querySelector(".campaign-records-body");u>=3&&(y.style.display="none",h.classList.add("collapse-btn-closed")),h.addEventListener("click",c=>{c.stopPropagation();const v=y.style.display==="none";y.style.display=v?"":"none",h.querySelector(".collapse-icon").style.transform=v?"rotate(0deg)":"rotate(-90deg)",h.classList.toggle("collapse-btn-closed",!v)}),m.querySelector(".view-all-campaign-btn").addEventListener("click",c=>{c.stopPropagation(),this.filterRecords(e,l)}),m.querySelectorAll(".edit-btn").forEach(c=>{c.addEventListener("click",()=>{const v=parseInt(c.dataset.id);this.editRecord(e,v)})}),m.querySelectorAll(".delete-btn").forEach(c=>{c.addEventListener("click",()=>{const v=parseInt(c.dataset.id);this.confirmDelete(e,v)})})}):(g.length===0&&s?o.innerHTML=`
          <tr>
            <td colspan="9" class="px-6 py-12 text-center text-gray-500">
              <p class="font-medium">No records for ${s}</p>
            </td>
          </tr>
        `:o.innerHTML=g.map((l,u)=>{var f,w,k,S,m,h,y,p;return`
          <tr class="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0">
            <td class="px-4 py-3 text-sm text-gray-500 text-center font-medium">${u+1}</td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-medium bg-gray-100 px-2 py-1 rounded-md">${l.contact_date||"-"}</span>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-xs font-bold">${((f=l.agent_name)==null?void 0:f.charAt(0))||"?"}</span>
                </div>
                <span class="text-sm text-gray-800 font-medium">${l.agent_name}</span>
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="flex flex-col gap-1">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${(w=l.campaign)!=null&&w.includes("Personal Loan")?"bg-blue-100 text-blue-700":(k=l.campaign)!=null&&k.includes("Revi Credit")?"bg-green-100 text-green-700":(S=l.campaign)!=null&&S.includes("GCredit")?"bg-indigo-100 text-indigo-700":"bg-purple-100 text-purple-700"}">
                  ${((m=l.campaign)==null?void 0:m.split(" - ")[0])||"-"}
                </span>
                ${(h=l.campaign)!=null&&h.includes("Pre-Charge-Off")?'<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Pre-Charge-Off</span>':""}
                ${(y=l.campaign)!=null&&y.includes("Charge-Off")&&!((p=l.campaign)!=null&&p.includes("Pre-Charge-Off"))?'<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Charge-Off</span>':""}
              </div>
            </td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded-md">${l.loan_number}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-medium bg-amber-50 px-2 py-1 rounded-md">${l.ptp_date||"-"}</span>
            </td>
            <td class="px-4 py-3 text-right">
              <span class="text-sm font-bold text-green-600">₱${parseFloat(l.ptp_amount).toLocaleString("en-PH",{minimumFractionDigits:2})}</span>
            </td>
            <td class="px-4 py-3">
              <p class="text-sm text-gray-600 max-w-[200px] break-words leading-relaxed">${l.remarks||"-"}</p>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-1.5 justify-center">
                <button class="edit-btn px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all font-medium text-xs flex items-center gap-1" data-id="${l.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  Edit
                </button>
                <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all font-medium text-xs flex items-center gap-1" data-id="${l.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        `}).join(""),o.querySelectorAll(".edit-btn").forEach(l=>{l.addEventListener("click",()=>{const u=parseInt(l.dataset.id);this.editRecord(e,u)})}),o.querySelectorAll(".delete-btn").forEach(l=>{l.addEventListener("click",()=>{const u=parseInt(l.dataset.id);this.confirmDelete(e,u)})}))}updateStats(e,t){const s=t.length,a=t.reduce((d,i)=>d+(parseFloat(i.ptp_amount)||0),0),r=new Date().toISOString().split("T")[0],o=t.filter(d=>d.ptp_date===r).length;e.querySelector("#totalRecords").textContent=s,e.querySelector("#totalAmount").textContent="₱"+a.toLocaleString("en-PH",{minimumFractionDigits:2}),e.querySelector("#todayCount").textContent=o}editRecord(e,t){const s=this.records.find(r=>r.id===t);if(!s)return;this.editingId=t,e.querySelector("#modalTitle").textContent="Edit Record",e.querySelector("#submitBtn").textContent="Update Record",this.app.currentUser.role!=="admin"?(e.querySelector("#campaign").disabled=!0,e.querySelector("#campaign").classList.add("bg-gray-50","text-gray-500","cursor-not-allowed")):(e.querySelector("#campaign").disabled=!1,e.querySelector("#campaign").classList.remove("bg-gray-50","text-gray-500","cursor-not-allowed")),e.querySelector("#contact_date").value=s.contact_date||"",e.querySelector("#agent_name").value=s.agent_name,e.querySelector("#campaign").value=s.campaign||"",e.querySelector("#loan_number").value=s.loan_number,e.querySelector("#ptp_date").value=s.ptp_date||"",e.querySelector("#ptp_amount").value=s.ptp_amount,e.querySelector("#remarks").value=s.remarks||"",e.querySelector("#formError").classList.add("hidden"),e.querySelector("#modal").classList.remove("hidden")}confirmDelete(e,t){const s=e.querySelector("#deleteModal");s.classList.remove("hidden");const a=e.querySelector("#confirmDelete"),r=a.cloneNode(!0);a.parentNode.replaceChild(r,a),r.addEventListener("click",async()=>{try{await I(t),s.classList.add("hidden"),await this.loadRecords(e)}catch{alert("Failed to delete record")}})}filterRecords(e,t){if(!t){this.renderTable(e,this.records);return}if(this.records.find(r=>r.campaign&&r.campaign.toLowerCase()===t.toLowerCase())){this.records.filter(r=>r.campaign&&r.campaign.toLowerCase()===t.toLowerCase()),this.renderTable(e,this.records,t);return}const a=this.records.filter(r=>r.agent_name.toLowerCase().includes(t.toLowerCase())||r.campaign&&r.campaign.toLowerCase().includes(t.toLowerCase())||r.loan_number.toLowerCase().includes(t.toLowerCase())||r.remarks&&r.remarks.toLowerCase().includes(t.toLowerCase())||r.contact_date&&r.contact_date.includes(t)||r.ptp_date&&r.ptp_date.includes(t));this.renderTable(e,a)}}function j(n){return{"Personal Loan":"blue","Revi Credit":"green",LazPay:"purple",GCredit:"indigo"}[n]||"gray"}class re{constructor(e){this.app=e,this.users=[]}render(){this.app.currentUser;const e=[{label:"PTP Backlog",path:"/dashboard",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>'},{label:"Confirmed Monitoring",path:"/confirmed",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'},{label:"Admin Panel",path:"/admin",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'}],t=new q(this.app,e),s=`
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Admin Panel</h2>
            <p class="text-gray-500 mt-1">Manage users and system settings</p>
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
                ${C()}
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
                ${C()}
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
                  ${C()}
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
    `,a=t.render(s);return this.bindEvents(a),this.loadUsers(a),a}bindEvents(e){e.querySelector("#addUserBtn").addEventListener("click",()=>{e.querySelector("#userForm").reset(),e.querySelector("#formError").classList.add("hidden"),e.querySelector("#userModal").classList.remove("hidden")}),e.querySelector("#closeUserModal").addEventListener("click",()=>{e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#cancelUserBtn").addEventListener("click",()=>{e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#userModal").addEventListener("click",t=>{t.target===e.querySelector("#userModal")&&e.querySelector("#userModal").classList.add("hidden")}),e.querySelector("#userForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#formError");s.classList.add("hidden");const a={full_name:e.querySelector("#full_name").value.trim(),username:e.querySelector("#username").value.trim(),password:e.querySelector("#password").value,role:e.querySelector("#role").value,campaign:e.querySelector("#user_campaign").value},r=e.querySelector("#submitUserBtn");r.disabled=!0,r.textContent="Creating...";try{await V(a),e.querySelector("#userModal").classList.add("hidden"),await this.loadUsers(e)}catch(o){s.textContent=o.message,s.classList.remove("hidden")}finally{r.disabled=!1,r.textContent="Create User"}}),e.querySelector("#closeEditUserModal").addEventListener("click",()=>{e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#cancelEditUserBtn").addEventListener("click",()=>{e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#editUserModal").addEventListener("click",t=>{t.target===e.querySelector("#editUserModal")&&e.querySelector("#editUserModal").classList.add("hidden")}),e.querySelector("#editUserForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#editFormError");s.classList.add("hidden");const a=e.querySelector("#editUserId").value,r={full_name:e.querySelector("#edit_full_name").value.trim(),username:e.querySelector("#edit_username").value.trim(),role:e.querySelector("#edit_role").value,campaign:e.querySelector("#edit_campaign").value},o=e.querySelector("#submitEditUserBtn");o.disabled=!0,o.textContent="Updating...";try{await $(a,r.campaign),await this.loadUsers(e),e.querySelector("#editUserModal").classList.add("hidden")}catch(d){s.textContent=d.message,s.classList.remove("hidden")}finally{o.disabled=!1,o.textContent="Save Changes"}}),e.querySelector("#closeCampaignModal").addEventListener("click",()=>{e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#cancelCampaignBtn").addEventListener("click",()=>{e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#campaignModal").addEventListener("click",t=>{t.target===e.querySelector("#campaignModal")&&e.querySelector("#campaignModal").classList.add("hidden")}),e.querySelector("#assign_base_campaign").addEventListener("change",()=>{const t=e.querySelector("#assign_base_campaign").value,s=e.querySelector("#assign_bucket"),a=e.querySelector("#submitCampaignBtn");if(!t){s.innerHTML='<option value="">Select base first</option>',s.disabled=!0,a.disabled=!0;return}const{bucketOptions:r}=U(t);s.innerHTML=r,s.disabled=!1,a.disabled=!0}),e.querySelector("#assign_bucket").addEventListener("change",()=>{const t=e.querySelector("#assign_base_campaign").value,s=e.querySelector("#assign_bucket").value,a=e.querySelector("#submitCampaignBtn");a.disabled=!(t&&s)}),e.querySelector("#campaignForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#campaignError");s.classList.add("hidden");const a=e.querySelector("#campaignForm").dataset.userId,r=e.querySelector("#assign_base_campaign").value,o=e.querySelector("#assign_bucket").value;if(!r||!o){s.textContent="Please select a campaign and a bucket.",s.classList.remove("hidden");return}const d=te(r,o);if(!d){s.textContent="Invalid campaign selection. Please try again.",s.classList.remove("hidden"),i.disabled=!1,i.textContent="Update Campaign";return}const i=e.querySelector("#submitCampaignBtn");i.disabled=!0,i.textContent="Updating...";try{await $(a,d);const x=this.users.find(u=>u.id===Number(a)),g=`Campaign updated: ${x==null?void 0:x.full_name} → ${d}`;s.textContent=g,s.className=s.className.replace("hidden bg-red-50 border-red-200 text-red-700","bg-green-50 border-green-200 text-green-700"),s.classList.remove("hidden");const l=setTimeout(()=>{e.querySelector("#campaignModal").classList.add("hidden"),s.classList.add("hidden"),s.className=s.className.replace("bg-green-50 border-green-200 text-green-700","bg-red-50 border-red-200 text-red-700")},1200);try{await this.loadUsers(e)}catch(u){console.warn("User list reload failed:",u.message)}clearTimeout(l)}catch(x){s.textContent=x.message,s.classList.remove("hidden"),i.disabled=!1,i.textContent="Update Campaign"}}),e.querySelector("#cancelDeleteUser").addEventListener("click",()=>{e.querySelector("#deleteUserModal").classList.add("hidden")}),e.querySelector("#deleteUserModal").addEventListener("click",t=>{t.target===e.querySelector("#deleteUserModal")&&e.querySelector("#deleteUserModal").classList.add("hidden")}),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await L(),this.app.logout()}),e.querySelector("#closePasswordModal").addEventListener("click",()=>{e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#cancelPasswordBtn").addEventListener("click",()=>{e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#passwordModal").addEventListener("click",t=>{t.target===e.querySelector("#passwordModal")&&e.querySelector("#passwordModal").classList.add("hidden")}),e.querySelector("#passwordForm").addEventListener("submit",async t=>{t.preventDefault();const s=e.querySelector("#passwordError");s.classList.add("hidden");const a=e.querySelector("#passwordForm").dataset.userId,r=e.querySelector("#new_password").value,o=e.querySelector("#confirm_password").value;if(r!==o){s.textContent="Passwords do not match",s.classList.remove("hidden");return}const d=e.querySelector("#submitPasswordBtn");d.disabled=!0,d.textContent="Updating...";try{await K(a,r),e.querySelector("#passwordModal").classList.add("hidden")}catch(i){s.textContent=i.message,s.classList.remove("hidden")}finally{d.disabled=!1,d.textContent="Update Password"}})}async loadUsers(e){try{const t=await N();this.users=t.users,this.renderTable(e,this.users),this.updateStats(e,this.users)}catch(t){console.error("Failed to load users:",t)}}renderTable(e,t){const s=e.querySelector("#usersTableBody"),a=this.app.currentUser.id;if(t.length===0){s.innerHTML=`
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
      `;return}s.innerHTML=t.map((r,o)=>`
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4 text-sm text-gray-500">${o+1}</td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 ${r.role==="admin"?"bg-purple-100":"bg-blue-100"} rounded-full flex items-center justify-center">
              <span class="${r.role==="admin"?"text-purple-700":"text-blue-700"} font-bold text-sm">${r.full_name.charAt(0)}</span>
            </div>
            <span class="text-sm font-medium text-gray-800">${r.full_name}</span>
            ${r.id===a?'<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">You</span>':""}
          </div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-600 font-mono">${r.username}</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${r.role==="admin"?"bg-purple-100 text-purple-700":"bg-blue-100 text-blue-700"}">
            ${r.role==="admin"?"Admin":"User"}
          </span>
        </td>
        <td class="px-6 py-4">
          ${r.campaign?`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${r.campaign}</span>`:'<span class="text-xs text-gray-400 italic">Not assigned</span>'}
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">${r.created_at?new Date(r.created_at).toLocaleDateString():"-"}</td>
        <td class="px-6 py-4 text-sm">
          <div class="flex gap-2">
            <button class="edit-user-btn px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium" data-id="${r.id}">Edit</button>
            <button class="assign-campaign-btn px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium" data-id="${r.id}">Campaign</button>
            <button class="reset-password-btn px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium" data-id="${r.id}">Password</button>
            ${r.id!==a?`
              <button class="delete-user-btn px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium" data-id="${r.id}">Delete</button>
            `:""}
          </div>
        </td>
      </tr>
    `).join(""),s.querySelectorAll(".edit-user-btn").forEach(r=>{r.addEventListener("click",()=>{const o=parseInt(r.dataset.id);this.openEditUserModal(e,o)})}),s.querySelectorAll(".assign-campaign-btn").forEach(r=>{r.addEventListener("click",()=>{const o=parseInt(r.dataset.id);this.openCampaignModal(e,o)})}),s.querySelectorAll(".reset-password-btn").forEach(r=>{r.addEventListener("click",()=>{const o=parseInt(r.dataset.id);this.openResetPasswordModal(e,o)})}),s.querySelectorAll(".delete-user-btn").forEach(r=>{r.addEventListener("click",()=>{const o=parseInt(r.dataset.id);this.confirmDelete(e,o)})})}updateStats(e,t){const s=t.length,a=t.filter(o=>o.role==="admin").length,r=t.filter(o=>o.role==="user").length;e.querySelector("#totalUsers").textContent=s,e.querySelector("#adminCount").textContent=a,e.querySelector("#userCount").textContent=r}openEditUserModal(e,t){const s=this.users.find(a=>a.id===t);s&&(e.querySelector("#editUserId").value=t,e.querySelector("#edit_full_name").value=s.full_name,e.querySelector("#edit_username").value=s.username,e.querySelector("#edit_role").value=s.role,e.querySelector("#edit_campaign").value=s.campaign||"",e.querySelector("#editFormError").classList.add("hidden"),e.querySelector("#editUserModal").classList.remove("hidden"))}openResetPasswordModal(e,t){const s=this.users.find(r=>r.id===t);if(!s)return;const a=e.querySelector("#passwordForm");a.dataset.userId=t,e.querySelector("#password_user_name").value=`${s.full_name} (${s.username})`,e.querySelector("#passwordError").classList.add("hidden"),e.querySelector("#passwordModal").classList.remove("hidden"),e.querySelector("#new_password").focus()}openCampaignModal(e,t){const s=this.users.find(i=>i.id===t);if(!s)return;const a=e.querySelector("#campaignForm");a.dataset.userId=t,e.querySelector("#campaign_user_name").value=`${s.full_name} (${s.username})`;const r=s.campaign||"";let o="",d="";if(r){const i=r.lastIndexOf(" - ");i>0&&(o=r.slice(0,i),d=r.slice(i+3))}if(e.querySelector("#assign_base_campaign").value=o,e.querySelector("#campaignError").classList.add("hidden"),o){const{bucketOptions:i}=U(o);e.querySelector("#assign_bucket").innerHTML=i,e.querySelector("#assign_bucket").disabled=!1,e.querySelector("#assign_bucket").value=d,e.querySelector("#submitCampaignBtn").disabled=!1}else e.querySelector("#assign_bucket").innerHTML='<option value="">Select base first</option>',e.querySelector("#assign_bucket").disabled=!0,e.querySelector("#submitCampaignBtn").disabled=!0;e.querySelector("#campaignModal").classList.remove("hidden")}confirmDelete(e,t){const s=e.querySelector("#deleteUserModal");s.classList.remove("hidden");const a=e.querySelector("#confirmDeleteUser"),r=a.cloneNode(!0);a.parentNode.replaceChild(r,a),r.addEventListener("click",async()=>{try{await G(t),s.classList.add("hidden"),await this.loadUsers(e)}catch(o){alert("Failed to delete user: "+o.message)}})}}class ae{constructor(e,t){this.app=e,this.campaign=t,this.users=[],this.records=[]}render(){const e=this.app.currentUser,t=document.createElement("div");return t.className="min-h-screen bg-gray-50",t.innerHTML=`
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
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent Name</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Number</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">PTP Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">PTP Amount</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</th>
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
    `,this.bindEvents(t),this.loadData(t),t}bindEvents(e){e.querySelector("#adminHomeBtn").addEventListener("click",()=>this.app.navigate("/admin")),e.querySelector("#logoutBtn").addEventListener("click",async()=>{await L(),this.app.logout()})}async loadData(e){await Promise.all([this.loadUsers(e),this.loadRecords(e)])}async loadUsers(e){try{const t=await O(this.campaign);this.users=t.users,this.renderUsersTable(e,this.users),e.querySelector("#userCount").textContent=`${this.users.length} user${this.users.length===1?"":"s"}`}catch(t){console.error("Failed to load campaign users:",t),e.querySelector("#campaignUsersTableBody").innerHTML=`
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
    `).join("")}async loadRecords(e){try{const t=await P(this.campaign);this.records=t.records,this.renderRecordsTable(e,this.records),e.querySelector("#recordCount").textContent=`${this.records.length} record${this.records.length===1?"":"s"}`}catch(t){console.error("Failed to load campaign records:",t),e.querySelector("#campaignRecordsTableBody").innerHTML=`
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-red-600">
            <p class="font-medium">Failed to load records</p>
          </td>
        </tr>
      `}}renderRecordsTable(e,t){const s=e.querySelector("#campaignRecordsTableBody");if(t.length===0){s.innerHTML=`
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-gray-500">
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
        <td class="px-6 py-4 text-sm text-gray-800 font-medium">${a.contact_date||"-"}</td>
        <td class="px-6 py-4 text-sm text-gray-800">${a.agent_name}</td>
        <td class="px-6 py-4 text-sm text-gray-800 font-mono">${a.loan_number}</td>
        <td class="px-6 py-4 text-sm text-gray-800 font-medium">${a.ptp_date||"-"}</td>
        <td class="px-6 py-4 text-sm text-green-700 font-semibold">₱${parseFloat(a.ptp_amount).toLocaleString("en-PH",{minimumFractionDigits:2})}</td>
        <td class="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">${a.remarks||"-"}</td>
      </tr>
    `).join("")}}class oe{constructor(e){this.app=e,this.records=[],this.editingId=null}render(){const t=this.app.currentUser.role==="admin",s=[{label:"PTP Backlog",path:"/dashboard",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>'},{label:"Confirmed Tracker",path:"/confirmed",active:!0,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'},...t?[{label:"Admin Panel",path:"/admin",active:!1,icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'}]:[]],a=new q(this.app,s),r=`
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
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
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
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
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
                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-500">Today's Confirmed</p>
                <p id="todayCount" class="text-2xl font-bold text-gray-800">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign Filter Buttons (Admin only) -->
        <div class="flex flex-wrap gap-2 mb-6 hidden" id="campaignFilterButtons">
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  data-campaign="all" style="background: #eef2f6; color: #1e293b;">
            All Campaigns
          </button>
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  data-campaign="Revi Credit" style="background: #eef2f6; color: #1e293b;">
            Revi Credit
          </button>
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  data-campaign="Personal Loan" style="background: #eef2f6; color: #1e293b;">
            Personal Loan
          </button>
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  data-campaign="GCredit" style="background: #eef2f6; color: #1e293b;">
            GCredit
          </button>
          <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  data-campaign="LazPay" style="background: #eef2f6; color: #1e293b;">
            LazPay
          </button>
        </div>

        <!-- User Campaign Badge (Non-admin only) -->
        <div class="hidden mb-6" id="userCampaignBadge">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl">
            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-emerald-700 font-semibold" id="userCampaignName"></span>
          </div>
        </div>

        <!-- Campaign Stats -->
        <div id="campaignStats" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"></div>

        <!-- Search Bar -->
        <div class="mb-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              type="text" 
              id="searchInput"
              class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="Search confirmed records..."
            />
          </div>
        </div>

        <!-- Campaign Sections -->
        <div id="campaignSections" class="space-y-4"></div>

        <!-- Single Table (fallback) -->
        <div id="allRecordsTable" class="hidden bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px]">
              <thead>
                <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-12">#</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[110px]">Contact Date</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[140px]">Agent Name</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[150px]">Campaign</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[100px]">Loan Number</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[110px]">Confirmed Date</th>
                  <th class="px-4 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[120px]">Amount</th>
                  <th class="px-4 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider min-w-[180px]">Remarks</th>
                  <th class="px-4 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-28">Actions</th>
                </tr>
              </thead>
              <tbody id="recordsTableBody" class="divide-y divide-gray-100">
                <tr>
                  <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
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

      <!-- Modal -->
      <div id="modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h3 id="modalTitle" class="text-lg font-bold text-gray-800">Add Confirmed Record</h3>
            <button id="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <form id="recordForm" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Agent Name *</label>
              <input type="text" id="agent_name" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors bg-gray-50" readonly/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
              <select id="campaign" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors">
                <option value="">Select Campaign</option>
                ${R()}
              </select>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Contact Date *</label>
                <input type="date" id="contact_date" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"/>
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Confirmed Date *</label>
                <input type="date" id="confirmed_date" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"/>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Loan Number *</label>
              <input type="text" id="loan_number" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors" placeholder="Enter loan number"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">PTP Amount (₱) *</label>
              <input type="number" id="ptp_amount" required step="0.01" min="0" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors" placeholder="0.00"/>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
              <textarea id="remarks" rows="3" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none" placeholder="Enter remarks (optional)"></textarea>
            </div>
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
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
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
    `,o=a.render(r);return this.bindEvents(o),this.loadRecords(o),o}bindEvents(e){const t=this.app.currentUser;e.querySelector("#addRecordBtn").addEventListener("click",()=>{this.editingId=null,e.querySelector("#modalTitle").textContent="Add Confirmed Record",e.querySelector("#submitBtn").textContent="Save Record",this.clearForm(e),e.querySelector("#agent_name").value=t.full_name,t.campaign?(e.querySelector("#campaign").value=t.campaign,e.querySelector("#campaign").disabled=!0,e.querySelector("#campaign").classList.add("bg-gray-50","text-gray-500","cursor-not-allowed")):(e.querySelector("#campaign").disabled=!1,e.querySelector("#campaign").classList.remove("bg-gray-50","text-gray-500","cursor-not-allowed")),e.querySelector("#modal").classList.remove("hidden")}),e.querySelector("#closeModal").addEventListener("click",()=>{e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#cancelBtn").addEventListener("click",()=>{e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#modal").addEventListener("click",s=>{s.target===e.querySelector("#modal")&&e.querySelector("#modal").classList.add("hidden")}),e.querySelector("#recordForm").addEventListener("submit",async s=>{s.preventDefault();const a=e.querySelector("#formError");a.classList.add("hidden");const r={contact_date:e.querySelector("#contact_date").value,agent_name:e.querySelector("#agent_name").value.trim(),campaign:e.querySelector("#campaign").value,loan_number:e.querySelector("#loan_number").value.trim(),confirmed_date:e.querySelector("#confirmed_date").value,ptp_amount:parseFloat(e.querySelector("#ptp_amount").value),remarks:e.querySelector("#remarks").value.trim()},o=e.querySelector("#submitBtn");o.disabled=!0,o.textContent="Saving...";try{this.editingId?await Y(this.editingId,r):await W(r),e.querySelector("#modal").classList.add("hidden"),await this.loadRecords(e)}catch(d){a.textContent=d.message,a.classList.remove("hidden")}finally{o.disabled=!1,o.textContent=this.editingId?"Update Record":"Save Record"}}),e.querySelector("#cancelDelete").addEventListener("click",()=>{e.querySelector("#deleteModal").classList.add("hidden")}),e.querySelector("#deleteModal").addEventListener("click",s=>{s.target===e.querySelector("#deleteModal")&&e.querySelector("#deleteModal").classList.add("hidden")}),e.querySelector("#searchInput").addEventListener("input",s=>{this.filterRecords(e,s.target.value)}),e.querySelectorAll(".campaign-filter-btn").forEach(s=>{s.addEventListener("click",()=>{const a=s.dataset.campaign,r=this.app.currentUser;if(r.role!=="admin"&&r.campaign){if(a!=="all"&&a!==r.campaign){const o=Array.from(e.querySelectorAll(".campaign-filter-btn")).find(d=>d.dataset.campaign===r.campaign);o&&o.click();return}a==="all"&&(a=r.campaign)}e.querySelectorAll(".campaign-filter-btn").forEach(o=>{o.style.background="#eef2f6",o.style.color="#1e293b",r.role!=="admin"&&o.dataset.campaign!=="all"&&o.dataset.campaign!==r.campaign?(o.style.opacity="0.5",o.style.pointerEvents="none"):(o.style.opacity="1",o.style.pointerEvents="auto")}),a==="all"?(s.style.background="#eef2f6",s.style.color="#1e293b"):(s.style.background="#059669",s.style.color="white"),this.filterRecords(e,a==="all"?r.campaign||"":a)})})}clearForm(e){e.querySelector("#contact_date").value="",e.querySelector("#agent_name").value=this.app.currentUser.full_name,e.querySelector("#campaign").value=this.app.currentUser.campaign||"",e.querySelector("#loan_number").value="",e.querySelector("#confirmed_date").value="",e.querySelector("#ptp_amount").value="",e.querySelector("#remarks").value="",e.querySelector("#formError").classList.add("hidden")}async loadRecords(e){try{let t;const s=this.app.currentUser;s.role!=="admin"&&s.campaign?t=await X(s.campaign):t=await J(),this.records=t.records,this.renderCampaignStats(e,this.records),this.renderTable(e,this.records),this.updateStats(e,this.records),this.initCampaignFilters(e,s)}catch(t){console.error("Failed to load confirmed records:",t)}}initCampaignFilters(e,t){const s=e.querySelector("#campaignFilterButtons"),a=e.querySelector("#userCampaignBadge"),r=e.querySelector("#userCampaignName");if(t.role!=="admin"&&t.campaign){s.classList.add("hidden"),a.classList.remove("hidden");const o=t.campaign.includes(" - ")?t.campaign.split(" - ")[0]:t.campaign;r.textContent=o,this.filterRecords(e,o)}else t.role==="admin"&&(s.classList.remove("hidden"),a.classList.add("hidden"))}renderCampaignStats(e,t){const s=e.querySelector("#campaignStats");if(!s)return;const a={};t.forEach(o=>{const d=o.campaign||"Unassigned";a[d]||(a[d]={count:0,amount:0}),a[d].count++,a[d].amount+=parseFloat(o.ptp_amount||0)});const r=Object.keys(a).sort();if(r.length===0){s.innerHTML="";return}s.innerHTML=r.map(o=>{const d=a[o],i=["emerald","green","teal","cyan"],x=r.indexOf(o)%i.length,g=i[x];return`
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow campaign-stat-card"
             data-campaign="${o}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-${g}-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-${g}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-gray-500 truncate">${o}</p>
              <p class="text-lg font-bold text-gray-800">${d.count}</p>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2">₱${d.amount.toLocaleString("en-PH",{minimumFractionDigits:2})}</p>
        </div>
      `}).join(""),s.querySelectorAll(".campaign-stat-card").forEach(o=>{o.addEventListener("click",()=>{const d=o.dataset.campaign;this.filterRecords(e,d)})})}renderTable(e,t,s=null){const a=e.querySelector("#campaignSections"),r=e.querySelector("#allRecordsTable"),o=e.querySelector("#recordsTableBody"),d={};t.forEach(l=>{const u=l.campaign||"Unassigned";d[u]||(d[u]=[]),d[u].push(l)}),a.innerHTML="";const i=Object.keys(d).filter(l=>d[l].length>0),x=i.length>1&&!s;x?(r.classList.add("hidden"),a.classList.remove("hidden")):(r.classList.remove("hidden"),a.classList.add("hidden"));const g=s?d[s]||[]:t;if(g.length===0&&!s){x||(o.innerHTML=`
          <tr>
            <td colspan="9" class="px-6 py-12 text-center text-gray-500">
              <div class="flex flex-col items-center">
                <svg class="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p class="font-medium">No confirmed records found</p>
                <p class="text-sm text-gray-400 mt-1">Click "Add Confirmed" to create one</p>
              </div>
            </td>
          </tr>
        `);return}x?i.forEach((l,u)=>{const f=d[l],w=f.reduce((p,c)=>p+(parseFloat(c.ptp_amount)||0),0),k=new Date().toISOString().split("T")[0],S=f.filter(p=>p.confirmed_date===k).length,m=document.createElement("div");m.className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",m.dataset.campaign=l,m.innerHTML=`
          <div class="bg-emerald-500 px-6 py-4 flex justify-between items-center cursor-pointer hover:bg-emerald-600 transition-colors">
            <div class="flex items-center gap-4">
              <button class="collapse-btn p-1 hover:bg-white/20 rounded transition-colors">
                <svg class="w-5 h-5 text-white collapse-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div>
                <h3 class="text-lg font-bold text-white">${l}</h3>
                <p class="text-sm text-white/80">${f.length} records · ₱${w.toLocaleString("en-PH",{minimumFractionDigits:2})}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-white/60">${S} today</span>
              <button class="view-all-campaign-btn text-xs bg-white/20 text-white px-3 py-1.5 rounded-lg hover:bg-white/30 transition-colors font-medium">View All</button>
            </div>
          </div>
          <div class="campaign-records-body px-6">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Date</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent Name</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Loan Number</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Confirmed Date</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</th>
                  <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                ${f.map((p,c)=>`
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 text-sm text-gray-500">${c+1}</td>
                    <td class="px-6 py-4 text-sm text-gray-800 font-medium">${p.contact_date||"-"}</td>
                    <td class="px-6 py-4 text-sm text-gray-800">${p.agent_name}</td>
                    <td class="px-6 py-4 text-sm text-gray-800 font-mono">${p.loan_number}</td>
                    <td class="px-6 py-4 text-sm text-gray-800 font-medium">${p.confirmed_date||"-"}</td>
                    <td class="px-6 py-4 text-sm text-green-700 font-semibold">₱${parseFloat(p.ptp_amount).toLocaleString("en-PH",{minimumFractionDigits:2})}</td>
                    <td class="px-6 py-4 text-sm text-gray-500 max-w-[120px] truncate">${p.remarks||"-"}</td>
                    <td class="px-6 py-4 text-sm">
                      <div class="flex gap-2">
                        <button class="edit-btn px-2.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors font-medium text-xs" data-id="${p.id}">Edit</button>
                        <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-xs" data-id="${p.id}">Delete</button>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `,a.appendChild(m);const h=m.querySelector(".collapse-btn"),y=m.querySelector(".campaign-records-body");u>=3&&(y.style.display="none"),h.addEventListener("click",p=>{p.stopPropagation();const c=y.style.display==="none";y.style.display=c?"":"none",h.querySelector(".collapse-icon").style.transform=c?"rotate(0deg)":"rotate(-90deg)"}),m.querySelector(".view-all-campaign-btn").addEventListener("click",p=>{p.stopPropagation(),this.filterRecords(e,l)}),m.querySelectorAll(".edit-btn").forEach(p=>{p.addEventListener("click",()=>{const c=parseInt(p.dataset.id);this.editRecord(e,c)})}),m.querySelectorAll(".delete-btn").forEach(p=>{p.addEventListener("click",()=>{const c=parseInt(p.dataset.id);this.confirmDelete(e,c)})})}):(g.length===0&&s?o.innerHTML=`
          <tr>
            <td colspan="9" class="px-6 py-12 text-center text-gray-500">
              <p class="font-medium">No records for ${s}</p>
            </td>
          </tr>
        `:o.innerHTML=g.map((l,u)=>{var f,w,k,S,m,h,y,p;return`
          <tr class="hover:bg-emerald-50/50 transition-colors border-b border-gray-100 last:border-0">
            <td class="px-4 py-3 text-sm text-gray-500 text-center font-medium">${u+1}</td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-medium bg-gray-100 px-2 py-1 rounded-md">${l.contact_date||"-"}</span>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-xs font-bold">${((f=l.agent_name)==null?void 0:f.charAt(0))||"?"}</span>
                </div>
                <span class="text-sm text-gray-800 font-medium">${l.agent_name}</span>
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="flex flex-col gap-1">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${(w=l.campaign)!=null&&w.includes("Personal Loan")?"bg-blue-100 text-blue-700":(k=l.campaign)!=null&&k.includes("Revi Credit")?"bg-green-100 text-green-700":(S=l.campaign)!=null&&S.includes("GCredit")?"bg-indigo-100 text-indigo-700":"bg-purple-100 text-purple-700"}">
                  ${((m=l.campaign)==null?void 0:m.split(" - ")[0])||"-"}
                </span>
                ${(h=l.campaign)!=null&&h.includes("Pre-Charge-Off")?'<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Pre-Charge-Off</span>':""}
                ${(y=l.campaign)!=null&&y.includes("Charge-Off")&&!((p=l.campaign)!=null&&p.includes("Pre-Charge-Off"))?'<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Charge-Off</span>':""}
              </div>
            </td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded-md">${l.loan_number}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-medium bg-emerald-50 px-2 py-1 rounded-md">${l.confirmed_date||"-"}</span>
            </td>
            <td class="px-4 py-3 text-right">
              <span class="text-sm font-bold text-green-600">₱${parseFloat(l.ptp_amount).toLocaleString("en-PH",{minimumFractionDigits:2})}</span>
            </td>
            <td class="px-4 py-3">
              <p class="text-sm text-gray-600 max-w-[200px] break-words leading-relaxed">${l.remarks||"-"}</p>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-1.5 justify-center">
                <button class="edit-btn px-2.5 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 hover:text-emerald-700 transition-all font-medium text-xs flex items-center gap-1" data-id="${l.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  Edit
                </button>
                <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all font-medium text-xs flex items-center gap-1" data-id="${l.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        `}).join(""),o.querySelectorAll(".edit-btn").forEach(l=>{l.addEventListener("click",()=>{const u=parseInt(l.dataset.id);this.editRecord(e,u)})}),o.querySelectorAll(".delete-btn").forEach(l=>{l.addEventListener("click",()=>{const u=parseInt(l.dataset.id);this.confirmDelete(e,u)})}))}updateStats(e,t){const s=t.length,a=t.reduce((d,i)=>d+(parseFloat(i.ptp_amount)||0),0),r=new Date().toISOString().split("T")[0],o=t.filter(d=>d.confirmed_date===r).length;e.querySelector("#totalRecords").textContent=s,e.querySelector("#totalAmount").textContent="₱"+a.toLocaleString("en-PH",{minimumFractionDigits:2}),e.querySelector("#todayCount").textContent=o}editRecord(e,t){const s=this.records.find(r=>r.id===t);if(!s)return;this.editingId=t,e.querySelector("#modalTitle").textContent="Edit Confirmed Record",e.querySelector("#submitBtn").textContent="Update Record",this.app.currentUser.role!=="admin"?(e.querySelector("#campaign").disabled=!0,e.querySelector("#campaign").classList.add("bg-gray-50","text-gray-500","cursor-not-allowed")):(e.querySelector("#campaign").disabled=!1,e.querySelector("#campaign").classList.remove("bg-gray-50","text-gray-500","cursor-not-allowed")),e.querySelector("#contact_date").value=s.contact_date||"",e.querySelector("#agent_name").value=s.agent_name,e.querySelector("#campaign").value=s.campaign||"",e.querySelector("#loan_number").value=s.loan_number,e.querySelector("#confirmed_date").value=s.confirmed_date||"",e.querySelector("#ptp_amount").value=s.ptp_amount,e.querySelector("#remarks").value=s.remarks||"",e.querySelector("#formError").classList.add("hidden"),e.querySelector("#modal").classList.remove("hidden")}confirmDelete(e,t){const s=e.querySelector("#deleteModal");s.classList.remove("hidden");const a=e.querySelector("#confirmDelete"),r=a.cloneNode(!0);a.parentNode.replaceChild(r,a),r.addEventListener("click",async()=>{try{await Q(t),s.classList.add("hidden"),await this.loadRecords(e)}catch{alert("Failed to delete record")}})}filterRecords(e,t){if(!t){this.renderTable(e,this.records);return}if(this.records.find(r=>r.campaign&&r.campaign.toLowerCase()===t.toLowerCase())){this.renderTable(e,this.records,t);return}const a=this.records.filter(r=>r.agent_name.toLowerCase().includes(t.toLowerCase())||r.campaign&&r.campaign.toLowerCase().includes(t.toLowerCase())||r.loan_number.toLowerCase().includes(t.toLowerCase())||r.remarks&&r.remarks.toLowerCase().includes(t.toLowerCase())||r.contact_date&&r.contact_date.includes(t)||r.confirmed_date&&r.confirmed_date.includes(t));this.renderTable(e,a)}}class le{constructor(){this.currentUser=null,this.routes={"/":()=>this.renderLogin(),"/login":()=>this.renderLogin(),"/dashboard":()=>this.renderDashboard(),"/admin":()=>this.renderAdmin(),"/confirmed":()=>this.renderConfirmed(),"/campaign/:campaign":()=>this.renderCampaign()},this.init()}async init(){try{const e=await fetch("/api/auth/me",{credentials:"include"});if(e.ok){const t=await e.json();this.currentUser=t.user,this.navigate("/dashboard")}else this.currentUser=null,this.navigate("/login")}catch(e){console.warn("Auth check failed, redirecting to login:",e.message),this.currentUser=null,this.navigate("/login")}window.addEventListener("popstate",()=>this.route())}navigate(e){window.history.pushState({},"",e),this.route()}route(){const e=window.location.pathname;if(this.routes[e]){this.routes[e]();return}for(const[t,s]of Object.entries(this.routes))if(t.startsWith("/campaign/")){const a="/campaign/";if(e.startsWith(a)&&e.length>a.length){s();return}}this.navigate("/login")}renderLogin(){const e=document.getElementById("app");e.innerHTML="";const t=new Z(this);e.appendChild(t.render())}renderDashboard(){if(!this.currentUser){this.navigate("/login");return}const e=document.getElementById("app");e.innerHTML="";const t=new se(this);e.appendChild(t.render())}renderAdmin(){if(!this.currentUser||this.currentUser.role!=="admin"){this.navigate("/dashboard");return}const e=document.getElementById("app");e.innerHTML="";const t=new re(this);e.appendChild(t.render())}renderCampaign(){if(!this.currentUser||this.currentUser.role!=="admin"){this.navigate("/dashboard");return}const e=window.location.pathname.split("/").slice(-1)[0],t=document.getElementById("app");t.innerHTML="";const s=new ae(this,decodeURIComponent(e));t.appendChild(s.render())}renderConfirmed(){if(console.log("renderConfirmed called"),!this.currentUser){console.log("No currentUser, redirecting to login"),this.navigate("/login");return}const e=document.getElementById("app");console.log("Clearing app innerHTML"),e.innerHTML="";const t=new oe(this);console.log("Appending ConfirmedTrackerPage"),e.appendChild(t.render()),console.log("ConfirmedTrackerPage rendered")}setUser(e){this.currentUser=e}logout(){this.currentUser=null,this.navigate("/login")}}new le;
