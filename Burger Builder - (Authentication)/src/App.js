import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuild from "./containers/BurgerBuilder/BurgerBulder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./Store/actions/index";
import { Route, Switch, Redirect } from "react-router-dom";
import * as reducerType from "./Store/reducers/reducerTypes";

class App extends Component {
  componentWillMount() {
    this.props.onTrySignup();
  }
  render() {
    let route = (
      <Switch>
        <Route path="/login" component={Auth} />
        <Route path="/" exact component={BurgerBuild} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      route = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
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
    onTrySignup: () => dispatch(actions.autoCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
