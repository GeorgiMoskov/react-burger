export {
  startLoading,
  stopLoading
} from './loaders'

export {
  initBuildingIngredients,
  setBuildingIngredients,
  initAddedIngredients,
  setAddedIngredients,
  addIngredient,
  removeIngredientByType,
  removeIngredientByIndex,
  changeIngredientPosition
} from './ingredients'

export {
  orderBurger,
  setIsBurgerOrdered,

  //resetIsPurchased,
  purchaseInit,
  // purchaseBurger,
  fetchOrders
} from './order';

export {
  initAuthState,
  setAuthState,
  login,
  register,
  logout,
  setAfterAuthRedirectPath,
} from './auth';