import { Map } from 'immutable';
import { createSelector } from 'reselect';
import * as UI_ING from '../../constants/burger/ingredients/ui.ingredients';

const selectBuildingIngs = state => state.get('buildingIngredients');
const selectIngredientsOrder = state => state.get('addedIngredients');

export const selectAddedIngredientsTypeAmountMap = createSelector(
  [selectBuildingIngs, selectIngredientsOrder],
  (buildingIngredients, addedIngredients) => {
    const addedIngredientsTypeAmount = {};
    buildingIngredients.forEach(buildingIngredient => {
      addedIngredientsTypeAmount[buildingIngredient.get('type')] = 0;
      addedIngredients.forEach(addedIngredient => {
        if(buildingIngredient.get('type') === addedIngredient.get('type')) {
          addedIngredientsTypeAmount[buildingIngredient.get('type')]++;
        }
      })
    });
    return Map(addedIngredientsTypeAmount);
  }
)

export const selectAddedIngredientsTypeMapBuildControlsData = createSelector(
  [selectAddedIngredientsTypeAmountMap],
  (addedIngredientsTypeAmountMap) => addedIngredientsTypeAmountMap.map((amount, ingType) => ({
    amount: amount,
    label: UI_ING[ingType]
  }))
)

export const selectTotalPrice = createSelector(
  [selectBuildingIngs, selectIngredientsOrder],
  (buildingIngredientsList, addedIngredients) => {
    const buildingIngredientsMapTypePrice = Map(buildingIngredientsList
      .map(buildingIngData => [buildingIngData.get('type'), buildingIngData.get('price')]));
    
    const totalPrice = addedIngredients.reduce((totalPrice, addedIngredient) => {
      return buildingIngredientsMapTypePrice.get(addedIngredient.get('type')) + totalPrice;
    }, 0);
    return totalPrice;
  }
)