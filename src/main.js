// Simple client-side router and app initialization
import { LoginPage } from './pages/LoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { AdminPage } from './pages/AdminPage.js';
import { CampaignPage } from './pages/CampaignPage.js';
import { ConfirmedTrackerPage } from './pages/ConfirmedTrackerPage.js';

class App {
  constructor() {
    this.currentUser = null;
    this.routes = {
      '/': () => this.renderLogin(),
      '/login': () => this.renderLogin(),
      '/dashboard': () => this.renderDashboard(),
      '/admin': () => this.renderAdmin(),
      '/confirmed': () => this.renderConfirmed(),
      '/campaign/:campaign': () => this.renderCampaign(),
    };
    this.init();
  }

  async init() {
    // Check if user is already logged in
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        this.currentUser = data.user;
        this.navigate('/dashboard');
      } else {
        this.currentUser = null;
        this.navigate('/login');
      }
    } catch (err) {
      console.warn('Auth check failed, redirecting to login:', err.message);
      this.currentUser = null;
      this.navigate('/login');
    }

    // Handle back/forward browser buttons
    window.addEventListener('popstate', () => this.route());
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.route();
  }

  route() {
    const path = window.location.pathname;
    
    // Check for exact match first
    if (this.routes[path]) {
      this.routes[path]();
      return;
    }
    
    // Check for pattern matches (e.g., /campaign/:campaign)
    for (const [pattern, handler] of Object.entries(this.routes)) {
      if (pattern.startsWith('/campaign/')) {
        const campaignPath = '/campaign/';
        if (path.startsWith(campaignPath) && path.length > campaignPath.length) {
          handler();
          return;
        }
      }
    }
    
    // No match found
    this.navigate('/login');
  }

  renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = '';
    const page = new LoginPage(this);
    app.appendChild(page.render());
  }

  renderDashboard() {
    if (!this.currentUser) {
      this.navigate('/login');
      return;
    }
    const app = document.getElementById('app');
    app.innerHTML = '';
    const page = new DashboardPage(this);
    app.appendChild(page.render());
  }

  renderAdmin() {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      this.navigate('/dashboard');
      return;
    }
    const app = document.getElementById('app');
    app.innerHTML = '';
    const page = new AdminPage(this);
    app.appendChild(page.render());
  }

  renderCampaign() {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      this.navigate('/dashboard');
      return;
    }
    const campaign = window.location.pathname.split('/').slice(-1)[0];
    const app = document.getElementById('app');
    app.innerHTML = '';
    const page = new CampaignPage(this, decodeURIComponent(campaign));
    app.appendChild(page.render());
  }

  renderConfirmed() {
    console.log('renderConfirmed called');
    if (!this.currentUser) {
      console.log('No currentUser, redirecting to login');
      this.navigate('/login');
      return;
    }
    const app = document.getElementById('app');
    console.log('Clearing app innerHTML');
    app.innerHTML = '';
    const page = new ConfirmedTrackerPage(this);
    console.log('Appending ConfirmedTrackerPage');
    app.appendChild(page.render());
    console.log('ConfirmedTrackerPage rendered');
  }

  setUser(user) {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
    this.navigate('/login');
  }
}

// Start the app
new App();
