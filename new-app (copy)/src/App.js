import React, { setState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

  state = {
    text:'',
  }

  changeInputHandler = () => {
    // this.setState({text:event.target.value,});
    document.getElementById('para').innerHTML = parseInt(document.getElementById('para').innerHTML) + 1;

  }

  clickDeleteHandler = (index) => {
    // const text = this.state.text;
    // const part1 = text.substring(0, index);
    // const part2 = text.substring(index + 1, text.length);
    // const newText = (part1 + part2);
    // this.setState({text:newText});
    const text = this.state.text.split('');
    text.splice(index, 1);
    const newText = text.join('');
    this.setState({text:newText});
  }


  render() {
    // const char = this.state.text.split('');
    // const cards = char.map((el, index) => {
    //   return <CharComponent key={index} onClick={() => this.clickDeleteHandler(index)} char={el} />
    // });
    
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
        <div>
          <input type='text' onChange={this.changeInputHandler} />
          <p id='para'>1</p>
          {/* <ValidationComponent length={this.state.text.length} />
          {cards} */}
        </div>
      </div>
    );
  }
}

export default App;
