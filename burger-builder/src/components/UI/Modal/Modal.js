import React, { Fragment, memo } from 'react';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({shouldShow, onModalClose, children}) => {
  return (
    <Fragment>
      <Backdrop shouldShow={shouldShow} onClick={onModalClose} />
      <div 
        className={classes.Modal}
        style={{
          transform: shouldShow ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: shouldShow ? '1' : '0'
        }}>
          {children}
        </div>
    </Fragment>
  )
}

export default memo(Modal);