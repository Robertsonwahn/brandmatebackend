// API Configuration
const API_CONFIG = {
  // For local development
  development: 'http://localhost:3000',
  // For production deployment - your actual Render.com URL
  production: 'https://brandmatebackend.onrender.com',
};

// Determine if we're in development or production
const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

export const API_BASE_URL = isDevelopment 
  ? API_CONFIG.development 
  : API_CONFIG.production;

export const API_ENDPOINTS = {
  names: `${API_BASE_URL}/api/names`,
  health: `${API_BASE_URL}/api/health`,
  auth: {
    register: `${API_BASE_URL}/api/auth/register`,
    login: `${API_BASE_URL}/api/auth/login`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    profile: `${API_BASE_URL}/api/auth/profile`,
  },
};