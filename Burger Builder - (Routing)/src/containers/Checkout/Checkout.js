import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Ceckout extends Component {
  state = {
    ingredient: { salad: 0, chicken: 0, cheese: 0, meat: 0 },
    price: 0,
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query);
    const ingredient = {};
    let price = 0;
    // query.forEach((el, index) => {
    //   console.log(el, index);
    //   ingredient[index] = el
    // });
    for (const iterator of query.entries()) {
      if (iterator[0] === "price") {
        price = iterator[1];
      } else {
        ingredient[iterator[0]] = +iterator[1];
      }
      // console.log(iterator, iterator[0], iterator[1]);
    }
    this.setState({ ingredient: ingredient, price: price });
  }
  checkoutSummaryCanceled = () => {
    this.props.history.goBack();
  };
  checkoutSummaryContinued = () => {
    this.props.history.push(`${this.props.match.path}/contact-data`);
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          canceled={this.checkoutSummaryCanceled}
          continued={this.checkoutSummaryContinued}
          ingredient={this.state.ingredient}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (
            <ContactData
              ingredient={this.state.ingredient}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default Ceckout;
