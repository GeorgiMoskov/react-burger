import React, { Fragment, useState } from 'react';
import * as ING from '../../../constants/burger/ingredients/ingredients';
import classes from './BurgerIngredient.css';

const BurgerIngredient = ({type, config, draggableProvided={}, onIngredientRemove}) => {

  let ingredientClass = null;
  let ingredientWrapper = null;
  let childrenOfIngredient = null;
  switch (type) {
    case ING.BREAD_TOP:
      ingredientClass = classes.BreadTop;
      ingredientWrapper = classes.WRBreadTop;
      childrenOfIngredient = (
        <Fragment>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </Fragment>
      )
      break;
    case ING.BREAD_BOTTOM:
      ingredientClass = classes.BreadBottom;
      ingredientWrapper = classes.WRBreadBottom;
      break;
    case ING.MEAT:
      ingredientClass = classes.Meat;
      ingredientWrapper = classes.WRMeat;
      break;
    case ING.CHEESE:
      ingredientClass = classes.Cheese;
      ingredientWrapper = classes.WRCheese;
      break;
    case ING.SALAD:
      ingredientClass = classes.Salad;
      ingredientWrapper = classes.WRSalad;
      break;
    case ING.BACON:
      ingredientClass = classes.Bacon;
      ingredientWrapper = classes.WRBacon;
      break;
      case ING.SALAMI:
        childrenOfIngredient = [...Array(config.get('fats'))].map((_, index) => (
          <div key={index} className={classes.SalamiFat}></div>
        ))
        ingredientClass =classes.Salami;
        ingredientWrapper = classes.WRSalami;
        break;
    default:
      ingredientClass = null;
  }

  return (
    <div className={`${ingredientWrapper} ${classes.WR}`}
      ref={draggableProvided.innerRef} 
      {...draggableProvided.draggableProps}>
        <div {...draggableProvided.dragHandleProps} className={`${ingredientClass} ${classes.Ingredient}`}>
            {childrenOfIngredient}
        </div>
        {onIngredientRemove ? <div onClick={onIngredientRemove} className={classes.RemoveButton}>X</div> : null}
    </div>
  )
}

export default BurgerIngredient;
