import httpRequest from '../api/httpRequest';

export const authService = {
  login: async (credentials: any) => {
    return httpRequest.post('/auth/login', credentials);
  },

  register: async (userData: any) => {
    return httpRequest.post('/auth/register', userData);
  },

  getCurrentUser: async () => {
    return httpRequest.get('/auth/me'); // Optional: if backend supports it
  }
};
