import React, { /*Component*/ PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {

  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps', props);
  //   return state;
  // }

  // componentWillReceiveProps(props) {
  //   console.log('[Persons.js] componentWillReceiveProps', props);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Persons.js] shouldComponentUpdate');
  //   if(nextProps.persons !== this.props.persons ||
  //      nextProps.changed !== this.props.changed || 
  //      nextProps.deleted !== this.props.deleted) {
  //     console.log('[Persons.js] shouldComponentUpdate it\'s Work');
  //     return true;
  //   } else {
  //     console.log('[Persons.js] shouldComponentUpdate it\'s not Work');
  //     return false;
  //   }
  //   //return true;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return {message: 'snapshot!'};
  }

  // componentWillUpdate() {
  //   console.log('[Persons.js] componentWillUpdate');
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }

  render() {
    console.log('[Persons.js] rendering');
    return this.props.persons.map((persons, index) => {
      return <Person 
      key={persons.id} 
      change={(event) => this.props.changed(event, persons.id)} 
      name={persons.name} 
      click={() => this.props.deleted(index)} 
      age={persons.age} />
    })
  };
  
};

export default Persons;