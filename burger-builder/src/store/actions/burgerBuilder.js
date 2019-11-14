import * as AT from '../actions/actionTypes';
import * as API_ING from '../../constants/burger/ingredients/api.ingredients';
import axios from '../../axios-orders';

import { Map, List, fromJS } from 'immutable';

//NEW
export const addIngredient = (ingredientType) => {
  return {
        type: AT.ADD_INGREDIENT,
        ingredientType: ingredientType
      };
}

export const removeIngredient = (ingredientType, position) => {
  return {
    type: AT.REMOVE_INGREDIENT,
    ingredientType,
    position
  }
}

//OLD
// export const addIngredient = (ingredientKey) => {
//   return {
//     type: AT.ADD_INGREDIENT,
//     ingredientKey: ingredientKey
//   };
// };

//OLD
// export const removeIngredient = (ingredientKey) => {
//   return {
//     type: AT.REMOVE_INGREDIENT,
//     ingredientKey: ingredientKey
//   };
// };

export const setIngredients = (ingredients, ingredientsPrice) => {
  /* FIXME: create startingPrice based on amount of default ingredients and base price.
  To check - add amount to some of the ingredients on backend */

  return {
    type: AT.SET_INGREDIENTS,
    ingredients: ingredients,
    ingredientsPrice: ingredientsPrice
  }
}

export const fetchIngredientsFailed = () => {
  return {
    type: AT.FETCH_INGREDIENTS_FAILED
  }
}

//NEW
const setAddedIngredients = (addedIngredientsList) => {
  return {
    type: AT.SET_ADDED_INGREDIENTS,
    addedIngredientsList: addedIngredientsList
  }
}

//NEW
const fetchInitIngsOrderFailed = () =>{
  return {
    type: AT.FETCH_INIT_INGREDIENTS_ORDER_FAILED
  }
}

//NEW
const mapResInitialIngredientsOrder = (initialIngredientsOrder) => {
  return Object.keys({...initialIngredientsOrder}).map(id => fromJS(initialIngredientsOrder[id]));
}

//NEW
export const initAddedIngredients = () => {
  return dispatch => {
    axios.get('/initial-ingredients-order.json')
      .then(res => {
        const initialIngredientsOrderList = List(mapResInitialIngredientsOrder(res.data));
        dispatch(setAddedIngredients(initialIngredientsOrderList));
      })
      .catch(error => {
        dispatch(fetchInitIngsOrderFailed());
      })
  }
}

//NEW
const setBuildingIngredients = (buildingIngredientsList) => {
  return {
    type: AT.SET_BUILDING_INGREDIENTS,
    buildingIngredientsList: buildingIngredientsList
  }
}
//NEW
const fetchBuildingIngsFailed = () => {
  return {
    type: AT.FETCH_BUILDING_INGREDIENTS_FAILED
  }
}

//NEW
const mapResBuildingIngredients = (resBuildingIngredients) => {
  return Object.keys({...resBuildingIngredients}).map((id) => fromJS(resBuildingIngredients[id]));
}

//NEW
export const initBuildingIngredients = () => {
  return dispatch => {
    axios.get('/building-ingredients.json')
      .then(res => {
        const buildingIngredientsList = List(mapResBuildingIngredients(res.data));
        dispatch(setBuildingIngredients(buildingIngredientsList));
      })
      .catch(error => {
        dispatch(fetchBuildingIngsFailed());
      })
  }
}



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