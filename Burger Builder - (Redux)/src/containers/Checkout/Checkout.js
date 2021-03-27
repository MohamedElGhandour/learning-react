import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";

class Ceckout extends Component {
  checkoutSummaryCanceled = () => {
    this.props.history.goBack();
  };
  checkoutSummaryContinued = () => {
    this.props.history.push(`${this.props.match.path}/contact-data`);
  };
  render() {
    let summary = <Redirect to="/" />;
    const purechasedRedirect = this.props.purechased ? (
      <Redirect to="/" />
    ) : null;
    if (this.props.ingredient) {
      summary = (
        <Aux>
          {purechasedRedirect}
          <CheckoutSummary
            canceled={this.checkoutSummaryCanceled}
            continued={this.checkoutSummaryContinued}
            ingredient={this.props.ingredient}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </Aux>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredient: state.burgerBuilder.ingredient,
    purechased: state.order.purechased,
  };
};
export default connect(mapStateToProps)(Ceckout);
