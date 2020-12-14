import React, { Component } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    this.state = {
      Person: [
        { id: 'aswfdwef1', name: 'Mohamed', age: 20 },
        { id: 'aswfdwef2', name: 'ahmed', age: 27 },
        { id: 'aswfdwef3', name: 'yahya', age: 60 },
      ],
      chagneNameState:this.changeNameInput,
      togglePersonState: false, 
      toggleCockpit: true, 
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps,nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  changeNameInput = (event, id) => {
    const personIndex = this.state.Person.findIndex((person) => {
      return person.id === id;
    })
    const person = { ...this.state.Person[personIndex] };
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
    const persons = [...this.state.Person];
    persons.splice(index, 1);
    this.setState({ Person: persons });
  }

  render() {

    console.log('[App.js] render');

    let persons = null;

    if (this.state.togglePersonState) {
      persons = (
        <div>
          <Persons 
          persons={this.state.Person}
          changed={this.changeNameInput}
          deleted={this.deletePersonHandler} />
        </div>
      );
    }

    return (
      <div className={classes.App}>
        <button onClick={() => {
          this.setState({toggleCockpit:false});
        }}>remove Cockpit</button>
        {this.state.toggleCockpit ?<Cockpit 
        title={this.props.appTitle}
        person={this.state.Person}
        isPersonShowed={this.state.togglePersonState}
        toggled={this.togglePersonHandler} /> : null}
        {persons}
      </div>);
  }
}



export default App;
