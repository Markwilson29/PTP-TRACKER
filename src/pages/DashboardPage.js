import { getRecords, createRecord, updateRecord, deleteRecord, logout } from '../api.js';
import { loadTableColumns, columnsForTable, columnWithRole, inputForColumn, readColumnInput, parseValue, formatValue, bindDatePickers, escapeAttr } from '../dynamic-columns.js';
import { Layout } from '../layout.js';

export class DashboardPage {
  constructor(app) {
    this.app = app;
    this.records = [];
    this.columns = [];
    this.editingId = null;
    this.filterCampaign = null;
    this.searchQuery = '';
  }

  render() {
    const user = this.app.currentUser;
    const isAdmin = user.role === 'admin';

    const sidebarItems = [
      { label: 'PTP Backtrack', path: '/dashboard', active: true, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>' },
      { label: 'Confirmed Tracker', path: '/confirmed', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' },
      ...(isAdmin ? [
        { label: 'Campaigns & Columns', path: '/campaigns', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>' },
        { label: 'Users & Agents', path: '/admin', active: false, icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>' },
      ] : [])
    ];

    const layout = new Layout(this.app, sidebarItems);

    const mainContent = `
      <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900 tracking-tight">Account Monitoring</h2>
              <p class="text-gray-500 text-sm mt-0.5">Monitor account activities and confirmations</p>
            </div>
          </div>
          <button id="addRecordBtn" class="btn-primary inline-flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-xl transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Add Record
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Records</p>
                <p id="totalRecords" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Amount</p>
                <p id="totalAmount" class="text-2xl font-bold text-gray-900 mt-0.5">₱0.00</p>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 relative overflow-hidden">
            <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500"></div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-wider text-gray-400">Today's Records</p>
                <p id="todayCount" class="text-2xl font-bold text-gray-900 mt-0.5">0</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign Filter Buttons (Admin only) -->
        <div class="flex flex-wrap gap-2 mb-6 hidden" id="campaignFilterButtons"></div>

        <!-- User Campaign Badge (Non-admin only) -->
        <div class="hidden mb-6" id="userCampaignBadge">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span class="text-blue-700 font-semibold" id="userCampaignName"></span>
          </div>
        </div>

        <!-- Search Bar -->
        <div class="mb-4">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" id="searchInput"
              class="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm focus:border-indigo-500 focus:outline-none transition-colors"
              placeholder="Search records..." />
          </div>
        </div>

        <!-- Records Table -->
        <div id="allRecordsTable" class="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full table-fixed">
              <thead>
                <tr id="tableHeaderRow" class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"></tr>
              </thead>
              <tbody id="recordsTableBody" class="divide-y divide-gray-100">
                <tr><td class="px-6 py-12 text-center text-gray-500">Loading records...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div id="modal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
            <h3 id="modalTitle" class="text-lg font-bold text-gray-800">Add New Record</h3>
            <button id="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <form id="recordForm" class="p-6 space-y-4">
            <div id="dynamicFields" class="space-y-4"></div>
            <div id="formError" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"></div>
            <div class="flex gap-3 pt-2">
              <button type="button" id="cancelBtn" class="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" id="submitBtn" class="btn-primary flex-1 px-4 py-3 font-semibold rounded-xl transition-all">Save Record</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div id="deleteModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
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
    this.init(fullContainer);
    return fullContainer;
  }

  async init(container) {
    try {
      const [allCols, data] = await Promise.all([
        loadTableColumns(),
        getRecords('ptp'),
      ]);
      this.columns = columnsForTable(allCols, 'ptp');
      this.records = data.records;

      this.renderCampaignFilters(container);
      this.renderHeader(container);
      this.renderTable(container, this.records);
      this.updateStats(container, this.records);
      this.initCampaignFilters(container, this.app.currentUser);
    } catch (error) {
      console.error('Failed to load tracker data:', error);
      container.querySelector('#recordsTableBody').innerHTML =
        '<tr><td class="px-6 py-12 text-center text-red-600">Failed to load records. Is the server running?</td></tr>';
    }
  }

  // ─── Campaign filters ───

  renderCampaignFilters(container) {
    const wrap = container.querySelector('#campaignFilterButtons');
    if (!wrap) return;
    // Always show all 4 campaigns, plus any other campaigns found in records
    const base = ['Revi Credit', 'Personal Loan', 'GCredit', 'LazPay'];
    const extra = [...new Set(this.records.map((r) => r.campaign).filter(Boolean))]
      .filter((c) => !base.some((b) => c === b || c.startsWith(b + ' - ')));
    const campaigns = [...base, ...extra].sort();
    wrap.innerHTML = `
      <button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="all" style="background: #eef2f6; color: #1e293b;">All Campaigns</button>
      ${campaigns.map((c) => `<button class="campaign-filter-btn px-5 py-2 rounded-full font-semibold text-sm transition-all" data-campaign="${escapeAttr(c)}" style="background: #eef2f6; color: #1e293b;">${c}</button>`).join('')}
    `;
  }

  initCampaignFilters(container, user) {
    const filterContainer = container.querySelector('#campaignFilterButtons');
    const campaignBadge = container.querySelector('#userCampaignBadge');
    const campaignNameEl = container.querySelector('#userCampaignName');

    // Agents: scoped to their assigned campaign (enforced server-side) —
    // show their campaign badge instead of the filter chips.
    if (user.role !== 'admin' && user.campaign) {
      filterContainer.classList.add('hidden');
      campaignBadge.classList.remove('hidden');
      const baseCampaign = user.campaign.includes(' - ') ? user.campaign.split(' - ')[0] : user.campaign;
      campaignNameEl.textContent = baseCampaign;
    } else {
      filterContainer.classList.remove('hidden');
      campaignBadge.classList.add('hidden');
    }
  }

  applyCampaignFilter(container, campaign) {
    this.filterCampaign = campaign === 'all' ? null : campaign;
    container.querySelectorAll('.campaign-filter-btn').forEach((b) => {
      const active = b.dataset.campaign === campaign;
      b.style.background = active ? '#5c52ff' : '#eef2f6';
      b.style.color = active ? 'white' : '#1e293b';
    });
    const visible = this.filterCampaign
      ? this.records.filter((r) => (r.campaign || '').startsWith(this.filterCampaign))
      : this.records;
    this.renderTable(container, visible);
    this.updateStats(container, visible);
  }

  // ─── Table rendering ───

  renderHeader(container) {
    const row = container.querySelector('#tableHeaderRow');
    if (!row) return;
    const isAdmin = this.app.currentUser?.role === 'admin';

    const th = (content, extra = '') =>
      `<th class="px-3 py-3 text-left ${extra} text-xs font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap overflow-hidden" title="${content.replace(/<[^>]+>/g, '').trim()}"><span class="th-label inline-block">${content}</span></th>`;

    row.innerHTML = `
      ${th('Agent')}
      ${th('Campaign')}
      ${this.columns.map((col) => th(`${col.name}${col.required ? ' <span class="text-red-400">*</span>' : ''}`)).join('')}
      ${isAdmin ? th('Actions', 'text-center') : ''}
    `;

    // Measure each header's real text width and size every column exactly to
    // fit its label (proportional), so no header text is ever cut off.
    const ths = Array.from(row.children);
    const widths = ths.map((el) => {
      const label = el.querySelector('.th-label');
      // + padding + buffer, with a 120px floor so cell data always has room
      return Math.max((label ? label.getBoundingClientRect().width : el.scrollWidth) + 36, 120);
    });
    const total = widths.reduce((a, b) => a + b, 0) || 1;
    ths.forEach((el, i) => { el.style.width = `${((widths[i] / total) * 100).toFixed(2)}%`; });
  }

  cellForRecord(record, col) {
    const raw = (record.values || {})[col.id];
    const isRole = col.role === 'agent' || col.role === 'date';
    const align = col.type === 'amount' || col.type === 'number' ? 'text-right' : 'text-left';
    return `
      <td class="px-3 py-2 ${align}">
        ${isRole
          ? formatValue(col, raw)
          : `<input type="${col.type === 'number' || col.type === 'amount' ? 'number' : 'text'}" step="any"
              class="cell-input w-full text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:border-blue-400 focus:outline-none ${col.type === 'amount' || col.type === 'number' ? 'text-right' : ''}"
              data-record-id="${record.id}" data-col-id="${col.id}" value="${escapeAttr(raw ?? '')}" placeholder="—" />`}
      </td>`;
  }

  renderTable(container, records) {
    const tbody = container.querySelector('#recordsTableBody');
    const q = (this.searchQuery || '').toLowerCase();

    let visible = records;
    if (q) {
      visible = records.filter((r) => {
        if ((r.campaign || '').toLowerCase().includes(q)) return true;
        return this.columns.some((col) => String((r.values || {})[col.id] ?? '').toLowerCase().includes(q));
      });
    }

    if (this.columns.length === 0) {
      tbody.innerHTML = `
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No columns defined</p>
          <p class="text-sm text-gray-400 mt-1">An admin must add columns on the Campaigns &amp; Columns page first.</p>
        </td></tr>`;
      return;
    }

    if (visible.length === 0) {
      tbody.innerHTML = `
        <tr><td colspan="99" class="px-6 py-12 text-center text-gray-500">
          <p class="font-medium">No records found</p>
          <p class="text-sm text-gray-400 mt-1">Click "Add Record" to create one</p>
        </td></tr>`;
      return;
    }

    const isAdmin = this.app.currentUser?.role === 'admin';
    tbody.innerHTML = visible.map((record) => `
      <tr class="hover:bg-blue-50/50 transition-colors">
        <td class="px-3 py-2">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">${(record.created_by_name || '?').charAt(0).toUpperCase()}</span>
            <span class="text-sm text-gray-700 font-medium break-words" title="${escapeAttr(record.created_by_name || 'Unknown')}">${record.created_by_name || 'Unknown'}</span>
          </div>
        </td>
        <td class="px-3 py-2">
          <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">${record.campaign || '—'}</span>
        </td>
        ${this.columns.map((col) => this.cellForRecord(record, col)).join('')}
        ${isAdmin ? `
        <td class="px-3 py-2">
          <div class="flex gap-1.5 justify-center">
            <button class="edit-btn px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all font-medium text-xs" data-id="${record.id}">Edit</button>
            <button class="delete-btn px-2.5 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all font-medium text-xs" data-id="${record.id}">Delete</button>
          </div>
        </td>` : ''}
      </tr>
    `).join('');

    // Inline-editable cells save on change
    tbody.querySelectorAll('.cell-input').forEach((input) => {
      input.addEventListener('change', async () => {
        const recordId = input.dataset.recordId;
        const colId = input.dataset.colId;
        try {
          await updateRecord('ptp', recordId, { values: { [colId]: input.value } });
          const record = this.records.find((r) => r.id === Number(recordId));
          if (record) {
            record.values = record.values || {};
            record.values[colId] = input.value;
          }
          this.updateStats(container, this.records);
        } catch (err) {
          console.error('Failed to save cell:', err);
          alert(err.message);
        }
      });
    });

    tbody.querySelectorAll('.edit-btn').forEach((btn) =>
      btn.addEventListener('click', () => this.editRecord(container, Number(btn.dataset.id)))
    );
    tbody.querySelectorAll('.delete-btn').forEach((btn) =>
      btn.addEventListener('click', () => this.confirmDelete(container, Number(btn.dataset.id)))
    );
  }

  updateStats(container, records) {
    const amountCol = columnWithRole(this.columns, 'amount');
    const dateCol = columnWithRole(this.columns, 'date');
    const today = new Date().toISOString().split('T')[0];

    let total = 0;
    if (amountCol) {
      total = records.reduce((sum, r) => sum + parseValue(amountCol, (r.values || {})[amountCol.id]), 0);
    }
    let todayCount = 0;
    if (dateCol) {
      todayCount = records.filter((r) => (r.values || {})[dateCol.id] === today).length;
    }

    container.querySelector('#totalRecords').textContent = records.length;
    container.querySelector('#totalAmount').textContent =
      '₱' + total.toLocaleString('en-PH', { minimumFractionDigits: 2 });
    container.querySelector('#todayCount').textContent = todayCount;
  }

  // ─── Add / Edit modal ───

  openModal(container, record = null) {
    const user = this.app.currentUser;
    const agentCol = columnWithRole(this.columns, 'agent');
    const fieldsEl = container.querySelector('#dynamicFields');

    // Agents with an assigned campaign: show it automatically (no dropdown)
    const campaignLocked = user.role !== 'admin' && !!user.campaign;
    const campaignField = campaignLocked ? `
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
        <input type="hidden" id="rec_campaign" value="${escapeAttr(user.campaign)}" />
        <div class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between gap-2 text-left">
          <span class="text-gray-800 font-medium">${user.campaign}</span>
          <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
      </div>` : `
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Campaign *</label>
        <select id="rec_campaign" required class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
          <option value="">Select Campaign</option>
          ${this.campaignList(user).map((c) => `<option value="${escapeAttr(c)}" ${record?.campaign === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>`;

    const today = new Date().toLocaleDateString('sv-SE'); // local YYYY-MM-DD

    const colFields = this.columns.map((col) => {
      let raw = record ? (record.values || {})[col.id] ?? '' : '';
      // Auto-fill: agent name and entry date ("Contact Date") for new records
      if (!record && col.role === 'agent') raw = user.full_name;
      if (!record && col.role === 'date') raw = today;
      const locked = !record && (col.role === 'agent' || col.role === 'date');
      return inputForColumn(col, escapeAttr(raw), record ? '_edit' : '', locked);
    }).join('');

    fieldsEl.innerHTML = campaignField + colFields;
    bindDatePickers(fieldsEl);

    container.querySelector('#modalTitle').textContent = record ? 'Edit Record' : 'Add New Record';
    container.querySelector('#submitBtn').textContent = record ? 'Update Record' : 'Save Record';
    container.querySelector('#formError').classList.add('hidden');
    container.querySelector('#modal').classList.remove('hidden');
  }

  campaignList(user) {
    const base = ['Revi Credit', 'Personal Loan', 'GCredit', 'LazPay'];
    const buckets = ['Pre-Charge-Off', 'Charge-Off'];
    const all = base.flatMap((b) => buckets.map((k) => `${b} - ${k}`));
    if (user.role === 'admin' || !user.campaign) return [...base, ...all];
    return [user.campaign];
  }

  collectForm(container) {
    const values = {};
    this.columns.forEach((col) => {
      values[col.id] = readColumnInput(container, col);
    });
    return {
      campaign: container.querySelector('#rec_campaign')?.value || '',
      values,
    };
  }

  bindEvents(container) {
    container.querySelector('#addRecordBtn').addEventListener('click', () => this.openModal(container, null));

    container.querySelector('#closeModal').addEventListener('click', () =>
      container.querySelector('#modal').classList.add('hidden'));
    container.querySelector('#cancelBtn').addEventListener('click', () =>
      container.querySelector('#modal').classList.add('hidden'));
    container.querySelector('#modal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#modal')) {
        container.querySelector('#modal').classList.add('hidden');
      }
    });

    container.querySelector('#recordForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formError = container.querySelector('#formError');
      formError.classList.add('hidden');

      const data = this.collectForm(container);
      if (!data.campaign) {
        formError.textContent = 'Please select a campaign';
        formError.classList.remove('hidden');
        return;
      }

      const submitBtn = container.querySelector('#submitBtn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Saving...';

      try {
        if (this.editingId) {
          await updateRecord('ptp', this.editingId, data);
        } else {
          await createRecord('ptp', data);
        }
        container.querySelector('#modal').classList.add('hidden');
        this.editingId = null;
        await this.init(container);
      } catch (error) {
        formError.textContent = error.message;
        formError.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = this.editingId ? 'Update Record' : 'Save Record';
      }
    });

    container.querySelector('#cancelDelete').addEventListener('click', () =>
      container.querySelector('#deleteModal').classList.add('hidden'));
    container.querySelector('#deleteModal').addEventListener('click', (e) => {
      if (e.target === container.querySelector('#deleteModal')) {
        container.querySelector('#deleteModal').classList.add('hidden');
      }
    });

    container.querySelector('#searchInput').addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderTable(container, this.filteredRecords());
      this.updateStats(container, this.filteredRecords());
    });

    // Campaign filter buttons (delegated)
    container.querySelector('#campaignFilterButtons').addEventListener('click', (e) => {
      const btn = e.target.closest('.campaign-filter-btn');
      if (!btn) return;
      this.applyCampaignFilter(container, btn.dataset.campaign);
    });
  }

  filteredRecords() {
    if (this.filterCampaign) {
      return this.records.filter((r) => (r.campaign || '').startsWith(this.filterCampaign));
    }
    return this.records;
  }

  editRecord(container, id) {
    const record = this.records.find((r) => r.id === id);
    if (!record) return;
    this.editingId = id;
    this.openModal(container, record);
  }

  confirmDelete(container, id) {
    const deleteModal = container.querySelector('#deleteModal');
    deleteModal.classList.remove('hidden');

    const confirmBtn = container.querySelector('#confirmDelete');
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);

    newBtn.addEventListener('click', async () => {
      try {
        await deleteRecord('ptp', id);
        deleteModal.classList.add('hidden');
        await this.init(container);
      } catch (error) {
        alert('Failed to delete record');
      }
    });
  }
}
