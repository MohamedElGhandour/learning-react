import axios from "../../axios-orders";
import * as actionType from "./actionTypes";
import * as reducerType from "../reducers/reducerTypes";
import { startProcess, successProcess, failProcess } from "./index";

const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURCHASE_BURGER_SUCCESS,
    orderId: id.name,
    orderData: orderData,
  };
};
export const purchaseBurger = (token, orderData) => {
  return (dispatch) => {
    dispatch(startProcess(reducerType.burgerBuilder));
    axios
      .post(`orders.json?auth=${token}`, orderData)
      .then((response) => {
        dispatch(successProcess(reducerType.burgerBuilder));
        dispatch(purchaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(failProcess(reducerType.burgerBuilder, error));
      });
  };
};

export const purchaseBurgerInit = () => {
  return {
    type: actionType.PURCHASE_BURGER_INIT,
  };
};
const fetchOrdersSuccess = (data) => {
  return {
    type: actionType.FETCH_ORDERS_SUCCESS,
    orders: data,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(startProcess(reducerType.order));
    const queryParam = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(`orders.json${queryParam}`)
      .then((response) => {
        dispatch(successProcess(reducerType.order));
        dispatch(fetchOrdersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(failProcess(reducerType.order, error));
      });
  };
};

const deleteOrderSuccess = (id) => {
  return {
    type: actionType.DELETE_ORDER_SUCCESS,
    id: id,
  };
};

export const deleteOrder = (token, id) => {
  return (dispatch) => {
    dispatch(startProcess(reducerType.order));
    axios
      .delete(`orders/${id}.json/?auth=${token}`)
      .then((response) => {
        dispatch(successProcess(reducerType.order));
        dispatch(deleteOrderSuccess(id));
      })
      .catch((error) => {
        dispatch(failProcess(reducerType.order, error));
      });
  };
};
