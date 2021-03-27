import axios from "../../axios-orders";
import * as actionType from "./actionTypes";
import * as reducerType from "../reducers/reducerTypes";
import { startProcess, successProcess, failProcess } from "./index";

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

const fetchIngredientsSuccess = (ingredient) => {
  return {
    type: actionType.FETCH_INGREDIENTS_SUCCESS,
    ingredient: ingredient,
  };
};

export const fetchIngredients = () => {
  return (dispatch) => {
    dispatch(startProcess(reducerType.burgerBuilder));
    axios
      .get("/ingredient.json")
      .then((response) => {
        dispatch(successProcess(reducerType.burgerBuilder));
        dispatch(fetchIngredientsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(failProcess(reducerType.burgerBuilder, error));
      });
  };
};
