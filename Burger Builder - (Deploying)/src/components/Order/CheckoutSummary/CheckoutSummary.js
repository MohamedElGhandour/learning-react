import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";
import { withRouter } from "react-router-dom";

const checkoutsSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We Hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredient={props.ingredient} />
      </div>
      <Button btnTybe="Danger" clicked={props.canceled}>
        CANCEL
      </Button>
      <Button btnTybe="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default withRouter(checkoutsSummary);
