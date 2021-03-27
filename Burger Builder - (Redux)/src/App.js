import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuild from "./containers/BurgerBuilder/BurgerBulder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  // state = {
  //   show: true
  // }
  // componentDidMount () {
  //   setTimeout(() => {
  //     this.setState({show:false})
  //   }, 5000);
  // }
  render() {
    return (
      <div>
        <Layout>
          {/* {this.state.show ? <BurgerBuild /> : null } */}
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuild} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
