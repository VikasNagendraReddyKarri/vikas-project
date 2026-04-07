import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const courseAPI = {
  getCourses: () => api.get('/courses'),
  createCourse: (data) => api.post('/courses', data),
};

export const feedbackAPI = {
  submitFeedback: (data) => api.post('/feedback', data),
  getFeedback: (courseId) => api.get(`/feedback/${courseId}`),
};

export const analyticsAPI = {
  getAnalytics: () => api.get('/analytics'),
};

export default api;