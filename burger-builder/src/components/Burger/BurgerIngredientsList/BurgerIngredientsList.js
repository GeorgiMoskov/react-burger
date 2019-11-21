import React, {Fragment} from 'react';

import { Draggable } from 'react-beautiful-dnd';

import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import * as ING from '../../../constants/burger/ingredients/ingredients';

const BurgerIngredientsList = ({ ingredients, children, onIngredientRemove }) => {
  
  const renderIngredients = () => {
    const ingredientsComponents = ingredients.map((ingData, index) => (

      <Draggable draggableId={ingData.get('type') + index} index={index} key={index}>
        {(provided) => (
          <BurgerIngredient
            draggableProvided={provided}
            onIngredientRemove={() => onIngredientRemove(index)}
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
    <Fragment>
        <BurgerIngredient type={ING.BREAD_TOP} />
        {renderIngredients()}
        {children}
      <BurgerIngredient type={ING.BREAD_BOTTOM} />
    </Fragment>
  )
}

export default  BurgerIngredientsList;
