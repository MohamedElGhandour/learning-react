import React, { Component } from "react";
import Transition from "react-transition-group/Transition";
import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modelisOpened: false,
    showBox: false,
  };
  clodeModel = () => {
    this.setState({ modelisOpened: false });
  };
  openModel = () => {
    this.setState({ modelisOpened: true });
  };
  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          onClick={() =>
            this.setState((prevState) => ({
              showBox: !prevState.showBox,
            }))
          }
          style={{ display: "block", margin: "10px auto" }}
        >
          Toggel
        </button>
        <Transition
          in={this.state.showBox}
          timeout={300}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log("onEnter")}
          onEntering={() => console.log("onEntering")}
          onEntered={() => console.log("onEntered")}
          onExit={() => console.log("onExit")}
          onExiting={() => console.log("onExiting")}
          onExited={() => console.log("onExited")}
        >
          {(state) => (
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "red",
                opacity: state === "exiting" ? 0 : 1,
                transition: "opacity .3s ease-out",
                margin: "10px auto",
              }}
            ></div>
          )}
        </Transition>
        <Modal closed={this.clodeModel} open={this.state.modelisOpened} />

        <Backdrop closed={this.clodeModel} open={this.state.modelisOpened} />
        <button className="Button" onClick={this.openModel}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
