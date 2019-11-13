import * as AT from '../actions/actionTypes';
import { Map, List } from 'immutable';

const initialState = Map({
  orders: List(),
  loading: false,
  isPurchased: false
});

const purchaseInit = (state) => {
  return state.set("isPurchased", false);
};

const purchaseBurgerStart = (state) => {
  return state.set('loading', true);
};

const purchaseBurgerSuccess = (state) => {
  return state.mergeDeep({
    loading: false,
    isPurchased: true
  })
};

const purchaseBurgerFail = (state, {error}) => {
  console.error('Error Purchase Burger =>', error);
  return state.set('loading', false);
};

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
    case AT.PURCHASE_INIT: return purchaseInit(state);

    case AT.PURCHASE_BURGER_START: return purchaseBurgerStart(state);

    case AT.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);

    case AT.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
    
    case AT.FETCH_ORDERS_START: return fetchOrdersStart(state);

    case AT.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);

    case AT.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
      
    default: return state;
  }
};

export default reducer;