import React from 'react';
import classes from './Order.css';

import { Map } from 'immutable';

import * as ING_UI from '../../constants/burger/ingredients/ui.ingredients';

const Order = (props) => {

  const mapIngredientsToAmount = (ingredients) => {
    const ingredientsMapAmount = {};
      ingredients.forEach((ingObj, index) => {
        const currentType = ingObj.get('type');
         if(ingredientsMapAmount[currentType]) {
           ingredientsMapAmount[currentType]++;
         } else {
          ingredientsMapAmount[currentType] = 1;
         }
      });
    return Map(ingredientsMapAmount);
  }

  const renderIngredients = () => {
    return mapIngredientsToAmount(props.ingredients).map((amount, ingType) => {
      return (
        <span 
          style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '5px',
            border: '1px solid gray',
            padding: '5px'
          }}
          key={ingType}>
            {ING_UI[ingType]} : {amount}
        </span>
      )
    })
    .toList();
  }

  const formattedPrice = Number.parseFloat(props.price).toFixed(2);

  return (
    <div className={classes.Order}>
      <p>Ingredients: {renderIngredients()}</p>
      <p>Price: <strong>USD {formattedPrice}</strong></p>
    </div>
  )
}

export default Order;
