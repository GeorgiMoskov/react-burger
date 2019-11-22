import { all } from 'redux-saga/effects';
import ingredientsSaga from './ingredients';
import authSaga from './auth';

export default function* rootSaga() {
  yield all([
    ingredientsSaga(),
    authSaga()
  ])
}