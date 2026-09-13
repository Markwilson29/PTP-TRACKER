// Shared sidebar layout for authenticated pages
import { logout } from './api.js';

const ADMIN_LABELS = ['Campaigns & Columns', 'Users & Agents', 'Admin Panel'];

export class Layout {
  constructor(app, sidebarItems) {
    this.app = app;
    this.sidebarItems = sidebarItems; // Array of { label, path, icon? }
  }

  render(mainContent) {
    const container = document.createElement('div');
    container.className = 'h-screen bg-gray-50 flex relative overflow-hidden';

    // Check if sidebar was previously closed
    const sidebarClosed = localStorage.getItem('sidebarClosed') === 'true';

    const mainItems = this.sidebarItems.filter((i) => !ADMIN_LABELS.includes(i.label));
    const adminItems = this.sidebarItems.filter((i) => ADMIN_LABELS.includes(i.label));
    const activeItem = this.sidebarItems.find(i => i.active);

    const navButton = (item) => `
      <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 justify-between
        ${item.active
          ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25 ring-1 ring-white/10 ring-inset'
          : 'text-slate-300 hover:bg-white/5 hover:text-white'}">
        <span class="flex items-center gap-3 flex-1">
          ${item.icon ? `<span class="w-5 h-5 flex items-center justify-center ${item.active ? 'text-white' : 'text-slate-400 group-hover/item:text-indigo-300'}">${item.icon}</span>` : ''}
          <span>${item.label}</span>
        </span>
        ${item.active
          ? '<span class="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse flex-shrink-0"></span>'
          : '<span class="w-1.5 h-1.5 rounded-full bg-transparent flex-shrink-0"></span>'}
      </button>`;

    container.innerHTML = `
      <!-- Sidebar Toggle Button (always visible) -->
      <button id="sidebarToggle" aria-label="Toggle sidebar" class="fixed top-5 z-50 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 rounded-full p-2.5 hover:from-indigo-600 hover:to-indigo-700 transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-110 ${sidebarClosed ? 'left-3' : 'left-[260px]'}">
        <svg id="toggleIcon" class="w-4 h-4 transition-transform duration-500 ${sidebarClosed ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Sidebar -->
      <aside id="sidebar" class="h-screen sticky top-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${sidebarClosed ? 'w-0 overflow-hidden opacity-0' : 'w-64 opacity-100'}">
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
              ${mainItems.map(item => `
                <li class="sidebar-item group/item" data-path="${item.path}">
                  ${navButton(item)}
                </li>
              `).join('')}
            </ul>
          </div>
          ${adminItems.length ? `
          <div>
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 mt-2 px-3">Administration</p>
            <ul class="space-y-1">
              ${adminItems.map(item => `
                <li class="sidebar-item group/item" data-path="${item.path}">
                  ${navButton(item)}
                </li>
              `).join('')}
            </ul>
          </div>
          ` : ''}
        </nav>

        <!-- User Profile & Logout -->
        <div class="p-4 border-t border-white/5 bg-white/[0.02]">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ring-2 ring-white/10">
              <span class="text-white font-bold text-sm">${this.app.currentUser?.full_name?.charAt(0) || '?'}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">${this.app.currentUser?.full_name || ''}</p>
              <p class="text-xs text-slate-400 truncate">${this.app.currentUser?.username || ''}</p>
            </div>
            ${this.app.currentUser?.role === 'admin' ? '<span class="px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">Admin</span>' : ''}
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
                  <h1 class="text-lg font-bold text-gray-900 tracking-tight leading-tight">${activeItem?.label || ''}</h1>
                  <p class="text-[11px] text-gray-400 leading-tight">CIMB Account Monitoring</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="hidden sm:flex items-center text-xs text-gray-400">
                  <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span id="navDate"></span>
                </div>
                ${this.app.currentUser?.campaign ? `
                  <div class="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-1.5">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-sm text-indigo-700 font-medium">${this.app.currentUser.campaign}</span>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </nav>

        <!-- Page Content -->
        <main class="flex-1 overflow-y-auto">
          ${mainContent}
        </main>
      </div>
    `;

    // Live date in the navbar
    const dateEl = container.querySelector('#navDate');
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-PH', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      });
    }

    this.bindEvents(container);
    return container;
  }

  bindEvents(container) {
    // Sidebar toggle
    container.querySelector('#sidebarToggle').addEventListener('click', () => {
      const sidebar = container.querySelector('#sidebar');
      const toggle = container.querySelector('#sidebarToggle');
      const icon = container.querySelector('#toggleIcon');
      const isClosed = sidebar.classList.contains('w-0');

      if (isClosed) {
        // Open sidebar with smooth animation
        sidebar.classList.remove('w-0', 'overflow-hidden', 'opacity-0');
        sidebar.classList.add('w-64', 'opacity-100');
        toggle.classList.remove('left-3');
        toggle.classList.add('left-[260px]');
        icon.classList.remove('rotate-180');
        localStorage.setItem('sidebarClosed', 'false');
      } else {
        // Close sidebar with smooth animation
        sidebar.classList.remove('w-64', 'opacity-100');
        sidebar.classList.add('w-0', 'overflow-hidden', 'opacity-0');
        toggle.classList.remove('left-[260px]');
        toggle.classList.add('left-3');
        icon.classList.add('rotate-180');
        localStorage.setItem('sidebarClosed', 'true');
      }
    });

    // Sidebar navigation
    container.querySelectorAll('.sidebar-item button').forEach(btn => {
      btn.addEventListener('click', () => {
        const path = btn.closest('.sidebar-item').dataset.path;
        this.app.navigate(path);
      });
    });

    // Logout
    container.querySelector('#logoutBtn').addEventListener('click', async () => {
      await logout();
      this.app.logout();
    });
  }
}
