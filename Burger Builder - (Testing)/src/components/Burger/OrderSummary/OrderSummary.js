import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        if (this.props.ingredients[igKey] > 0) {
          return (
            <li key={igKey}>
              <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
              <span style={{ color: "rgb(0 167 0)" }}>
                {this.props.ingredients[igKey]}
              </span>
            </li>
          );
        } else {
          return (
            <li key={igKey}>
              <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
              <span style={{ color: "rgb(247 0 0)" }}>
                You had not added this ingredient
              </span>
            </li>
          );
        }
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>total price: {this.props.price.toFixed(2)}$</strong>
        </p>
        <p>Continuo to Checkout?</p>
        <Button btnTybe="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnTybe="Success" clicked={this.props.purchaseContinued}>
          CONTINUO
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
