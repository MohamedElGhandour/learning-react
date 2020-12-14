import React, { Component } from 'react';
import classes from './person.css';


class Person extends Component {


    render() {
        console.log('[Person.js] rendering...');
        return <div className={classes.person}>
        <p onClick={this.props.click}>
        Hi, I'm 
        {this.props.name}
        , i am 
        {this.props.age} 
        years old 
        <br /> 
        {this.props.children}</p>
        <input onChange={this.props.change} value={this.props.name} />
    </div>
    };
};

export default Person; 