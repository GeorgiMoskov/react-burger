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

// FIXME: ingredientName to Key
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

const mapResIngredients = (resIngredients) => {
  const ingredients = {};
  const unknownIngredients = [];
    Object.keys({...resIngredients}).forEach(resIngredientKey => {
      if(resIngredientKey === API_ING.MEAT) {
        return ingredients[ING.MEAT] = resIngredients[resIngredientKey];
      }
      if(resIngredientKey === API_ING.CHEESE) {
        return ingredients[ING.CHEESE] = resIngredients[resIngredientKey];
      }
      if(resIngredientKey === API_ING.SALAD) {
        return ingredients[ING.SALAD] = resIngredients[resIngredientKey];
      }
      if(resIngredientKey === API_ING.BACON) {
        return ingredients[ING.BACON] = resIngredients[resIngredientKey];
      }
      unknownIngredients.push(resIngredientKey);
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