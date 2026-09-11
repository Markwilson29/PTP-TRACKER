import { login } from '../api.js';

export class LoginPage {
  constructor(app) {
    this.app = app;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4';
    container.innerHTML = `
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
    `;

    // Bind events
    const form = container.querySelector('#loginForm');
    const errorMsg = container.querySelector('#errorMessage');
    const loginBtn = container.querySelector('#loginBtn');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = container.querySelector('#username').value.trim();
      const password = container.querySelector('#password').value;

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
