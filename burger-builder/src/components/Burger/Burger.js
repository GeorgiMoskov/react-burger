import React, { memo } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import classes from './Burger.css';
import BurgerIngredientsList from './BurgerIngredientsList/BurgerIngredientsList';

const burger = props => {
  const { ingredients, changeIngredientPosition } = props;
  

  const onDragEnd = result => {
    if(!result.source || !result.destination) return;
    changeIngredientPosition(result.source.index, result.destination.index);
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="0">
        {(provided) => (
          <div className={classes.Burger}>
            
            <BurgerIngredientsList
              droppableProvided={provided}

              ingredients={ingredients} >
                {provided.placeholder}
            </BurgerIngredientsList>
            
          </div>
        )}  
      </Droppable>
    </DragDropContext>
  );
};

export default memo(burger);
