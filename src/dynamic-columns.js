// Shared helpers for the admin-defined table columns.
// Every tracker column is created by the admin on the Campaigns & Columns page.
// A column may have a special "role" that drives behavior:
//   agent    → auto-filled with the logged-in user's full name
//   amount   → summed into the page's Total Amount stat
//   date     → used for the "Today's X" stat
//   campaign → (reserved; campaign is a built-in record field)

import { getColumns } from './api.js';

// Register the Cally web components (<calendar-date>) used by the date picker.
import 'cally';

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

let dateFieldSeq = 0;

/** Build the appropriate form input for a column. locked=true renders the field read-only (auto-filled roles). */
export function inputForColumn(col, value = '', idSuffix = '', locked = false) {
  const base = 'w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors';
  const id = `col_${col.id}${idSuffix}`;
  let field = '';
  switch (col.type) {
    case 'number':
    case 'amount':
      field = `<input type="number" step="any" id="${id}" class="${base}${locked ? ' bg-gray-50' : ''}" value="${value}" placeholder="0"${locked ? ' readonly' : ''} />`;
      break;
    case 'date':
      return dateField(col, value, id, locked);
    case 'select':
      field = `<select id="${id}" class="${base}"${locked ? ' disabled' : ''}></select>`;
      break;
    default:
      field = `<input type="text" id="${id}" class="${base}${locked ? ' bg-gray-50' : ''}" value="${value}"${locked ? ' readonly' : ''} />`;
  }
  const req = col.required ? ' *' : '';
  const lockNote = locked ? ' <span class="text-[10px] text-gray-400 font-normal">(auto)</span>' : '';
  return `
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">${escapeHtml(col.name)}${req}${lockNote}</label>
      ${field}
    </div>`;
}

/**
 * Cally-powered date field: a styled button that opens a <calendar-date>
 * popover, mirrored into a hidden input with the column's id so
 * readColumnInput() keeps working unchanged.
 * locked=true shows a fixed date chip (no popover) — used for auto-filled
 * entry dates on the "date" role column.
 */
function dateField(col, value, id, locked = false) {
  const req = col.required ? ' *' : '';
  const lockNote = locked ? ' <span class="text-[10px] text-gray-400 font-normal">(auto)</span>' : '';

  if (locked) {
    const label = value
      ? new Date(value + 'T00:00:00').toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
      : '—';
    return `
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">${escapeHtml(col.name)}${req}${lockNote}</label>
        <input type="hidden" id="${id}" value="${escapeAttr(value)}" />
        <div class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-gray-50 flex items-center justify-between gap-2 text-left">
          <span class="text-gray-800">${escapeHtml(label)}</span>
          <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
        </div>
      </div>`;
  }

  const btnId = `${id}_btn`;
  const popId = `${id}_pop`;
  const calId = `${id}_cal`;

  const label = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'Pick a date';

  return `
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-1">${escapeHtml(col.name)}${req}</label>
      <input type="hidden" id="${id}" value="${escapeAttr(value)}" />
      <button type="button" popovertarget="${popId}" class="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-white flex items-center justify-between gap-2 text-left transition-colors hover:border-blue-300" id="${btnId}">
        <span class="dp-label ${value ? 'text-gray-800' : 'text-gray-400'}">${escapeHtml(label)}</span>
        <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </button>
      <div popover id="${popId}" class="dp-popover">
        <calendar-date class="cally dp-calendar" id="${calId}" value="${escapeAttr(value)}">
          <svg aria-label="Previous" class="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
          <svg aria-label="Next" class="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
          <calendar-month></calendar-month>
        </calendar-date>
      </div>
    </div>`;
}

/**
 * Wire up Cally date pickers inside a container: calendar selection updates
 * the hidden input and the button label, then closes the popover.
 * The popover is positioned next to the button that opened it (flips up when
 * there is no room below), using fixed coordinates so it works in every browser.
 * Call after injecting form HTML that contains date fields.
 */
export function bindDatePickers(root) {
  root.querySelectorAll('.dp-popover').forEach((pop) => {
    if (pop.dataset.bound) return;
    pop.dataset.bound = '1';

    const cal = pop.querySelector('calendar-date');
    const hidden = pop.parentElement.querySelector('input[type="hidden"]');
    const label = pop.parentElement.querySelector('.dp-label');
    const trigger = root.querySelector(`[popovertarget="${pop.id}"]`);
    if (!cal || !hidden || !label) return;

    // Place the popover right under the trigger button (flip above if needed)
    const place = () => {
      if (!trigger) {
        pop.classList.add('placed');
        return;
      }
      const r = trigger.getBoundingClientRect();
      const popW = pop.offsetWidth || 320;
      const popH = pop.offsetHeight || 340;

      let left = r.left;
      if (left + popW > window.innerWidth - 8) left = window.innerWidth - popW - 8;
      if (left < 8) left = 8;

      let top = r.bottom + 6;
      if (top + popH > window.innerHeight - 8) {
        top = Math.max(8, r.top - popH - 6);
      }

      pop.style.position = 'fixed';
      pop.style.left = `${left}px`;
      pop.style.top = `${top}px`;
      pop.style.margin = '0';
      pop.classList.add('placed');
    };

    pop.addEventListener('toggle', (e) => {
      if (e.newState === 'open') {
        pop.classList.remove('placed');
        place();
      }
    });

    cal.addEventListener('change', () => {
      if (!cal.value) return;
      hidden.value = cal.value;
      label.textContent = new Date(cal.value + 'T00:00:00').toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
      label.classList.remove('text-gray-400');
      label.classList.add('text-gray-800');
      pop.hidePopover();
    });
  });
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
