import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import * as reducerType from "../../Store/reducers/reducerTypes";
import { Redirect } from "react-router-dom";
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
      this.props.setAuthRedirectPath();
    }
  }
  orderHandler = (event) => {
    // this.props.startLoading();
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
    // this.props.postOrderData(data);
  };

  checkValidity(value, rule) {
    let isValid = true;
    if (rule.required) isValid = value.trim() !== "" && isValid;
    if (rule.maxLength) isValid = value.length <= rule.maxLength && isValid;
    if (rule.minLength) isValid = value.length >= rule.minLength && isValid;
    if (rule.isEmail) {
      isValid =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          value
        ) && isValid;
    }
    if (rule.isNumeric) isValid = /^\d+$/.test(value) && isValid;

    return isValid;
  }
  changedInputHandler = (event, elementIdentifer) => {
    // const updatedcontrols = { ...this.state.controls };
    // const updatedFormElement = { ...updatedcontrols[elementIdentifer] };
    // updatedFormElement.value = event.target.value;
    // updatedFormElement.valid = this.checkValidity(
    //   updatedFormElement.value,
    //   updatedFormElement.validation
    // );
    // updatedFormElement.touched = true;
    // updatedcontrols[elementIdentifer] = updatedFormElement;

    const updatedcontrols = {
      ...this.state.controls,
      [elementIdentifer]: {
        ...this.state.controls[elementIdentifer],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[elementIdentifer].validation
        ),
        touched: true,
      },
    };

    // const clonedControl = cloneDeep(this.state.controls);
    // clonedControl[elementIdentifer].value = event.target.value;

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
