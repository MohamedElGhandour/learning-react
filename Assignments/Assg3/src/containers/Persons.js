import React, { Component } from "react";
import { connect } from "react-redux";
import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import * as actionType from "../store/actions";

class Persons extends Component {
  render() {
    return (
      <div>
        <AddPerson personAdded={this.props.onAddedPerson} />
        {this.props.persons.map((person, index) => (
          <Person
            key={index}
            name={person.name}
            age={person.age}
            clicked={() => this.props.onRemovedPerson(person)}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    persons: state.persons,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddedPerson: (name, age) =>
      dispatch({
        type: actionType.ADD_PERSON,
        personData: { name: name, age: age },
      }),
    onRemovedPerson: (person) =>
      dispatch({ type: actionType.REMOVE_PERSON, person: person }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Persons);
