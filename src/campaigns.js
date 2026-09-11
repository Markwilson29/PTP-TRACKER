// Central campaign list used across the app (record form, user management).
// Each base campaign has "Pre-Charge-Off" and "Charge-Off" variants.
export const CAMPAIGNS = [
  'Personal Loan',
  'Personal Loan - Pre-Charge-Off',
  'Personal Loan - Charge-Off',
  'Revi Credit',
  'Revi Credit - Pre-Charge-Off',
  'Revi Credit - Charge-Off',
  'LazPay',
  'LazPay - Pre-Charge-Off',
  'LazPay - Charge-Off',
  'GCredit',
  'GCredit - Pre-Charge-Off',
  'GCredit - Charge-Off',
];

const BASE_CAMPAIGNS = [
  'Personal Loan',
  'Revi Credit',
  'LazPay',
  'GCredit',
];

export function campaignOptions(selected = '') {
  return CAMPAIGNS.map(
    (c) => `<option value="${c}"${c === selected ? ' selected' : ''}>${c}</option>`
  ).join('\n');
}

/**
 * Campaign options for the "Add User" form: only the 4 base campaigns.
 */
export function baseCampaignOptions(selected = '') {
  return BASE_CAMPAIGNS.map(
    (c) => `<option value="${c}"${c === selected ? ' selected' : ''}>${c}</option>`
  ).join('\n');
}

/**
 * Campaign bucket selection for the admin "Assign Campaign" two-step flow.
 * baseCampaign: one of the base names like 'Personal Loan', or '' for "No Campaign".
 * Returns { baseOptions (HTML optgroups), bucketOptions (HTML options) }.
 */
export function campaignBucketOptions(baseCampaign = '') {
  const baseOptions = [
    `<option value="">No Campaign</option>`,
    ...BASE_CAMPAIGNS.map(
      (b) =>
        `<option value="${b}"${b === baseCampaign ? ' selected' : ''}>${b}</option>`
    ),
  ].join('\n');

  const bucketOptions = baseCampaign
    ? `<option value="${baseCampaign} - Pre-Charge-Off">Pre-Charge-Off</option>
<option value="${baseCampaign} - Charge-Off">Charge-Off</option>`
    : '<option value="">Select a base campaign first</option>';

  return { baseOptions, bucketOptions };
}

/**
 * The final assigned campaign value produced by the two-step flow.
 * For "No Campaign" it returns ''; otherwise "<Base> - Pre-Charge-Off" / "<Base> - Charge-Off".
 */
export function buildAssignedCampaign(baseCampaign, bucket) {
  if (!baseCampaign) return '';
  if (!bucket) return '';
  // bucket is the full campaign name like "Personal Loan - Pre-Charge-Off"
  // or just "Pre-Charge-Off" / "Charge-Off"
  if (bucket.includes('Pre-Charge-Off')) return `${baseCampaign} - Pre-Charge-Off`;
  if (bucket.includes('Charge-Off')) return `${baseCampaign} - Charge-Off`;
  return '';
}
