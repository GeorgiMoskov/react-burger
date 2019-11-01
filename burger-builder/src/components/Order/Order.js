import React from 'react';
import classes from './Order.css';

const Order = (props) => {
  let ingredientsArr = [];
  for(let ingredientKey in props.ingredients) {
    ingredientsArr.push({
      name: ingredientKey,
      amount: props.ingredients[ingredientKey]
    });
  };

  const ingredients = ingredientsArr.map((ingredientObj, index) => (
    <span 
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '5px',
        border: '1px solid gray',
        padding: '5px'
      }}
      key={index}> {ingredientObj.name} : {ingredientObj.amount}
      </span>
    ));

    let formattedPrice = null;
    if(props.price) {
      formattedPrice = Number.parseFloat(props.price).toFixed(2);
    }


  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {formattedPrice}</strong></p>
    </div>
  )
}

export default Order;
