import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

import { Map } from 'immutable'

import * as UI_ING from '../../../constants/burger/ingredients/ui.ingredients';

const buildControls = props => {
  const { 
    ingredients, price, isRemoveIngredientDisabledConfig,
    isPurchasable, isAuth, onOrder, 
    onIngredientAdd, onIngredientRemove
   } = props;

  const ingredientControls = ingredients
    .map((_, ingKey) => {
      return Map({
        label: UI_ING[ingKey],
        ingType: ingKey
      });
    })
    .toList();

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{price.toFixed(2)}</strong>
      </p>
      {ingredientControls.map(ctrl => (
        <BuildControl
          key={ctrl.get('label')}
          label={ctrl.get('label')[0].toUpperCase() + ctrl.get('label').slice(1)}
          onAdd={() => onIngredientAdd(ctrl.get('ingType'))}
          onRemove={() => onIngredientRemove(ctrl.get('ingType'))}
          isRemoveDisabled={isRemoveIngredientDisabledConfig.get(ctrl.get('ingType'))}
        />
      ))}
      <button 
        className={classes.OrderButton}
        disabled={!isPurchasable}
        onClick={onOrder}>{isAuth ? 'ORDER NOW' : 'LOGIN TO ORDER'}</button>
    </div>
  );
};

export default buildControls;
