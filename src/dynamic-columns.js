// Shared helpers for the admin-defined table columns.
// Every tracker column is created by the admin on the Campaigns & Columns page.
// A column may have a special "role" that drives behavior:
//   agent    → auto-filled with the logged-in user's full name
//   amount   → summed into the page's Total Amount stat
//   date     → used for the "Today's X" stat
//   campaign → (reserved; campaign is a built-in record field)

import { getColumns } from './api.js';

let cache = null;

/**
 * Load (and cache) the global column definitions.
 * Returns [{ id, name, type, role, applies_to, required, position }]
 */
export async function loadTableColumns() {
  if (cache) return cache;
  const data = await getColumns();
  cache = data.columns || [];
  return cache;
}

export function clearTableColumnsCache() {
  cache = null;
}

/**
 * Filter columns that apply to a given table ('ptp' or 'confirmed').
 */
export function columnsForTable(columns, table) {
  return columns.filter((c) => !c.applies_to || c.applies_to === 'both' || c.applies_to === table);
}

/** Find the column with a given role (e.g. 'agent', 'amount', 'date'). */
export function columnWithRole(columns, role) {
  return columns.find((c) => c.role === role) || null;
}

/** Parse a raw stored value according to the column type. */
export function parseValue(col, raw) {
  if (raw === undefined || raw === null || raw === '') {
    return col.type === 'number' || col.type === 'amount' ? 0 : '';
  }
  if (col.type === 'number' || col.type === 'amount') {
    const n = parseFloat(raw);
    return isNaN(n) ? 0 : n;
  }
  return String(raw);
}

/** Format a value for display according to the column type. */
export function formatValue(col, raw) {
  const v = parseValue(col, raw);
  if (col.type === 'amount') {
    return '₱' + v.toLocaleString('en-PH', { minimumFractionDigits: 2 });
  }
  if (col.type === 'number') {
    return `<span class="text-sm font-semibold text-gray-800">${v}</span>`;
  }
  return v ? `<span class="text-sm text-gray-800">${escapeHtml(v)}</span>` : '<span class="text-gray-300">—</span>';
}

/** Build the appropriate form input for a column. */
export function inputForColumn(col, value = '', idSuffix = '') {
  const base = 'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors';
  const id = `col_${col.id}${idSuffix}`;
  let field = '';
  switch (col.type) {
    case 'number':
    case 'amount':
      field = `<input type="number" step="any" id="${id}" class="${base}" value="${value}" placeholder="0" />`;
      break;
    case 'date':
      field = `<input type="date" id="${id}" class="${base}" value="${value}" />`;
      break;
    case 'select':
      field = `<select id="${id}" class="${base}"></select>`;
      break;
    default:
      field = `<input type="text" id="${id}" class="${base}" value="${value}" />`;
  }
  const req = col.required ? ' *' : '';
  return `
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">${escapeHtml(col.name)}${req}</label>
      ${field}
    </div>`;
}

/** Read the current value of a column's input from the DOM. */
export function readColumnInput(root, col) {
  const el = root.querySelector(`#col_${col.id}, #col_${col.id}_edit`);
  if (!el) return '';
  if (col.type === 'number' || col.type === 'amount') {
    return el.value === '' ? '' : String(parseFloat(el.value));
  }
  return el.value.trim();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escape a value for safe use inside an HTML attribute (value="..."). */
export function escapeAttr(s) {
  return escapeHtml(s);
}
