import { actions } from  '../actions';
import { IResultState, IAction } from '../Interfaces'; 



const initialState: IResultState = {
    results: []
}

const reducer = (state:IResultState = initialState,action: IAction) =>{
    console.log('action: ', action);
    if(action.type === actions.STORE_RESULT && action.result){
        return {
            ...state,
            results: state.results.concat({id: new Date(),value: action.result})
        }
    }else if(action.type === actions.DELETE_RESULT && action.resultElId){
        const updatedArray = state.results.filter(result=>result.id !==action.resultElId);
        return {
            ...state,
            results: updatedArray
        }
    }
    return state;
}

export default reducer;