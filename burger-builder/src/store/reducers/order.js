import * as AT from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state) => {
  console.error('REWORK - purchaseInit - reducer');
  // return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state) => {
  console.error('REWORK - purchaseBurgerStart - reducer');
  // return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  console.error('REWORK - purchaseBurgerSuccess - reducer');
  // const newOrder = updateObject(action.orderData, { id: action.orderId })
  // return updateObject(state, {
  //   loading: false,
  //   purchased: true,
  //   orders: state.orders.concat(newOrder)
  // });
};

const purchaseBurgerFail = (state) => {
  console.error('REWORK - purchaseBurgerFail - reducer');
  // return updateObject(state, { loading: false });
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