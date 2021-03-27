import React from "react";
import classes from "./Ingredients.css";
const ingredients = (props) => {
  console.log(props.ingredients);
  return Object.keys(props.ingredients).map((ingredient, index) => (
    <span className={classes.Ingredients} key={index}>
      {ingredient} ({props.ingredients[ingredient]})
    </span>
  ));
};

export default ingredients;
