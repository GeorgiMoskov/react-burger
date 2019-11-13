import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.isOpen) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <React.Fragment>
      <Backdrop shouldShow={props.isOpen} onClick={props.onClose} />
    <div className={attachedClasses.join(' ')}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </div> 
    </React.Fragment>
  );
};

export default sideDrawer;