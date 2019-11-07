import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ING from '../../../constants/burger/ingredients/ingredients';

import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case ING.BREAD_TOP:
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;

      case ING.BREAD_BOTTOM:
        ingredient = <div className={classes.BreadBottom}></div>;
        break;

      case ING.MEAT:
        ingredient = <div className={classes.Meat}></div>;
        break;

      case ING.CHEESE:
        ingredient = <div className={classes.Cheese}></div>;
        break;

      case ING.SALAD:
        ingredient = <div className={classes.Salad}></div>;
        break;

      case ING.BACON:
        ingredient = <div className={classes.Bacon}></div>;
        break;

      default:
        ingredient = null;
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
