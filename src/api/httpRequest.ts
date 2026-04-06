import axios, { AxiosError, AxiosResponse } from 'axios';
import { getCookie, removeCookie } from '../utils/cookieHelper';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME || 'token';

/**
 * Production-grade HTTP Request Utility.
 */

// Internal Axios Instance
const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Request Interceptor: Attach JWT token
instance.interceptors.request.use(
  (config) => {
    const token = getCookie(COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Unified Error Handling
instance.interceptors.response.use(
  (response) => response.data, // Flatten response data directly
  (error: AxiosError) => {
    const errorMessage = (error.response?.data as any)?.message || error.message || 'Something went wrong';
    
    // Global 401 handling: Redirect to login or clear state if token expires
    if (error.response?.status === 401) {
      removeCookie(COOKIE_NAME);
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(errorMessage);
  }
);

const httpRequest = {
  _prepareData: (data: any, isFormData: boolean) => {
    if (!isFormData) return data;
    if (data instanceof FormData) return data;
    
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (Array.isArray(value)) {
        value.forEach((v) => formData.append(`${key}[]`, v));
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    return formData;
  },

  get: async <T = any>(url: string, params = {}): Promise<T> => {
    return instance.get(url, { params });
  },

  post: async <T = any>(url: string, data = {}, isFormData = false): Promise<T> => {
    const finalData = httpRequest._prepareData(data, isFormData);
    return instance.post(url, finalData);
  },

  put: async <T = any>(url: string, data = {}, isFormData = false): Promise<T> => {
    const finalData = httpRequest._prepareData(data, isFormData);
    return instance.put(url, finalData);
  },

  patch: async <T = any>(url: string, data = {}, isFormData = false): Promise<T> => {
    const finalData = httpRequest._prepareData(data, isFormData);
    return instance.patch(url, finalData);
  },

  delete: async <T = any>(url: string): Promise<T> => {
    return instance.delete(url);
  }
};

export default httpRequest;
