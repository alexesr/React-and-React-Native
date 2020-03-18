import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import ingredients from '../../interfaces/ingredients.interface';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps{
}
interface IState{
    ingredients: ingredients;
    totalPrice: number;
    purchasable: boolean;
    purchasing: boolean;
    loading: boolean;
    error: boolean;
}

const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component<IProps,IState>{
    state = {
        ingredients: {
            salad: -1,
            bacon: -1,
            cheese: -1,
            meat: -1
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    updatePurchaseState(ingredients: ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey as keyof ingredients];
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
        this.setState({purchasable: sum > 0});
    }
    addIngredientHanlder = (type: keyof ingredients): void =>{
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
    removeIngredientHandler = (type: keyof ingredients): void =>{
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

    componentDidMount(){
        console.log(this.props);
        axios.get('/ingredients.json')
            .then(response=>{
                console.log(response);
                this.setState({ingredients: response.data});
                this.updatePurchaseState(response.data);
            })
            .catch(error=>{
                console.log(error);
                this.setState({error:true});
            });
    }

    purchaseContinueHandler = () =>{
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i as keyof ingredients]));
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }   

    render(){
        let isDisabled = new Map<keyof ingredients,boolean>();
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            let asKey = key as keyof ingredients;
            isDisabled.set(asKey,disabledInfo[asKey] <= 0);
        }
        let orderSummary=null;
        let burger = this.state.error ? <p>Ingredients can't be loadead</p> : <Spinner/>;
        if(this.state.ingredients.bacon>-1){
            burger =<Fragment>
                        <Burger ingredients={this.state.ingredients}/>
                            <BuildControls 
                                ingredientAdded={this.addIngredientHanlder}
                                ingredientRemoved={this.removeIngredientHandler}
                                isDisabled = {isDisabled}
                                purchasable={this.state.purchasable}
                                ordered={this.purchaseHandler}
                                price={this.state.totalPrice}
                            />
                    </Fragment>;
            orderSummary = 
                <OrderSummary 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
        }
        if(this.state.loading){
            orderSummary=<Spinner/>
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Fragment>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);