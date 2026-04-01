import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
};

// Elections API
export const electionsAPI = {
  getElections: () => api.get('/elections'),
  createElection: (electionData) => api.post('/elections', electionData),
  startElection: (id) => api.put(`/elections/${id}/start`),
  endElection: (id) => api.put(`/elections/${id}/end`),
};

// Candidates API
export const candidatesAPI = {
  getCandidates: (electionId) => api.get(`/candidates/${electionId}`),
  addCandidate: (candidateData) => api.post('/candidates', candidateData),
};

// Vote API
export const voteAPI = {
  castVote: (voteData) => api.post('/vote', voteData),
};

// Results API
export const resultsAPI = {
  getResults: (electionId) => api.get(`/results/${electionId}`),
  verifyChain: (electionId) => api.get(`/results/${electionId}/verify`),
};

export default api;