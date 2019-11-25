import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

import { EMAIL, PASSWORD, FORM_CONFIG } from '../../constants/auth/formConfig';
import FormBuilder from '../../components/UI/FormBuilder/FormBuilder';
 
class Auth extends Component {
  state = {
    [EMAIL]: null,
    [PASSWORD]: null,
    isFormValid: false,
    isRegister: false
  }

  componentWillUnmount() {
    this.props.setAfterAuthRedirectPath();
  }

  submitHandler = (event) => {
    event.preventDefault();
    if(this.state.isRegister) {
      return this.props.onRegister(this.state[EMAIL], this.state[PASSWORD]);
    }
    return this.props.onLogin(this.state[EMAIL], this.state[PASSWORD]);
  }

  onFormUpdate = (controlsValues, isFormValid) => {
    this.setState({
      [EMAIL]: controlsValues[EMAIL],
      [PASSWORD]: controlsValues[PASSWORD],
      isFormValid: isFormValid
    })
  }

  switchAuthModeHandler = () => {
    this.setState({
      isRegister: !this.state.isRegister
    })
  }
  
  render () {
    let errorMessage = null;
    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.afterAuthRedirectPath} />
      this.props.setAfterAuthRedirectPath();
    }

    return (
      <React.Fragment>
        {authRedirect}
        <div className={classes.Auth}>
          {errorMessage}
          <form onSubmit={this.submitHandler}>
            {this.props.loading ? <Spinner /> : <FormBuilder config={FORM_CONFIG} onFormUpdate={this.onFormUpdate} />}
            <Button disabled={!this.state.isFormValid} buttonType="Success" >Submit</Button>
          </form>
          <Button 
            click={this.switchAuthModeHandler}
            buttonType="Danger">switch to {this.state.isRegister ? 'Login' : 'Register'}</Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.get('loading'),
    error: state.auth.get('error'),
    isAuth: state.auth.get('token') !== null,
    afterAuthRedirectPath: state.auth.get('afterAuthRedirectPath')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    onRegister: (email, password) => dispatch(actions.register(email, password)),

    //TODO: must be removed
    //onAuth: (email, password, isRegister) => dispatch(actions.auth(email, password, isRegister)),
    setAfterAuthRedirectPath: () => dispatch(actions.setAfterAuthRedirectPath('/'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);