import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import * as ING from '../../constants/burger/ingredients/ingredients';

const burger = props => {
  const { ingredients } = props;
  
  const renderIngredients = () => {
    const ingredientsComponents = ingredients.map((ingData, index) => (
      <BurgerIngredient 
        key={ingData.get('type') + index}
        type={ingData.get('type')}
        config={ingData.get('config')} />
      ))
    return ingredientsComponents.isEmpty() ?
      'No ingredients added' :
      ingredientsComponents;
  };
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={ING.BREAD_TOP} />
        {renderIngredients()}
      <BurgerIngredient type={ING.BREAD_BOTTOM} />
    </div>
  );
};

export default burger;
