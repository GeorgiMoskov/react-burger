import * as AT from '../actions/actionTypes';
import { Map, List, fromJS } from 'immutable';

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

const purchaseBurgerSuccess = (state, {orderData, orderId}) => {
  const order = fromJS(orderData).set('id', orderId);
  return state.mergeDeep({
    orders: state.get('orders').push(order),
    loading: false,
    isPurchased: true
  })
};

const purchaseBurgerFail = (state, {error}) => {
  console.error('Error Purchase Burger =>', error);
  return state.set('loading', false);
};

const fetchOrdersStart = (state) => {
  console.error('REWORK - fetchOrdersStart - reducer');
  // return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  console.error('REWORK - fetchOrdersSuccess - reducer');
  // return updateObject(state, {
  //   orders: action.orders,
  //   loading: false
  // });
};

const fetchOrdersFail = (state) => {
  console.error('REWORK - fetchOrdersFail - reducer');
  // return updateObject(state, { loading: false });
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