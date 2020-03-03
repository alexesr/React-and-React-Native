import React from 'react';

interface outputType{
    value: string;
}

const output = (props: outputType) => 
    <p>{props.value}</p>

export default output;