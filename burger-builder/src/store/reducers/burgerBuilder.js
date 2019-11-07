import * as AT from '../actions/actionTypes';
import * as ING from '../../constants/burger/ingredients/ingredients';
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  [ING.SALAD]: 0.5,
  [ING.CHEESE]: 0.4,
  [ING.MEAT]: 1.3,
  [ING.BACON]: 0.7
};

const addIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientKey]: state.ingredients[action.ingredientKey] + 1 }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientKey],
    building: true
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIngredient = { [action.ingredientKey]: state.ingredients[action.ingredientKey] - 1 }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedStateProps = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientKey]
  }
  return updateObject(state, updatedStateProps);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  });
} 

const fetchIngredientsFailed = (state) => {
  return updateObject(state, { error: true });
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