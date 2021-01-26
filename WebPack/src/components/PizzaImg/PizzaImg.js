import React from "react";
import classes from "./PizzaImg.css";
import img from "../../assets/pizza.jpg";

const pizzaImg = () => {
  return (
    <div className={classes.PizzaImg}>
      <img alt="PIZZA" src={img} className={classes.Img} />
    </div>
  );
};

export default pizzaImg;
