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

// CHECKED
const authStart = (state) => {
  return state.mergeDeep({ error: null, loading: true })
};

//CHECKED
const authSuccess = (state, {token, userId}) => {
  return state.mergeDeep({
    authDidInit: true,
    token: token,
    userId: userId,
    error: null,
    loading: false
  })
};

//CHECKED
const authFail = (state, {error}) => {
  return state.mergeDeep({
    loading: false,
    error: error
  })
}

//CHECKED
const authLogout = (state) => {
  return state.mergeDeep({
    authDidInit: true,
    token: null,
    userId: null
  });
};

//CHECKED
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