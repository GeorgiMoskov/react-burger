import React from 'react';

import classes from './Button.css'

const button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={[classes.Button, classes[props.buttonType]].join(' ')}
      onClick={props.click}>{props.children}</button>
  )
}

export default button;