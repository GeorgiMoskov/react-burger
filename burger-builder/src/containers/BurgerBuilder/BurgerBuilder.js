import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './BurgerBuilder.css'

import Burger from '../Burger/Burger';
import Spinner from '../../components/UI/Spinner/Spinner';

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
        <Burger />
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

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
