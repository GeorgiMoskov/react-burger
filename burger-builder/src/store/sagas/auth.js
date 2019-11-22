import { takeLatest, put, call } from 'redux-saga/effects';
import {
  INIT_AUTH_STATE,
  AUTH_LOGOUT
} from '../actions/actionTypes';
import { setAuthState } from '../actions';

const clearAuthLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
}

function* initAuthState() {
  const token = localStorage.getItem('token') || null;
  const userId = localStorage.getItem('userId') || null;
  const expirationDateStr = localStorage.getItem('expirationDate') || null;
  if(!token || !userId || !expirationDateStr) {
    clearAuthLocalStorage();
  }
  yield put(setAuthState(token, userId));
}

function* login(email, password) {

}


// function* authLogout() {
//   clearAuthLocalStorage();
// }


export default function* authSaga() {
  yield takeLatest(INIT_AUTH_STATE, initAuthState);
  //yield takeLatest(AUTH_LOGOUT, authLogout);
}