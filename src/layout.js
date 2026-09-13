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
    container.className = 'min-h-screen bg-gray-50 flex relative';

    // Check if sidebar was previously closed
    const sidebarClosed = localStorage.getItem('sidebarClosed') === 'true';

    const mainItems = this.sidebarItems.filter((i) => !ADMIN_LABELS.includes(i.label));
    const adminItems = this.sidebarItems.filter((i) => ADMIN_LABELS.includes(i.label));

    container.innerHTML = `
      <!-- Sidebar Toggle Button (always visible) -->
      <button id="sidebarToggle" class="fixed top-5 z-50 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 rounded-full p-2.5 hover:from-blue-600 hover:to-blue-700 transition-all duration-500 ease-in-out hover:shadow-xl hover:scale-110 ${sidebarClosed ? 'left-3' : 'left-[260px]'}">
        <svg id="toggleIcon" class="w-4 h-4 transition-transform duration-500 ${sidebarClosed ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Sidebar -->
      <aside id="sidebar" class="bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${sidebarClosed ? 'w-0 overflow-hidden opacity-0' : 'w-64 opacity-100'}">
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
            ${mainItems.map(item => `
              <li class="sidebar-item" data-path="${item.path}">
                <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 justify-between
                  ${item.active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}">
                  <span class="flex items-center gap-3 flex-1">
                    ${item.icon ? `<span class="w-5 h-5 flex items-center justify-center">${item.icon}</span>` : ''}
                    <span>${item.label}</span>
                  </span>
                  ${item.active ? '<svg class="w-4 h-4 text-white/80 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>' : '<span class="w-4 h-4 flex-shrink-0"></span>'}
                </button>
              </li>
            `).join('')}
          </ul>
          ${adminItems.length ? `
          <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 mt-6 px-3">Administration</p>
          <ul class="space-y-1">
            ${adminItems.map(item => `
              <li class="sidebar-item" data-path="${item.path}">
                <button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 justify-between
                  ${item.active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'}">
                  <span class="flex items-center gap-3 flex-1">
                    ${item.icon ? `<span class="w-5 h-5 flex items-center justify-center">${item.icon}</span>` : ''}
                    <span>${item.label}</span>
                  </span>
                  ${item.active ? '<svg class="w-4 h-4 text-white/80 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>' : '<span class="w-4 h-4 flex-shrink-0"></span>'}
                </button>
              </li>
            `).join('')}
          </ul>
          ` : ''}
        </nav>

        <!-- User Profile & Logout -->
        <div class="p-4 border-t border-slate-700">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span class="text-white font-bold text-sm">${this.app.currentUser?.full_name?.charAt(0) || '?'}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">${this.app.currentUser?.full_name || ''}</p>
              <p class="text-xs text-slate-400 truncate">${this.app.currentUser?.username || ''}</p>
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
                <h1 class="text-xl font-bold text-gray-800">${this.sidebarItems.find(i => i.active)?.label || ''}</h1>
              </div>
              <div class="flex items-center gap-3">
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
        <main class="flex-1">
          ${mainContent}
        </main>
      </div>
    `;

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
