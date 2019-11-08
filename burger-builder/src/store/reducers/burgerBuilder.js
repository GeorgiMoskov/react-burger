import * as AT from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

import { Map } from 'immutable';

const initialState = Map({
  ingredients: null,
  ingredientsPrice: null,
  totalPrice: 4,
  error: false,
  isBuilding: false
});

const addIngredient = (state, action) => {
  console.error('REWORK : addIngredient - reducer');
  // const updatedIngredient = { [action.ingredientKey]: state.ingredients[action.ingredientKey] + 1 }
  // const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  // const updatedState = {
  //   ingredients: updatedIngredients,
  //   totalPrice: state.totalPrice + state.ingredientsPrice[action.ingredientKey],
  //   building: true
  // }
  // return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  console.error('REWORK - removeIngredient - reducer');
  // const updatedIngredient = { [action.ingredientKey]: state.ingredients[action.ingredientKey] - 1 }
  // const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  // const updatedStateProps = {
  //   ingredients: updatedIngredients,
  //   totalPrice: state.totalPrice - state.ingredientsPrice[action.ingredientKey]
  // }
  // return updateObject(state, updatedStateProps);
}

const setIngredients = (state, action) => {
  console.error('REWORK - setIngredients - reducer');
  // return updateObject(state, {
  //   ingredients: action.ingredients,
  //   ingredientsPrice: action.ingredientsPrice,
  //   totalPrice: 4,
  //   error: false,
  //   building: false
  // });
} 

const fetchIngredientsFailed = (state) => {
  console.error('REWORK - fetchIngredientsFailed - reducer');
  // return updateObject(state, { error: true });
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.ADD_INGREDIENT: return addIngredient(state, action);

    case AT.REMOVE_INGREDIENT: return removeIngredient(state, action);
        
    case AT.SET_INGREDIENTS: return setIngredients(state, action);

    case AT.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);

    default: return state;
  }
}

export default reducer;