import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    isPurchaseInProgress: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  checkIsPurchasable = (ingredients) => {
    const sum = Object.keys({...ingredients})
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, ingAmount) => { 
        return sum + ingAmount
      }, 0)

      return sum > 0;
  }

  purchaseHandler = () => {
    if(!this.props.isAuth) {
      this.props.onSetAuthRedirectPath('/checkout');
      return this.props.history.push('/auth');
    }
    this.setState({
      isPurchaseInProgress: true
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      isPurchaseInProgress: false
    })
  }

  purchaseContinueHandler = () => {
    //TODO: IMPROVE ON INIT PURCHASE
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disableRemoveIngsData = {};
    Object.keys({...this.props.ingredients}).forEach(ingKey => {
      disableRemoveIngsData[ingKey] = this.props.ingredients[ingKey] <= 0;
    });

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if(this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredients={this.props.ingredients}
            onIngredientAdded={this.props.onIngredientAdded}
            onIngredientRemoved={this.props.onIngredientRemoved}
            disableRemoveIngsData ={disableRemoveIngsData}
            price={this.props.totalPrice}
            isPurchasable={this.checkIsPurchasable(this.props.ingredients)}
            onOrdered={this.purchaseHandler}
            isAuth={this.props.isAuth} />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.totalPrice}
        onPurchaseCancelled={this.purchaseCancelHandler}
        onPurchaseContinue={this.purchaseContinueHandler} />
    }

    return (
      <Aux>
        <Modal show={this.state.isPurchaseInProgress} onModalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientKey) => dispatch(actions.addIngredient(ingredientKey)),
    onIngredientRemoved: (ingredientKey) => dispatch(actions.removeIngredient(ingredientKey)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
