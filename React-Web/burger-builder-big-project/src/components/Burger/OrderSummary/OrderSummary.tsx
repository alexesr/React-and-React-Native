import React , { Fragment } from 'react';

import ingredients from '../../../interfaces/ingredients.interface';
import Button from '../../UI/Button/Button';

interface IProps{
    ingredients: ingredients;
    purchaseCancelled: () => void;
    purchaseContinued: () => void;
    price: number;
}

const OrderSummary = (props: IProps) =>{
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey=>{
        return( 
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}
                    </span>: {props.ingredients[igKey as keyof ingredients]}
                </li>
            );
        })
    );
    return (
        <Fragment>
            <h3>Your order</h3>
            <p>A delicous burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
}

export default OrderSummary;