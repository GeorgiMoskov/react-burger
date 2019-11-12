import { fromJS } from 'immutable';

export const NAME = 'NAME';
export const STREET = 'STREET';
export const ZIP_CODE = 'ZIP_CODE';
export const COUNTRY = 'COUNTRY';
export const EMAIL = 'EMAIL';
export const DELIVERY_METHOD = 'DELIVERY_METHOD';

export const FORM_CONFIG = fromJS({
  [NAME]: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your name'
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  [STREET]: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Street'
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  [ZIP_CODE]: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Zip code'
    },
    value: '',
    validation: {
      required: true,
      minLength: 5,
      maxLength: 5
    },
    valid: false,
    touched: false
  },
  [COUNTRY]: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Your country'
    },
    value: '',
    validation: {
      required: true
    },
    valid: false,
    touched: false
  },
  [EMAIL]: {
    elementType: 'input',
    elementConfig: {
      type: 'email',
      placeholder: 'Your email'
    },
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  },
  [DELIVERY_METHOD]: {
    elementType: 'select',
    elementConfig: {
      options: [
        {value: 'fastest', displayValue: 'Fastest'},
        {value: 'cheapest', displayValue: 'Cheapest'},
      ]
    },
    value: 'fastest',
    validation: {},
    valid: true
  },
});