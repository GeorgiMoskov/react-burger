import React from 'react';

import Burger from '../../../containers/Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  const { checkoutCancelled, checkoutContinued } = props;
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger />
      </div>
      <Button
        click={checkoutCancelled}
        buttonType="Danger">Cancel</Button>
      <Button
        click={checkoutContinued}
        buttonType="Success">Continue</Button>
    </div>
  );
}

export default checkoutSummary;