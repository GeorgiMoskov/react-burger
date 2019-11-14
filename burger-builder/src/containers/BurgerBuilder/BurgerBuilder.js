import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
// import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

//NEW
import BuildControls from '../../components/UI/BuildControls/BuildControls';
import { selectAddedIngredientsTypeMapBuildControlsData, selectTotalPrice } from '../../store/selectors/burgerBuilder';

class BurgerBuilder extends Component {
  state = {
    isPurchaseInProgress: false
    }

  componentDidMount() {
    //NEW
    this.props.initBuildingIngredients();
    this.props.initAddedIngredients();

    this.props.onInitIngredients();
  }

  checkIsPurchasable = (ingredients) => {
    const totalAmount = ingredients
      .reduce((totalAmount, ingAmount) => totalAmount + ingAmount);
    return totalAmount > 0;
  }

  purchaseHandler = () => {
    if(!this.props.isAuth) {
      this.props.setAfterAuthRedirectPath('/checkout');
      return this.props.history.push('/auth');
    }

    this.setState({
      isPurchaseInProgress: true
    })
  }

  purchaseCancelHandler = () => {
    this.setState({
      isPurchaseInProgress: false
    })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  renderBurger = () => {
    if(!this.props.ingredients) {
      return this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    }
    return (
      <React.Fragment>
        {/* NEW */}
        <Burger ingredients={this.props.addedIngredients} />
        <BuildControls 
          controlTypesMapData={this.props.ingredientsTypeMapBuildControlData}
          onControlTypeAdd={this.props.onAddIngredient}
          onControlTypeRemove={this.props.onRemoveIngredient}
        />

        {this.props.burgerPrice}


        {/* 
        <Burger ingredients={this.props.ingredients} />
        <BuildControls
          ingredients={this.props.ingredients}
          onIngredientAdd={this.props.onIngredientAdd}
          onIngredientRemove={this.props.onIngredientRemove}
          isRemoveIngredientDisabledConfig={isRemoveIngredientDisabledConfig}
          price={this.props.totalPrice}

          
          isPurchasable={this.checkIsPurchasable(this.props.ingredients)}
          onOrder={this.purchaseHandler}
          isAuth={this.props.isAuth} /> */}
      </React.Fragment>
    );

  }

  renderOrderSummary = () => {
    if(!this.props.ingredients) {
      return null;
    }
    return (
      <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          onPurchaseCancel={this.purchaseCancelHandler}
          onPurchaseContinue={this.purchaseContinueHandler} />
      );
  }

  render() {
    return (
      <React.Fragment>
        <Modal shouldShow={this.state.isPurchaseInProgress} onModalClose={this.purchaseCancelHandler}>
          {this.renderOrderSummary()}
        </Modal>
        {this.renderBurger()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    //NEW
    addedIngredients: state.burgerBuilder.get('addedIngredients'),
    buildingIngredients: state.burgerBuilder.get('buildingIngredients'),
    ingredientsTypeMapBuildControlData: selectAddedIngredientsTypeMapBuildControlsData(state.burgerBuilder),
    burgerPrice: selectTotalPrice(state.burgerBuilder),

    ingredients: state.burgerBuilder.get('ingredients'),
    totalPrice: state.burgerBuilder.get('totalPrice'),
    error: state.burgerBuilder.get('error'),
    isAuth: state.auth.get('token') !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    //NEW
    initBuildingIngredients: () => dispatch(actions.initBuildingIngredients()),
    initAddedIngredients: () => dispatch(actions.initAddedIngredients()),
    onAddIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
    onRemoveIngredient: (ingredientKey) => dispatch(actions.removeIngredient(ingredientKey)),

    onIngredientAdd: (ingredientKey) => dispatch(actions.addIngredient(ingredientKey)),
    onIngredientRemove: (ingredientKey) => dispatch(actions.removeIngredient(ingredientKey)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    setAfterAuthRedirectPath: (path) => dispatch(actions.setAfterAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
