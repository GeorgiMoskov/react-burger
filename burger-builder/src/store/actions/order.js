import * as AT from './actionTypes';
import axios from '../../axios-orders';
import { fromJS } from 'immutable';

import { 
  ORDER_BURGER,
  SET_IS_BURGER_ORDERED
 } from './actionTypes';

export const orderBurger = (orderData) => {
  return {
    type: ORDER_BURGER,
    payload: {
      orderData
    }
  }
};

export const setIsBurgerOrdered = (isBurgerOrdered=false) => {
  return {
    type: SET_IS_BURGER_ORDERED,
    payload: {
      isBurgerOrdered
    }
  }
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