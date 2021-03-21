import React from "react";

import "./Backdrop.css";

const backdrop = (props) => {
  const cssClass = ["Backdrop", props.open ? "BackdropOpen" : "BackdropClose"];
  return <div className={cssClass.join(" ")} onClick={props.closed}></div>;
};

export default backdrop;
