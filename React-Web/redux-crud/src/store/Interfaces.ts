import { actions } from './actions'; 

export interface ICounterState{
    counter: number;
}

export interface IResultState{
    results: IResult[];
}

export interface IGlobalState{
    ctr: ICounterState,
    res: IResultState
}

export interface IResult{
    id: Date;
    value: number;
}

export interface IAction{
    type: actions;
    value?: number;
    resultElId?: Date;
    result?: number;
}