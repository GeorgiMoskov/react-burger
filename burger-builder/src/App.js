import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {

  componentDidMount() {
    this.props.initAuthState();
  }


  render() {
    let routes = null;

    if(this.props.authDidInit) {
      routes = (
        <Switch>
          <Route path="/auth" component={AsyncAuth} />
          {<Route path="/" exact component={BurgerBuilder} />}
          {<Redirect to="/" />}
        </Switch>
      );
      
      if(this.props.isAuth) {
        routes =(
          <Switch>
             {/* FIXME: IN PROGRESS
             <Route path="/orders" component={AsyncOrders} />*/}
             <Route path="/auth" component={AsyncAuth} />
             <Route path="/logout" component={Logout} />
             <Route path="/checkout" component={AsyncCheckout} />
             <Route path="/" exact component={BurgerBuilder} />
             <Redirect to="/" />
          </Switch>
        );
      }
    }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authDidInit: state.auth.get('authDidInit'),
    isAuth: state.auth.get('token') !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initAuthState: () => dispatch(actions.initAuthState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
