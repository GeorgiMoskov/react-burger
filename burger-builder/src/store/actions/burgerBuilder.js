import * as AT from '../actions/actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
  return {
    type: AT.ADD_INGREDIENT,
    ingredientName: ingredientName
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: AT.REMOVE_INGREDIENT,
    ingredientName: ingredientName
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: AT.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: AT.FETCH_INGREDIENTS_FAILED
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
}