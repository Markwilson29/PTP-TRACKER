import { getUsers, createUser, updateUserCampaign, deleteUser, changePassword, logout } from '../api.js';
import { baseCampaignOptions, campaignBucketOptions, buildAssignedCampaign } from '../campaigns.js';
import { Layout } from '../layout.js';

export class AdminPage {
  constructor(app) {
    this.app = app;
    this.users = [];
  }

  render() {
    const user = this.app.currentUser;

    const sidebarItems = [
      { label: 'PTP Backlog', path: '/dashboard', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"/></svg>' },
      { label: 'Confirmed Monitoring', path: '/confirmed', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' },
      { label: 'Admin Panel', path: '/admin', active: true, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>' },
    ];

    const layout = new Layout(this.app, sidebarItems);

    const mainContent = `
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
                ${baseCampaignOptions()}
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
                ${baseCampaignOptions()}
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
                  ${baseCampaignOptions()}
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
    `;

    const fullContainer = layout.render(mainContent);
    this.bindEvents(fullContainer);
    this.loadUsers(fullContainer);
    return fullContainer;
  }

  bindEvents(container) {
    // Add user button
    container.querySelector('#addUserBtn').addEventListener('click', () => {
      container.querySelector('#userForm').reset();
      container.querySelector('#formError').classList.add('hidden');
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
      formError.classList.add('hidden');

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
        await this.loadUsers(container);
      } catch (error) {
        formError.textContent = error.message;
        formError.classList.remove('hidden');
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

    // Edit user form submit
    container.querySelector('#editUserForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const editFormError = container.querySelector('#editFormError');
      editFormError.classList.add('hidden');

      const userId = container.querySelector('#editUserId').value;
      const data = {
        full_name: container.querySelector('#edit_full_name').value.trim(),
        username: container.querySelector('#edit_username').value.trim(),
        role: container.querySelector('#edit_role').value,
        campaign: container.querySelector('#edit_campaign').value,
      };

      const submitBtn = container.querySelector('#submitEditUserBtn');
      submitBtn.disabled = true;        submitBtn.textContent = 'Updating...';

      try {
        // Note: We don't have a direct update user endpoint, so we update fields individually
        await updateUserCampaign(userId, data.campaign);
        await this.loadUsers(container);
        container.querySelector('#editUserModal').classList.add('hidden');
      } catch (error) {
        editFormError.textContent = error.message;
        editFormError.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Save Changes';
      }
    });

    // Campaign modal
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

    // Base campaign change
    container.querySelector('#assign_base_campaign').addEventListener('change', () => {
      const baseCampaign = container.querySelector('#assign_base_campaign').value;       const bucketSelect = container.querySelector('#assign_bucket');
      const submitBtn = container.querySelector('#submitCampaignBtn');

      if (!baseCampaign) {
        bucketSelect.innerHTML = '<option value="">Select base first</option>';
        bucketSelect.disabled = true;
        submitBtn.disabled = true;
        return;
      }

      const { bucketOptions } = campaignBucketOptions(baseCampaign);
      bucketSelect.innerHTML = bucketOptions;
      bucketSelect.disabled = false;
      submitBtn.disabled = true;  // Disable submit until bucket is selected
    });

    // Bucket change - enable submit only when both base and bucket are selected
    container.querySelector('#assign_bucket').addEventListener('change', () => {
      const baseCampaign = container.querySelector('#assign_base_campaign').value;
      const bucket = container.querySelector('#assign_bucket').value;
      const submitBtn = container.querySelector('#submitCampaignBtn');

      submitBtn.disabled = !(baseCampaign && bucket);
    });

    // Campaign form submit
    container.querySelector('#campaignForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const campaignError = container.querySelector('#campaignError');
      campaignError.classList.add('hidden');

      const userId = container.querySelector('#campaignForm').dataset.userId;
      const baseCampaign = container.querySelector('#assign_base_campaign').value;
      const bucket = container.querySelector('#assign_bucket').value;

      if (!baseCampaign || !bucket) {
        campaignError.textContent = 'Please select a campaign and a bucket.';
        campaignError.classList.remove('hidden');
        return;
      }

      const campaign = buildAssignedCampaign(baseCampaign, bucket);

      if (!campaign) {
        campaignError.textContent = 'Invalid campaign selection. Please try again.';
        campaignError.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update Campaign';
        return;
      }

      const submitBtn = container.querySelector('#submitCampaignBtn');
      submitBtn.disabled = true;        submitBtn.textContent = 'Updating...';

      try {
        await updateUserCampaign(userId, campaign);
        
        // Show success feedback
        const currentUser = this.users.find(u => u.id === Number(userId));
        const successMsg = `Campaign updated: ${currentUser?.full_name} → ${campaign}`;          campaignError.textContent = successMsg;
          campaignError.className = campaignError.className.replace('hidden bg-red-50 border-red-200 text-red-700', 'bg-green-50 border-green-200 text-green-700');
          campaignError.classList.remove('hidden');
          
          // Hide modal and reload after short delay to show success
          const successTimer = setTimeout(() => {
            container.querySelector('#campaignModal').classList.add('hidden');
            campaignError.classList.add('hidden');
            campaignError.className = campaignError.className.replace('bg-green-50 border-green-200 text-green-700', 'bg-red-50 border-red-200 text-red-700');
          }, 1200);
          
          // Immediately reload users list for instant feedback
          try {
            await this.loadUsers(container);
          } catch (loadError) {
            console.warn('User list reload failed:', loadError.message);
          }
          
          clearTimeout(successTimer);
      } catch (error) {
        campaignError.textContent = error.message;
        campaignError.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update Campaign';
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
      passwordError.classList.add('hidden');

      const userId = container.querySelector('#passwordForm').dataset.userId;
      const newPassword = container.querySelector('#new_password').value;
      const confirmPassword = container.querySelector('#confirm_password').value;

      if (newPassword !== confirmPassword) {
        passwordError.textContent = 'Passwords do not match';
        passwordError.classList.remove('hidden');
        return;
      }

      const submitBtn = container.querySelector('#submitPasswordBtn');
      submitBtn.disabled = true;        submitBtn.textContent = 'Updating...';

      try {
        await changePassword(userId, newPassword);
        container.querySelector('#passwordModal').classList.add('hidden');
      } catch (error) {
        passwordError.textContent = error.message;
        passwordError.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Update Password';
      }
    });
  }

  async loadUsers(container) {
    try {
      const data = await getUsers();
      this.users = data.users;
      this.renderTable(container, this.users);
      this.updateStats(container, this.users);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
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
      <tr class="hover:bg-gray-50 transition-colors">
        <td class="px-6 py-4 text-sm text-gray-500">${index + 1}</td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 ${u.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'} rounded-full flex items-center justify-center">
              <span class="${u.role === 'admin' ? 'text-purple-700' : 'text-blue-700'} font-bold text-sm">${u.full_name.charAt(0)}</span>
            </div>
            <span class="text-sm font-medium text-gray-800">${u.full_name}</span>
            ${u.id === currentUserId ? '<span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">You</span>' : ''}
          </div>
        </td>
        <td class="px-6 py-4 text-sm text-gray-600 font-mono">${u.username}</td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
            ${u.role === 'admin' ? 'Admin' : 'User'}
          </span>
        </td>
        <td class="px-6 py-4">
          ${u.campaign ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${u.campaign}</span>` : '<span class="text-xs text-gray-400 italic">Not assigned</span>'}
        </td>
        <td class="px-6 py-4 text-sm text-gray-500">${u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</td>
        <td class="px-6 py-4 text-sm">
          <div class="flex gap-2">
            <button class="edit-user-btn px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium" data-id="${u.id}">Edit</button>
            <button class="assign-campaign-btn px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium" data-id="${u.id}">Campaign</button>
            <button class="reset-password-btn px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors font-medium" data-id="${u.id}">Password</button>
            ${u.id !== currentUserId ? `
              <button class="delete-user-btn px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium" data-id="${u.id}">Delete</button>
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
    container.querySelector('#edit_campaign').value = user.campaign || '';
    container.querySelector('#editFormError').classList.add('hidden');
    container.querySelector('#editUserModal').classList.remove('hidden');
  }

  openResetPasswordModal(container, id) {
    const user = this.users.find(u => u.id === id);
    if (!user) return;

    const passwordForm = container.querySelector('#passwordForm');
    passwordForm.dataset.userId = id;
    container.querySelector('#password_user_name').value = `${user.full_name} (${user.username})`;
    container.querySelector('#passwordError').classList.add('hidden');
    container.querySelector('#passwordModal').classList.remove('hidden');
    container.querySelector('#new_password').focus();
  }

  openCampaignModal(container, id) {
    const user = this.users.find(u => u.id === id);
    if (!user) return;

    const campaignForm = container.querySelector('#campaignForm');
    campaignForm.dataset.userId = id;
    container.querySelector('#campaign_user_name').value = `${user.full_name} (${user.username})`;

    const existingCampaign = user.campaign || '';
    let baseCampaign = '';      let bucket = '';
    if (existingCampaign) {
      const idx = existingCampaign.lastIndexOf(' - ');
      if (idx > 0) {
        baseCampaign = existingCampaign.slice(0, idx);
        bucket = existingCampaign.slice(idx + 3);
      }
    }

    container.querySelector('#assign_base_campaign').value = baseCampaign;
    container.querySelector('#campaignError').classList.add('hidden');

    if (baseCampaign) {
      const { bucketOptions } = campaignBucketOptions(baseCampaign);
      container.querySelector('#assign_bucket').innerHTML = bucketOptions;
      container.querySelector('#assign_bucket').disabled = false;
      container.querySelector('#assign_bucket').value = bucket;
      container.querySelector('#submitCampaignBtn').disabled = false;
    } else {
      container.querySelector('#assign_bucket').innerHTML = '<option value="">Select base first</option>';
      container.querySelector('#assign_bucket').disabled = true;
      container.querySelector('#submitCampaignBtn').disabled = true;
    }

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
        await this.loadUsers(container);
      } catch (error) {
        alert('Failed to delete user: ' + error.message);
      }
    });
  }
}
