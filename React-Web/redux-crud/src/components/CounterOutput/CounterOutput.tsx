import React from 'react';

import './CounterOutput.css';

interface IProps{
    value: number;
}

const counterOutput = (props: IProps) => (
    <div className="CounterOutput">
        Current Counter: {props.value}
    </div>
);

export default counterOutput;