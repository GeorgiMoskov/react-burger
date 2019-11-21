import React from 'react';
import classes from './OrderBurgerButton.css'

const orderBurgerButton = (props) => {
  const {isAuth, isEmptyIngredients, onClick} = props;

  let label = 'Nothing to order'
  if(!isEmptyIngredients && isAuth) {
    label = 'Order'
  }
  if(!isEmptyIngredients && !isAuth) {
    label = 'Login'
  }



  return (
    <button 
     className={classes.OrderButton}
     disabled={isEmptyIngredients}
     onClick={onClick}>
       {label}
     </button>
  )
}

export default orderBurgerButton;
