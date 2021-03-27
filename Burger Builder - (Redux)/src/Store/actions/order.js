import axios from "../../axios-orders";
import * as actionType from "./actionTypes";

export const startProcess = () => {
  return {
    type: actionType.START_PROCESS,
  };
};

const failProcess = (error) => {
  return {
    type: actionType.FAIL_PROCESS,
    error: error,
  };
};

const purechaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionType.PURECHASE_BURGER_SUCCESS,
    orderId: id.name,
    orderData: orderData,
  };
};
export const purechaseBurger = (orderData) => {
  return (dispatch) => {
    axios
      .post("orders.json", orderData)
      .then((response) => {
        dispatch(purechaseBurgerSuccess(response.data, orderData));
      })
      .catch((error) => {
        dispatch(failProcess(error));
      });
  };
};

export const purechaseBurgerInit = () => {
  return {
    type: actionType.PURECHASE_BURGER_INIT,
  };
};
const fetchOrdersSuccess = (data) => {
  return {
    type: actionType.FETCH_ORDERS_SUCCESS,
    orders: data,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    axios
      .get("orders.json")
      .then((response) => {
        // this.setState({ orders: response.data, loading: false });
        dispatch(fetchOrdersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(failProcess(error));
      });
  };
};

const deleteOrderSuccess = (id) => {
  return {
    type: actionType.DELETE_ORDER_SUCCESS,
    id: id,
  };
};

export const deleteOrder = (id) => {
  return (dispatch) => {
    dispatch(startProcess());
    axios
      .delete(`orders/${id}.json/`)
      .then((response) => {
        dispatch(deleteOrderSuccess(id));
      })
      .catch((error) => {
        dispatch(failProcess(error));
      });
  };
};
