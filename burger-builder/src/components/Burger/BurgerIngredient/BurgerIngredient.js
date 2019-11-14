import React, { Component } from 'react';
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

        case ING.SALAMI:
          const salamiFats = [...Array(this.props.config.get('fats'))].map((_, index) => {
            return <div key={index} className={classes.SalamiFat}></div>
          })

          ingredient = (
            <div className={classes.Salami}>
              {salamiFats}
            </div>
          );
          break;

      default:
        ingredient = null;
    }

    return ingredient;
  }
}

export default BurgerIngredient;
