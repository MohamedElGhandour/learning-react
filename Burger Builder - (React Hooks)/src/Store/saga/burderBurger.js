import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";
import * as reducerType from "../reducers/reducerTypes";

export function* fetchIngredientsSaga() {
  yield put(actions.startProcess(reducerType.burgerBuilder));
  try {
    const response = yield axios.get("/ingredient.json");
    yield put(actions.successProcess(reducerType.burgerBuilder));
    yield put(actions.fetchIngredientsSuccess(response.data));
  } catch (error) {
    yield put(actions.failProcess(reducerType.burgerBuilder, error));
  }
}
