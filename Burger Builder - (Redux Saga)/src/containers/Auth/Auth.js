import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import * as reducerType from "../../Store/reducers/reducerTypes";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";
// import { cloneDeep } from "lodash";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  changedInputHandler = (event, elementIdentifer) => {
    const updatedcontrols = updateObject(this.state.controls, {
      [elementIdentifer]: updateObject(this.state.controls[elementIdentifer], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[elementIdentifer].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedcontrols });
  };
  switchAuthHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };
  render() {
    let form = (
      <form onSubmit={this.orderHandler}>
        {Object.keys(this.state.controls).map((element, index) => (
          <Input
            key={index}
            elementType={this.state.controls[element].elementType}
            elementConfig={this.state.controls[element].elementConfig}
            changed={(event) => this.changedInputHandler(event, element)}
            shouldvalidate={this.state.controls[element].validation}
            touched={this.state.controls[element].touched}
            invalid={!this.state.controls[element].valid}
          />
        ))}
        <Button btnTybe="Success">SUBMIT</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errorMSG = null;
    if (this.props.error) {
      errorMSG = (
        <p style={{ color: "red" }}>
          {this.props.error.response.data.error.message}
        </p>
      );
    }
    let isAuthenticated = null;
    if (this.props.isAuthenticated) {
      isAuthenticated = (
        <Redirect
          to={this.props.buildingBurger ? this.props.authRedirectPath : "/"}
        />
      );
    }
    return (
      <div className={classes.Auth}>
        {isAuthenticated}
        <h4>JOIN WITH US NOW</h4>
        {errorMSG}
        {form}
        <Button clicked={this.switchAuthHandler} btnTybe="Danger">
          Switch to {this.state.isSignup ? "Sign in" : "Sign up"}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state[reducerType.process].loading[reducerType.auth],
    error: state[reducerType.process].error[reducerType.auth],
    isAuthenticated: state[reducerType.auth].token !== null,
    authRedirectPath: state[reducerType.auth].authRedirectPath,
    buildingBurger: state[reducerType.burgerBuilder].building,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
