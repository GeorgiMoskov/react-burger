import React from 'react';
import classes from './Order.css';

import * as ING_UI from '../../constants/burger/ingredients/ui.ingredients';

const Order = (props) => {
  const renderIngredients = () => {
    return props.ingredients.map((ingAmount, ingKey, index) => (
      <span 
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '5px',
          border: '1px solid gray',
          padding: '5px'
        }}
        key={index}>
          {ING_UI[ingKey]} : {ingAmount}
      </span>
    ))
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
