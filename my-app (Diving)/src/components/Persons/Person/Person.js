import React, { Component } from 'react';
import classes from './person.css';
import PropTypes from 'prop-types';
import withNewClass from '../../../hoc/withNewClass';
import Aux from '../../../hoc/Aux';
import WithClass from '../../../hoc/WithClass';
import Auth from '../../../context/auth-Context';


class Person extends Component {
    
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    static contextType = Auth;

    componentDidMount() {
        //document.querySelectorAll('input')[document.querySelectorAll('input').length - 1].focus();
        // this.input.focus();
        this.inputRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering...');/*<div className={classes.person}>*/
        return <Aux> 
            {/* <Auth.Consumer> */}
            {(this.context.authenticated) ? 'Authenticated!' : 'plz log in'}
            {/* </Auth.Consumer> */}
        <p key="i1" onClick={this.props.click}> Hi, I'm {this.props.name} i am {this.props.age} years old 
        <br /> 
        {this.props.children}</p>
        <input key="i2" 
        // ref={(input) => {this.input = input}}
        ref={this.inputRef}
        onChange={this.props.change} value={this.props.name} />
        </Aux> /*</div>*/
    };
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func
};

export default withNewClass(Person, classes.person); 