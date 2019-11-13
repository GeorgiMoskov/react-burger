import React , { Component } from 'react';
import { connect } from 'react-redux';

import { Map } from 'immutable'

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    shouldShowSideDrawer: false
  }

  onSideDrawerCloseHandler = () => {
    this.setState({
      shouldShowSideDrawer: false
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState({
      shouldShowSideDrawer: !this.state.shouldShowSideDrawer
    })
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated} 
          drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          isOpen={this.state.shouldShowSideDrawer} onClose={this.onSideDrawerCloseHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.get('token') !== null
  }
};

export default connect(mapStateToProps)(Layout);
