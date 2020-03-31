import React from 'react';

import './CounterControl.css';

interface IProps{
    label: string;
    clicked: () => void;
}

const counterControl = (props: IProps) => (
    <div className="CounterControl" onClick={props.clicked}>
        {props.label}
    </div>
);

export default counterControl;