import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
  state = {
    length:0,
    value:''
  };
  changeInput = (event) => {
    this.setState({length:event.target.value.length,value:event.target.value});

  }
  removeChar = (index) => {
    const aftDel = this.state.value.split('');
    aftDel.splice(index, 1);
    const befDel = aftDel.join('');
    this.setState({length:befDel.length,value:befDel});
  }
  render() {
     const charComp = (<div>
        {this.state.value.split('').map((letter, index) => {
          return <CharComponent key={index} click={() => this.removeChar(index)} char={letter} />
        })}
      </div>);
    return (
      <div className="App">
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=&gt; ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=&gt; CharComponent) and style it as an inline box (=&gt; display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
        <input type="text" 
        onChange={this.changeInput}
        value={this.state.value} />
        <p>the length: <span>{this.state.length}</span></p>
        <p>{this.state.value}</p>
        <ValidationComponent length={this.state.length} />
        {charComp}
      </div>
    );
  }
}

export default App;
