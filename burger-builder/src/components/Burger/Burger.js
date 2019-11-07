import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import * as ING from '../../constants/burger/ingredients/ingredients';

const burger = props => {
  let transformedIngredients = Object.keys({...props.ingredients})
    .map(ingKey => {
      return [...Array(props.ingredients[ingKey])].map((_, index) => {
        return <BurgerIngredient key={ingKey + index} type={ingKey} />;
      });
    })
    .flat();
    
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={ING.BREAD_TOP} />
      {transformedIngredients}
      <BurgerIngredient type={ING.BREAD_BOTTOM} />
    </div>
  );
};

export default burger;
