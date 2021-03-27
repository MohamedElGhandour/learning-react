import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.css";

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
        validation: {},
        value: "",
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderdata = {};
    for (const key in this.state.orderForm) {
      orderdata[key] = this.state.orderForm[key].value;
    }
    const data = {
      ingredient: this.props.ingredient,
      price: this.props.price,
      time: Date(),
      orderdata: orderdata,
    };
    axios
      .post("orders.json", data)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
        console.log(response);
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  checkValidity(value, rule) {
    let isValid = true;
    if (rule.required) isValid = value.trim() !== "" && isValid;
    if (rule.maxLength) isValid = value.length <= rule.maxLength && isValid;
    if (rule.minLength) isValid = value.length >= rule.minLength && isValid;

    return isValid;
  }

  changedInputHandler = (event, elementIdentifer) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[elementIdentifer] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[elementIdentifer] = updatedFormElement;
    let isValid = true;
    for (const key in updatedOrderForm) {
      isValid = updatedOrderForm[key].valid && isValid;
    }
    console.log(isValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid: isValid });
  };
  render() {
    // const formElementsArray = [];
    // for (const key in this.state.orderForm) {
    //   formElementsArray.push({
    //     id: key,
    //     config: this.state.orderForm[key],
    //   });
    // }
    // console.log(formElementsArray);
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
    if (this.state.loading) {
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

export default ContactData;
