import React , { Component } from 'react';
import { connect } from 'react-redux';

import { Map } from 'immutable'

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  
  //reworked
  state = {
    data: Map({
      showSideDrawer: false
    })
  }
  //reworked
  sideDrawerClosedHandler = () => {
    this.setState({
      data: this.state.data.set('showSideDrawer', false)
    });
  }
  //reworked
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {
        data: prevState.data.set('showSideDrawer', !prevState.data.get('showSideDrawer'))
      }
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
          open={this.state.data.get('showSideDrawer')} closed={this.sideDrawerClosedHandler} />
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
