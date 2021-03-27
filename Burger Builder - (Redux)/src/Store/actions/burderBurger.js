import axios from "../../axios-orders";
import * as actionType from "./actionTypes";

export const addIngredientHandler = (item) => {
  return {
    type: actionType.ADD_INGREDIENT_HANDLER,
    ingredientItem: item,
  };
};
export const removeIngredientHandler = (item) => {
  return {
    type: actionType.REMOVE_INGREDIENT_HANDLER,
    ingredientItem: item,
  };
};

const getIngredientAsync = (ingredient) => {
  return {
    type: actionType.GET_INGREDIENTS,
    ingredient: ingredient,
  };
};
const getIngredientFailedAsync = () => {
  return {
    type: actionType.GET_INGREDIENTS_FAILED,
  };
};

export const getIngredient = () => {
  return (dispatch) => {
    axios
      .get("/ingredient.json")
      .then((response) => {
        dispatch(getIngredientAsync(response.data));
      })
      .catch((error) => {
        dispatch(getIngredientFailedAsync());
      });
  };
};
