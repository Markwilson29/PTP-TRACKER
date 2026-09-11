import { getRecords, createRecord, updateRecord, deleteRecord, logout, getCampaignRecords } from '../api.js';
import { campaignOptions } from '../campaigns.js';
import { Layout } from '../layout.js';

export class DashboardPage {
  constructor(app) {
    this.app = app;
    this.records = [];
    this.editingId = null;
  }

  render() {
    const user = this.app.currentUser;
    const isAdmin = user.role === 'admin';

    const sidebarItems = [
      { label: 'PTP Backlog', path: '/dashboard', active: true, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>' },
      { label: 'Confirmed Tracker', path: '/confirmed', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' },
      ...(isAdmin ? [{ label: 'Admin Panel', path: '/admin', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' }] : [])
    ];

    const layout = new Layout(this.app, sidebarItems);

    const mainContent = `
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
                ${campaignOptions()}
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
    `;

    const fullContainer = layout.render(mainContent);

    this.bindEvents(fullContainer);
    this.loadRecords(fullContainer);

    return fullContainer;
  }

  bindEvents(container) {
    const user = this.app.currentUser;

    // Add record button
    container.querySelector('#addRecordBtn').addEventListener('click', () => {
      this.editingId = null;
      container.querySelector('#modalTitle').textContent = 'Add New Record';
      container.querySelector('#submitBtn').textContent = 'Save Record';
      this.clearForm(container);
      // Auto-fill agent name and campaign with logged-in user's info
      const user = this.app.currentUser;
      container.querySelector('#agent_name').value = user.full_name;
      if (user.campaign) {
        container.querySelector('#campaign').value = user.campaign;
        container.querySelector('#campaign').disabled = true;
        container.querySelector('#campaign').classList.add('bg-gray-50', 'text-gray-500', 'cursor-not-allowed');
      } else {
        container.querySelector('#campaign').disabled = false;
        container.querySelector('#campaign').classList.remove('bg-gray-50', 'text-gray-500', 'cursor-not-allowed');
      }
      container.querySelector('#modal').classList.remove('hidden');
    });

    // Close modal
    container.querySelector('#closeModal').addEventListener('click', () => {
      container.querySelector('#modal').classList.add('hidden');
    });
    container.querySelector('#cancelBtn').addEventListener('click', () => {
      container.querySelector('#modal').classList.add('hidden');
    });

    // Close modal on backdrop click
    container.querySelector('#modal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#modal')) {
        container.querySelector('#modal').classList.add('hidden');
      }
    });

    // Form submit
    container.querySelector('#recordForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formError = container.querySelector('#formError');
      formError.classList.add('hidden');

      const data = {
        contact_date: container.querySelector('#contact_date').value,
        agent_name: container.querySelector('#agent_name').value.trim(),
        campaign: container.querySelector('#campaign').value,
        loan_number: container.querySelector('#loan_number').value.trim(),
        ptp_date: container.querySelector('#ptp_date').value,
        ptp_amount: parseFloat(container.querySelector('#ptp_amount').value),
        remarks: container.querySelector('#remarks').value.trim(),
      };

      const submitBtn = container.querySelector('#submitBtn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving...';

      try {
        if (this.editingId) {
          await updateRecord(this.editingId, data);
        } else {
          await createRecord(data);
        }
        container.querySelector('#modal').classList.add('hidden');
        await this.loadRecords(container);
      } catch (error) {
        formError.textContent = error.message;
        formError.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = this.editingId ? 'Update Record' : 'Save Record';
      }
    });

    // Delete modal buttons
    container.querySelector('#cancelDelete').addEventListener('click', () => {
      container.querySelector('#deleteModal').classList.add('hidden');
    });
    container.querySelector('#deleteModal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#deleteModal')) {
        container.querySelector('#deleteModal').classList.add('hidden');
      }
    });

    // Search
    container.querySelector('#searchInput').addEventListener('input', (e) => {
      this.filterRecords(container, e.target.value);
    });

