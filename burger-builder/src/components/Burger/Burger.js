import React, { memo, useState } from 'react';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import classes from './Burger.css';
import BurgerIngredientsList from './BurgerIngredientsList/BurgerIngredientsList';

const burger = props => {
  const { ingredients, changeIngredientPosition, onIngredientRemove } = props;

  const onDragEnd = result => {
    if(!result.source || !result.destination) return;
    if(result.source.index === result.destination.index) return;
    changeIngredientPosition(result.source.index, result.destination.index);
  }
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="0">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={classes.Burger}>
            <BurgerIngredientsList
              onIngredientRemove={onIngredientRemove}
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
