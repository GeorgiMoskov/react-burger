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
    //TODO: SPINNER WHEN FETCHING INGREDIENTS
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
        <Burger ingredients={this.props.addedIngredients} />
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
    addedIngredients: state.burgerBuilder.get('addedIngredients'),
    ingredientsTypeMapBuildControlData: selectAddedIngredientsTypeMapBuildControlsData(state.burgerBuilder),
    burgerPrice: selectTotalPrice(state.burgerBuilder),
    isBuildingIngredientsInit: state.burgerBuilder.get('isBuildingIngredientsInit'),
    isAddedIngredientsInit: state.burgerBuilder.get('isAddedIngredientsInit'),

    //TODO: CHECK THIS ERROR PROP
    error: state.burgerBuilder.get('error'),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    initBuildingIngredients: () => dispatch(actions.initBuildingIngredients()),
    initAddedIngredients: () => dispatch(actions.initAddedIngredients()),
    onAddIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
    onRemoveIngredientByType: (ingredientKey) => dispatch(actions.removeIngredientByType(ingredientKey)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
