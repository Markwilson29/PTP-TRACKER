import {
  getCampaignsConfig, createCampaign, updateCampaign, deleteCampaign,
  addBucket, updateBucket, deleteBucket,
  getColumns, createColumn, updateColumn, deleteColumn,
  updateAssignments, getUsers, logout,
} from '../api.js';
import { clearTableColumnsCache } from '../dynamic-columns.js';
import { Layout } from '../layout.js';

const COLUMN_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'amount', label: 'Money' },
  { value: 'date', label: 'Date' },
];

const COLUMN_ROLES = [
  { value: '', label: 'No role' },
  { value: 'agent', label: 'Agent name (auto-fill)' },
  { value: 'amount', label: 'Amount (feeds Total)' },
  { value: 'date', label: 'Date (feeds "Today")' },
];

export class CampaignsPage {
  constructor(app) {
    this.app = app;
    this.campaigns = [];
    this.columns = [];
    this.users = [];
    this.expandedId = null;
    this.renamingId = null;
    this.container = null;
  }

  render() {
    const sidebarItems = [
      { label: 'PTP Backtrack', path: '/dashboard', active: false, icon: this.icon('grid') },
      { label: 'Campaigns & Columns', path: '/campaigns', active: true, icon: this.icon('tag') },
      { label: 'Users & Agents', path: '/admin', active: false, icon: this.icon('users') },
    ];

    const layout = new Layout(this.app, sidebarItems);

    const mainContent = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
          </div>
          <div>
            <p class="text-xs font-bold tracking-widest text-indigo-500 uppercase">Admin</p>
            <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Campaigns &amp; Columns</h2>
            <p class="text-gray-500 text-sm mt-0.5">Define the tracker table columns and manage campaigns, buckets, and agents.</p>
          </div>
        </div>

        <!-- Table Columns (global) -->
        <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 mt-6 relative overflow-hidden">
          <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          <div class="flex items-center gap-2 mb-1">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <h3 class="text-lg font-bold text-gray-900">Table Columns</h3>
          </div>
          <p class="text-sm text-gray-400 mb-4">These columns appear in the PTP Backtrack and Confirmed Tracker tables. Every field in a record is defined here.</p>

          <div class="space-y-2 mb-4" id="columnList">
            <div class="text-sm text-gray-400">Loading columns…</div>
          </div>

          <div class="flex flex-wrap gap-2 items-center pt-3 border-t border-gray-100">
            <input type="text" placeholder="New column name" class="new-col-input flex-1 min-w-[180px] px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none" />
            <select class="new-col-type text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
              ${COLUMN_TYPES.map((t) => `<option value="${t.value}">${t.label}</option>`).join('')}
            </select>
            <select class="new-col-role text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none" title="Role drives automatic behavior">
              ${COLUMN_ROLES.map((r) => `<option value="${r.value}">${r.label}</option>`).join('')}
            </select>
            <select class="new-col-applies text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
              <option value="both" selected>Both tables</option>
              <option value="ptp">PTP Backtrack only</option>
              <option value="confirmed">Confirmed only</option>
            </select>
            <label class="inline-flex items-center gap-1.5 text-sm text-gray-600">
              <input type="checkbox" class="new-col-required accent-indigo-500" /> Required
            </label>
            <button class="add-col-btn h-10 px-5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-500/30">+ Add Column</button>
          </div>
        </div>

        <!-- Campaigns -->
        <div class="flex justify-end items-center gap-2 mb-4 mt-8">
          <input type="text" id="newCampaignName" placeholder="New campaign name"
            class="px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors w-64" />
          <button id="addCampaignBtn" class="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/30">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
            Add
          </button>
        </div>

        <div id="campaignList" class="space-y-4">
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-12 text-center text-gray-500">Loading campaigns…</div>
        </div>
      </div>

      <!-- Delete Confirm Modal -->
      <div id="confirmModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <h3 id="confirmTitle" class="text-lg font-bold text-gray-800 mb-2"></h3>
            <p id="confirmMessage" class="text-gray-500 mb-6"></p>
            <div class="flex gap-3">
              <button id="confirmCancel" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button id="confirmOk" class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.container = layout.render(mainContent);
    this.bindEvents();
    this.loadData();
    return this.container;
  }

  icon(name) {
    const paths = {
      grid: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>',
      tag: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>',
      users: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>',
    };
    return `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${paths[name]}</svg>`;
  }

