import * as actionType from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  order: [],
  orders: null,
  purchased: false,
};

const purchaseBurgerSuccess = (state, action) => {
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
    purchased: true,
  };
  return updateObject(state, updatedState);
};

const deleteOrderSuccess = (state, action) => {
  const newObj = { ...state.orders };
  delete newObj[action.id];
  console.log(newObj);
  return updateObject(state, {
    orders: newObj,
  });
};

const purchaseBurgerInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PURCHASE_BURGER_INIT:
      return purchaseBurgerInit(state, action);
    case actionType.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionType.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionType.DELETE_ORDER_SUCCESS:
      return deleteOrderSuccess(state, action);
    default:
      return state;
  }
};
export default reducer;
