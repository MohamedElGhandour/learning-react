import React, { useState, useEffect, useCallback } from "react";
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

export const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const { fetchIngredients } = props;
  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const updatePurchasableHandler = useCallback((ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((arr, el) => arr + el, 0);
    return sum > 0;
  }, []);

  const purchaseHandler = useCallback(() => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/login");
    }
  }, []);

  const purchaseCancelHandler = useCallback(() => {
    setPurchasing(false);
  }, []);

  const purchaseContinuoHandler = useCallback(() => {
    props.onInintPurchase();
    props.history.push("/checkout");
  }, []);

  const disabledInfo = {
    ...props.ingredient,
  };

  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;

  let burger = props.error ? (
    <p style={{ textAlign: "center" }}>ingredient can't be loaded</p>
  ) : (
    <Spinner />
  );

  if (props.ingredient) {
    burger = (
      <Aux>
        <Burger ingredient={props.ingredient} />
        <BuildControls
          ingredientAdded={props.addIngredientHandler}
          ingredientRemoved={props.removeIngredientHandler}
          disabled={disabledInfo}
          price={props.price}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
          purchasable={updatePurchasableHandler(props.ingredient)}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredient}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinuoHandler}
        price={props.price}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

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
)(withErrorHandler(burgerBuilder, axios));

// export class BurgerBuilder extends Component {
//   state = {
//     purchasing: false,
//   };

//   componentDidMount() {
//     this.props.fetchIngredients();
//   }

//   updatePurchasableHandler = (ingredients) => {
//     const sum = Object.keys(ingredients)
//       .map((igKey) => ingredients[igKey])
//       .reduce((arr, el) => arr + el, 0);
//     return sum > 0;
//   };

//   purchaseHandler = () => {
//     if (this.props.isAuthenticated) {
//       this.setState({ purchasing: true });
//     } else {
//       this.props.onSetAuthRedirectPath("/checkout");
//       this.props.history.push("/login");
//     }
//   };

//   purchaseCancelHandler = () => {
//     this.setState({ purchasing: false });
//   };

//   purchaseContinuoHandler = () => {
//     this.props.onInintPurchase();
//     this.props.history.push("/checkout");
//   };

//   render() {
//     const disabledInfo = {
//       ...this.props.ingredient,
//     };
//     for (const key in disabledInfo) {
//       disabledInfo[key] = disabledInfo[key] <= 0;
//     }

//     let orderSummary = null;
//     let burger = this.props.error ? (
//       <p style={{ textAlign: "center" }}>ingredient can't be loaded</p>
//     ) : (
//       <Spinner />
//     );

//     if (this.props.ingredient) {
//       burger = (
//         <Aux>
//           <Burger ingredient={this.props.ingredient} />
//           <BuildControls
//             ingredientAdded={this.props.addIngredientHandler}
//             ingredientRemoved={this.props.removeIngredientHandler}
//             disabled={disabledInfo}
//             price={this.props.price}
//             ordered={this.purchaseHandler}
//             isAuth={this.props.isAuthenticated}
//             purchasable={this.updatePurchasableHandler(this.props.ingredient)}
//           />
//         </Aux>
//       );
//       orderSummary = (
//         <OrderSummary
//           ingredients={this.props.ingredient}
//           purchaseCanceled={this.purchaseCancelHandler}
//           purchaseContinued={this.purchaseContinuoHandler}
//           price={this.props.price}
//         />
//       );
//     }

//     return (
//       <Aux>
//         <Modal
//           show={this.state.purchasing}
//           modalClosed={this.purchaseCancelHandler}
//         >
//           {orderSummary}
//         </Modal>
//         {burger}
//       </Aux>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     ingredient: state[reducerType.burgerBuilder].ingredient,
//     price: state[reducerType.burgerBuilder].price,
//     error: state[reducerType.process].error[reducerType.burgerBuilder],
//     isAuthenticated: state[reducerType.auth].token !== null,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchIngredients: () => {
//       dispatch(actions.fetchIngredients());
//     },
//     addIngredientHandler: (item) =>
//       dispatch(actions.addIngredientHandler(item)),
//     removeIngredientHandler: (item) =>
//       dispatch(actions.removeIngredientHandler(item)),
//     onInintPurchase: () => dispatch(actions.purchaseBurgerInit()),
//     onSetAuthRedirectPath: (path) =>
//       dispatch(actions.setAuthRedirectPath(path)),
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withErrorHandler(BurgerBuilder, axios));
