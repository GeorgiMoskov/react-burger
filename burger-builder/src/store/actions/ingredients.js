import { 
  INIT_BUILDING_INGREDIENTS,
  SET_BUILDING_INGREDIENTS,
  INIT_ADDED_INGREDIENTS,
  SET_ADDED_INGREDIENTS,
  REMOVE_INGREDIENT_BY_TYPE,
  REMOVE_INGREDIENT_BY_INDEX,
  ADD_INGREDIENT,
  CHANGE_INGREDIENT_POSITION
} from './actionTypes';

import { SALAMI } from '../../constants/burger/ingredients/ingredients';

export const initBuildingIngredients = () => ({
  type: INIT_BUILDING_INGREDIENTS
});

export const setBuildingIngredients = (buildingIngredientsArr) => ({
  type: SET_BUILDING_INGREDIENTS,
  payload: { buildingIngredients: buildingIngredientsArr }
});

export const initAddedIngredients = () => ({
  type: INIT_ADDED_INGREDIENTS,
})

export const setAddedIngredients = (addedIngredientsArr) => ({
  type: SET_ADDED_INGREDIENTS,
  payload: { addedIngredients: addedIngredientsArr }
})

export const addIngredient = (ingredientType) => {
  let ingredientConfig = null;
  if(ingredientType === SALAMI) {
    ingredientConfig = { fats: Math.floor(Math.random() * (6 - 4 + 1) ) + 4 };
  }
  return {
    type: ADD_INGREDIENT,
    payload: {
      ingredientType,
      config: ingredientConfig
    }
  }
}

export const removeIngredientByType = (ingredientType) => ({
  type: REMOVE_INGREDIENT_BY_TYPE,
  payload: { ingredientType }
})

export const removeIngredientByIndex = (ingredientIndex) => ({
  type: REMOVE_INGREDIENT_BY_INDEX,
  payload: { ingredientIndex }
})

export const changeIngredientPosition = (fromIndex, toIndex) => {
  return {
    type: CHANGE_INGREDIENT_POSITION,
    payload: {
      fromIndex,
      toIndex
    }
  }
}