import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    setTimeout(() => {
      alert('test');
    }, 1000);
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2 useEffect');
    return () => {
      console.log('[Cockpit.js] 2 cleanup work in useEffect');
    }
  });

  let clsBtn = null;
  let assignedClasses = [];

  if (props.isPersonShowed) {
    clsBtn = classes.green;
  }

  if (props.person.length <= 1) {
    assignedClasses.push(classes.red, classes.bold);
  } else if (props.person.length <= 2) {
    assignedClasses.push(classes.red);
  }

  return <div className={classes.Cockpit}>
    <h1>{props.title}</h1>
    <p className={assignedClasses.join(' ')}>React JS</p>
    <button className={clsBtn} onClick={props.toggled}>toggle list</button>
  </div>
}

export default Cockpit;