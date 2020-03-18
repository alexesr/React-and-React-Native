export interface element{
    elementType: string;
    elementConfig: Object;
    value: string;
    validation: validation;
    valid: boolean;
    touched: boolean;
}

export interface singleElement extends element{
    elementConfig: {
        type: string;
        placeholder: string;
    }
}

export interface elementConfigSelector{
    options: {
        value: string;
        displayValue: string;
    }[];
}

export interface selectorElement extends element{
    elementConfig: elementConfigSelector;
}

export interface validation {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

export const emptySingleElement: singleElement={
    elementType:'',
    elementConfig:{
        type: '',
        placeholder:''
    },
    value:'',
    validation:{
        required:false,
        minLength: -Infinity,
        maxLength: Infinity
    },
    valid: true,
    touched:false
}

export const emptySelectorElement: selectorElement={
    elementType:'',
    elementConfig:{
        options:[]
    },
    value:'',
    validation:{
        required:false,
        minLength: -Infinity,
        maxLength: Infinity
    },
    valid: true,
    touched: true
}