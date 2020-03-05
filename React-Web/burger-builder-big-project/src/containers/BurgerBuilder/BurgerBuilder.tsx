import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import ingredient from '../../interfaces/ingredient.interface';

interface IProps{

}
interface IState{
    ingredients: ingredient
    totalPrice: number
}

const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export default class BurgerBuilder extends Component<IProps,IState>{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    };

    addIngredientHanlder = (type: keyof ingredient): void =>{
        const oldCount = this.state.ingredients[type];
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = oldCount + 1 ; 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }
    removeIngredientHandler = (type: keyof ingredient): void =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount < 1){
            return;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = oldCount - 1 ; 
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    render(){
        let isDisabled = new Map<keyof ingredient,boolean>();
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            let asKey = key as keyof ingredient;
            isDisabled.set(asKey,disabledInfo[asKey] <= 0);
        }
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHanlder}
                    ingredientRemoved={this.removeIngredientHandler}
                    isDisabled = {isDisabled}
                    price={this.state.totalPrice}/>
            </Fragment>
        );
    }
}