    // Campaign filter buttons
    container.querySelectorAll('.campaign-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const campaign = btn.dataset.campaign;
        const user = this.app.currentUser;
        
        // Non-admin users can only filter by their assigned campaign
        if (user.role !== 'admin' && user.campaign) {
          // Only allow filtering by their assigned campaign
          if (campaign !== 'all' && campaign !== user.campaign) {
            // Scroll to their campaign filter and trigger it instead
            const theirBtn = Array.from(container.querySelectorAll('.campaign-filter-btn')).find(
              b => b.dataset.campaign === user.campaign
            );
            if (theirBtn) {
              theirBtn.click();
            }
            return;
          }
          // If clicking 'all', treat as their campaign
          if (campaign === 'all') {
            campaign = user.campaign;
          }
        }
        
        // Update button styles
        container.querySelectorAll('.campaign-filter-btn').forEach(b => {
          b.style.background = '#eef2f6';
          b.style.color = '#1e293b';
          // Disable campaign buttons for non-admins (except their own)
          if (user.role !== 'admin' && b.dataset.campaign !== 'all' && b.dataset.campaign !== user.campaign) {
            b.style.opacity = '0.5';
            b.style.pointerEvents = 'none';
          } else {
            b.style.opacity = '1';
            b.style.pointerEvents = 'auto';
          }
        });
        
        if (campaign === 'all') {
          btn.style.background = '#eef2f6';
          btn.style.color = '#1e293b';
        } else {
          btn.style.background = '#5c52ff';
          btn.style.color = 'white';
        }
        
        this.filterRecords(container, campaign === 'all' ? user.campaign || '' : campaign);
      });
    });

  }

  clearForm(container) {
    container.querySelector('#contact_date').value = '';
    container.querySelector('#agent_name').value = this.app.currentUser.full_name;
    container.querySelector('#campaign').value = this.app.currentUser.campaign || '';
    container.querySelector('#loan_number').value = '';
    container.querySelector('#ptp_date').value = '';
    container.querySelector('#ptp_amount').value = '';
    container.querySelector('#remarks').value = '';
    container.querySelector('#formError').classList.add('hidden');
  }

  async loadRecords(container) {
    try {
      let data;
      const user = this.app.currentUser;

      // Non-admin users only see records for their assigned campaign.
      if (user.role !== 'admin' && user.campaign) {
        data = await getCampaignRecords(user.campaign);
      } else {
        data = await getRecords();
      }

      this.records = data.records;
      this.renderCampaignStats(container, this.records);
      this.renderTable(container, this.records);
      this.updateStats(container, this.records);
      
      // Initialize filter buttons based on user role
      this.initCampaignFilters(container, user);
    } catch (error) {
      console.error('Failed to load records:', error);
    }
  }

  initCampaignFilters(container, user) {
    const filterContainer = container.querySelector('#campaignFilterButtons');
    const campaignBadge = container.querySelector('#userCampaignBadge');
    const campaignNameEl = container.querySelector('#userCampaignName');

    if (user.role !== 'admin' && user.campaign) {
      // Non-admin user: HIDE filter buttons, SHOW campaign badge
      filterContainer.classList.add('hidden');
      campaignBadge.classList.remove('hidden');
      // Show base campaign name (e.g., "Personal Loan" instead of "Personal Loan - Pre-Charge-Off")
      const baseCampaign = user.campaign.includes(' - ') ? user.campaign.split(' - ')[0] : user.campaign;
      campaignNameEl.textContent = baseCampaign;
      
      // Filter to show only user's base campaign (all buckets)
      this.filterRecords(container, baseCampaign);
    } else if (user.role === 'admin') {
      // Admin: SHOW filter buttons, HIDE campaign badge
      filterContainer.classList.remove('hidden');
      campaignBadge.classList.add('hidden');
    }
  }

  renderCampaignStats(container, records) {
    const statsContainer = container.querySelector('#campaignStats');
    if (!statsContainer) return;

    // Group by campaign
    const grouped = {};
    records.forEach(r => {
      const campaign = r.campaign || 'Unassigned';
      if (!grouped[campaign]) {
        grouped[campaign] = { count: 0, amount: 0 };
      }
      grouped[campaign].count++;
      grouped[campaign].amount += parseFloat(r.ptp_amount || 0);
    });

    // Get unique campaigns sorted
    const campaigns = Object.keys(grouped).sort();
    
    if (campaigns.length === 0) {
      statsContainer.innerHTML = '';
      return;
    }

    statsContainer.innerHTML = campaigns.map(campaign => {
      const data = grouped[campaign];
      const colors = ['blue', 'green', 'purple', 'indigo', 'pink', 'amber'];
      const colorIdx = campaigns.indexOf(campaign) % colors.length;
      const color = colors[colorIdx];
      
      return `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow campaign-stat-card"
             data-campaign="${campaign}">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-${color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-gray-500 truncate">${campaign}</p>
              <p class="text-lg font-bold text-gray-800">${data.count}</p>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-2">₱${data.amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
        </div>
      `;
    }).join('');

    // Add click handlers to campaign stat cards
    statsContainer.querySelectorAll('.campaign-stat-card').forEach(card => {
      card.addEventListener('click', () => {
        const campaign = card.dataset.campaign;
        this.filterRecords(container, campaign);
      });
    });
  }

  renderTable(container, records, filterCampaign = null) {
    const campaignSections = container.querySelector('#campaignSections');
    const allRecordsTable = container.querySelector('#allRecordsTable');
    const tbody = container.querySelector('#recordsTableBody');

    // Group records by campaign
    const grouped = {};
    records.forEach(record => {
      const campaign = record.campaign || 'Unassigned';
      if (!grouped[campaign]) {
        grouped[campaign] = [];
      }
      grouped[campaign].push(record);
    });

    // Clear existing content
    campaignSections.innerHTML = '';

    // Determine display mode
    const campaignKeys = Object.keys(grouped).filter(c => grouped[c].length > 0);
    const showGrouped = campaignKeys.length > 1 && !filterCampaign;
    
    // Update table visibility
    if (showGrouped) {
      allRecordsTable.classList.add('hidden');
      campaignSections.classList.remove('hidden');
    } else {
      allRecordsTable.classList.remove('hidden');
      campaignSections.classList.add('hidden');
    }

    const displayRecords = filterCampaign ? (grouped[filterCampaign] || []) : records;

    if (displayRecords.length === 0 && !filterCampaign) {
      // No records at all
      if (!showGrouped) {
        tbody.innerHTML = `
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
        `;
      }
      return;
    }

    if (showGrouped) {
      // Render campaign sections
      campaignKeys.forEach((campaign, campaignIndex) => {
        const campaignRecords = grouped[campaign];
        const totalAmount = campaignRecords.reduce((sum, r) => sum + (parseFloat(r.ptp_amount) || 0), 0);
        const today = new Date().toISOString().split('T')[0];
        const todayCount = campaignRecords.filter(r => r.ptp_date === today).length;

        const section = document.createElement('div');
        section.className = 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden campaign-section';
        section.dataset.campaign = campaign;
        section.innerHTML = `
          <div class="bg-gradient-to-r from-${getCampaignColor(campaign)}-500 to-${getCampaignColor(campaign)}-600 px-6 py-4 flex justify-between items-center cursor-pointer hover:opacity-90 transition-opacity">
            <div class="flex items-center gap-4">
              <button class="collapse-btn p-1 hover:bg-white/20 rounded transition-colors collapse-btn-closed">
                <svg class="w-5 h-5 text-white collapse-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div>
                <h3 class="text-lg font-bold text-white">${campaign}</h3>
                <p class="text-sm text-white/80">${campaignRecords.length} records · ₱${totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-white/60">${todayCount} today</span>
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
                  ${campaignRecords.map((record, index) => `
                    <tr class="hover:bg-blue-50/50 transition-colors border-b border-gray-50 last:border-0">
                      <td class="px-4 py-3 text-sm text-gray-500 text-center font-medium">${index + 1}</td>
                      <td class="px-4 py-3">
                        <span class="text-sm text-gray-800 font-medium bg-gray-100 px-2 py-1 rounded-md">${record.contact_date || '-'}</span>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-2">
                          <div class="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span class="text-white text-xs font-bold">${record.agent_name?.charAt(0) || '?'}</span>
                          </div>
                          <span class="text-sm text-gray-800 font-medium">${record.agent_name}</span>
                        </div>
                      </td>
                      <td class="px-4 py-3">
                        <span class="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded-md">${record.loan_number}</span>
                      </td>
                      <td class="px-4 py-3">
                        ${record.campaign?.includes('Pre-Charge-Off') ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Pre</span>' : ''}
                        ${record.campaign?.includes('Charge-Off') && !record.campaign?.includes('Pre-Charge-Off') ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Charge</span>' : ''}
                      </td>
                      <td class="px-4 py-3">
                        <span class="text-sm text-gray-800 font-medium bg-amber-50 px-2 py-1 rounded-md">${record.ptp_date || '-'}</span>
                      </td>
                      <td class="px-4 py-3 text-right">
                        <span class="text-sm font-bold text-green-600">₱${parseFloat(record.ptp_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                      </td>
                      <td class="px-4 py-3">
                        <p class="text-sm text-gray-600 max-w-[180px] break-words leading-relaxed">${record.remarks || '-'}</p>
                      </td>
                      <td class="px-4 py-3">
                        <div class="flex gap-1.5 justify-center">
                          <button class="edit-btn px-2 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium text-xs flex items-center gap-1" data-id="${record.id}">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                            Edit
                          </button>
                          <button class="delete-btn px-2 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs flex items-center gap-1" data-id="${record.id}">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
              </tbody>
            </table>
          </div>
        `;

        campaignSections.appendChild(section);

        // Toggle collapse
        const collapseBtn = section.querySelector('.collapse-btn');
        const body = section.querySelector('.campaign-records-body');
        const isInitiallyCollapsed = campaignIndex >= 3; // Collapse older campaigns by default
        if (isInitiallyCollapsed) {
          body.style.display = 'none';
          collapseBtn.classList.add('collapse-btn-closed');
        }

        collapseBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isCollapsed = body.style.display === 'none';
          body.style.display = isCollapsed ? '' : 'none';
          collapseBtn.querySelector('.collapse-icon').style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(-90deg)';
          collapseBtn.classList.toggle('collapse-btn-closed', !isCollapsed);
        });

        // View All - filter to this campaign
        section.querySelector('.view-all-campaign-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.filterRecords(container, campaign);
        });

        // Bind edit/delete buttons
        section.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            this.editRecord(container, id);
          });
        });

        section.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            this.confirmDelete(container, id);
          });
        });
      });
    } else {
      // Render flat table
      if (displayRecords.length === 0 && filterCampaign) {
        tbody.innerHTML = `
          <tr>
            <td colspan="9" class="px-6 py-12 text-center text-gray-500">
              <p class="font-medium">No records for ${filterCampaign}</p>
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = displayRecords.map((record, index) => `
          <tr class="hover:bg-blue-50/50 transition-colors border-b border-gray-100 last:border-0">
            <td class="px-4 py-3 text-sm text-gray-500 text-center font-medium">${index + 1}</td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-medium bg-gray-100 px-2 py-1 rounded-md">${record.contact_date || '-'}</span>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-xs font-bold">${record.agent_name?.charAt(0) || '?'}</span>
                </div>
                <span class="text-sm text-gray-800 font-medium">${record.agent_name}</span>
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="flex flex-col gap-1">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${record.campaign?.includes('Personal Loan') ? 'bg-blue-100 text-blue-700' : record.campaign?.includes('Revi Credit') ? 'bg-green-100 text-green-700' : record.campaign?.includes('GCredit') ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'}">
                  ${record.campaign?.split(' - ')[0] || '-'}
                </span>
                ${record.campaign?.includes('Pre-Charge-Off') ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Pre-Charge-Off</span>' : ''}
                ${record.campaign?.includes('Charge-Off') && !record.campaign?.includes('Pre-Charge-Off') ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>Charge-Off</span>' : ''}
              </div>
            </td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-mono bg-gray-100 px-2 py-1 rounded-md">${record.loan_number}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-sm text-gray-800 font-medium bg-amber-50 px-2 py-1 rounded-md">${record.ptp_date || '-'}</span>
            </td>
            <td class="px-4 py-3 text-right">
              <span class="text-sm font-bold text-green-600">₱${parseFloat(record.ptp_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
            </td>
            <td class="px-4 py-3">
              <p class="text-sm text-gray-600 max-w-[200px] break-words leading-relaxed">${record.remarks || '-'}</p>
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-1.5 justify-center">
                <button class="edit-btn px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all font-medium text-xs flex items-center gap-1" data-id="${record.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  Edit
                </button>
                <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all font-medium text-xs flex items-center gap-1" data-id="${record.id}">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        `).join('');
      }

      // Bind edit/delete buttons
      tbody.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          this.editRecord(container, id);
        });
      });

      tbody.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          this.confirmDelete(container, id);
        });
      });
    }
  }

  updateStats(container, records) {
    const total = records.length;
    const totalAmount = records.reduce((sum, r) => sum + (parseFloat(r.ptp_amount) || 0), 0);
    const today = new Date().toISOString().split('T')[0];
    const todayCount = records.filter(r => r.ptp_date === today).length;

    container.querySelector('#totalRecords').textContent = total;
    container.querySelector('#totalAmount').textContent = '₱' + totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 });
    container.querySelector('#todayCount').textContent = todayCount;
  }

  editRecord(container, id) {
    const record = this.records.find(r => r.id === id);
    if (!record) return;

    this.editingId = id;
    container.querySelector('#modalTitle').textContent = 'Edit Record';
    container.querySelector('#submitBtn').textContent = 'Update Record';
    
    const user = this.app.currentUser;
    // Lock campaign for non-admin users (they can only see/edit their assigned campaign)
    if (user.role !== 'admin') {
      container.querySelector('#campaign').disabled = true;
      container.querySelector('#campaign').classList.add('bg-gray-50', 'text-gray-500', 'cursor-not-allowed');
    } else {
      container.querySelector('#campaign').disabled = false;
      container.querySelector('#campaign').classList.remove('bg-gray-50', 'text-gray-500', 'cursor-not-allowed');
    }
    
    container.querySelector('#contact_date').value = record.contact_date || '';
    container.querySelector('#agent_name').value = record.agent_name;
    container.querySelector('#campaign').value = record.campaign || '';
    container.querySelector('#loan_number').value = record.loan_number;
    container.querySelector('#ptp_date').value = record.ptp_date || '';
    container.querySelector('#ptp_amount').value = record.ptp_amount;
    container.querySelector('#remarks').value = record.remarks || '';
    container.querySelector('#formError').classList.add('hidden');
    container.querySelector('#modal').classList.remove('hidden');
  }

  confirmDelete(container, id) {
    const deleteModal = container.querySelector('#deleteModal');
    deleteModal.classList.remove('hidden');

    const confirmBtn = container.querySelector('#confirmDelete');
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener('click', async () => {
      try {
        await deleteRecord(id);
        deleteModal.classList.add('hidden');
        await this.loadRecords(container);
      } catch (error) {
        alert('Failed to delete record');
      }
    });
  }

  filterRecords(container, query) {
    if (!query) {
      // Show all records grouped
      this.renderTable(container, this.records);
      return;
    }

    // Check if it's a campaign name
    const matchingCampaign = this.records.find(r => 
      r.campaign && r.campaign.toLowerCase() === query.toLowerCase()
    );

    if (matchingCampaign) {
      // Filter to specific campaign
      const filtered = this.records.filter(r => 
        r.campaign && r.campaign.toLowerCase() === query.toLowerCase()
      );
      this.renderTable(container, this.records, query);
      return;
    }

    // Regular text search
    const filtered = this.records.filter(r =>
      r.agent_name.toLowerCase().includes(query.toLowerCase()) ||
      (r.campaign && r.campaign.toLowerCase().includes(query.toLowerCase())) ||
      r.loan_number.toLowerCase().includes(query.toLowerCase()) ||
      (r.remarks && r.remarks.toLowerCase().includes(query.toLowerCase())) ||
      (r.contact_date && r.contact_date.includes(query)) ||
      (r.ptp_date && r.ptp_date.includes(query))
    );
    this.renderTable(container, filtered);
  }
}

function getCampaignColor(campaign) {
  const colors = {
    'Personal Loan': 'blue',
    'Revi Credit': 'green',
    'LazPay': 'purple',
    'GCredit': 'indigo'
  };
  return colors[campaign] || 'gray';
}
