import React, { useState } from "react";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import * as reducerType from "../../Store/reducers/reducerTypes";
import Aux from "../Aux/Aux";
import classes from "./Layout.css";

const layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerCancelHandler = () => {
    setShowSideDrawer(false);
  };
  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState);
  };
  return (
    <Aux>
      <ToolBar
        isAuthenticated={props.isAuthenticated}
        sideDrawerToggle={sideDrawerToggleHandler}
      />
      <SideDrawer
        open={showSideDrawer}
        sideDrawerCanceled={sideDrawerCancelHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state[reducerType.auth].token !== null,
  };
};

export default connect(mapStateToProps)(layout);

// class Layout extends Component {
//   state = {
//     showSideDrawer: false,
//   };
//   sideDrawerCancelHandler = () => {
//     this.setState({ showSideDrawer: false });
//   };
//   sideDrawerToggleHandler = () => {
//     this.setState((prevState) => {
//       return { showSideDrawer: !prevState.showSideDrawer };
//     });
//   };
//   render() {
//     return (
//       <Aux>
//         <ToolBar
//           isAuthenticated={this.props.isAuthenticated}
//           sideDrawerToggle={this.sideDrawerToggleHandler}
//         />
//         <SideDrawer
//           open={this.state.showSideDrawer}
//           sideDrawerCanceled={this.sideDrawerCancelHandler}
//           isAuthenticated={this.props.isAuthenticated}
//         />
//         <main className={classes.Content}>{this.props.children}</main>
//       </Aux>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state[reducerType.auth].token !== null,
//   };
// };

// export default connect(mapStateToProps)(Layout);
