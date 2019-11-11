import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import { Map } from 'immutable';

import * as actions from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    data: Map({
      isPurchaseInProgress: false
    })
  }

  componentDidMount() {
    this.props.onInitIngredients();
  }

  checkIsPurchasable = (ingredients) => {
    const totalAmount = ingredients
      .reduce((totalAmount, ingAmount, ingKey) => totalAmount + ingAmount);
    return totalAmount > 0;
  }

  purchaseHandler = () => {
    if(!this.props.isAuth) {
      this.props.setAfterAuthRedirectPath('/checkout');
      return this.props.history.push('/auth');
    }

    this.setState(prevState => {
      return prevState.data.set('isPurchaseInProgress', true);
    })
  }

  purchaseCancelHandler = () => {
    this.setState(prevState => {
      return prevState.data.set('isPurchaseInProgress', false);
    })
  }

  purchaseContinueHandler = () => {
    //TODO: IMPROVE ON INIT PURCHASE
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const isRemoveIngredientDisabledConfig = this.props.ingredients.map(ingAmount => ingAmount <= 0);

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if(this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredients={this.props.ingredients}
            onIngredientAdd={this.props.onIngredientAdd}
            onIngredientRemove={this.props.onIngredientRemove}
            isRemoveIngredientDisabledConfig={isRemoveIngredientDisabledConfig}
            price={this.props.totalPrice}
            isPurchasable={this.checkIsPurchasable(this.props.ingredients)}
            onOrder={this.purchaseHandler}
            isAuth={this.props.isAuth} />
        </React.Fragment>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        onPurchaseCancel={this.purchaseCancelHandler}
        onPurchaseContinue={this.purchaseContinueHandler} />
    }

    return (
      <React.Fragment>
        <Modal show={this.state.data.get('isPurchaseInProgress')} onModalClose={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.get('ingredients'),
    totalPrice: state.burgerBuilder.get('totalPrice'),
    error: state.burgerBuilder.get('error'),
    isAuth: state.auth.get('token') !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdd: (ingredientKey) => dispatch(actions.addIngredient(ingredientKey)),
    onIngredientRemove: (ingredientKey) => dispatch(actions.removeIngredient(ingredientKey)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    setAfterAuthRedirectPath: (path) => dispatch(actions.setAfterAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
