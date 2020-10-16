import React from "react";
import classes from "./Cockpit.css";

const Cockpit = (props) => {
  const togglePersonHandler = () => {
    const thePersonState = props.state.togglePersonState;
    props.useSetStateCockpit({ togglePersonState: !thePersonState });
  };
  let clsBtn = null;
  if (props.state.togglePersonState) clsBtn = classes.green;
  let assignedClasses = [];
  if (props.state.Person.length <= 1)
    assignedClasses.push(classes.red, classes.bold);
  else if (props.state.Person.length <= 2) assignedClasses.push(classes.red);

  return (
    <div className={classes.Cockpit}>
      <h1>{props.titleHeader}</h1>
      <p className={assignedClasses.join(" ")}>React JS</p>
      <button className={clsBtn} onClick={togglePersonHandler}>
        toggle list
      </button>
    </div>
  );
};

export default Cockpit;
