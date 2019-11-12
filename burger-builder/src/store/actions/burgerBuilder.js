import * as AT from '../actions/actionTypes';
import * as API_ING from '../../constants/burger/ingredients/api.ingredients';
import axios from '../../axios-orders';

import { Map, fromJS } from 'immutable';

export const addIngredient = (ingredientKey) => {
  return {
    type: AT.ADD_INGREDIENT,
    ingredientKey: ingredientKey
  };
};

export const removeIngredient = (ingredientKey) => {
  return {
    type: AT.REMOVE_INGREDIENT,
    ingredientKey: ingredientKey
  };
};

// CHECKED
export const setIngredients = (ingredients, ingredientsPrice) => {
  /* TODO: create startingPrice based on amount of default ingredients and base price.
  To check - add amount to some of the ingredients on backend */

  return {
    type: AT.SET_INGREDIENTS,
    ingredients: ingredients,
    ingredientsPrice: ingredientsPrice
  }
}

// CHECKED
export const fetchIngredientsFailed = () => {
  return {
    type: AT.FETCH_INGREDIENTS_FAILED
  }
}

// CHECKED
const mapResIngredients = (resIngredients) => {
  const ingredients = {};
  const ingredientsPrice = {};
  const unknownIngredients = [];

  resIngredients.forEach(resIngredientObj => {
    let isUnknownIngredient = true;
    Object.keys({...API_ING}).forEach(apiIngKey => {
      if(resIngredientObj.type === API_ING[apiIngKey]) {
        ingredients[apiIngKey] = resIngredientObj.amount;
        ingredientsPrice[apiIngKey] = resIngredientObj.price;
        isUnknownIngredient = false;
      }
    });

    if(isUnknownIngredient) {
      unknownIngredients.push(resIngredientObj.type);
    }
  });

  axios.post('/logs/unknownIngredients.json', unknownIngredients)
      .then()
      .catch(error => console.error(error));

  return { ingredients, ingredientsPrice };
}

//In PROGRESS
export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        const ingredientsData = fromJS(mapResIngredients(res.data));
        dispatch(setIngredients(ingredientsData.get('ingredients'), ingredientsData.get('ingredientsPrice')));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
}