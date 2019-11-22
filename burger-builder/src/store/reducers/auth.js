import * as AT from '../actions/actionTypes';

import { SET_AUTH_STATE } from '../actions/actionTypes';

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
  return state.mergeDeep({ error: null, loading: true })
};

// const authSuccess = (state, {token, userId}) => {
//   return state.mergeDeep({
//     authDidInit: true,
//     token: token,
//     userId: userId,
//     error: null,
//     loading: false
//   })
// };

const authFail = (state, {error}) => {
  return state.mergeDeep({
    loading: false,
    error: error
  })
}

const authLogout = (state) => {
  return state.mergeDeep({
    authDidInit: true,
    token: null,
    userId: null
  });
};

const setAfterAuthRedirectPath = (state, {path}) => {
  return state.mergeDeep({
    afterAuthRedirectPath: path
  });
}

const authSuccess = (state, {token, userId}) => {
  return state.mergeDeep({
    authDidInit: true,
    token: token,
    userId: userId,
    error: null,
    loading: false
  })
};

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_AUTH_STATE:
      const { token, userId } = payload;
      return state.mergeDeep({
        token,
        userId
      })
    
  
    //OLD
    // case AT.AUTH_START: return authStart(state);

    // case AT.AUTH_SUCCESS: return authSuccess(state, action);

    // case AT.AUTH_FAIL: return authFail(state, action);

    // case AT.AUTH_LOGOUT: return authLogout(state);

    // case AT.SET_AFTER_AUTH_REDIRECT_PATH: return setAfterAuthRedirectPath(state, action);

    default: return state;
  }
};

export default reducer;