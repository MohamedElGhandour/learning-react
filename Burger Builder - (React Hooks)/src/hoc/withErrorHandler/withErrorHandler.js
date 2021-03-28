import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedCompenet, axios) => {
  return (props) => {
    const [errorHandler, errorConfirmedHandler] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={errorHandler} modalClosed={errorConfirmedHandler}>
          {errorHandler ? errorHandler.message : null}
        </Modal>
        <WrappedCompenet {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;

// const withErrorHandler = (WrappedCompenet, axios) => {
//   return class extends Component {
//     state = {
//       error: null,
//     };

//     componentWillMount() {
//       this.reqInterceptors = axios.interceptors.request.use((request) => {
//         this.setState({ error: null });
//         return request;
//       });

//       this.resInterceptors = axios.interceptors.response.use(
//         (respone) => respone,
//         (error) => {
//           this.setState({ error: error });
//         }
//       );
//     }

//     componentWillUnmount() {
//       axios.interceptors.request.eject(this.reqInterceptors);
//       axios.interceptors.request.eject(this.resInterceptors);
//     }

//     errorConfirmedHandler = () => {
//       this.setState({ error: null });
//     };

//     render() {
//       return (
//         <Aux>
//           <Modal
//             show={this.state.error}
//             modalClosed={this.errorConfirmedHandler}
//           >
//             {this.state.error ? this.state.error.message : null}
//           </Modal>
//           <WrappedCompenet {...this.props} />
//         </Aux>
//       );
//     }
//   };
// };

// export default withErrorHandler;
