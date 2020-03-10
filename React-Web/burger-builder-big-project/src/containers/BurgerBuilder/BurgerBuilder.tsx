import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import ingredient from '../../interfaces/ingredient.interface';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

interface IProps{
}
interface IState{
    ingredients: ingredient;
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

interface order{
    ingredients: ingredient;
    price: number;
    customer: {
        name: string;
        address : {
            street: string;
            zipCode: string;
            country: string;
        }
        email: string;
    }
    deliveryMethod: string;
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

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(response=>{
                console.log(response);
                this.setState({ingredients: response.data});
            })
            .catch(error=>{
                console.log(error);
                this.setState({error:true});
            });
    }

    purchaseContinueHandler = () =>{
        this.setState({loading:true});
        const order: order ={
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, //recalculate in server
            customer: {
                name: 'Miguel Muñoz',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '34313',
                    country: 'Mexico'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json',order)
            .then(response =>{
                this.setState({loading:false,purchasing: false});
            },)
            .catch(error=>{
                this.setState({loading:false,purchasing: false});
            }); //.firebase endpoint
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