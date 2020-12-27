import React from 'react';

const UserInput = (props) => {
    const intputStyle = {
        border: '2px solid #333',
        width:'60%',
        margin:'20px auto',
        padding:'5px',
        display:'block'

    }
    return <div>
        <input style={intputStyle} onChange={props.changed} value={props.value}/>
    </div>
}

export default UserInput;