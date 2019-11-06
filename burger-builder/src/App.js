import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
  // constructor(props) {
  //   super(props);
  //   this.props.initAuthState();
  // }

  componentDidMount() {
    this.props.initAuthState();
  }


  render() {

    let routes = (
      <Switch>
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuth) {
      routes =(
        <Switch>
           <Route path="/checkout" component={AsyncCheckout} />
           <Route path="/orders" component={AsyncOrders} />
           <Route path="/logout" component={Logout} />
           <Route path="/auth" component={AsyncAuth} />
           <Route path="/" exact component={BurgerBuilder} />
           <Redirect to="/" />
        </Switch>
      );
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
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initAuthState: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
