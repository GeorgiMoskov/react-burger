import { Map } from 'immutable';
import { START_LOADING, STOP_LOADING } from '../actions/actionTypes';

const initialState = Map();

export default (state = initialState, { type, payload } = {}) => {
  switch(type) {
    case START_LOADING:
      return state.set(payload.name, true);

    case STOP_LOADING:
      return state.delete(payload.name);
    
    default:
      return state;
  }
}