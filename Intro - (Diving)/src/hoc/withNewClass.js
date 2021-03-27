import React from 'react';

const withNewClass = (WrappedComponent, className) => {
    console.log(className, ' [ withNewClass ]');
    return props => (
        <div className={className}>
            <WrappedComponent {...props} />
        </div>
    );
}

export default withNewClass;