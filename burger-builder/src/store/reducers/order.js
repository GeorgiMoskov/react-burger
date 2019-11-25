import { SET_IS_BURGER_ORDERED } from '../actions/actionTypes';
import * as AT from '../actions/actionTypes';
import { Map, List } from 'immutable';

const initialState = Map({
  orders: List(),
  isOrdered: false,
});

const fetchOrdersStart = (state) => {
  return state.set('loading', true);
};

const fetchOrdersSuccess = (state, {orders}) => {
  return state
    .set('orders', orders)
    .set('loading', false)
};

const fetchOrdersFail = (state) => {
  return state.set('loading', false);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_BURGER_ORDERED: 
      const { payload: { isBurgerOrdered } } = action;
      return state.set('isOrdered', isBurgerOrdered);

    case AT.FETCH_ORDERS_START: return fetchOrdersStart(state);

    case AT.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);

    case AT.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
  
    default: return state;
  }
};

export default reducer;