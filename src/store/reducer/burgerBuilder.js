import {
  REMOVE_INGREDIENT,
  ADD_INGREDIENT,
  SET_INGREDIENTS,
  FETCHED_INGREDIENTS_FAILED,
} from "../actions/actionTypes";
import { updateObj } from "../utility";

const INGREDIENTS_PRICES = {
  salad: 0.3,
  bacon: 0.5,
  cheese: 0.2,
  meat: 1,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObj(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
  };
  return updateObj(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = updateObj(state.ingredients, updatedIng);
  const updated = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
  };
  return updateObj(state, updated);
};

const setIngredients = (state, action) => {
  return updateObj(state, {
    ingredients: {
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObj(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return addIngredient(state, action);
    case REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case SET_INGREDIENTS:
      return setIngredients(state, action);
    case FETCHED_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
