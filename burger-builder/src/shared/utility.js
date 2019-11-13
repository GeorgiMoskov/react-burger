export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.get('required')) {
    isValid = value.trim() !== '' && isValid;
  }

  if(rules.get('minLength')) {
    isValid = value.length >= rules.get('minLength') && isValid;
  }

  if(rules.get('maxLength')) {
    isValid = value.length <= rules.get('minLength') && isValid;
  }

  if(rules.get('isEmail')) {
    const isEmailRX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = isEmailRX.test(value) && isValid;
  }

  return isValid;
}