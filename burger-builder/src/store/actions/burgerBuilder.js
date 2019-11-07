import * as AT from '../actions/actionTypes';
import * as ING from '../../constants/burger/ingredients/ingredients';
import * as API_ING from '../../constants/burger/ingredients/api.ingredients';
import axios from '../../axios-orders';

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

const mapResIngredients = (resIngredients) => {
  const ingredients = {};
  const unknownIngredients = [];

  Object.keys({...resIngredients}).forEach(resIngredientKey => {
    let isUnknownIngredient = true;
    Object.keys({...API_ING}).forEach(apiIngKey => {
      if(resIngredientKey === API_ING[apiIngKey]) {
        ingredients[apiIngKey] = resIngredients[resIngredientKey];
        isUnknownIngredient = false;
      }
    });

    if(isUnknownIngredient) {
      unknownIngredients.push(resIngredientKey);
    }
  });

  axios.post('/logs/unknownIngredients.json', unknownIngredients)
      .then()
      .catch(error => console.error(error));
  
  return ingredients;
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(res => {
        const ingredients = mapResIngredients(res.data);
        dispatch(setIngredients(ingredients));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
}