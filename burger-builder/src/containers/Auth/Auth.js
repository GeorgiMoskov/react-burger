import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { checkValidity } from '../../shared/utility';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

import { Map, fromJS } from 'immutable';
 

const FI = {
  EMAIL: 'EMAIL',
  PASSWORD: 'PASSWORD'
}

class Auth extends Component {

  formConfig = fromJS({
    [FI.EMAIL]: {
      elementType: 'input',
      value: '',
      valid: false,
      touched: false,
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      validation: {
        required: true,
        isEmail: true
      },
    },
    [FI.PASSWORD]: {
      elementType: 'input',
      value: '',
      valid: false,
      touched: false,
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      validation: {
        required: true,
        minLength: 6
      }
    }
  });

  state = {
    data: fromJS({
      controls: {
        [FI.EMAIL]: {
          value: this.formConfig.get(FI.EMAIL).get('value'),
          valid: this.formConfig.get(FI.EMAIL).get('valid'),
          touched: this.formConfig.get(FI.EMAIL).get('touched')
        },
        [FI.PASSWORD]: {
          value: this.formConfig.get(FI.PASSWORD).get('value'),
          valid: this.formConfig.get(FI.PASSWORD).get('valid'),
          touched: this.formConfig.get(FI.PASSWORD).get('touched')
        }
      },
      isRegister: false
    })
  }

  componentDidMount() {
    if(!this.props.isBuildingBurger && this.props.afterAuthRedirectPath !== '/') {
      this.props.setAfterAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    this.setState({data: this.state.data.mergeDeep({
      controls: {
        [controlName]: {
          value: event.target.value,
          valid: checkValidity(event.target.value, this.formConfig.get(controlName).get('validation')),
          touched: true
        }
      }
    })});
  }

  submitHandler = (event) => {
    event.preventDefault();
    const formControls = this.state.data.get('controls');
    this.props.onAuth(
      formControls.get(FI.EMAIL).get('value'),
      formControls.get(FI.PASSWORD).get('value'),
      this.state.data.get('isRegister')
    );
  }

  switchAuthModeHandler = () => {
    this.setState({data: 
      this.state.data.set('isRegister', !this.state.data.get('isRegister'))
    });
  }
  
  render () {
    let form = this.state.data.get('controls')
      .entrySeq().map(([controlType, stateControlData]) => (
        <Input
          key={controlType}
          elementType={this.formConfig.get(controlType).get('elementType')}
          elementConfig={this.formConfig.get(controlType).get('elementConfig')}
          shouldValidate={Boolean(this.formConfig.get(controlType).get('validation'))}
          value={stateControlData.get('value')}
          invalid={!stateControlData.get('valid')}
          touched={stateControlData.get('touched')}
          changed={(event)=>{this.inputChangedHandler(event, controlType)}}/>
      ))

    if(this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null;

    if(this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <React.Fragment>
        {authRedirect}
        <div className={classes.Auth}>
          {errorMessage}
          <form onSubmit={this.submitHandler}>
            {form}
            <Button buttonType="Success" >Submit</Button>
          </form>
          <Button 
            click={this.switchAuthModeHandler}
            buttonType="Danger">switch to {this.state.data.get('isRegister') ? 'Login' : 'Register'}</Button>
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
    isBuildingBurger: state.burgerBuilder.get('isBuilding'),
    afterAuthRedirectPath: state.auth.get('afterAuthRedirectPath')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isRegister) => dispatch(actions.auth(email, password, isRegister)),
    setAfterAuthRedirectPath: () => dispatch(actions.setAfterAuthRedirectPath('/'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);