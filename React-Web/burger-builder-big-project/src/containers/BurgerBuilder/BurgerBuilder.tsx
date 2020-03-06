import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import ingredient from '../../interfaces/ingredient.interface';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

interface IProps{

}
interface IState{
    ingredients: ingredient
    totalPrice: number,
    purchasable: boolean,
    purchasing: boolean
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
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState(ingredients: ingredient){
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey as keyof ingredient];
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});
    }
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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = (): void =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () =>{
        alert('You continue!');
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
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHanlder}
                    ingredientRemoved={this.removeIngredientHandler}
                    isDisabled = {isDisabled}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Fragment>
        );
    }
}