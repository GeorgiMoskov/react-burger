import * as AT from '../actions/actionTypes';
import { Map } from 'immutable';

const initialState = Map({
  ingredients: Map({}),
  ingredientsPrice: Map({}),
  totalPrice: 4,
  error: false,
  isBuilding: false
});

const addIngredient = (state, { ingredientKey }) => {
  return state.mergeDeep({
    ingredients: {
      [ingredientKey]: state.get('ingredients').get(ingredientKey) + 1
    },
    totalPrice: state.get('totalPrice') + state.get('ingredientsPrice').get(ingredientKey),
    isBuilding: true
  })
}

const removeIngredient = (state, { ingredientKey }) => {
  return state.mergeDeep({
    ingredients: {
      [ingredientKey]: state.get('ingredients').get(ingredientKey) - 1
    },
    totalPrice: state.get('totalPrice') - state.get('ingredientsPrice').get(ingredientKey)
  })
}

const setIngredients = (state, {ingredients, ingredientsPrice}) => {
  return state.mergeDeep({
    ingredients: ingredients,
    ingredientsPrice: ingredientsPrice,
    totalPrice: 4,
    error: false,
    building: false
  });
} 

const fetchIngredientsFailed = (state) => {
  return state.set('error', true);
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