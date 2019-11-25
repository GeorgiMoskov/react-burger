import axios from '../../axios-app';

const auth = (email, password, isRegister = false) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true // Firebase specific to return a token
  };
  const FIREBASE_API_KEY = 'AIzaSyCc7pkXczux334q_JKX7ejH5q8E0yXlfqk';
  let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
  if(isRegister) {
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
  }
  return axios.post(url, authData)
    .then(response => {
      const expireAfterMs = response.data.expiresIn * 1000;
      const token = response.data.idToken;
      const userId = response.data.localId;
      return {
        expireAfterMs,
        token,
        userId
      }
    });
};

const login = (email, password) => {
  return auth(email, password);
};

const register = (email, password) => {
  return auth(email, password, true);
}

export default {
  login,
  register
}