import axios from 'axios';

import * as AT from './actionTypes';

export const authStart = () => {
  return {
    type: AT.AUTH_START
  };
};

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

export const logout = () => {
  return {
    // TODO: TOMORROW
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(()=> {
      dispatch(logout());
    }, expirationTime);
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
        console.log('AUTH ACTION => auth => response => ', response);
        dispatch(checkAuthTimeout(response.data.expiresIn));
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        console.log('AUTH ACTION => auth => error => ', error.response.data.error.message);
        dispatch(authFail(error.response.data.error));
      })
  }
}