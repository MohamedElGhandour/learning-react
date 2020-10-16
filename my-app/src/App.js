import React, { useState, Component } from 'react';
import logo from './logo.svg';
import Person from './Person/Person';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
// import Games from './Games/Games';
import './App.css';
import classes from './App.css';
console.log(classes);


class App extends Component {

  state = {
    Person: [
      { id: 'aswfdwef1', name: 'Mohamed', age: 20 },
      { id: 'aswfdwef2', name: 'ahmed', age: 27 },
      { id: 'aswfdwef3', name: 'yahya', age: 60 },
    ],
    chagneNameState:this.changeNameInput,
    togglePersonState: false, 
  };

  // switchNameBTN = (newname) => {
  //   this.setState({
  //     Person: [
  //       { name: newname, age: 20 },
  //       { name: '7amada', age: 27 },
  //       { name: 'baba', age: 60 },
  //     ],
  //   });
  //   console.log('switchNameBTN');
  // }


  changeNameInput = (event, id) => {

    // my Code

    // const persons = [...this.state.Person];
    // const person = this.state.Person.find((person) => {
    //   return person.id === id;
    // })
    // person.name = event.target.value;
    // const returnedTarget = Object.assign(persons, person);
    // this.setState({person: returnedTarget});

    // my another Code

    // const personIndex = this.state.Person.findIndex((person) => {
    //   return person.id === id;
    // })
    // const persons = [...this.state.Person];
    // persons[personIndex].name = event.target.value;
    // this.setState({person:persons});

    // max Code

    const personIndex = this.state.Person.findIndex((person) => {
      return person.id === id;
    })
    const person = { ...this.state.Person[personIndex] };
    // const person = Object.assign({}, this.state.Person[personIndex]);
    person.name = event.target.value;
    const persons = [...this.state.Person];
    persons[personIndex] = person;
    this.setState({ Person: persons });

  }

  togglePersonHandler = () => {
    const thePersonState = this.state.togglePersonState;
    this.setState({ togglePersonState: !thePersonState });
  }

  deletePersonHandler = (index) => {
    // const persons = this.state.Person.slice();
    const persons = [...this.state.Person];
    persons.splice(index, 1);
    this.setState({ Person: persons });
    console.log(persons, this.state);
  }

  render() {

    let persons = null;
    let clsBtn = null;

    if (this.state.togglePersonState) {
      persons = (
        <div>
          {this.state.Person
            .map((persons, index) => {
              return <Person key={persons.id} change={(event) => this.changeNameInput(event, persons.id)} click={() => this.deletePersonHandler(index)} name={persons.name} age={persons.age} />
            })}
        </div>
      );
      clsBtn = classes.green;
    }
    // let para = <p>React JS</p>;
    // if (this.state.Person.length <= 1) {
    //   para = <p className='red bold'>React JS</p>;
    // } else if (this.state.Person.length <= 2) {
    //   para = <p className='red'>React JS</p>;
    // }

    let assignedClasses = [];

    if (this.state.Person.length <= 1) {
      assignedClasses.push(classes.red, classes.bold);
    } else if (this.state.Person.length <= 2) {
      assignedClasses.push(classes.red);
    }

    return (
      <div className={classes.App}>
        <h1>Hello World</h1>
        <p className={assignedClasses.join(' ')}>React JS</p>
        <button className={clsBtn} onClick={this.togglePersonHandler}>toggle list</button>
        {persons}
        {/* { this.state.togglePersonState === true ?
          <div>
          <Person name={this.state.Person[0].name} age={this.state.Person[0].age} />
          <Person name={this.state.Person[1].name} age={this.state.Person[1].age} click={this.switchNameBTN.bind(this, '7amo')}  change = {this.changeNameInput}>congratulation for a new laptop</Person>
          <Person name={this.state.Person[2].name} age={this.state.Person[2].age} />
        </div> : null} */}
        {/* <Games name='League of Legends' company='Riot'>is a multiplayer online battle arena video game developed and published by</Games>
        <Games name='Fortnite' company='Epic Games '>is an online video game developed by </Games> */}
      </div>);
  }
  // return (React.createElement('div', {className: 'App'}, React.createElement('h1', {},'Hi, it\'s me'), React.createElement('p', {},'yeah right Gandour <333') ));  
}



export default App;

/* Class Based */



// const App = props =>  {

//   const [personState, setPersonState] =  useState({
//     Person: [
//       { name: 'Mohamed', age: 20 },
//       { name: 'ahmed', age: 27 },
//       { name: 'yahya', age: 60 },
//     ], 
//   });
//   const [otherState, setOtherState] = useState({otherState: 'Hey React JS'}); 

//   const switchNameBTN = () => {
//     setPersonState({
//       Person: [
//         { name: 'medo', age: 20 },
//         { name: '7amada', age: 27 },
//         { name: 'baba', age: 60 },
//       ],
//     });


//   }
//   console.log(personState, otherState);

//     return (
//       <div className="App">
//         <h1>Hello World</h1>
//         <p>React JS</p>
//         <button onClick={switchNameBTN}>switch name</button>
//         <Person name={personState.Person[0].name} age={personState.Person[0].age} />
//         <Person name={personState.Person[1].name} age={personState.Person[1].age}>congratulation for a new laptop</Person>
//         <Person name={personState.Person[2].name} age={personState.Person[2].age} />
//         {/* <Games name='League of Legends' company='Riot'>is a multiplayer online battle arena video game developed and published by</Games>
//         <Games name='Fortnite' company='Epic Games '>is an online video game developed by </Games> */}
//       </div>
//     );
//   // return (React.createElement('div', {className: 'App'}, React.createElement('h1', {},'Hi, it\'s me'), React.createElement('p', {},'yeah right Gandour <333') ));  
// }
