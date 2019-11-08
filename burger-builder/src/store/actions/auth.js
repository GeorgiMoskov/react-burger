import axios from 'axios';

import * as AT from './actionTypes';

export const authStart = () => {
  return {
    type: AT.AUTH_START
  };
};

//CHECKED
export const authSuccess = (token, userId) => {
  return {
    type: AT.AUTH_SUCCESS,
    userId: userId,
    token: token
  };
};

export const authFail = (error) => {
  return {
    type: AT.AUTH_FAIL,
    error: error
  };
};

//CHECKED
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: AT.AUTH_LOGOUT
  }
}

//CHECKED
export const startAuthTimeout = (expirationTimeInMs) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTimeInMs);
  };
};

export const auth = (email, password, isRegister) => {
  return dispatch => {
    dispatch(authStart());
  
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    const FIREBASE_API_KEY = 'AIzaSyCc7pkXczux334q_JKX7ejH5q8E0yXlfqk';
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;

    if(!isRegister) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    }

    axios.post(url, authData)
      .then(response => {
        const expireAfterMs = response.data.expiresIn * 1000;
        const expirationDate = new Date(new Date().getTime() + expireAfterMs);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);

        dispatch(startAuthTimeout(expireAfterMs));
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      })
  }
}

export const setAfterAuthRedirectPath = (path) => {
  return {
    type: AT.SET_AFTER_AUTH_REDIRECT_PATH,
    path: path
  }
};

// CHECKED
export const initAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDateStr = localStorage.getItem('expirationDate');

    if(!token || !userId || !expirationDateStr) {
      return dispatch(logout());
    }

    const expirationDate = new Date(expirationDateStr);
    if(expirationDate <= new Date()) {
      return dispatch(logout());
    }

    dispatch(authSuccess(token, userId));
    dispatch(startAuthTimeout(expirationDate.getTime() - new Date().getTime()));
  };
};