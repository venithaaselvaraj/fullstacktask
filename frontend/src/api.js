import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Department API
export const departmentAPI = {
  getAll: () => api.get('/departments'),
  getById: (id) => api.get(`/departments/${id}`),
  create: (department) => api.post('/departments', department),
  update: (id, department) => api.put(`/departments/${id}`, department),
  delete: (id) => api.delete(`/departments/${id}`),
};

// Faculty API
export const facultyAPI = {
  getAll: () => api.get('/faculties'),
  getById: (id) => api.get(`/faculties/${id}`),
  getByDepartment: (departmentId) => api.get(`/faculties/department/${departmentId}`),
  create: (faculty) => api.post('/faculties', faculty),
  update: (id, faculty) => api.put(`/faculties/${id}`, faculty),
  delete: (id) => api.delete(`/faculties/${id}`),
};
