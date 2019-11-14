import * as AT from './actionTypes';
import axios from '../../axios-orders';
import { fromJS } from 'immutable';

export const resetIsPurchased = () => ({
  type: AT.RESET_IS_PURCHASED
});

export const purchaseBurgerSuccess = () => {
  return {
    type: AT.PURCHASE_BURGER_SUCCESS,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: AT.PURCHASE_BURGER_FAIL,
    error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: AT.PURCHASE_BURGER_START
  }
}

export const purchaseInit = () => {
  return {
    type: AT.PURCHASE_INIT, 
  }
}

export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());

    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess());
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: AT.FETCH_ORDERS_SUCCESS,
    orders: fromJS(orders)
  }
};

export const fetchOrdersFail = (error) => {
  return {
    type: AT.FETCH_ORDERS_FAIL,
    error: error 
  }
}

export const fetchOrdersStart = () => {
  return {
    type: AT.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get('/orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for(let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  }
}