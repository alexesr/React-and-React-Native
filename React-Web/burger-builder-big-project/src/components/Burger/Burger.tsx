import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import ingredients from '../../interfaces/ingredients.interface';

interface IProps{
    ingredients: ingredients;
}

const Burger = (props: IProps) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey as keyof ingredients])].map((_,i)=>{
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
        }) //.reduce to flatten the array
        .reduce((arr,el)=>{
            return arr.concat(el)
        },[]);// the argument ,[] indicates the initial array
    let displayedIngredients;
    if(transformedIngredients.length===0){
        displayedIngredients = <p>Please start adding ingredients</p>;
    }else{
        displayedIngredients = transformedIngredients;
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {displayedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;