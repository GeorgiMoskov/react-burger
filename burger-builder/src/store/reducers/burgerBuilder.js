import * as AT from '../actions/actionTypes';
import * as ING from '../../constants/burger/ingredients/ingredients';
import { Map, List } from 'immutable';

const initialState = Map({
  //NEW
  buildingIngredients: List(),
  isErrorFetchBuildingIngs: false,
  addedIngredients: List(),
  isErrorFetchInitIngsOrder: false,
  isBuildingIngredientsInit: false,
  isAddedIngredientsInit: false,

  //TODO: CHECK THIS ERROR
  error: false,
});

const addIngredient = (state, { ingredientType }) => {
  let config = null;
  if(ingredientType === ING.SALAMI) {
    config = Map({
      fats: Math.floor(Math.random() * (6 - 4 + 1) ) + 4
    })
  }
  const newAddedIngredients = state.get('addedIngredients').insert(0, Map({ type: ingredientType, config }));
  return state.set('addedIngredients', newAddedIngredients);
}

const removeIngredient = (state, { ingredientType, position }) => {
  const removeIndex = (position || position === 0) ? 
    position : 
    state.get('addedIngredients').findIndex((ingData) => ingData.get('type') === ingredientType)

  const newAddedIngredients = state.get('addedIngredients').remove(removeIndex);
  return state.set('addedIngredients', newAddedIngredients);
}

const setAddedIngredients = (state, {addedIngredientsList}) => {
  return state
    .set('addedIngredients', addedIngredientsList)
    .set('isAddedIngredientsInit', true);
}

const setBuildingIngredients = (state, {buildingIngredientsList}) => {
  return state
    .set('buildingIngredients', buildingIngredientsList)
    .set('isBuildingIngredientsInit', true);
}

const fetchBuildingIngredientsFailed = (state) => {
  return state.set('isErrorFetchBuildingIngs', true);
}

const fetchInitIngredientsOrderFailed = (state) => {
  return state.set('isErrorFetchInitIngsOrder', true);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case AT.SET_BUILDING_INGREDIENTS: return setBuildingIngredients(state, action);

    case AT.FETCH_BUILDING_INGREDIENTS_FAILED: return fetchBuildingIngredientsFailed(state, action);

    case AT.SET_ADDED_INGREDIENTS: return setAddedIngredients(state, action);

    case AT.FETCH_INIT_INGREDIENTS_ORDER_FAILED: return fetchInitIngredientsOrderFailed(state, action);

    case AT.ADD_INGREDIENT: return addIngredient(state, action);

    case AT.REMOVE_INGREDIENT: return removeIngredient(state, action);

    default: return state;
  }
}

export default reducer;