import * as AT from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirect: '/'
};

const authStart = (state) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, { 
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
   });
};

const authFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    userId: null
  });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirect: action.path
  })
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case AT.AUTH_START: return authStart(state);

    case AT.AUTH_SUCCESS: return authSuccess(state, action);

    case AT.AUTH_FAIL: return authFail(state, action);

    case AT.AUTH_LOGOUT: return authLogout(state);

    case AT.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);

    default: return state;
  }
};

export default reducer;