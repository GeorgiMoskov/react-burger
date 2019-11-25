import {
  SET_AFTER_AUTH_REDIRECT_PATH,
  INIT_AUTH_STATE,
  SET_AUTH_STATE,
  LOGIN,
  LOGOUT,
  REGISTER
 } from './actionTypes';

export const setAfterAuthRedirectPath = (path) => ({
  type: SET_AFTER_AUTH_REDIRECT_PATH,
  payload: {
    path
  }
});

export const initAuthState = () => ({
  type: INIT_AUTH_STATE
});

export const setAuthState = (token, userId) =>({
  type: SET_AUTH_STATE,
  payload: {
    token,
    userId
  }
});

export const login = (email, password) => ({
  type: LOGIN,
  payload: {
    email,
    password
  }
});

export const register = (email, password) => ({
  type: REGISTER,
  payload: {
    email,
    password
  }
})

export const logout = () => ({
  type: LOGOUT
});
