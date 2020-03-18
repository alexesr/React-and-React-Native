import React , { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ingredients , { emptyIngredients } from '../../interfaces/ingredients.interface';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';
import ContactData from './ContactData/ContactData';


interface IProps extends RouteComponentProps{

}
interface IState {
    ingredients: ingredients
    totalPrice: number;
}

class Checkout extends Component<IProps,IState>{
    state = {
        ingredients: {...emptyIngredients},
        totalPrice: 0
    }

    pageEndRef = React.createRef<HTMLSpanElement>();

    componentDidMount(){
        const params = {...queryString.parseUrl(this.props.location.search).query as Object} ;
        let ingredients: ingredients = {...emptyIngredients};
        let totalPrice = 0 ;
        Object.keys(params).forEach(key=>{
            let number = +params[key as keyof Object];
            if(key==='price'){
                totalPrice = number;
            }else{
                ingredients[key as keyof ingredients]=number;
            }
                
        });
        console.log('Checkout componentDidMount: ',ingredients,totalPrice);
        this.setState({
            ingredients,
            totalPrice
        });
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    componentDidUpdate(){
        if(this.props.history.location.pathname==='/checkout/contact-data'){
            this.pageEndRef.current?.scrollIntoView({behavior:'smooth'});
        }
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
                <Route path={this.props.match.path+'/contact-data'} render={ (props: IProps)=><span ref={this.pageEndRef}><ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/></span> }/>
            </div>
        );
    }
}

export default Checkout;