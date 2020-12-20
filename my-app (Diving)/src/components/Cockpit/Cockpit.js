import React, { useContext, useEffect, useRef } from 'react';
import Auth from '../../context/auth-Context';
import classes from './Cockpit.css';

const Cockpit = (props) => {
  const toggleBtn = useRef(null);

  const auth = useContext(Auth);

  console.log(auth.login);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    setTimeout(() => {
      toggleBtn.current.click();
    }, 1000);
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  }, []);

  // useEffect(() => {
  //   console.log('[Cockpit.js] 2 useEffect');
  //   return () => {
  //     console.log('[Cockpit.js] 2 cleanup work in useEffect');
  //   }
  // });

  let clsBtn = null;
  let assignedClasses = [];

  if (props.isPersonShowed) {
    clsBtn = classes.green;
  }

  if (props.personLength <= 1) {
    assignedClasses.push(classes.red, classes.bold);
  } else if (props.personLength <= 2) {
    assignedClasses.push(classes.red);
  }

  return <div className={classes.Cockpit}>
    <h1>{props.title}</h1>
    <p className={assignedClasses.join(' ')}>React JS</p>
    <button className={clsBtn} ref={toggleBtn} onClick={props.toggled}>toggle list</button>
  {/* <Auth.Consumer> */}
  {<button onClick={auth.login}>login</button>}
  {/* </Auth.Consumer> */}
  </div>
}

export default React.memo(Cockpit);