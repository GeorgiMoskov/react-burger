import axios from '../../axios-app';

const orderBurger = (token, userId, ingredients, price, orderData) => {
  const reqObj = {
    ingredients: ingredients.toJS(),
    orderData,
    price,
    userId
  };
  return axios.post('/orders.json?auth=' + token, reqObj).then(res => res);
}

export default {
  orderBurger
}