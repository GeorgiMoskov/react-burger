import React from 'react';
import classes from './BuildControl.css';

const buildControl = props => {
  const {
    controlType, label, isRemoveDisabled, 
    onRemove, onAdd
  } = props;
  
  return (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{label}</div>
    <button className={classes.Less} onClick={() => onRemove(controlType)} disabled={isRemoveDisabled}>
      Less
    </button>
    <button className={classes.More} onClick={() => onAdd(controlType)}>
      More
    </button>
  </div>
  );
};

export default buildControl;
