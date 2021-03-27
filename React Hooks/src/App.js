import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";
import { AuthContext } from "./context/auth-context";

const App = (props) => {
  const myContext = useContext(AuthContext);
  return myContext.isAuth ? <Ingredients /> : <Auth />;
  // <AuthContext.Consumer>
  //   {(value) => (value.isAuth ? <Ingredients /> : <Auth />)}
  // </AuthContext.Consumer>
};
export default App;
