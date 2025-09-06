import api from './api';

// Register user
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    if (response.data) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('userInfo');
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/auth/profile', userData);
    if (response.data) {
      localStorage.setItem('userInfo', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};