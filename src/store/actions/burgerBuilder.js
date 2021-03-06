import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredientName) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName,
});

export const removeIngredient = (ingredientName) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName,
});

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients,
});

export const fetchedIngredientsFailed = () => ({
  type: actionTypes.FETCHED_INGREDIENTS_FAILED,
});

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => dispatch(setIngredients(response.data)))
      .catch((error) => dispatch(fetchedIngredientsFailed()));
  };
};
