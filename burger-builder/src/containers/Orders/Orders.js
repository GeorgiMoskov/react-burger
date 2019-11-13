import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.token, this.props.userId);
  }

  renderOrders = () => {
    if(this.props.loading) {
      return <Spinner />;
    }

    return this.props.orders.map(orderMap => (
      <Order 
        key={orderMap.get('id')}
        ingredients={orderMap.get('ingredients')}
        price={orderMap.get('price')}/>
    ));
  }

  render() {
    return (
      <div>
        {this.renderOrders()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.get('orders'),
    loading: state.order.get('loading'),
    token: state.auth.get('token'),
    userId: state.auth.get('userId')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));