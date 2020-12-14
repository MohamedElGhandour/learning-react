import React, { setState } from "react";
import Person from "./Person/Person";
const Persons = (props) => {
  const changeNameInput = (event, id) => {
    const personIndex = props.state.Person.findIndex((person) => {
      return person.id === id;
    });
    const person = { ...props.state.Person[personIndex] };
    person.name = event.target.value;
    const persons = [...props.state.Person];
    persons[personIndex] = person;
    //setState({ Person: persons });
    props.useSetStatePerson({ Person: persons });
  };
  const deletePersonHandler = (index) => {
    const persons = [...props.state.Person];
    persons.splice(index, 1);
    props.useSetStatePerson({ Person: persons });
  };
  console.log("[Person.js] rendering ...");
  return props.state.Person.map((persons, index) => {
    return (
      <Person
        key={persons.id}
        change={(event) => changeNameInput(event, persons.id)}
        click={() => deletePersonHandler(index)}
        name={persons.name}
        age={persons.age}
      />
    );
  });
};

export default Persons;
