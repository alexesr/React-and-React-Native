import React , { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ingredients , { emptyIngredients } from '../../interfaces/ingredients.interface';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';


interface IProps extends RouteComponentProps{

}
interface IState {
    ingredients: ingredients
}

class Checkout extends Component<IProps,IState>{
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount(){
        const ingredients: ingredients = {...queryString.parseUrl(this.props.location.search).query as Object as ingredients} ;
        Object.keys(ingredients).forEach(igKey=>{
            let key = igKey as keyof ingredients;
            ingredients[key]=+ingredients[key];
        });
        this.setState({
            ingredients
        });
        /*for (let ) {
            ingredients[param[0] as keyof ingredients]=param[1];
        }*/
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
            </div>
        );
    }
}

export default Checkout;