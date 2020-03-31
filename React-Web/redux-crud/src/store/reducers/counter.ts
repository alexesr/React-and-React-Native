import { actions } from  '../actions';

import { ICounterState } from '../Interfaces'; 

export interface IAction{
    type: actions;
    value?: number;
    resultElId?: Date;
}

const initialState: ICounterState = {
    counter: 0
}

const reducer = (state:ICounterState = initialState,action: IAction) =>{
    console.log('action: ', action);
    if(action.type === actions.INCREMENT){
        return {
            ...state,
            counter: state.counter + 1
        }
    }else if(action.type === actions.DECREMENT){
        return {
            ...state,
            counter: state.counter - 1 
        }
    }else if(action.value){
        if(action.type === actions.ADD){
            return {
                ...state,
                counter: state.counter + action.value
            }
        }else if(action.type === actions.SUSBSTRACT){
            return {
                ...state,
                counter: state.counter - action.value
            }
        } 
    }
    return state;
}

export default reducer;