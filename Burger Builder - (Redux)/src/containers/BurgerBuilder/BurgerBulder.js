import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Aux from "../../hoc/Aux/Aux";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.getIngredient();
  }

  updatePurchasableHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((arr, el) => arr + el, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuoHandler = () => {
    this.props.onInintPurechase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredient,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ textAlign: "center" }}>ingredient can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredient) {
      burger = (
        <Aux>
          <Burger ingredient={this.props.ingredient} />
          <BuildControls
            ingredientAdded={this.props.addIngredientHandler}
            ingredientRemoved={this.props.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.props.price}
            ordered={this.purchaseHandler}
            purchasable={this.updatePurchasableHandler(this.props.ingredient)}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredient}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuoHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ingredient: state.burgerBuilder.ingredient,
    price: state.burgerBuilder.price,
    error: state.burgerBuilder.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getIngredient: () => {
      dispatch(actions.getIngredient());
    },
    addIngredientHandler: (item) =>
      dispatch(actions.addIngredientHandler(item)),
    removeIngredientHandler: (item) =>
      dispatch(actions.removeIngredientHandler(item)),
    onInintPurechase: () => dispatch(actions.purechaseBurgerInit()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
