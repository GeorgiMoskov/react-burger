import React, { memo } from 'react';

import classes from './Input.css'

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if(props.shouldValidate && props.invalid && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig.toJS()}
        value={props.value} 
        onChange={props.changed}/>
      break;
    
    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig.toJS()}
        value={props.value} 
        onChange={props.changed}/>
      break;

    case ('select'):
        inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}>
            {props.elementConfig.get('options').map(option => (
              <option
                key={option.get('value')}
                value={option.get('value')}>
                  {option.get('displayValue')}
              </option>
            ))}
        </select>
        )
      break;

    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig.toJS()}
        value={props.value} 
        onChange={props.changed}/>
  }

  return (
    <div>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default memo(Input);