  confirmAction(title, message, okLabel) {
    return new Promise((resolve) => {
      const modal = this.container.querySelector('#confirmModal');
      if (!modal) return resolve(false);
      const titleEl = modal.querySelector('#confirmTitle');
      const msgEl = modal.querySelector('#confirmMessage');
      const okBtn = modal.querySelector('#confirmOk');

      titleEl.textContent = title;
      msgEl.textContent = message;
      okBtn.textContent = okLabel || 'Delete';
      modal.classList.remove('hidden');

      const cleanup = (result) => {
        modal.classList.add('hidden');
        okBtn.replaceWith(okBtn.cloneNode(true));
        modal.querySelector('#confirmCancel').replaceWith(modal.querySelector('#confirmCancel').cloneNode(true));
        resolve(result);
      };

      modal.querySelector('#confirmOk').addEventListener('click', () => cleanup(true), { once: true });
      modal.querySelector('#confirmCancel').addEventListener('click', () => cleanup(false), { once: true });
      modal.addEventListener('click', (e) => { if (e.target === modal) cleanup(false); }, { once: true });
    });
  }

  // ─── Events ───

  bindEvents() {
    const c = this.container;
    if (!c) return;

    // Add column
    c.querySelector('.add-col-btn').addEventListener('click', async () => {
      const nameInput = c.querySelector('.new-col-input');
      const name = (nameInput?.value || '').trim();
      if (!name) {
        nameInput?.focus();
        nameInput?.classList.add('border-red-400');
        setTimeout(() => nameInput?.classList.remove('border-red-400'), 1500);
        return;
      }
      try {
        await createColumn({
          name,
          type: c.querySelector('.new-col-type').value,
          role: c.querySelector('.new-col-role').value,
          applies_to: c.querySelector('.new-col-applies').value,
          required: c.querySelector('.new-col-required').checked,
        });
        nameInput.value = '';
        c.querySelector('.new-col-required').checked = false;
        await this.loadData();
      } catch (err) {
        alert(err.message);
      }
    });

    c.querySelector('.new-col-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') c.querySelector('.add-col-btn').click();
    });

    // Column list events (delegated)
    c.querySelector('#columnList').addEventListener('click', async (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      if (btn.classList.contains('save-col-btn')) {
        const wrap = btn.closest('[data-col-id]');
        if (!wrap) return;
        try {
          await updateColumn(wrap.dataset.colId, this.readColumnForm(wrap));
          await this.loadData();
        } catch (err) {
          alert(err.message);
        }
        return;
      }

      if (btn.classList.contains('del-col-btn')) {
        const wrap = btn.closest('[data-col-id]');
        if (!wrap) return;
        const confirmed = await this.confirmAction(
          'Delete Column?',
          `"${wrap.dataset.colName}" and all values saved under it will be permanently removed.`,
          'Delete'
        );
        if (confirmed) {
          await deleteColumn(wrap.dataset.colId);
          await this.loadData();
        }
        return;
      }
    });

    // Auto-save when type/role/applies/required change
    c.querySelector('#columnList').addEventListener('change', async (e) => {
      const el = e.target;
      if (!el.classList.contains('col-type-select') && !el.classList.contains('col-role-select') &&
          !el.classList.contains('col-applies-select') && !el.classList.contains('col-required-check')) return;
      const wrap = el.closest('[data-col-id]');
      if (!wrap) return;
      try {
        await updateColumn(wrap.dataset.colId, this.readColumnForm(wrap));
        await this.loadData();
      } catch (err) {
        alert(err.message);
        await this.loadData();
      }
    });

    // Add campaign
    c.querySelector('#addCampaignBtn').addEventListener('click', async () => {
      const input = c.querySelector('#newCampaignName');
      const name = (input?.value || '').trim();
      if (!name) {
        input?.focus();
        input?.classList.add('border-red-400');
        setTimeout(() => input?.classList.remove('border-red-400'), 1500);
        return;
      }
      try {
        await createCampaign(name);
        input.value = '';
        await this.loadData();
      } catch (err) {
        alert(err.message);
      }
    });

    c.querySelector('#newCampaignName').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') c.querySelector('#addCampaignBtn').click();
    });

    // Logout
    c.querySelector('#logoutBtn').addEventListener('click', async () => {
      await logout();
      this.app.logout();
    });

    // Campaign list events (delegated)
    c.querySelector('#campaignList').addEventListener('click', async (e) => {
      const btn = e.target.closest('button, [data-action]');
      if (!btn) {
        const toggle = e.target.closest('.expand-toggle');
        if (toggle) {
          e.preventDefault();
          const card = toggle.closest('.campaign-card');
          if (card) {
            const id = Number(card.dataset.id);
            this.expandedId = this.expandedId === id ? null : id;
            this.renderList();
          }
        }
        return;
      }

      const card = btn.closest('.campaign-card');

      if (btn.classList.contains('rename-campaign-btn') && card) {
        e.stopPropagation();
        this.renamingId = Number(card.dataset.id);
        this.renderList();
        const input = c.querySelector('.campaign-rename-input');
        if (input) { input.focus(); input.select(); }
        return;
      }

      if (btn.classList.contains('delete-campaign-btn') && card) {
        e.stopPropagation();
        const id = Number(card.dataset.id);
        const confirmed = await this.confirmAction(
          'Delete Campaign?',
          'This will delete all buckets and agent assignments for this campaign.',
          'Delete'
        );
        if (confirmed) {
          await deleteCampaign(id);
          if (this.expandedId === id) this.expandedId = null;
          await this.loadData();
        }
        return;
      }

      if (btn.classList.contains('add-bucket-btn') && card) {
        const input = card.querySelector('.new-bucket-input');
        const name = (input?.value || '').trim();
        if (!name) { input?.focus(); return; }
        await addBucket(Number(card.dataset.id), name);
        await this.loadData();
        return;
      }

      if (btn.classList.contains('save-bucket-btn')) {
        const input = btn.closest('div').querySelector('.bucket-name-input');
        if (input?.value.trim()) {
          await updateBucket(btn.dataset.bucketId, input.value.trim());
          await this.loadData();
        }
        return;
      }

      if (btn.classList.contains('del-bucket-btn')) {
        const confirmed = await this.confirmAction('Delete Bucket?', 'Users assigned to this bucket will be unassigned.', 'Delete');
        if (confirmed) {
          await deleteBucket(btn.dataset.bucketId);
          await this.loadData();
        }
        return;
      }

      if (btn.classList.contains('assign-bucket-chip') && card) {
        const campaignId = Number(card.dataset.id);
        const userId = Number(btn.dataset.userId);
        const bucketId = Number(btn.dataset.bucketId);
        const campaign = this.campaigns.find((cm) => cm.id === campaignId);
        const assignment = campaign.assignments.find((a) => a.user_id === userId);
        const nextBucket = assignment.bucket_id === bucketId ? null : bucketId;
        const assignments = campaign.assignments.map((a) =>
          a.user_id === userId ? { user_id: userId, bucket_id: nextBucket } : { user_id: a.user_id, bucket_id: a.bucket_id }
        );
        await updateAssignments(campaignId, assignments);
        await this.loadData();
        return;
      }

      if (btn.classList.contains('add-agent-btn') && card) {
        const select = card.querySelector('.add-agent-select');
        if (select?.value) {
          const campaignId = Number(card.dataset.id);
          const campaign = this.campaigns.find((cm) => cm.id === campaignId);
          const assignments = [
            ...campaign.assignments.map((a) => ({ user_id: a.user_id, bucket_id: a.bucket_id })),
            { user_id: Number(select.value), bucket_id: null },
          ];
          await updateAssignments(campaignId, assignments);
          await this.loadData();
        }
        return;
      }
    });

    // Rename input keydown
    c.querySelector('#campaignList').addEventListener('keydown', async (e) => {
      const el = e.target;
      if (el.classList.contains('campaign-rename-input') && (e.key === 'Enter' || e.key === 'Escape')) {
        e.preventDefault();
        if (e.key === 'Escape') {
          this.renamingId = null;
          this.renderList();
          return;
        }
        const id = Number(el.dataset.campaignId);
        const newName = el.value.trim();
        this.renamingId = null;
        if (newName && newName !== this.campaigns.find((cm) => cm.id === id)?.name) {
          await updateCampaign(id, newName);
          await this.loadData();
        } else {
          this.renderList();
        }
      }

      if (el.classList.contains('new-bucket-input') && e.key === 'Enter') {
        e.preventDefault();
        const card = el.closest('.campaign-card');
        if (card) card.querySelector('.add-bucket-btn')?.click();
      }
    });

    // Rename input blur
    c.querySelector('#campaignList').addEventListener('focusout', async (e) => {
      if (!e.target.classList.contains('campaign-rename-input')) return;
      const el = e.target;
      setTimeout(async () => {
        if (this.renamingId !== Number(el.dataset.campaignId)) return;
        const id = Number(el.dataset.campaignId);
        const newName = el.value.trim();
        this.renamingId = null;
        if (newName && newName !== this.campaigns.find((cm) => cm.id === id)?.name) {
          await updateCampaign(id, newName);
          await this.loadData();
        } else {
          this.renderList();
        }
      }, 150);
    });
  }

  readColumnForm(wrap) {
    return {
      name: wrap.querySelector('.col-name-input').value.trim(),
      type: wrap.querySelector('.col-type-select').value,
      role: wrap.querySelector('.col-role-select').value,
      applies_to: wrap.querySelector('.col-applies-select').value,
      required: wrap.querySelector('.col-required-check').checked,
    };
  }

  // ─── Data loading ───

  async loadData() {
    try {
      const [campaignsData, usersData, columnsData] = await Promise.all([
        getCampaignsConfig(), getUsers(), getColumns(),
      ]);
      this.campaigns = campaignsData.campaigns || [];
      this.users = usersData.users || [];
      this.columns = columnsData.columns || [];
      this.renderColumns();
      this.renderList();
    } catch (error) {
      console.error('Failed to load campaign config:', error);
      this.container.querySelector('#campaignList').innerHTML =
        '<div class="bg-white rounded-xl shadow-sm border border-red-200 p-12 text-center text-red-600">Failed to load data</div>';
    }
  }

  renderColumns() {
    clearTableColumnsCache();
    const listEl = this.container.querySelector('#columnList');
    if (!listEl) return;

    if (this.columns.length === 0) {
      listEl.innerHTML =
        '<div class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">No columns yet. The tracker tables will be empty until you add columns above.</div>';
      return;
    }

    listEl.innerHTML = this.columns.map((col, i) => `
      <div class="border border-gray-200 rounded-xl px-3 py-2.5 flex flex-wrap items-center gap-2" data-col-id="${col.id}" data-col-name="${col.name}">
        <span class="w-6 h-6 rounded-md bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center flex-shrink-0">${i + 1}</span>
        <input class="col-name-input flex-1 min-w-[140px] text-sm font-semibold text-gray-800 bg-transparent focus:outline-none" value="${col.name}" />
        <span class="flex gap-1.5 items-center">
          ${col.role ? `<span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-600" title="Role: ${col.role}">⚙ ${col.role}</span>` : ''}
          ${col.required ? '<span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md bg-red-100 text-red-600">required</span>' : ''}
        </span>
        <select class="col-type-select text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-500 focus:outline-none">
          ${COLUMN_TYPES.map((t) => `<option value="${t.value}" ${col.type === t.value ? 'selected' : ''}>${t.label}</option>`).join('')}
        </select>
        <select class="col-role-select text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-500 focus:outline-none" title="Role">
          ${COLUMN_ROLES.map((r) => `<option value="${r.value}" ${col.role === r.value ? 'selected' : ''}>${r.label}</option>`).join('')}
        </select>
        <select class="col-applies-select text-xs border border-gray-200 rounded px-1.5 py-1 text-gray-500 focus:outline-none" title="Show in table">
          <option value="both" ${col.applies_to === 'both' ? 'selected' : ''}>All</option>
          <option value="ptp" ${col.applies_to === 'ptp' ? 'selected' : ''}>PTP</option>
          <option value="confirmed" ${col.applies_to === 'confirmed' ? 'selected' : ''}>Confirmed</option>
        </select>
        <label class="inline-flex items-center gap-1 text-xs text-gray-500" title="Must be filled in when adding a record">
          <input type="checkbox" class="col-required-check accent-indigo-500" ${col.required ? 'checked' : ''} /> req
        </label>
        <button class="save-col-btn text-gray-300 hover:text-green-600 transition-colors" title="Save">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
        </button>
        <button class="del-col-btn text-gray-300 hover:text-red-500 transition-colors" title="Delete">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>`).join('');
  }

  renderList() {
    const c = this.container;
    const listEl = c.querySelector('#campaignList');

    if (this.campaigns.length === 0) {
      listEl.innerHTML = '<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">No campaigns yet. Add one above.</div>';
      return;
    }

    listEl.innerHTML = this.campaigns.map((camp, idx) => {
      const expanded = this.expandedId === camp.id;
      const isRenaming = this.renamingId === camp.id;
      return `
      <div class="campaign-card bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden" data-id="${camp.id}">
        <div class="expand-toggle flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-indigo-50/40 transition-colors">
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-200">${idx + 1}</div>
            <div class="flex-1 min-w-0">
              ${isRenaming
                ? `<input type="text" class="campaign-rename-input w-full text-lg font-bold text-gray-900 bg-gray-50 border-2 border-indigo-300 rounded-lg px-2 py-0.5 focus:outline-none focus:border-indigo-500" value="${camp.name}" data-campaign-id="${camp.id}" />`
                : `<h3 class="text-lg font-bold text-gray-900">${camp.name}</h3>`}
              <p class="text-sm text-gray-400">${camp.buckets.length} buckets · ${camp.assignments.length} agents</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 112 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 112 0z"/></svg>
              ${camp.buckets.length}
            </span>
            <button class="rename-campaign-btn p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Rename campaign">
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button class="delete-campaign-btn p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete campaign">
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
            <svg class="w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>

        ${expanded ? `
        <div class="border-t border-gray-100 p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <!-- Buckets -->
          <div class="bg-white rounded-xl border border-gray-200 p-4">
            <div class="flex items-center gap-2 mb-3">
              <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 112 0v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 112 0z"/></svg>
              <h4 class="font-bold text-gray-800">Buckets</h4>
            </div>
            <div class="space-y-2 mb-3">
              ${camp.buckets.map((b, i) => `
              <div class="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                <span class="w-6 h-6 rounded-md bg-gray-100 text-gray-500 text-xs font-bold flex items-center justify-center">${i + 1}</span>
                <input class="bucket-name-input flex-1 text-sm font-semibold text-gray-800 bg-transparent focus:outline-none" data-bucket-id="${b.id}" value="${b.name}" />
                <button class="save-bucket-btn text-gray-300 hover:text-green-600 transition-colors" data-bucket-id="${b.id}" title="Save">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                </button>
                <button class="del-bucket-btn text-gray-300 hover:text-red-500 transition-colors" data-bucket-id="${b.id}" title="Delete">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>`).join('')}
            </div>
            <div class="flex gap-2">
              <input type="text" placeholder="Add bucket" class="new-bucket-input flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl text-sm focus:border-indigo-400 focus:outline-none" />
              <button class="add-bucket-btn w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors flex-shrink-0">+</button>
            </div>
          </div>

          <!-- Agents -->
          <div class="bg-white rounded-xl border border-gray-200 p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                <h4 class="font-bold text-gray-800">Agents</h4>
              </div>
              <span class="text-xs text-gray-400 font-semibold">${camp.assignments.length} ASSIGNMENTS</span>
            </div>
            <div class="space-y-2 max-h-80 overflow-y-auto">
              ${camp.assignments.length === 0
                ? '<p class="text-sm text-gray-400 italic">No agents assigned yet.</p>'
                : camp.assignments.map((a) => `
              <div class="border border-gray-200 rounded-xl px-3 py-2.5">
                <p class="text-sm font-bold text-gray-800 mb-2">${a.full_name}</p>
                <div class="flex flex-wrap gap-1.5">
                  ${camp.buckets.map((b) => `
                  <button class="assign-bucket-chip px-3 py-1 rounded-full text-xs font-semibold border-2 transition-all
                    ${a.bucket_id === b.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-300'}"
                    data-user-id="${a.user_id}" data-bucket-id="${b.id}">
                    ${b.name}
                  </button>`).join('')}
                </div>
              </div>`).join('')}
            </div>
            <div class="mt-3 pt-3 border-t border-gray-100">
              <label class="block text-xs font-semibold text-gray-500 uppercase mb-1">Add agent</label>
              <div class="flex gap-2">
                <select class="add-agent-select flex-1 text-sm border-2 border-gray-200 rounded-xl px-2 py-2 text-gray-600 focus:outline-none">
                  <option value="">Select user…</option>
                  ${this.users
                    .filter((u) => !camp.assignments.some((a) => a.user_id === u.id))
                    .map((u) => `<option value="${u.id}">${u.full_name}</option>`)
                    .join('')}
                </select>
                <button class="add-agent-btn w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-colors flex-shrink-0">+</button>
              </div>
            </div>
          </div>
        </div>` : ''}
      </div>`;
    }).join('');
  }
}
