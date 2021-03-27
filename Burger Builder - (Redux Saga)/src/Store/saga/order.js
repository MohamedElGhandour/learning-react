import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";
import * as reducerType from "../reducers/reducerTypes";

export function* purchaseBurgerSaga(action) {
  yield put(actions.startProcess(reducerType.burgerBuilder));
  try {
    const response = yield axios.post(
      `orders.json?auth=${action.token}`,
      action.orderData
    );
    yield put(actions.successProcess(reducerType.burgerBuilder));
    yield put(actions.purchaseBurgerSuccess(response.data, action.orderData));
  } catch (error) {
    yield put(actions.failProcess(reducerType.burgerBuilder, error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.startProcess(reducerType.order));
  const queryParam = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
  try {
    const response = yield axios.get(`orders.json${queryParam}`);
    yield put(actions.successProcess(reducerType.order));
    yield put(actions.fetchOrdersSuccess(response.data));
  } catch (error) {
    yield put(actions.failProcess(reducerType.order, error));
  }
}

export function* deleteOrderSaga(action) {
  yield put(actions.startProcess(reducerType.order));
  try {
    const response = yield axios.delete(
      `orders/${action.id}.json/?auth=${action.token}`
    );
    yield put(actions.successProcess(reducerType.order));
    yield put(actions.deleteOrderSuccess(action.id));
  } catch (error) {
    yield put(actions.failProcess(reducerType.order, error));
  }
}
