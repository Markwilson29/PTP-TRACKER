import { getUsers, createUser, updateUser, updateUserAssignment, deleteUser, changePassword, logout, getCampaignsConfig } from '../api.js';
import { Layout } from '../layout.js';

export class AdminPage {
  constructor(app) {
    this.app = app;
    this.container = null;
    this.users = [];
    this.campaigns = []; // campaigns-config: [{ id, name, buckets: [{id, name}], assignments: [...] }]
  }

  render() {
    const user = this.app.currentUser;

    const sidebarItems = [
      { label: 'PTP Backtrack', path: '/dashboard', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>' },
      { label: 'Campaigns & Columns', path: '/campaigns', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>' },
      { label: 'Users & Agents', path: '/admin', active: true, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>' },
    ];

    const layout = new Layout(this.app, sidebarItems);

    const mainContent = `
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
    `;

    const fullContainer = layout.render(mainContent);
    this.container = fullContainer;
    this.bindEvents(fullContainer);
    this.loadData(fullContainer);
    return fullContainer;
  }

  // ─── Data loading ───

  async loadData(container) {
    try {
      const [usersData, campaignsData] = await Promise.all([getUsers(), getCampaignsConfig()]);
      this.users = usersData.users || [];
      this.campaigns = campaignsData.campaigns || [];
      this.populateCampaignSelects(container);
      this.renderTable(container, this.users);
      this.updateStats(container, this.users);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    }
  }

  /** Fill all campaign dropdowns from the live campaigns-config. */
  populateCampaignSelects(container) {
    const options = (selectedName = '') =>
      '<option value="">No Campaign</option>' +
      this.campaigns
        .map((cm) => `<option value="${cm.name}"${cm.name === selectedName ? ' selected' : ''}>${cm.name}</option>`)
        .join('');

    const addSelect = container.querySelector('#user_campaign');
    if (addSelect) addSelect.innerHTML = options();

    const editSelect = container.querySelector('#edit_campaign');
    if (editSelect) editSelect.innerHTML = options(editSelect.dataset.selected || '');

    const assignSelect = container.querySelector('#assign_campaign');
    if (assignSelect) {
      assignSelect.innerHTML =
        '<option value="">No Campaign</option>' +
        this.campaigns
          .map((cm) => `<option value="${cm.id}"${String(cm.id) === assignSelect.dataset.selected ? ' selected' : ''}>${cm.name}</option>`)
          .join('');
    }
  }

  /** Show a page-level toast at the top of the screen. type: 'success' | 'error' */
  showToast(message, type = 'success') {
    const host = this.container?.querySelector('#toastContainer');
    if (!host) return;

    const toast = document.createElement('div');
    toast.className = `flex items-center gap-2.5 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-2xl border transition-all duration-300 opacity-0 -translate-y-2 ${
      type === 'error' ? 'bg-red-600 border-red-500' : 'bg-green-600 border-green-500'
    }`;
    toast.innerHTML = `
      <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        ${type === 'error'
          ? '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>'
          : '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>'}
      </svg>
      <span class="toast-msg"></span>`;
    toast.querySelector('.toast-msg').textContent = message;

    host.appendChild(toast);
    requestAnimationFrame(() => toast.classList.remove('opacity-0', '-translate-y-2'));

    setTimeout(() => {
      toast.classList.add('opacity-0', '-translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  showModalMessage(el, text, ok = false) {
    el.textContent = text;
    el.className = ok
      ? 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm'
      : 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm';
    el.classList.remove('hidden');
  }

  hideModalMessage(el) {
    el.classList.add('hidden');
  }

  // ─── Events ───

  bindEvents(container) {
    // Add user button
    container.querySelector('#addUserBtn').addEventListener('click', () => {
      container.querySelector('#userForm').reset();
      container.querySelector('#user_campaign').value = '';
      this.hideModalMessage(container.querySelector('#formError'));
      container.querySelector('#userModal').classList.remove('hidden');
    });

    // Close user modal
    container.querySelector('#closeUserModal').addEventListener('click', () => {
      container.querySelector('#userModal').classList.add('hidden');
    });
    container.querySelector('#cancelUserBtn').addEventListener('click', () => {
      container.querySelector('#userModal').classList.add('hidden');
    });
    container.querySelector('#userModal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#userModal')) {
        container.querySelector('#userModal').classList.add('hidden');
      }
    });

    // Add user form submit
    container.querySelector('#userForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formError = container.querySelector('#formError');
      this.hideModalMessage(formError);

      const data = {
        full_name: container.querySelector('#full_name').value.trim(),
        username: container.querySelector('#username').value.trim(),
        password: container.querySelector('#password').value,
        role: container.querySelector('#role').value,
        campaign: container.querySelector('#user_campaign').value,
      };

      const submitBtn = container.querySelector('#submitUserBtn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating...';

      try {
        await createUser(data);
        container.querySelector('#userModal').classList.add('hidden');
        await this.loadData(container);
        this.showToast(`User "${data.username}" created`);
      } catch (error) {
        this.showModalMessage(formError, error.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create User';
      }
    });

    // Edit user modal
    container.querySelector('#closeEditUserModal').addEventListener('click', () => {
      container.querySelector('#editUserModal').classList.add('hidden');
    });
    container.querySelector('#cancelEditUserBtn').addEventListener('click', () => {
      container.querySelector('#editUserModal').classList.add('hidden');
    });
    container.querySelector('#editUserModal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#editUserModal')) {
        container.querySelector('#editUserModal').classList.add('hidden');
      }
    });

    // Edit user form submit — saves ALL fields (name, username, role, campaign)
    container.querySelector('#editUserForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const editFormError = container.querySelector('#editFormError');
      this.hideModalMessage(editFormError);

      const userId = container.querySelector('#editUserId').value;
      const data = {
        full_name: container.querySelector('#edit_full_name').value.trim(),
        username: container.querySelector('#edit_username').value.trim(),
        role: container.querySelector('#edit_role').value,
        campaign: container.querySelector('#edit_campaign').value,
      };

      const submitBtn = container.querySelector('#submitEditUserBtn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Updating...';

      try {
        await updateUser(userId, data);
        container.querySelector('#editUserModal').classList.add('hidden');
        await this.loadData(container);
        this.showToast(`User "${data.username}" updated`);
      } catch (error) {
        this.showModalMessage(editFormError, error.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Changes';
      }
    });

    // Assignment modal open/close
    container.querySelector('#closeCampaignModal').addEventListener('click', () => {
      container.querySelector('#campaignModal').classList.add('hidden');
    });
    container.querySelector('#cancelCampaignBtn').addEventListener('click', () => {
      container.querySelector('#campaignModal').classList.add('hidden');
    });
    container.querySelector('#campaignModal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#campaignModal')) {
        container.querySelector('#campaignModal').classList.add('hidden');
      }
    });

