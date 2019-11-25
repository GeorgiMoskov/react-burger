import { SET_AUTH_STATE, SET_AFTER_AUTH_REDIRECT_PATH } from '../actions/actionTypes';

import { Map } from 'immutable';


const initialState = Map({
  token: null,
  userId: null,
  afterAuthRedirectPath: '/',
  error: null, //TODO: HANDLE ERRORS
  loading: false, //TODO: HANDLE LOADERS 
});

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_AUTH_STATE:
      const { token, userId } = payload;
      return state.mergeDeep({
        token,
        userId
      })

    case SET_AFTER_AUTH_REDIRECT_PATH:
      const { path } = payload;
      return state.mergeDeep({
        afterAuthRedirectPath: path
      });

    default: return state;
  }
};

export default reducer;