import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import * as ING from '../../constants/burger/ingredients/ingredients';

const burger = props => {
  const { ingredients } = props;
  
  const renderIngredients = () => ingredients.map((ingData, index) => (
    <BurgerIngredient 
      key={ingData.get('type') + index}
      type={ingData.get('type')}
      config={ingData.get('config')} />
    ));
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={ING.BREAD_TOP} />
        {renderIngredients()}
      <BurgerIngredient type={ING.BREAD_BOTTOM} />
    </div>
  );
};

export default burger;
