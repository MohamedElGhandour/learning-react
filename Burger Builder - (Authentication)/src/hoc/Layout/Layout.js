import React, { Component } from "react";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import * as reducerType from "../../Store/reducers/reducerTypes";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerCancelHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <ToolBar
          isAuthenticated={this.props.isAuthenticated}
          sideDrawerToggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          sideDrawerCanceled={this.sideDrawerCancelHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state[reducerType.auth].token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
