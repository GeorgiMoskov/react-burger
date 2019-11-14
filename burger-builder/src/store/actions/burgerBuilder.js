import * as AT from '../actions/actionTypes';
// import * as API_ING from '../../constants/burger/ingredients/api.ingredients';
import axios from '../../axios-orders';

import { List, fromJS } from 'immutable';

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

const setAddedIngredients = (addedIngredientsList) => {
  // FIXME: create starting burger Price based on amount of default ingredients and base price.
  return {
    type: AT.SET_ADDED_INGREDIENTS,
    addedIngredientsList: addedIngredientsList
  }
}

const fetchInitIngsOrderFailed = () =>{
  return {
    type: AT.FETCH_INIT_INGREDIENTS_ORDER_FAILED
  }
}

const mapResInitialIngredientsOrder = (initialIngredientsOrder) => {
  //TODO: Log unknown ingredients to backend
  return Object.keys({...initialIngredientsOrder}).map(id => fromJS(initialIngredientsOrder[id]));
}

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

const setBuildingIngredients = (buildingIngredientsList) => {
  return {
    type: AT.SET_BUILDING_INGREDIENTS,
    buildingIngredientsList: buildingIngredientsList
  }
}

const fetchBuildingIngsFailed = () => {
  return {
    type: AT.FETCH_BUILDING_INGREDIENTS_FAILED
  }
}

const mapResBuildingIngredients = (resBuildingIngredients) => {
  //TODO: Log unknown ingredients to backend
  return Object.keys({...resBuildingIngredients}).map((id) => fromJS(resBuildingIngredients[id]));
}

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