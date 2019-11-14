import * as AT from '../actions/actionTypes';
import * as ING from '../../constants/burger/ingredients/ingredients';
import { Map, List } from 'immutable';

const initialState = Map({
  //NEW
  buildingIngredients: List(),
  isErrorFetchBuildingIngs: false,
  addedIngredients: List(),
  isErrorFetchInitIngsOrder: false,


  ingredients: Map({}),
  ingredientsPrice: Map({}),
  totalPrice: 4,
  error: false,
  isBuilding: false
});

//NEW
const addIngredient = (state, { ingredientType }) => {
  let config = null;
  if(ingredientType === ING.SALAMI) {
    config = Map({
      fats: Math.floor(Math.random() * (6 - 4 + 1) ) + 4
    })
  }
  const newAddedIngredients = state.get('addedIngredients').insert(0, Map({ type: ingredientType, config }));
  return state.set('addedIngredients', newAddedIngredients);
}

//NEW
const removeIngredient = (state, { ingredientType, position }) => {
  const removeIndex = (position || position === 0) ? 
    position : 
    state.get('addedIngredients').findIndex((ingData) => ingData.get('type') === ingredientType)

  const newAddedIngredients = state.get('addedIngredients').remove(removeIndex);
  return state.set('addedIngredients', newAddedIngredients);


}

//OLD
// const addIngredient = (state, { ingredientKey }) => {
//   return state.mergeDeep({
//     ingredients: {
//       [ingredientKey]: state.get('ingredients').get(ingredientKey) + 1
//     },
//     totalPrice: state.get('totalPrice') + state.get('ingredientsPrice').get(ingredientKey),
//     isBuilding: true
//   })
// }

//OLD
// const removeIngredient = (state, { ingredientKey }) => {
//   return state.mergeDeep({
//     ingredients: {
//       [ingredientKey]: state.get('ingredients').get(ingredientKey) - 1
//     },
//     totalPrice: state.get('totalPrice') - state.get('ingredientsPrice').get(ingredientKey)
//   })
// }

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

//NEW
const setAddedIngredients = (state, {addedIngredientsList}) => {
  return state.set('addedIngredients', addedIngredientsList);
}

//NEW
const setBuildingIngredients = (state, {buildingIngredientsList}) => {
  return state.set('buildingIngredients', buildingIngredientsList);
}
//NEW
const fetchBuildingIngredientsFailed = (state) => {
  return state.set('isErrorFetchBuildingIngs', true);
}

//NEW
const fetchInitIngredientsOrderFailed = (state) => {
  return state.set('isErrorFetchInitIngsOrder', true);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //NEW
    case AT.SET_BUILDING_INGREDIENTS: return setBuildingIngredients(state, action);
    //NEW
    case AT.FETCH_BUILDING_INGREDIENTS_FAILED: return fetchBuildingIngredientsFailed(state, action);
    //NEW
    case AT.SET_ADDED_INGREDIENTS: return setAddedIngredients(state, action);
    //NEW
    case AT.FETCH_INIT_INGREDIENTS_ORDER_FAILED: return fetchInitIngredientsOrderFailed(state, action);

    case AT.ADD_INGREDIENT: return addIngredient(state, action);

    case AT.REMOVE_INGREDIENT: return removeIngredient(state, action);
        
    case AT.SET_INGREDIENTS: return setIngredients(state, action);

    case AT.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);

    default: return state;
  }
}

export default reducer;