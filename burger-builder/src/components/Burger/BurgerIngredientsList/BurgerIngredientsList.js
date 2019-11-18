import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import classes from './BurgerIngredientsList.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import * as ING from '../../../constants/burger/ingredients/ingredients';

const BurgerIngredientsList = ({ ingredients, droppableProvided={},  children }) => {
  
  const renderIngredients = () => {
    const ingredientsComponents = ingredients.map((ingData, index) => (

      <Draggable draggableId={ingData.get('type') + index} index={index} key={index}>
        {(provided) => (
          <BurgerIngredient
            draggableProvided={provided}

            key={ingData.get('type') + index}
            type={ingData.get('type')}
            config={ingData.get('config')} />
        )}
      </Draggable>

      ))
    return ingredientsComponents.isEmpty() ?
      'No ingredients added' :
      ingredientsComponents;
  };


  return (
    <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className={classes.BurgerIngredientsList}>
      <BurgerIngredient type={ING.BREAD_TOP} />
        {renderIngredients()}
        {children}
      <BurgerIngredient type={ING.BREAD_BOTTOM} />
    </div>
  )
}

export default  BurgerIngredientsList;
