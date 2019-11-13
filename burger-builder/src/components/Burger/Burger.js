import React from 'react';

import { List, Seq } from 'immutable';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import * as ING from '../../constants/burger/ingredients/ingredients';

const burger = props => {
  const { ingredients } = props;
  
  let ingredientsComponents = ingredients
    .map((ingAmount, ingKey) => {  
    return List(Array(ingAmount)).map((_, index) => {
      return <BurgerIngredient key={ingKey + index} type={ingKey} />
      })
    })
    .toList()
    .flatten();

  if (ingredientsComponents.size === 0) {
    ingredientsComponents = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={ING.BREAD_TOP} />
      {ingredientsComponents}
      <BurgerIngredient type={ING.BREAD_BOTTOM} />
    </div>
  );
};

export default burger;
