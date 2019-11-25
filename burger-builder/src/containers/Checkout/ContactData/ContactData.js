import React, { Component } from 'react';
import { connect } from 'react-redux';

import {NAME, STREET, ZIP_CODE, COUNTRY, EMAIL, DELIVERY_METHOD, FORM_CONFIG} from '../../../constants/checkout/contactData/formConfig';

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner'; 
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import FormBuilder from '../../../components/UI/FormBuilder/FormBuilder';


class ContactData extends Component {
  state = {
    [NAME]: null,
    [STREET]: null,
    [ZIP_CODE]: null,
    [COUNTRY]: null,
    [EMAIL]: null,
    [DELIVERY_METHOD]: null,
    isFormValid: false
  }

  onFormUpdate = (controlTypeValue, isFormValid) => {
    this.setState({
      [NAME]: controlTypeValue[NAME],
      [STREET]: controlTypeValue[STREET],
      [ZIP_CODE]: controlTypeValue[ZIP_CODE],
      [COUNTRY]: controlTypeValue[COUNTRY],
      [EMAIL]: controlTypeValue[EMAIL],
      [DELIVERY_METHOD]: controlTypeValue[DELIVERY_METHOD],
      isFormValid: isFormValid
    })
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {
      [NAME]: this.state[NAME],
      [STREET]: this.state[STREET],
      [ZIP_CODE]: this.state[ZIP_CODE],
      [COUNTRY]: this.state[COUNTRY],
      [EMAIL]: this.state[EMAIL],
      [DELIVERY_METHOD]: this.state[DELIVERY_METHOD],
    };
    this.props.onOrderBurger(formData);
  }

  render() {
    let form = (
      <form onSubmit={this.orderHandler}>
        {<FormBuilder config={FORM_CONFIG} onFormUpdate={this.onFormUpdate} />}
        <Button buttonType="Success" disabled={!this.state.isFormValid}>Order</Button>
      </form>
    );

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
        {this.props.loading ? <Spinner /> : form}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (formData) => dispatch(actions.orderBurger(formData))
  }
};

export default connect(null, mapDispatchToProps)(withErrorHandler(ContactData, axios));
