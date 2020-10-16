import React, { Component, useState } from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import './App.css';
import classes from './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  }
  state = {
    Person: [
      { id: 'aswfdwef1', name: 'Mohamed', age: 20 },
      { id: 'aswfdwef2', name: 'ahmed', age: 27 },
      { id: 'aswfdwef3', name: 'yahya', age: 60 },
    ],
    chagneNameState:this.changeNameInput,
    togglePersonState: false, 
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFrpmProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }


  useSetState = (obj) => {
    this.setState(obj);
  }

  render() {

    console.log('[App.js] render');
    let persons = null;

    if (this.state.togglePersonState) {
      persons = <Persons useSetStatePerson={this.useSetState} state = {this.state} />;
    }

    return (
      <div className={classes.App}>
        <Cockpit titleHeader={this.props.titleHeader} state={this.state} useSetStateCockpit={this.useSetState} />
        {persons}
      </div>);
  }
}



export default App;