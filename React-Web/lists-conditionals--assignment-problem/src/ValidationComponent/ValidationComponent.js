import React from 'react';

const ValidationComponent = (props) =>{
    let textMessage = 'Text too short';
    if(props.textLenght >4){
        textMessage = 'Text long enough';
    }
    return(
        <p>{textMessage}</p>
    );
}

export default ValidationComponent;