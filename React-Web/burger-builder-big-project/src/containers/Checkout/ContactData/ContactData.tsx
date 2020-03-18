import React , { Component, FormEvent, ChangeEvent, isValidElement } from 'react';
import { RouteComponentProps } from 'react-router';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import ingredients from '../../../interfaces/ingredients.interface';
import order from '../../../interfaces/order.interface';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import  { FormChangeEventType } from '../../../types/form.type';
import { element, validation } from '../../../interfaces/input.interface'; 
import { orderForm } from '../../../interfaces/order.interface';

interface IProps extends RouteComponentProps{
    ingredients: ingredients;
    price: number;
}


interface IState{
    orderForm: orderForm;
    loading: boolean;
    formIsValid: boolean;
}

class ContactData extends Component<IProps,IState>{
    state={
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                validation:{},
                value: '', // bug that if not changed it does not start with a value
                valid:true,
                touched:true
            }
        },
        loading: false,
        formIsValid: false
    }

    checkValidity(value: string,rules: validation | undefined){
        if(rules===undefined){
            return true;
        }
        let noValid = false;
        if(rules.required){
            noValid = noValid || value.trim() === '';
        }
        if(rules.minLength){
            noValid = noValid || value.length < rules.minLength;
        }
        if(rules.maxLength){
            noValid = noValid || value.length > rules.maxLength;
        }
        return !noValid;
    }
 
    orderHandler = (event: FormEvent) =>{
        event.preventDefault();
        this.setState({loading:true});
        const formData: {[key: string]: string} = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier as keyof orderForm].value;
        }
        const order: order ={
            ingredients: this.props.ingredients,
            price: this.props.price, //recalculate in server
            id:'',
            orderData: formData
        };
        axios.post('/orders.json',order)
            .then(response =>{
                this.setState({loading:false});
                this.props.history.push('/');
            },)
            .catch(error=>{
                this.setState({loading:false});
            });
    }
    inputChangedHandler = (event: FormChangeEventType,inputIdentifier: keyof orderForm) =>{
        const updatedOrderForm:orderForm = {
            ...this.state.orderForm
        } 
        const updatedFormElement: element = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);

        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[inputIdentifier as keyof orderForm].valid as boolean;
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        });
    }  

    render(){
        const formElementsArray: {id: string,config: Object}[] = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key as keyof Object]
            });
        }
        let form = 
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement=> 
                <Input 
                    key={formElement.id}
                    elementType={(formElement.config as element).elementType}
                    elementConfig={(formElement.config as element).elementConfig}
                    value={(formElement.config as element).value}
                    changed={(event:FormChangeEventType) => this.inputChangedHandler(event,formElement.id as keyof orderForm)}
                    invalid={!(formElement.config as element).valid}
                    shouldValidate={(formElement.config as element).validation as boolean}
                    touched={(formElement.config as element).touched as boolean}/>
            )}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
        if(this.state.loading){
            form=<Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;