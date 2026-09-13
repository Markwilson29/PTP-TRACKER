// API helper functions
const API_BASE = '/api';

async function request(url, options = {}) {
  const config = {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${url}`, config);
  } catch (err) {
    throw new Error('Cannot connect to server. Please ensure the server is running.');
  }

  // Safely parse JSON — handle empty or non-JSON responses
  let data;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error('Unexpected server response');
    }
  } else {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }

  return data;
}

// Auth
export const login = (username, password) =>
  request('/auth/login', { method: 'POST', body: { username, password } });

export const logout = () =>
  request('/auth/logout', { method: 'POST' });

export const getMe = () =>
  request('/auth/me');

// Global columns (admin-defined table columns)
export const getColumns = () =>
  request('/columns');

export const createColumn = (data) =>
  request('/columns', { method: 'POST', body: data });

export const updateColumn = (id, data) =>
  request(`/columns/${id}`, { method: 'PUT', body: data });

export const deleteColumn = (id) =>
  request(`/columns/${id}`, { method: 'DELETE' });

// Records (schema-less: values keyed by column id)
export const getRecords = (type) =>
  request(`/records/${type}`);

export const createRecord = (type, data) =>
  request(`/records/${type}`, { method: 'POST', body: data });

export const updateRecord = (type, id, data) =>
  request(`/records/${type}/${id}`, { method: 'PUT', body: data });

export const deleteRecord = (type, id) =>
  request(`/records/${type}/${id}`, { method: 'DELETE' });

// Users (Admin)
export const getUsers = () =>
  request('/users');

export const getCampaignUsers = (campaign) =>
  request(`/campaign/${encodeURIComponent(campaign)}/users`);

export const createUser = (data) =>
  request('/users', { method: 'POST', body: data });

export const deleteUser = (id) =>
  request(`/users/${id}`, { method: 'DELETE' });

export const updateUserCampaign = (id, campaign) =>
  request(`/users/${id}/campaign`, { method: 'PUT', body: { campaign } });

// Full user update (name, username, role, campaign string)
export const updateUser = (id, data) =>
  request(`/users/${id}`, { method: 'PUT', body: data });

// Assign user to a campaign + optional bucket (ids from campaigns-config)
export const updateUserAssignment = (id, campaign_id, bucket_id = null) =>
  request(`/users/${id}/assignment`, { method: 'PUT', body: { campaign_id, bucket_id } });

export const changePassword = (id, password) =>
  request(`/users/${id}/password`, { method: 'PUT', body: { password } });



// Campaigns & Columns configuration
export const getCampaignsConfig = () =>
  request('/campaigns-config');

export const createCampaign = (name) =>
  request('/campaigns-config', { method: 'POST', body: { name } });

export const updateCampaign = (id, name) =>
  request(`/campaigns-config/${id}`, { method: 'PUT', body: { name } });

export const deleteCampaign = (id) =>
  request(`/campaigns-config/${id}`, { method: 'DELETE' });

export const addBucket = (campaignId, name) =>
  request(`/campaigns-config/${campaignId}/buckets`, { method: 'POST', body: { name } });

export const updateBucket = (id, name) =>
  request(`/buckets/${id}`, { method: 'PUT', body: { name } });

export const deleteBucket = (id) =>
  request(`/buckets/${id}`, { method: 'DELETE' });



export const updateAssignments = (campaignId, assignments) =>
  request(`/campaigns-config/${campaignId}/assignments`, { method: 'PUT', body: { assignments } });



// Admin monitoring - export existing functions for use
