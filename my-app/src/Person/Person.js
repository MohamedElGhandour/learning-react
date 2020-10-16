import React from 'react';
import './person.css';
import classes from './person.css';
console.log(classes);

const person = (props) => {
    // const rnd = Math.random();
    // console.log(rnd);
    // if (rnd > .7) {
    //     throw new Error('Somthing went wrong');
    // }
    return <div className={classes.person}>
        <p onClick={props.click}>Hi, I'm {props.name}, i am {props.age} years old <br /> {props.children}</p>
        <input onChange={props.change} value={props.name} />
    </div>
};

export default person; 