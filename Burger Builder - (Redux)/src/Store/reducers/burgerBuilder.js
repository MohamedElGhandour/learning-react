import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredient: null,
  price: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.4,
  chicken: 1.1,
  cheese: 0.5,
  meat: 1.3,
};

const addIngredientHandler = (state, action) => {
  const updatedIngredient = {
    [action.ingredientItem]: state.ingredient[action.ingredientItem] + 1,
  };
  const updatedIngredients = updateObject(state.ingredient, updatedIngredient);
  const updateState = {
    ingredient: updatedIngredients,
    price: state.price + INGREDIENT_PRICES[action.ingredientItem],
  };
  return updateObject(state, updateState);
};

const removeIngredientHandler = (state, action) => {
  const updatedIngredient = {
    [action.ingredientItem]: state.ingredient[action.ingredientItem] - 1,
  };
  const updatedIngredients = updateObject(state.ingredient, updatedIngredient);
  const updateState = {
    ingredient: updatedIngredients,
    price: state.price - INGREDIENT_PRICES[action.ingredientItem],
  };
  return updateObject(state, updateState);
};

const getIngredients = (state, action) => {
  return updateObject(state, {
    ingredient: {
      salad: action.ingredient.salad,
      chicken: action.ingredient.chicken,
      cheese: action.ingredient.cheese,
      meat: action.ingredient.meat,
    },
    price: 4,
    error: false,
  });
};

const getIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_INGREDIENTS:
      return getIngredients(state, action);
    case actionType.GET_INGREDIENTS_FAILED:
      return getIngredientsFailed(state, action);
    case actionType.ADD_INGREDIENT_HANDLER:
      return addIngredientHandler(state, action);
    case actionType.REMOVE_INGREDIENT_HANDLER:
      return removeIngredientHandler(state, action);
    default:
      return state;
  }
};
export default reducer;
