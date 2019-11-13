import React from 'react';

import classes from './Backdrop.css'

const backdrop = (props) => (
  props.shouldShow ? <div className={classes.Backdrop} onClick={props.onClick}></div> : null
);

export default backdrop;
