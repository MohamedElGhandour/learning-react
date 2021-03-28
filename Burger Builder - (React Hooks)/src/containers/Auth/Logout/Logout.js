import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../../Store/actions/index";

const logout = (props) => {
  const { onLogout } = props;
  useEffect(() => {
    onLogout();
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authLogout()),
  };
};

export default connect(null, mapDispatchToProps)(logout);

// class Logout extends Component {
//   componentDidMount() {
//     this.props.onLogout();
//   }
//   render() {
//     return <Redirect to="/" />;
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onLogout: () => dispatch(actions.authLogout()),
//   };
// };

// export default connect(null, mapDispatchToProps)(Logout);
