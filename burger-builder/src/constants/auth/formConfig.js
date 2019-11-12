import { fromJS } from 'immutable';

export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';

export const FORM_CONFIG = fromJS({
  [EMAIL]: {
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
  [PASSWORD]: {
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
})