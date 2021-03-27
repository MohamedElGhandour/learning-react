import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import classes from "./ContactData.css";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actionCreator from "../../../Store/actions/index";
import * as reducerType from "../../../Store/reducers/reducerTypes";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        isNumeric: true,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
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
      dliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    const orderdata = {};
    for (const key in this.state.orderForm) {
      orderdata[key] = this.state.orderForm[key].value;
    }
    const data = {
      ingredient: this.props.ingredient,
      price: this.props.price,
      time: Date(),
      orderdata: orderdata,
      userId: this.props.userId,
    };
    this.props.postOrderData(this.props.token, data);
  };

  changedInputHandler = (event, elementIdentifer) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[elementIdentifer],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[elementIdentifer].validation
        ),
        touched: true,
      }
    );
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [elementIdentifer]: updatedFormElement,
    });
    let isValid = true;
    for (const key in updatedOrderForm) {
      isValid = updatedOrderForm[key].valid && isValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: isValid });
  };
  render() {
    let form = (
      <form onSubmit={this.orderHandler}>
        {Object.keys(this.state.orderForm).map((element, index) => (
          <Input
            key={index}
            elementType={this.state.orderForm[element].elementType}
            elementConfig={this.state.orderForm[element].elementConfig}
            changed={(event) => this.changedInputHandler(event, element)}
            shouldvalidate={this.state.orderForm[element].validation}
            touched={this.state.orderForm[element].touched}
            invalid={!this.state.orderForm[element].valid}
          />
        ))}
        <Button disabled={!this.state.formIsValid} btnTybe="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ingredient: state[reducerType.burgerBuilder].ingredient,
    price: state[reducerType.burgerBuilder].price,
    loading: state[reducerType.process].loading[reducerType.burgerBuilder],
    token: state[reducerType.auth].token,
    userId: state[reducerType.auth].userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postOrderData: (token, order) =>
      dispatch(actionCreator.purchaseBurger(token, order)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
