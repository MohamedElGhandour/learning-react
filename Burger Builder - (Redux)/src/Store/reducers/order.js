import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  order: [],
  orders: null,
  loading: false,
  purechased: false,
  //   error: false,
};

const purechaseBurgerSuccess = (state, action) => {
  const updatedOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  const updatedOrders = updateObject(
    state.order,
    state.order.concat(updatedOrder)
  );
  const updatedState = {
    order: updatedOrders,
    loading: false,
    purechased: true,
  };
  return updateObject(state, updatedState);
};

const deleteOrderSuccess = (state, action) => {
  const newObj = { ...state.orders };
  delete newObj[action.id];
  console.log(newObj);
  return updateObject(state, {
    orders: newObj,
    loading: false,
  });
};

const failProcess = (state, action) => {
  return updateObject(state, { loading: false });
};

const startProcess = (state, action) => {
  return updateObject(state, { loading: true });
};

const purechaseBurgerInit = (state, action) => {
  return updateObject(state, { purechased: false });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.START_PROCESS:
      return startProcess(state, action);
    case actionType.FAIL_PROCESS:
      return failProcess(state, action);
    case actionType.PURECHASE_BURGER_INIT:
      return purechaseBurgerInit(state, action);
    case actionType.PURECHASE_BURGER_SUCCESS:
      return purechaseBurgerSuccess(state, action);
    case actionType.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionType.DELETE_ORDER_SUCCESS:
      return deleteOrderSuccess(state, action);
    default:
      return state;
  }
};
export default reducer;
