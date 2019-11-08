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
 

class Auth extends Component {

  state = {
    data: Map(fromJS({
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      },
      isRegister: true
    }))
  };

  componentDidMount() {
    if(!this.props.isBuildingBurger && this.props.afterAuthRedirectPath !== '/') {
      this.props.setAfterAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const newStateData = this.state.data.mergeDeep({
      controls: {
        [controlName]: {
          value: event.target.value,
          valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
          touched: true
        }
      }
    });
    this.setState({data: newStateData});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isRegister);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isRegister: !prevState.isRegister};
    });
  }
  
  render () {

    // const [...controlsKeys] = this.state.data.get('controls').keys();
    // const formElementsConfigs = controlsKeys.map(controlKey => {
    //   return Map({
    //     id: controlKey,
    //     config: this.state.data.get('controls')[controlKey].get('elementConfig')
    //   })
    // });

    let form1 = this.state.data.get('controls')
      .entrySeq().map(([controlType, config]) => (
        <Input
          key={controlType}
          elementType={config.get('elementType')}
          elementConfig={config.get('elementConfig')}
          value={config.get('value')}
          invalid={!config.get('valid')}
          shouldValidate={config.get('validation')}
          touched={config.get('touched')}
          changed={(event)=>{this.inputChangedHandler(event, controlType)}}/>
      ))


    // this.state.data.get('controls').entrySeq().forEach(([controlType, config])  => {
    //   console.log('$', controlType, config);
    // })
      
    const formElementsArray = [];
    for(let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event)=>{this.inputChangedHandler(event, formElement.id)}}/>
    ));

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
            {form1}
            <Button buttonType="Success" >Submit</Button>
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