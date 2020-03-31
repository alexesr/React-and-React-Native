import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import { IAction } from '../../store/Interfaces';
import { IGlobalState , IResult } from '../../store/Interfaces';
import { actions } from '../../store/actions';

interface StateProps{
    ctr: number;
    storedResults: IResult[];
}
interface DispatchProps{
    onIncrementCounter: () => void;
    onDecrementCounter: () => void;
    onAddCounter: () => void;
    onSubscractCounter: () => void;
    onStoreResult: (result: number) => void;
    onDeleteResult: (id: Date) => void;
}

class Counter extends Component<StateProps&DispatchProps> {

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubscractCounter}  />
                <hr/>{/* horizontal line */}
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store </button>
                <ul>
                    {this.props.storedResults.map(strResult=>
                        <li key={strResult.id.toISOString()} onClick={this.props.onDeleteResult.bind(this,strResult.id)}>
                            {strResult.value}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state: IGlobalState): StateProps =>{// state given by redux
    if(state.ctr.counter && state.res.results){
        return {
            ctr: state.ctr.counter,// transform state.counter to get in as prop
            storedResults: state.res.results
        };
    }
    return {
        ctr: 0,
        storedResults: []
    }
}

const mapDispatchToProps = (dispatch: (action: IAction)=>void): DispatchProps =>{
    return {
        onIncrementCounter: ()=> dispatch({type: actions.INCREMENT}),
        onDecrementCounter: ()=> dispatch({type: actions.DECREMENT}),
        onAddCounter: () => dispatch({type: actions.ADD,value: 5}),
        onSubscractCounter: () => dispatch({type: actions.SUSBSTRACT, value: 5}),
        onStoreResult: (result: number) => dispatch({type: actions.STORE_RESULT,result}),
        onDeleteResult: (id: Date) => dispatch({type: actions.DELETE_RESULT,resultElId:id})
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter); // returns a higher order component