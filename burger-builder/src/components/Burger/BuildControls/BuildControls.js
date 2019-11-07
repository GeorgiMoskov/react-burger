import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

import * as UI_ING from '../../../constants/burger/ingredients/ui.ingredients';

const buildControls = props => {
  const controls = Object.keys(props.ingredients).map(ingKey => {
    return {
      label: UI_ING[ingKey],
      ingType: ingKey
    }
  })

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label[0].toUpperCase() + ctrl.label.slice(1)}
          added={() => props.onIngredientAdded(ctrl.ingType)}
          removed={() => props.onIngredientRemoved(ctrl.ingType)}
          disabled={props.disableRemoveIngsData[ctrl.ingType]}
        />
      ))}
      <button 
        className={classes.OrderButton}
        disabled={!props.isPurchasable}
        onClick={props.onOrdered}>{props.isAuth ? 'ORDER NOW' : 'LOGIN TO ORDER'}</button>
    </div>
  );
};

export default buildControls;
