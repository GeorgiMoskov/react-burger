import { takeLatest, takeEvery, call, put, select } from 'redux-saga/effects';

import {
  INIT_BUILDING_INGREDIENTS,
  INIT_ADDED_INGREDIENTS,
  REMOVE_INGREDIENT_BY_TYPE,
  CHANGE_INGREDIENT_POSITION
} from '../actions/actionTypes';

import { startLoading, setBuildingIngredients, setAddedIngredients, stopLoading, removeIngredientByIndex } from '../actions';
import { INIT_BUILDING_INGREDIENTS_LOADER, INIT_ADDED_INGREDIENTS_LOADER } from '../../constants/loaders';
import IngredientsService from '../services/ingredients';

function* initBuildingIngredients() {
  yield put(startLoading(INIT_BUILDING_INGREDIENTS_LOADER));
  try {
    const buildingIngredientsArr = yield call(IngredientsService.fetchBuildingIngredients);
    yield put(setBuildingIngredients(buildingIngredientsArr));
  } catch(e) {
    //TODO: ON FETCH FAIL
    console.error('INIT BUILDING INGREDIENTS');
  }
  yield put(stopLoading(INIT_BUILDING_INGREDIENTS_LOADER));
}

function* initAddedIngredients() {
  yield put(startLoading(INIT_ADDED_INGREDIENTS_LOADER));
  try {
    const addedIngredientsArr = yield call(IngredientsService.fetchInitiallyAddedIngredients);
    yield put(setAddedIngredients(addedIngredientsArr));
  } catch(e) {
    //TODO: ON FETCH FAIL
    console.error('INIT ADDED INGREDIENTS');
  }
  yield put(stopLoading(INIT_ADDED_INGREDIENTS_LOADER));
}

function* removeIngredientByType(action) {
  const { payload: { ingredientType } } = action;
  const addedIngredients = yield select(state => state.ingredients.get('addedIngredients'));
  const firstOfTypeIndex = addedIngredients.findIndex((ingData) => ingData.get('type') === ingredientType);
  yield put(removeIngredientByIndex(firstOfTypeIndex));
}

function* changeIngredientPosition(action) {
  const { payload: { fromIndex, toIndex } } = action;
  const ingToMove = yield select(state => state.ingredients.getIn(['addedIngredients', fromIndex]));
  let updatedIngsList = yield select(state => state.ingredients.get('addedIngredients').remove(fromIndex));
  updatedIngsList = updatedIngsList.insert(toIndex, ingToMove);
  yield put(setAddedIngredients(updatedIngsList));
}

export default function* ingredientsSaga() {
  yield takeLatest(INIT_BUILDING_INGREDIENTS, initBuildingIngredients);
  yield takeLatest(INIT_ADDED_INGREDIENTS, initAddedIngredients);
  yield takeEvery(REMOVE_INGREDIENT_BY_TYPE, removeIngredientByType);
  yield takeEvery(CHANGE_INGREDIENT_POSITION, changeIngredientPosition);
}