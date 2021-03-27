import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Orders.css";
class Orders extends Component {
  state = {
    orders: null,
    loading: true,
    price: null,
  };
  componentDidMount() {
    axios
      .get("orders.json")
      .then((response) => {
        console.log(response.data);
        this.setState({ orders: response.data, loading: false });
      })
      .catch((error) => console.log(error));
  }
  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      orders = Object.keys(this.state.orders).map((order, index) => (
        <Order
          key={index}
          customer={this.state.orders[order].customer}
          ingredient={this.state.orders[order].ingredient}
          price={this.state.orders[order].price}
        />
      ));
    }
    return <div className={classes.Orders}>{orders}</div>;
  }
}
export default withErrorHandler(Orders, axios);
