import React from 'react';

const validationComponent = (props) => {
    return <div>
        <p>{(props.length > 5) ?  "Text long enough" : "Text too short"}</p>
    </div>;
}

export default validationComponent;