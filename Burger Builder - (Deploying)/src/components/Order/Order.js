import React from "react";
import Ingredients from "./Ingredients/Ingredients";
import trashSVG from "../../assets/images/trash.svg";
import classes from "./Order.css";
const order = (props) => (
  <div className={classes.Order}>
    <div className={classes.Delete} onClick={() => props.delete(props.id)}>
      <img src={trashSVG} alt="trash" />
    </div>
    <div>name:</div>
    <div className={classes.Value}>{props.customer.name}</div>
    <div>email:</div>
    <div className={classes.Value}>{props.customer.email}</div>
    <div>Ingredients:</div>
    <div className={classes.Value}>
      <Ingredients ingredients={props.ingredient} />
    </div>
    <div>Price:</div>
    <div className={classes.Value}>
      <strong>{props.price.toFixed(2)} USD</strong>
    </div>
  </div>
);

export default order;
