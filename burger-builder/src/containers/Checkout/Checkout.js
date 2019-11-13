import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
    if(this.props.ingredients.isEmpty() || this.props.isPurchased) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients} 
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
    ingredients: state.burgerBuilder.get('ingredients'),
    isPurchased: state.order.get('isPurchased')
  };
};


export default connect(mapStateToProps)(Checkout);