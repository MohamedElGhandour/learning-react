import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Orders.css";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
class Orders extends Component {
  componentDidMount() {
    this.props.startLoading();
    this.props.onFetchOrders();
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
              delete={(id) => this.props.onDeleteOrder(id)}
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
    orders: state.order.orders,
    loading: state.order.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
    startLoading: () => dispatch(actions.startProcess()),
    onDeleteOrder: (id) => dispatch(actions.deleteOrder(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
