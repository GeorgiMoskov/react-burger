import React, { Fragment } from 'react';
import * as ING from '../../../constants/burger/ingredients/ingredients';
import classes from './BurgerIngredient.css';

const BurgerIngredient = ({type, config, draggableProvided={}}) => {

  let ingredientClass = null;
  let childrenOfIngredient = null;
  switch (type) {
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
        childrenOfIngredient = [...Array(config.get('fats'))].map((_, index) => (
          <div key={index} className={classes.SalamiFat}></div>
        ))
        ingredientClass =classes.Salami
        break;
    default:
      ingredientClass = null;
  }

  return (
    <div
      className={`${ingredientClass} ${classes.Ingredient}`}
      ref={draggableProvided.innerRef} 
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}>
        {childrenOfIngredient}
    </div>
  )
}

export default BurgerIngredient;
