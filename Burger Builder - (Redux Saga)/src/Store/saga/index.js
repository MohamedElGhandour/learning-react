import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {
  authLogoutSaga,
  checkAuthTimeoutSaga,
  authSaga,
  authCheckStateSaga,
} from "./auth";
import { fetchIngredientsSaga } from "./burderBurger";
import { purchaseBurgerSaga, fetchOrdersSaga, deleteOrderSaga } from "./order";
import * as actionType from "../actions/actionTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionType.AUTH_INITIATE_LOGOUT, authLogoutSaga),
    takeEvery(actionType.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionType.AUTH, authSaga),
    takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionType.FETCH_INGREDIENTS, fetchIngredientsSaga);
}

export function* watchOrder() {
  yield takeLatest(actionType.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionType.FETCH_ORDERS, fetchOrdersSaga);
  yield takeEvery(actionType.DELETE_ORDERS, deleteOrderSaga);
}
