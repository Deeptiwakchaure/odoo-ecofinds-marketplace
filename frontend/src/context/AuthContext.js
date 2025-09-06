import React, { createContext, useContext, useReducer } from 'react';
import {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
} from '../services/authService';

const AuthContext = createContext();

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, userInfo: action.payload };
    case 'AUTH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, userInfo: null };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const userRegister = async (userData) => {
    try {
      dispatch({ type: 'AUTH_REQUEST' });
      const data = await register(userData);
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAIL',
        payload: error.message || 'Registration failed',
      });
    }
  };

  // Login user
  const userLogin = async (userData) => {
    try {
      dispatch({ type: 'AUTH_REQUEST' });
      const data = await login(userData);
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAIL',
        payload: error.message || 'Login failed',
      });
    }
  };

  // Logout user
  const userLogout = () => {
    logout();
    dispatch({ type: 'LOGOUT' });
  };

  // Get user profile
  const getUser = async () => {
    try {
      dispatch({ type: 'AUTH_REQUEST' });
      const data = await getUserProfile();
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAIL',
        payload: error.message || 'Failed to get profile',
      });
    }
  };

  // Update user profile
  const updateUser = async (userData) => {
    try {
      dispatch({ type: 'AUTH_REQUEST' });
      const data = await updateUserProfile(userData);
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'AUTH_FAIL',
        payload: error.message || 'Failed to update profile',
      });
    }
  };

  // Clear errors
  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        userRegister,
        userLogin,
        userLogout,
        getUser,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);