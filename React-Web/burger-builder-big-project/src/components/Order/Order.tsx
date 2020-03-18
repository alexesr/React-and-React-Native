import React from 'react';

import classes from './Order.module.css';
import ingredients from '../../interfaces/ingredients.interface';

interface IProps{
    ingredients: ingredients;
    price: number;
}

interface ingredient{
    name: string;
    amount: number;
}

const Order = (props: IProps) =>{
    const ingredients: ingredient[] = []; 
    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName as keyof ingredients]
        });
    }

    const ingredientOutput = ingredients.map(ig=>{
        return <span
                    style={{
                        textTransform: 'capitalize',
                        display:'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }} 
                    key={ig.name}>
                    {ig.name} ({ig.amount})
                </span>
    });

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    );
}
export default Order;