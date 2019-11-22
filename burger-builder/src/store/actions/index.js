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
  resetIsPurchased,
  purchaseInit,
  purchaseBurger,
  fetchOrders
} from './order';

export {
  initAuthState,
  setAuthState,

  auth,
  logout,
  setAfterAuthRedirectPath,
  // initAuthState
} from './auth';