    // Campaign change → load that campaign's buckets
    container.querySelector('#assign_campaign').addEventListener('change', () => {
      const campaignId = container.querySelector('#assign_campaign').value;
      const bucketSelect = container.querySelector('#assign_bucket');

      if (!campaignId) {
        bucketSelect.innerHTML = '<option value="">Select a campaign first</option>';
        bucketSelect.disabled = true;
        return;
      }

      const campaign = this.campaigns.find((cm) => String(cm.id) === String(campaignId));
      const buckets = campaign ? campaign.buckets : [];
      bucketSelect.innerHTML =
        '<option value="">No bucket</option>' +
        buckets.map((b) => `<option value="${b.id}">${b.name}</option>`).join('');
      bucketSelect.disabled = buckets.length === 0;
      bucketSelect.value = '';
    });

    // Assignment form submit
    container.querySelector('#campaignForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const campaignError = container.querySelector('#campaignError');
      this.hideModalMessage(campaignError);

      const userId = container.querySelector('#campaignForm').dataset.userId;
      const campaignId = container.querySelector('#assign_campaign').value || null;
      const bucketId = container.querySelector('#assign_bucket').value || null;

      const submitBtn = container.querySelector('#submitCampaignBtn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Updating...';

      try {
        await updateUserAssignment(userId, campaignId, bucketId);

        // Close immediately and confirm with a page-level toast
        const user = this.users.find((u) => String(u.id) === String(userId));
        const campaign = this.campaigns.find((cm) => String(cm.id) === String(campaignId));
        const bucket = campaign && bucketId ? (campaign.buckets || []).find((b) => String(b.id) === String(bucketId)) : null;
        const label = campaign
          ? `${user?.full_name || 'User'} → ${campaign.name}${bucket ? ' · ' + bucket.name : ''}`
          : `${user?.full_name || 'User'} → No Campaign`;

        container.querySelector('#campaignModal').classList.add('hidden');
        this.hideModalMessage(campaignError);
        this.resetSubmitBtn('#submitCampaignBtn', 'Update Assignment');

        await this.loadData(container);
        this.showToast(label);
      } catch (error) {
        this.showModalMessage(campaignError, error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update Assignment';
      }
    });

    // Delete user modal
    container.querySelector('#cancelDeleteUser').addEventListener('click', () => {
      container.querySelector('#deleteUserModal').classList.add('hidden');
    });
    container.querySelector('#deleteUserModal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#deleteUserModal')) {
        container.querySelector('#deleteUserModal').classList.add('hidden');
      }
    });

    // Logout
    container.querySelector('#logoutBtn').addEventListener('click', async () => {
      await logout();
      this.app.logout();
    });

    // Reset password modal
    container.querySelector('#closePasswordModal').addEventListener('click', () => {
      container.querySelector('#passwordModal').classList.add('hidden');
    });
    container.querySelector('#cancelPasswordBtn').addEventListener('click', () => {
      container.querySelector('#passwordModal').classList.add('hidden');
    });
    container.querySelector('#passwordModal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#passwordModal')) {
        container.querySelector('#passwordModal').classList.add('hidden');
      }
    });

    container.querySelector('#passwordForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const passwordError = container.querySelector('#passwordError');
      this.hideModalMessage(passwordError);

      const userId = container.querySelector('#passwordForm').dataset.userId;
      const newPassword = container.querySelector('#new_password').value;
      const confirmPassword = container.querySelector('#confirm_password').value;

      if (newPassword !== confirmPassword) {
        this.showModalMessage(passwordError, 'Passwords do not match');
        return;
      }

      const submitBtn = container.querySelector('#submitPasswordBtn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Updating...';

      try {
        await changePassword(userId, newPassword);
        container.querySelector('#passwordModal').classList.add('hidden');
        const user = this.users.find((u) => String(u.id) === String(userId));
        this.showToast(`Password updated for ${user?.full_name || 'user'}`);
      } catch (error) {
        this.showModalMessage(passwordError, error.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update Password';
      }
    });
  }

  renderTable(container, users) {
    const tbody = container.querySelector('#usersTableBody');
    const currentUserId = this.app.currentUser.id;

    if (users.length === 0) {
      tbody.innerHTML = `
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
      `;
      return;
    }

    tbody.innerHTML = users.map((u, index) => `
      <tr class="hover:bg-violet-50/40 transition-colors">
        <td class="px-4 py-3 text-sm text-gray-500">${index + 1}</td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 ${u.role === 'admin' ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-purple-200' : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-200'} rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-sm">${u.full_name.charAt(0)}</span>
            </div>
            <span class="text-sm font-medium text-gray-900">${u.full_name}</span>
            ${u.id === currentUserId ? '<span class="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">You</span>' : ''}
          </div>
        </td>
        <td class="px-4 py-3 text-sm text-gray-600 font-mono break-all">${u.username}</td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
            ${u.role === 'admin' ? 'Admin' : 'User'}
          </span>
        </td>
        <td class="px-4 py-3">
          ${u.campaign ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${u.campaign}</span>` : '<span class="text-xs text-gray-400 italic">Not assigned</span>'}
        </td>
        <td class="px-4 py-3 text-sm text-gray-500">${u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</td>
        <td class="px-4 py-3 text-sm">
          <div class="flex flex-wrap gap-1.5">
            <button class="edit-user-btn px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium" data-id="${u.id}">Edit</button>
            <button class="assign-campaign-btn px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium" data-id="${u.id}">Campaign</button>
            <button class="reset-password-btn px-2.5 py-1 text-xs bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium" data-id="${u.id}">Password</button>
            ${u.id !== currentUserId ? `
              <button class="delete-user-btn px-2.5 py-1 text-xs bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium" data-id="${u.id}">Delete</button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');

    // Bind edit user buttons
    tbody.querySelectorAll('.edit-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        this.openEditUserModal(container, id);
      });
    });

    // Bind assign campaign buttons
    tbody.querySelectorAll('.assign-campaign-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        this.openCampaignModal(container, id);
      });
    });

    // Bind reset password buttons
    tbody.querySelectorAll('.reset-password-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        this.openResetPasswordModal(container, id);
      });
    });

    // Bind delete buttons
    tbody.querySelectorAll('.delete-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        this.confirmDelete(container, id);
      });
    });
  }

  updateStats(container, users) {
    const total = users.length;
    const admins = users.filter(u => u.role === 'admin').length;
    const regular = users.filter(u => u.role === 'user').length;

    container.querySelector('#totalUsers').textContent = total;
    container.querySelector('#adminCount').textContent = admins;
    container.querySelector('#userCount').textContent = regular;
  }

  openEditUserModal(container, id) {
    const user = this.users.find(u => u.id === id);
    if (!user) return;

    container.querySelector('#editUserId').value = id;
    container.querySelector('#edit_full_name').value = user.full_name;
    container.querySelector('#edit_username').value = user.username;
    container.querySelector('#edit_role').value = user.role;
    const editSelect = container.querySelector('#edit_campaign');
    editSelect.dataset.selected = user.campaign || '';
    editSelect.innerHTML =
      '<option value="">No Campaign</option>' +
      this.campaigns
        .map((cm) => `<option value="${cm.name}"${cm.name === user.campaign ? ' selected' : ''}>${cm.name}</option>`)
        .join('');
    this.hideModalMessage(container.querySelector('#editFormError'));
    this.resetSubmitBtn('#submitEditUserBtn', 'Save Changes');
    container.querySelector('#editUserModal').classList.remove('hidden');
  }

  openResetPasswordModal(container, id) {
    const user = this.users.find(u => u.id === id);
    if (!user) return;

    const passwordForm = container.querySelector('#passwordForm');
    passwordForm.dataset.userId = id;
    container.querySelector('#password_user_name').value = `${user.full_name} (${user.username})`;
    this.hideModalMessage(container.querySelector('#passwordError'));
    container.querySelector('#new_password').value = '';
    container.querySelector('#confirm_password').value = '';
    this.resetSubmitBtn('#submitPasswordBtn', 'Update Password');
    container.querySelector('#passwordModal').classList.remove('hidden');
    container.querySelector('#new_password').focus();
  }

  /** Reset a modal's submit button to its idle state. */
  resetSubmitBtn(selector, label) {
    const btn = this.container.querySelector(selector);
    if (btn) {
      btn.disabled = false;
      btn.textContent = label;
    }
  }

  openCampaignModal(container, id) {
    const user = this.users.find(u => u.id === id);
    if (!user) return;

    const campaignForm = container.querySelector('#campaignForm');
    campaignForm.dataset.userId = id;
    container.querySelector('#campaign_user_name').value = `${user.full_name} (${user.username})`;
    this.hideModalMessage(container.querySelector('#campaignError'));

    const campaignSelect = container.querySelector('#assign_campaign');
    const bucketSelect = container.querySelector('#assign_bucket');

    // Preselect the user's current campaign + bucket (from campaigns-config)
    const currentCampaign = this.campaigns.find((cm) => cm.name === user.campaign);
    if (currentCampaign) {
      campaignSelect.innerHTML =
        '<option value="">No Campaign</option>' +
        this.campaigns
          .map((cm) => `<option value="${cm.id}"${cm.id === currentCampaign.id ? ' selected' : ''}>${cm.name}</option>`)
          .join('');

      const assignment = (currentCampaign.assignments || []).find((a) => String(a.user_id) === String(user.id));
      const buckets = currentCampaign.buckets || [];
      bucketSelect.innerHTML =
        '<option value="">No bucket</option>' +
        buckets.map((b) => `<option value="${b.id}"${assignment && assignment.bucket_id === b.id ? ' selected' : ''}>${b.name}</option>`).join('');
      bucketSelect.disabled = buckets.length === 0;
    } else {
      campaignSelect.innerHTML =
        '<option value="">No Campaign</option>' +
        this.campaigns.map((cm) => `<option value="${cm.id}">${cm.name}</option>`).join('');
      campaignSelect.value = '';
      bucketSelect.innerHTML = '<option value="">Select a campaign first</option>';
      bucketSelect.disabled = true;
    }

    // Reset submit button (may have been left "Updating..." from a previous save)
    this.resetSubmitBtn('#submitCampaignBtn', 'Update Assignment');

    container.querySelector('#campaignModal').classList.remove('hidden');
  }

  confirmDelete(container, id) {
    const deleteModal = container.querySelector('#deleteUserModal');
    deleteModal.classList.remove('hidden');

    const confirmBtn = container.querySelector('#confirmDeleteUser');
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener('click', async () => {
      try {
        await deleteUser(id);
        deleteModal.classList.add('hidden');
        await this.loadData(container);
        this.showToast('User deleted');
      } catch (error) {
        deleteModal.classList.add('hidden');
        this.showToast('Failed to delete user: ' + error.message, 'error');
      }
    });
  }
}
