import { takeEvery, select, call, put } from 'redux-saga/effects';
import { ORDER_BURGER } from '../actions/actionTypes';
import * as actions from '../actions';
import { selectTotalPrice } from '../selectors/burgerBuilder';
import orderService from '../services/order';

function* orderBurger(action) {
  try {
    const { payload: { orderData } } = action;
    const { token, userId, ingredients, price } = yield select(state => ({
      token: state.auth.get('token'),
      userId: state.auth.get('userId'),
      ingredients: state.ingredients.get('addedIngredients'),
      price: selectTotalPrice(state)
    }));
    yield call(orderService.orderBurger, token, userId, ingredients, price, orderData);
    yield put(actions.setIsBurgerOrdered(true));
    yield put(actions.setIsBurgerOrdered(false));


  } catch(e) {
    console.log('ERROR orderBurger saga: ', e);
      return e;
  }
}

export default function* orderSaga() {
  yield takeEvery(ORDER_BURGER, orderBurger);
} 