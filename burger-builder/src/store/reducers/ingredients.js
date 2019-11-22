import { Map, List, fromJS } from 'immutable';
import { 
  SET_BUILDING_INGREDIENTS,
  SET_ADDED_INGREDIENTS,
  REMOVE_INGREDIENT_BY_INDEX,
  ADD_INGREDIENT
} from '../actions/actionTypes';

const initialState = Map({
  buildingIngredients: List(),
  addedIngredients: List(),
  isBuildingIngredientsInit: false,
  isAddedIngredientsInit: false
});

export default (state = initialState, { type, payload } = {}) => {
  switch(type) {
    case SET_BUILDING_INGREDIENTS:
      const { buildingIngredients } = payload;
      return state
        .set('buildingIngredients', fromJS(buildingIngredients))
        .set('isBuildingIngredientsInit', true);

    case SET_ADDED_INGREDIENTS:
      const { addedIngredients } = payload;
      return state
        .set('addedIngredients', List.isList(addedIngredients) ? addedIngredients : fromJS(addedIngredients))
        .set('isAddedIngredientsInit', true);

    case ADD_INGREDIENT:
      const { ingredientType, config } = payload;
        const newAddedIngredients = state.get('addedIngredients').insert(0, fromJS({ type: ingredientType, config }));
        return state.set('addedIngredients', newAddedIngredients);

    case REMOVE_INGREDIENT_BY_INDEX:
      const { ingredientIndex } = payload;
      return state.set('addedIngredients', state.get('addedIngredients').remove(ingredientIndex));
    
    default: 
      return state;
  }
}