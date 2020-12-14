import React, { setState, Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    username:'userName'
  };
  changeUserName = (event) => {
    this.setState({username:event.target.value});
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
