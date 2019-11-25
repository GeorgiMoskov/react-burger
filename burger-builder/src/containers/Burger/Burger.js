import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients.get('addedIngredients'),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientRemove: (ingredientKey) => dispatch(actions.removeIngredientByIndex(ingredientKey)),
    changeIngredientPosition: (fromIndex, toIndex) => dispatch(actions.changeIngredientPosition(fromIndex, toIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Burger, axios));
