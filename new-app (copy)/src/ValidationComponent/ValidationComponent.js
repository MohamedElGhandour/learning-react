import React from 'react';

const ValidationComponent = (props) => {
    return <div>
        <p>
            { props.length <= 5 ?
            <span>"Text too short"</span>
        :   <span>"Text long enough"</span>}
        </p>
    </div>
}

export default ValidationComponent;