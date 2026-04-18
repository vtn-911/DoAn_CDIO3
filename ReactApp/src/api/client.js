const API_BASE_URL = 'http://localhost:5000/api'

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'API Error')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// ============ AUTH API ============

export const authAPI = {
  login: (username, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),

  logout: () =>
    apiCall('/auth/logout', {
      method: 'POST'
    }),

  getMe: () =>
    apiCall('/auth/me'),

  register: (userData) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
}

// ============ STUDENT API ============

export const studentAPI = {
  getAll: () =>
    apiCall('/students'),

  getById: (id) =>
    apiCall(`/students/${id}`),

  create: (data) =>
    apiCall('/students', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  update: (id, data) =>
    apiCall(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  delete: (id) =>
    apiCall(`/students/${id}`, {
      method: 'DELETE'
    })
}

// ============ TEACHER API ============

export const teacherAPI = {
  getAll: () =>
    apiCall('/teachers'),

  create: (data) =>
    apiCall('/teachers', {
      method: 'POST',
      body: JSON.stringify(data)
    })
}

// ============ CLASS API ============

export const classAPI = {
  getAll: () =>
    apiCall('/classes'),

  create: (data) =>
    apiCall('/classes', {
      method: 'POST',
      body: JSON.stringify(data)
    })
}

// ============ ATTENDANCE API ============

export const attendanceAPI = {
  getAll: () =>
    apiCall('/attendance'),

  record: (data) =>
    apiCall('/attendance', {
      method: 'POST',
      body: JSON.stringify(data)
    })
}

// ============ HEALTH API ============

export const healthAPI = {
  getAll: () =>
    apiCall('/health'),

  record: (data) =>
    apiCall('/health', {
      method: 'POST',
      body: JSON.stringify(data)
    })
}

// ============ FINANCE API ============

export const financeAPI = {
  getAll: () =>
    apiCall('/finance'),

  record: (data) =>
    apiCall('/finance', {
      method: 'POST',
      body: JSON.stringify(data)
    })
}

// ============ NOTIFICATION API ============

export const notificationAPI = {
  getAll: () =>
    apiCall('/notifications'),

  send: (data) =>
    apiCall('/notifications', {
      method: 'POST',
      body: JSON.stringify(data)
    })
}
