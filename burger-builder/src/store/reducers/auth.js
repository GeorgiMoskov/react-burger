import * as AT from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

import { Map } from 'immutable';


const initialState = Map({
  authDidInit: false,
  token: null,
  userId: null,
  error: null,
  loading: false,
  afterAuthRedirectPath: '/',
});

const authStart = (state) => {
  console.error('REWORK - authStart - reducer');
  // return updateObject(state, { error: null, loading: true });
};

//CHECKED - REWORKED
const authSuccess = (state, {token, userId}) => {
  return state.mergeDeep({
    authDidInit: true,
    token: token,
    userId: userId,
    error: null,
    loading: false
  })
};

const authFail = (state, action) => {
  console.error('REWORK - authFail - reducer');
  // return updateObject(state, {
  //   loading: false,
  //   error: action.error
  // })
}

//CHECKED - REWORKED
const authLogout = (state) => {
  return state.mergeDeep({
    authDidInit: true,
    token: null,
    userId: null
  });
};

//CHECKED - REWORKED
const setAfterAuthRedirectPath = (state, {path}) => {
  return state.mergeDeep({
    afterAuthRedirectPath: path
  });
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case AT.AUTH_START: return authStart(state);

    case AT.AUTH_SUCCESS: return authSuccess(state, action);

    case AT.AUTH_FAIL: return authFail(state, action);

    case AT.AUTH_LOGOUT: return authLogout(state);

    case AT.SET_AFTER_AUTH_REDIRECT_PATH: return setAfterAuthRedirectPath(state, action);

    default: return state;
  }
};

export default reducer;