import React from 'react';

//one way of creating HOC
/*const withClass = props =>
    <div className={props.classes}>
        {props.children}
    </div>
*/

//another way of creating HOC

const withClass = (WrappedComponent,className) =>{
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
};

export default withClass;