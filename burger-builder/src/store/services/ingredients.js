import axios from '../../axios-app';

const fetchBuildingIngredients = () => {
  return axios.get('/building-ingredients.json')
    .then(res => {
      const resBuildingIngredients = res.data;
      return Object.keys({...resBuildingIngredients}).map(id => resBuildingIngredients[id]);
    });
}

const fetchInitiallyAddedIngredients = () => {
  return axios.get('/initial-ingredients-order.json')
    .then(res => {
      const initiallyAddedIngredientsOrderArr = res.data;
      return Object.keys({...initiallyAddedIngredientsOrderArr}).map(id => initiallyAddedIngredientsOrderArr[id]);
    })

}

export default {
  fetchBuildingIngredients,
  fetchInitiallyAddedIngredients
}


