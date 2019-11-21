import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
//FIXME: improve axios instance naming
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import Modal from '../../../components/UI/Modal/Modal';
import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';
import { selectIsAnyAddedIngredients, selectAddedIngredientsTypeAmountMap, selectTotalPrice } from '../../../store/selectors/burgerBuilder';

import OrderBurgerButton from './OrderBurgerButton/OrderBurgerButton';

class OrderBurger extends Component {
  state = {
    shouldShowOrderSummary: false
  }

  onLoginRedirect = () => {
    this.props.setAfterAuthRedirectPath('/checkout');
      return this.props.history.push('/auth');
  }

  onOrder = () => {
    this.setState({
      shouldShowOrderSummary: true
    })
  }

  onOrderSummaryCancel = () => {
    this.setState({shouldShowOrderSummary: false})
  }
  onOrderSummaryContinue = () => {
    console.log('purchase continued')
    this.props.history.push('/checkout');
  }

  renderOrderSummary = () => {
    if(!this.state.shouldShowOrderSummary || !this.props.addedIngredientsTypeMapAmount) {
      return null;
    }
    return (
      <Modal
        shouldShow={true} 
        onModalClose={this.onOrderSummaryCancel}>
          <OrderSummary
            ingredients={this.props.addedIngredientsTypeMapAmount.filter((ingType, ingAmount) => Boolean(ingAmount))}
            price={this.props.burgerPrice}
            onPurchaseCancel={this.onOrderSummaryCancel}
            onPurchaseContinue={this.onOrderSummaryContinue} />
      </Modal>
      );
  }

  render() {
    return (
      <div>
        {this.renderOrderSummary()}
        <OrderBurgerButton
          isAuth={this.props.isAuth}
          isEmptyIngredients={!this.props.isAnyAddedIngredients}
          onClick={this.props.isAuth ? this.onOrder : this.onLoginRedirect}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAnyAddedIngredients: selectIsAnyAddedIngredients(state.burgerBuilder), 
    addedIngredientsTypeMapAmount: selectAddedIngredientsTypeAmountMap(state.burgerBuilder),
    burgerPrice: selectTotalPrice(state.burgerBuilder),
    isAuth: state.auth.get('token') !== null,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setAfterAuthRedirectPath: (path) => dispatch(actions.setAfterAuthRedirectPath(path))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderBurger, axios)));
