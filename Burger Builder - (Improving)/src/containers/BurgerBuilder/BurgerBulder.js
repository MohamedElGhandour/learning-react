import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import * as reducerType from "../../Store/reducers/reducerTypes";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Aux from "../../hoc/Aux/Aux";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.fetchIngredients();
  }

  updatePurchasableHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((arr, el) => arr + el, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/login");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuoHandler = () => {
    this.props.onInintPurchase();
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
            isAuth={this.props.isAuthenticated}
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
    ingredient: state[reducerType.burgerBuilder].ingredient,
    price: state[reducerType.burgerBuilder].price,
    error: state[reducerType.process].error[reducerType.burgerBuilder],
    isAuthenticated: state[reducerType.auth].token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchIngredients: () => {
      dispatch(actions.fetchIngredients());
    },
    addIngredientHandler: (item) =>
      dispatch(actions.addIngredientHandler(item)),
    removeIngredientHandler: (item) =>
      dispatch(actions.removeIngredientHandler(item)),
    onInintPurchase: () => dispatch(actions.purchaseBurgerInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
