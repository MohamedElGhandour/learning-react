import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Aux from "../../hoc/Aux/Aux";

const INGREDIENT_PRICES = {
  salad: 0.4,
  chicken: 1.1,
  cheese: 0.5,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {}
  // }
  state = {
    ingredient: null,
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // console.log(this.props);
    axios
      .get("/ingredient.json")
      .then((response) => {
        this.setState({ ingredient: response.data });
        console.log(response);
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  }

  updatePurchasableHandler = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((arr, el) => arr + el, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredient,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.price;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredient: updatedIngredients, price: newPrice });
    this.updatePurchasableHandler(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinuoHandler = () => {
    console.log(this.state.ingredient);
    const queryParams = [];
    for (const key in this.state.ingredient) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(
          this.state.ingredient[key]
        )}`
      );
    }
    queryParams.push(`price=${this.state.price}`);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredient[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredient,
      };
      updatedIngredients[type] = updatedCount;
      const priceSubstraction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.price;
      const newPrice = oldPrice - priceSubstraction;
      this.setState({ ingredient: updatedIngredients, price: newPrice });
      this.updatePurchasableHandler(updatedIngredients);
    }
    // else {// NEVER HAPPENED
    //
    //     alert(`your Burger did not have any ${type} to remove it!`)
    // }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredient,
    };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = <Spinner />;

    if (this.state.ingredient) {
      burger = (
        <Aux>
          <Burger ingredient={this.state.ingredient} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.price}
            ordered={this.purchaseHandler}
            purchasable={this.state.purchasable}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredient}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuoHandler}
          price={this.state.price}
        />
      );
    }

    if (this.state.loading) orderSummary = <Spinner />;

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

export default withErrorHandler(BurgerBuilder, axios);
