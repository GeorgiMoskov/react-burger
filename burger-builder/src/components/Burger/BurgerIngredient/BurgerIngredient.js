import React, { Fragment, Component } from 'react';
import * as ING from '../../../constants/burger/ingredients/ingredients';
import classes from './BurgerIngredient.css';

class BurgerIngredient extends Component {
  render() {
    let ingredientClass = null;
    let childrenOfIngredient = null;

    switch (this.props.type) {
      case ING.BREAD_TOP:
        ingredientClass = classes.BreadTop;
        childrenOfIngredient = (
          <Fragment>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </Fragment>
        )
        break;

      case ING.BREAD_BOTTOM:
        ingredientClass = classes.BreadBottom;
        break;

      case ING.MEAT:
        ingredientClass = classes.Meat;
        break;

      case ING.CHEESE:
        ingredientClass = classes.Cheese;
        break;

      case ING.SALAD:
        ingredientClass = classes.Salad;
        break;

      case ING.BACON:
        ingredientClass = classes.Bacon;
        break;

        case ING.SALAMI:
          childrenOfIngredient = [...Array(this.props.config.get('fats'))].map((_, index) => (
            <div key={index} className={classes.SalamiFat}></div>
          ))
          ingredientClass =classes.Salami
          break;

      default:
        ingredientClass = null;
    }

    return (
    ingredientClass ? <div className={ingredientClass}>{childrenOfIngredient}</div> : null
    )
  }
}

export default BurgerIngredient;
