import React, { useCallback } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as reducerType from "../../Store/reducers/reducerTypes";
import Aux from "../../hoc/Aux/Aux";

const ceckout = (props) => {
  const checkoutSummaryCanceled = useCallback(() => {
    props.history.goBack();
  }, [props]);
  const checkoutSummaryContinued = useCallback(() => {
    props.history.push(`${props.match.path}/contact-data`);
  }, [props]);

  let summary = <Redirect to="/" />;
  const purechasedRedirect = props.purechased ? <Redirect to="/" /> : null;
  if (props.ingredient) {
    summary = (
      <Aux>
        {purechasedRedirect}
        <CheckoutSummary
          canceled={checkoutSummaryCanceled}
          continued={checkoutSummaryContinued}
          ingredient={props.ingredient}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </Aux>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredient: state[reducerType.burgerBuilder].ingredient,
    purechased: state[reducerType.order].purechased,
  };
};
export default connect(mapStateToProps)(ceckout);

// class Ceckout extends Component {
//   checkoutSummaryCanceled = () => {
//     this.props.history.goBack();
//   };
//   checkoutSummaryContinued = () => {
//     this.props.history.push(`${this.props.match.path}/contact-data`);
//   };
//   render() {
//     let summary = <Redirect to="/" />;
//     const purechasedRedirect = this.props.purechased ? (
//       <Redirect to="/" />
//     ) : null;
//     if (this.props.ingredient) {
//       summary = (
//         <Aux>
//           {purechasedRedirect}
//           <CheckoutSummary
//             canceled={this.checkoutSummaryCanceled}
//             continued={this.checkoutSummaryContinued}
//             ingredient={this.props.ingredient}
//           />
//           <Route
//             path={`${this.props.match.path}/contact-data`}
//             component={ContactData}
//           />
//         </Aux>
//       );
//     }
//     return summary;
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     ingredient: state[reducerType.burgerBuilder].ingredient,
//     purechased: state[reducerType.order].purechased,
//   };
// };
// export default connect(mapStateToProps)(Ceckout);
