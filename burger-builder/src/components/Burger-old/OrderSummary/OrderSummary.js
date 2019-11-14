import React, {Fragment} from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, price, onPurchaseCancel, onPurchaseContinue }) => {
  
  const renderIngredientSummary = () => {
    return ingredients
      .map((ingAmount, ingKey) => {
        return (
          <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {ingAmount}
          </li>
        );
      })
      .toList();
  }

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {renderIngredientSummary()}
      </ul>
      <p><strong>Total price: {price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button buttonType="Danger"
        click={onPurchaseCancel} >CANCEL</Button>
      <Button buttonType="Success"
        click={onPurchaseContinue} >CONTINUE</Button>
    </Fragment>
  )
}

export default OrderSummary;