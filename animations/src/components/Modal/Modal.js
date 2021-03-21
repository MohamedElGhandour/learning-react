import React from "react";
// import Transition from "react-transition-group/Transition";
import CssTransition from "react-transition-group/CSSTransition";
import "./Modal.css";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const modal = (props) => {
  return (
    <CssTransition
      in={props.open}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
      //   classNames="cssTransition"
      classNames={{
        enter: "",
        enterActive: "ModalOpen",
        exitActive: "ModalClose",
        exit: "",
      }}
    >
      <div className="Modal">
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>
          Dismiss
        </button>
      </div>
    </CssTransition>
  );
};

{
  /* <Transition
  in={props.open}
  timeout={animationTiming}
  mountOnEnter
  unmountOnExit
  >
  {(state) => {
    const cssClass = [
      "Modal",
      state === "entering"
        ? "ModalOpen"
        : state === "exiting"
        ? "ModalClose"
        : null,
    ];
    return (
      <div className={cssClass.join(" ")}>
        <h1>A Modal</h1>
        <button className="Button" onClick={props.closed}>
          Dismiss
        </button>
      </div>
    );
  }}
  </Transition> */
}

export default modal;
