import { getCampaignUsers, getCampaignRecords, logout } from '../api.js';

export class CampaignPage {
  constructor(app, campaign) {
    this.app = app;
    this.campaign = campaign;
    this.users = [];
    this.records = [];
  }

  render() {
    const user = this.app.currentUser;
    const container = document.createElement('div');
    container.className = 'min-h-screen bg-gray-50';
    container.innerHTML = `
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
                  <span class="text-indigo-700 font-bold text-sm">${user.full_name.charAt(0)}</span>
                </div>
                <span class="text-sm font-medium text-gray-700">${user.full_name}</span>
                <span class="text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'} px-2 py-0.5 rounded-full font-semibold">${user.role === 'admin' ? 'Admin' : 'User'}</span>
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
    `;

    this.bindEvents(container);
    this.loadData(container);

    return container;
  }

  bindEvents(container) {
    container.querySelector('#adminHomeBtn').addEventListener('click', () =>
      this.app.navigate('/admin')
    );

    container.querySelector('#logoutBtn').addEventListener('click', async () => {
      await logout();
      this.app.logout();
    });
  }

  async loadData(container) {
    await Promise.all([
      this.loadUsers(container),
      this.loadRecords(container),
    ]);
  }

  async loadUsers(container) {
    try {
      const data = await getCampaignUsers(this.campaign);
      this.users = data.users;
      this.renderUsersTable(container, this.users);
      container.querySelector('#userCount').textContent =
        `${this.users.length} user${this.users.length === 1 ? '' : 's'}`;
    } catch (error) {
      console.error('Failed to load campaign users:', error);
      container.querySelector('#campaignUsersTableBody').innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-red-600">
            <p class="font-medium">Failed to load users</p>
          </td>
        </tr>
      `;
    }
  }

  renderUsersTable(container, users) {
    const tbody = container.querySelector('#campaignUsersTableBody');

    if (users.length === 0) {
      tbody.innerHTML = `
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
      `;
      return;
    }

    tbody.innerHTML = users
      .map(
        (u) => `
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 ${u.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'} rounded-full flex items-center justify-center">
              <span class="${u.role === 'admin' ? 'text-purple-700' : 'text-blue-700'} font-bold text-sm">${u.full_name.charAt(0)}</span>
            </div>
            <span class="text-sm font-medium text-gray-800">${u.full_name}</span>
          </div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-600 font-mono">${u.username}</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
            ${u.role === 'admin' ? '👑 Admin' : '👤 User'}
          </span>
        </td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${u.campaign || '-'}</span>
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">${u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</td>
      </tr>
    `
      )
      .join('');
  }

  async loadRecords(container) {
    try {
      const data = await getCampaignRecords(this.campaign);
      this.records = data.records;
      this.renderRecordsTable(container, this.records);
      container.querySelector('#recordCount').textContent =
        `${this.records.length} record${this.records.length === 1 ? '' : 's'}`;
    } catch (error) {
      console.error('Failed to load campaign records:', error);
      container.querySelector('#campaignRecordsTableBody').innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-12 text-center text-red-600">
            <p class="font-medium">Failed to load records</p>
          </td>
        </tr>
      `;
    }
  }

  renderRecordsTable(container, records) {
    const tbody = container.querySelector('#campaignRecordsTableBody');

    if (records.length === 0) {
      tbody.innerHTML = `
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
      `;
      return;
    }

    tbody.innerHTML = records
      .map(
        (r) => `
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4 text-sm text-gray-800 font-medium">${r.contact_date || '-'}</td>
        <td class="px-6 py-4 text-sm text-gray-800">${r.agent_name}</td>
        <td class="px-6 py-4 text-sm text-gray-800 font-mono">${r.loan_number}</td>
        <td class="px-6 py-4 text-sm text-gray-800 font-medium">${r.ptp_date || '-'}</td>
        <td class="px-6 py-4 text-sm text-green-700 font-semibold">₱${parseFloat(r.ptp_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
        <td class="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">${r.remarks || '-'}</td>
      </tr>
    `
      )
      .join('');
  }
}
