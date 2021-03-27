import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Orders.css";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import * as reducerType from "../../Store/reducers/reducerTypes";
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      if (this.props.orders) {
        if (
          !(
            Object.keys(this.props.orders).length === 0 &&
            this.props.orders.constructor === Object
          )
        ) {
          orders = Object.keys(this.props.orders).map((order, index) => (
            <Order
              delete={(id) => this.props.onDeleteOrder(this.props.token, id)}
              key={index}
              id={order}
              customer={this.props.orders[order].orderdata}
              ingredient={this.props.orders[order].ingredient}
              price={this.props.orders[order].price}
            />
          ));
        } else {
          orders = <h1 style={{ textAlign: "center" }}>No Orders</h1>;
        }
      } else {
        orders = <h1 style={{ textAlign: "center" }}>No Orders</h1>;
      }
    }
    return <div className={classes.Orders}>{orders}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state[reducerType.order].orders,
    loading: state[reducerType.process].loading[reducerType.order],
    token: state[reducerType.auth].token,
    userId: state[reducerType.auth].userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
    onDeleteOrder: (token, id) => dispatch(actions.deleteOrder(token, id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
