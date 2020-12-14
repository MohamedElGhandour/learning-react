import React from 'react';
import './UserOutPut.css';

const UserOutput = (props) => {
    const outputStyle = {
        border:'1px soild black',

    }
    return <div className='UserOutPut' style={outputStyle}>
        <p>username :{props.name}</p>
        <p>Lorem ipsum dolor sit amet, consectetaur adipisicing elit,</p>
    </div>
}

export default UserOutput;