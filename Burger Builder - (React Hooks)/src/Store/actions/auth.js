import * as actionType from "./actionTypes";
export const authSuccess = (token, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authLogout = () => {
  return {
    type: actionType.AUTH_INITIATE_LOGOUT,
  };
};

// export const authLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("userId");
//   localStorage.removeItem("expirationDate");
//   return {
//     type: actionType.AUTH_LOGOUT,
//   };
// };

export const authSucceed = () => ({
  type: actionType.AUTH_LOGOUT,
});

export const setAuthRedirectPath = (path) => {
  return {
    type: actionType.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return {
    type: actionType.CHECK_AUTH_TIMEOUT,
    expirationTime: expirationTime,
  };
};

// const checkAuthTimeout = (expirationTime) => {
//   return (dispatch) => {
//     setTimeout(() => {
//       dispatch(authLogout());
//     }, expirationTime * 1000);
//   };
// };

export const auth = (email, password, isSighup) => {
  return {
    type: actionType.AUTH,
    email: email,
    password: password,
    isSighup: isSighup,
  };
};

// export const auth = (email, password, isSighup) => {
//   return (dispatch) => {
//     dispatch(startProcess(reducerType.auth));
//     const authData = {
//       email: email,
//       password: password,
//       returnSecureToken: true,
//     };
//     let url =
//       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMNqPl8HOMWnE7grlWoIaV6MlhpbN_xq0";
//     if (!isSighup) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMNqPl8HOMWnE7grlWoIaV6MlhpbN_xq0";
//     }
//     axios
//       .post(url, authData)
//       .then((response) => {
//         const expirationDate = new Date(
//           new Date().getTime() + response.data.expiresIn * 1000
//         );
//         localStorage.setItem("token", response.data.idToken);
//         localStorage.setItem("userId", response.data.localId);
//         localStorage.setItem("expirationDate", expirationDate);
//         dispatch(successProcess(reducerType.auth));
//         dispatch(authSuccess(response.data.idToken, response.data.localId));
//         dispatch(checkAuthTimeout(response.data.expiresIn));
//       })
//       .catch((error) => {
//         dispatch(failProcess(reducerType.auth, error));
//       });
//   };
// };

export const authCheckState = () => {
  return {
    type: actionType.AUTH_CHECK_STATE,
  };
};

// export const authCheckState = () => {
//   return (dispatch) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       dispatch(authLogout());
//     } else {
//       const expirationDate = new Date(localStorage.getItem("expirationDate"));
//       if (expirationDate <= new Date()) {
//         dispatch(authLogout());
//       } else {
//         const userId = localStorage.getItem("userId");
//         dispatch(authSuccess(token, userId));
//         dispatch(
//           checkAuthTimeout(
//             (expirationDate.getTime() - new Date().getTime()) / 1000
//           )
//         );
//       }
//     }
//   };
// };
