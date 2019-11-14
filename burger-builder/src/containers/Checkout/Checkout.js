import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace(this.props.match.path + '/contact-data');
  }

  renderCheckoutSummary = () => {
    if(this.props.addedIngredients.isEmpty() || this.props.isPurchased) {
      if(this.props.isPurchased) {
        this.props.resetIsPurchased();
      }
      return <Redirect to="/" />;
    }

    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.addedIngredients} 
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route 
          path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderCheckoutSummary()}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    addedIngredients: state.burgerBuilder.get('addedIngredients'),
    isPurchased: state.order.get('isPurchased')
  };
};

const mapDispatchToProps = dispatch => ({
  resetIsPurchased: () => dispatch(actions.resetIsPurchased())
})


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);