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
      addedIngredientsTypeAmount[buildingIngredient.type] = 0;
      addedIngredients.forEach(addedIngredient => {
        if(buildingIngredient.type === addedIngredient.type) {
          addedIngredientsTypeAmount[buildingIngredient.type]++;
        }
      })
    });

    console.log('selectAddedIngredientsTypeAmount', addedIngredientsTypeAmount);
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
  (buildingIngredients, addedIngredients) => {
    const buildingIngredientsMapTypePrice = Map(buildingIngredients
      .map(buildingIngData => [buildingIngData.type, buildingIngData.price]));
    
    return addedIngredients.reduce((totalPrice, addedIngredient) => {
      return buildingIngredientsMapTypePrice.get(addedIngredient.type) + totalPrice;
    }, 0);
  }
)