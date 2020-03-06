import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import ingredient from '../../../interfaces/ingredient.interface';

interface IControls{
    label: string;
    type: keyof ingredient;
}

const controls: IControls[] = [
    { label: 'Salad' , type: 'salad'},
    { label: 'Bacon' , type: 'bacon'},
    { label: 'Cheese' , type: 'cheese'},
    { label: 'Meat' , type: 'meat'},
];

interface IProps{
    ingredientAdded: (type: keyof ingredient) => void;
    ingredientRemoved: (type: keyof ingredient) => void;
    isDisabled: Map<keyof ingredient,boolean>;
    price: number;
    purchasable: boolean;
    ordered: () => void;
}

const BuildControls = (props: IProps) =>{
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=>
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={() =>props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.isDisabled.get(ctrl.type) as boolean}
                />
            )}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >
                ORDER NOW
            </button>
        </div>
    );
}

export default BuildControls;