import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  render() {
    const ingredientSummary = 
      this.props.ingredients.map((ingAmount, ingKey) => {
        return (
          <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: {ingAmount}
          </li>
        );
      })
      .toList();

    // const ingredientSummary1 = Object.keys({...this.props.ingredients})
    // .map(igKey => {
    //   return (
    //     <li key={igKey}>
    //       <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
    //     </li> );
    // });

    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button buttonType="Danger"
          click={this.props.onPurchaseCancel} >CANCEL</Button>
        <Button buttonType="Success"
          click={this.props.onPurchaseContinue} >CONTINUE</Button>
      </React.Fragment>
    )
  }

}

export default OrderSummary;