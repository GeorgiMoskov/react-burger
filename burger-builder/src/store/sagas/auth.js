import { takeLatest, put, call, spawn, delay } from 'redux-saga/effects';
import {
  INIT_AUTH_STATE,
  LOGIN,
  LOGOUT,
  REGISTER
} from '../actions/actionTypes';
import { 
  setAuthState,
 } from '../actions';
import  authService from '../services/auth';

const clearAuthLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
}

function* logoutAfterMS(ms) {
  yield delay(ms);
  yield call(logout);
}

function* initAuthState() {
  const token = localStorage.getItem('token') || null;
  const userId = localStorage.getItem('userId') || null;
  const expirationDateStr = localStorage.getItem('expirationDate') || null;
  let expirationDate = expirationDateStr ? new Date(expirationDateStr) : null;
  let currentDate = new Date();
  if(!token || !userId || !expirationDateStr || expirationDate <= currentDate) {
    clearAuthLocalStorage();
  } else {
    yield spawn(logoutAfterMS, expirationDate.getTime() - currentDate.getTime())
  }
  yield put(setAuthState(token, userId));
}

function* auth(action, isRegister = false) {
  const {payload: {email, password}} = action;
  const currentAuthService = isRegister ? authService.register : authService.login;
  const { token, userId, expireAfterMs } = yield call(currentAuthService, email, password);
  const expirationDate = new Date(new Date().getTime() + expireAfterMs);
  localStorage.setItem('token', token);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', userId);
  yield spawn(logoutAfterMS, expirationDate.getTime() - new Date().getTime());
  yield put(setAuthState(token, userId));

}

function* login(action) {
  //TODO: LOADER START
  try {
    yield call(auth, action);
  } catch(e) {
    return e;
    //TODO: on login error;
    //const errorData = error.response ? error.response.data.error : error;
  }
  //TODO: LOADER END
}

function* register(action) {
  //TODO: LOADER START
  try {
    yield call(auth, action, true);
  } catch(e) {
    return e;
    //TODO: on register error;
    //const errorData = error.response ? error.response.data.error : error;
  }
  //TODO: LOADER END
}

function* logout() {
  clearAuthLocalStorage();
  yield put(setAuthState(null, null));
}

export default function* authSaga() {
  yield takeLatest(INIT_AUTH_STATE, initAuthState);
  yield takeLatest(LOGIN, login);
  yield takeLatest(REGISTER, register);
  yield takeLatest(LOGOUT, logout);
}