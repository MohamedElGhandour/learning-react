import React, { Component } from "react";

import "./AddPerson.css";

class AddPerson extends Component {
  state = {
    name: "",
    age: "",
  };
  changeNameHandler = (e) => {
    this.setState({ name: e.target.value });
  };
  changeAgeHandler = (e) => {
    this.setState({ age: e.target.value });
  };
  render() {
    return (
      <div className="AddPerson">
        <input
          placeholder="Enter Ur Name"
          onChange={this.changeNameHandler}
          value={this.state.name}
        />
        <input
          placeholder="Enter Ur Age"
          onChange={this.changeAgeHandler}
          value={this.state.age}
        />
        <button
          onClick={() =>
            this.props.personAdded(this.state.name, this.state.age)
          }
        >
          Add Person
        </button>
      </div>
    );
  }
}

export default AddPerson;
