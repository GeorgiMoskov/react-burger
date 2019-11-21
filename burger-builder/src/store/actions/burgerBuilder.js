import * as AT from '../actions/actionTypes';
import * as ING from '../../constants/burger/ingredients/ingredients';
import axios from '../../axios-orders';

import { List, Map, fromJS } from 'immutable';

export const addIngredient = (ingredientType) => {
  let config = null;
  if(ingredientType === ING.SALAMI) {
    config = Map({
      fats: Math.floor(Math.random() * (6 - 4 + 1) ) + 4
    })
  }

  return {
        type: AT.ADD_INGREDIENT,
        ingredientType,
        config
      };
}

const removeIngredient = (position) => {
  return {
    type: AT.REMOVE_INGREDIENT,
    position
  }
}

export const changeIngredientPosition = (fromIndex, toIndex) => {
  return {
    type: AT.CHANGE_INGREDIENT_POSITION,
    fromIndex,
    toIndex
  }
}

export const removeIngredientByType = (ingredientType) => {
  return (dispatch, getState) => {
    const removeIndex = getState().burgerBuilder.get('addedIngredients')
      .findIndex((ingData) => ingData.get('type') === ingredientType);
      dispatch(removeIngredient(removeIndex));
  }
}

export const removeIngredientByPosition = (position) => {
  return dispatch => {
    dispatch(removeIngredient(position));
  }
}

const setAddedIngredients = (addedIngredientsList) => {
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

//TODO: Add starting price for empty burger
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