import { login } from '../api.js';

export class LoginPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden';

    container.innerHTML = `
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
    `;

    // Bind events
    const form = container.querySelector('#loginForm');
    const errorMsg = container.querySelector('#errorMessage');
    const loginBtn = container.querySelector('#loginBtn');

    // Password visibility toggle
    const pw = container.querySelector('#password');
    container.querySelector('#togglePw').addEventListener('click', () => {
      const show = pw.type === 'password';
      pw.type = show ? 'text' : 'password';
      container.querySelector('#eyeOpen').classList.toggle('hidden', show);
      container.querySelector('#eyeClosed').classList.toggle('hidden', !show);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = container.querySelector('#username').value.trim();
      const password = pw.value;

      if (!username || !password) {
        errorMsg.textContent = 'Please fill in all fields';
        errorMsg.classList.remove('hidden');
        return;
      }

      loginBtn.disabled = true;
      loginBtn.textContent = 'Signing in...';
      errorMsg.classList.add('hidden');

      try {
        const data = await login(username, password);
        this.app.setUser(data.user);

        if (data.user.role === 'admin') {
          this.app.navigate('/admin');
        } else {
          this.app.navigate('/dashboard');
        }
      } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove('hidden');
        loginBtn.disabled = false;
        loginBtn.textContent = 'Sign In';
      }
    });

    return container;
  }
}
