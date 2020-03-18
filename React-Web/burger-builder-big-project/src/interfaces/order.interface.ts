import ingredients from './ingredients.interface';
import { singleElement, element, selectorElement, emptySingleElement, emptySelectorElement } from './input.interface';

export interface orderForm {
    name: singleElement | element;
    street: singleElement | element;
    zipCode: singleElement | element;
    country: singleElement | element;
    email: singleElement | element;
    deliveryMethod: selectorElement | element;
}

export default interface order{
    ingredients: ingredients;
    price: number;
    orderData: {[key: string]: string};
    id: string;
}

export const emptyOrder:order[] = [];
export const emptyOrderForm:orderForm={
    name:emptySingleElement,
    street:emptySingleElement,
    zipCode:emptySingleElement,
    country:emptySingleElement,
    email:emptySingleElement,
    deliveryMethod:emptySelectorElement
};