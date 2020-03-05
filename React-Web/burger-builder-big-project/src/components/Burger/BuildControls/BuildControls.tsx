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
}

const BuildControls = (props: IProps) =>{
    return(
        <div className={classes.BuildControls}>
            {controls.map(ctrl=>
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    added={() =>props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.isDisabled.get(ctrl.type) as boolean}
                />
            )}
        </div>
    );
}

export default BuildControls;