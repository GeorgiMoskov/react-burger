import React, { Component } from 'react';
//FIXME: improve axios instance naming
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './BurgerBuilder.css'

import Burger from '../../components/Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import BuildControls from '../../components/UI/BuildControls/BuildControls';
import { selectAddedIngredientsTypeMapBuildControlsData, selectTotalPrice } from '../../store/selectors/burgerBuilder';
import OrderBurger from './OrderBurger/OrderBurger';

class BurgerBuilder extends Component {

  componentDidMount() {
    //TODO: SPINNER WHEN FETCHING INGREDIENTS => GET FROM LOADERS state
    if(!this.props.isBuildingIngredientsInit) {
      this.props.initBuildingIngredients();
    }
    if(!this.props.isAddedIngredientsInit) {
      this.props.initAddedIngredients();
    }
  }

  render() {
    return (
      <div className={classes.BurgerBuilder}>
        <Burger onIngredientRemove={this.props.onRemoveIngredientByIndex} changeIngredientPosition={this.props.changeIngredientPosition} ingredients={this.props.addedIngredients} />
        <BuildControls 
          controlTypesMapData={this.props.ingredientsTypeMapBuildControlData}
          onControlTypeAdd={this.props.onAddIngredient}
          onControlTypeRemove={this.props.onRemoveIngredientByType}
        />
        <div className={classes.TotalPrice}>
          {this.props.burgerPrice.toFixed(2) + ' usd'}
        </div>
        <OrderBurger />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedIngredients: state.ingredients.get('addedIngredients'),
    ingredientsTypeMapBuildControlData: selectAddedIngredientsTypeMapBuildControlsData(state),
    burgerPrice: selectTotalPrice(state),
    isBuildingIngredientsInit: state.ingredients.get('isBuildingIngredientsInit'),
    isAddedIngredientsInit: state.ingredients.get('isAddedIngredientsInit'),

    //TODO: ADD on error UI
    //error: state.BurgerBuilder.get('error'),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    initBuildingIngredients: () => dispatch(actions.initBuildingIngredients()),
    initAddedIngredients: () => dispatch(actions.initAddedIngredients()),
    onAddIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
    onRemoveIngredientByType: (ingredientKey) => dispatch(actions.removeIngredientByType(ingredientKey)),
    onRemoveIngredientByIndex: (ingredientKey) => dispatch(actions.removeIngredientByIndex(ingredientKey)),
    changeIngredientPosition: (fromIndex, toIndex) => dispatch(actions.changeIngredientPosition(fromIndex, toIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
