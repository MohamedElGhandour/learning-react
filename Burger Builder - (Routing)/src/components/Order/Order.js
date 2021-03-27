import React from "react";
import Ingredients from "./Ingredients/Ingredients";
import classes from "./Order.css";
const order = (props) => (
  <div className={classes.Order}>
    <div>name:</div>
    <div>{props.customer.name}</div>
    <div>email:</div>
    <div>{props.customer.email}</div>
    <div>Ingredients:</div>
    <div>
      <Ingredients ingredients={props.ingredient} />
    </div>
    <div>Price:</div>
    <div>
      <strong>{props.price} USD</strong>
    </div>
  </div>
);

export default order;
