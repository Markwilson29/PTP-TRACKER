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

// PTP Records
export const getRecords = () =>
  request('/records');

export const createRecord = (data) =>
  request('/records', { method: 'POST', body: data });

export const updateRecord = (id, data) =>
  request(`/records/${id}`, { method: 'PUT', body: data });

export const deleteRecord = (id) =>
  request(`/records/${id}`, { method: 'DELETE' });

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

export const changePassword = (id, password) =>
  request(`/users/${id}/password`, { method: 'PUT', body: { password } });

// Campaign-scoped records (Admin)
export const getCampaignRecords = (campaign) =>
  request(`/campaign/${encodeURIComponent(campaign)}/records`);

// Confirmed Records
export const getConfirmedRecords = () =>
  request('/confirmed');

export const createConfirmedRecord = (data) =>
  request('/confirmed', { method: 'POST', body: data });

export const updateConfirmedRecord = (id, data) =>
  request(`/confirmed/${id}`, { method: 'PUT', body: data });

export const deleteConfirmedRecord = (id) =>
  request(`/confirmed/${id}`, { method: 'DELETE' });

export const getCampaignConfirmedRecords = (campaign) =>
  request(`/campaign/${encodeURIComponent(campaign)}/confirmed`);

// Admin monitoring - export existing functions for use
