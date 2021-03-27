import React, { Component } from "react";
// import Spinner from "../../components/UI/Spinner/Spinner";
const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
      // loading: false,
      // error: null,
    };
    componentDidMount() {
      // this.setState({ component: "start", loading: true });
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
      // .catch((error) => {
      //   this.setState({ component: null, error: error, loading: false });
      // });
    }
    render() {
      const Component = this.state.component;
      // let root = <Component {...this.props} />;
      // if (this.state.loading) root = <Spinner />;
      return Component ? <Component {...this.props} /> : null;
    }
  };
};
export default asyncComponent;
