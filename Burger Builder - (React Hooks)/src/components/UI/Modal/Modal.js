import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import BackDrop from "../BackDrop/BackDrop";
import classes from "./Modal.css";

const modal = (props) => {
  return (
    <Aux>
      <BackDrop clicked={props.modalClosed} show={props.show} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? 1 : 0,
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);

// class Modal extends Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     return (
//       nextProps.show !== this.props.show ||
//       nextProps.children !== this.props.children
//     );
//   }
//   render() {
//     return (
//       <Aux>
//         <BackDrop clicked={this.props.modalClosed} show={this.props.show} />
//         <div
//           className={classes.Modal}
//           style={{
//             transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
//             opacity: this.props.show ? 1 : 0,
//           }}
//         >
//           {this.props.children}
//         </div>
//       </Aux>
//     );
//   }
// }

// export default Modal;
