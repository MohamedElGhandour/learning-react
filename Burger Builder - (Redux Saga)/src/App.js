import React, { Component, lazy, Suspense } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuild from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./Store/actions/index";
import { Route, Switch, Redirect } from "react-router-dom";
import * as reducerType from "./Store/reducers/reducerTypes";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import Spinner from "./components/UI/Spinner/Spinner";

const AsyuncAuth = lazy(() => import("./containers/Auth/Auth"));
const AsyuncOrders = asyncComponent(() => import("./containers/Orders/Orders"));
const AsyuncCheckout = asyncComponent(() =>
  import("./containers/Checkout/Checkout")
);

class App extends Component {
  componentDidMount() {
    this.props.onTrySignup();
  }
  render() {
    let route = (
      <Switch>
        <Route
          path="/login"
          render={() => (
            <Suspense fallback={<Spinner />}>
              <AsyuncAuth />
            </Suspense>
          )}
        />
        <Route path="/" exact component={BurgerBuild} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/checkout" component={AsyuncCheckout} />
          <Route path="/orders" component={AsyuncOrders} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/login"
            render={() => (
              <Suspense fallback={<Spinner />}>
                <AsyuncAuth />
              </Suspense>
            )}
          />
          <Route path="/" exact component={BurgerBuild} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{route}</Layout>;
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state[reducerType.auth].token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTrySignup: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
