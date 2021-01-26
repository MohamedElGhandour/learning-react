import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const AsyncUsers = asyncComponent(() => import("./containers/Users/Users"));
const AsyncPizza = asyncComponent(() => import("./containers/Pizza/Pizza"));
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Users</Link> | <Link to="/pizza">Pizza</Link>
        </div>
        <div>
          <Route path="/" exact component={AsyncUsers} />
          <Route path="/pizza" exact component={AsyncPizza} />
        </div>
      </div>
    );
  }
}
export default App;
