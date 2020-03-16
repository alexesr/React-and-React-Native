import React , { FormEventHandler} from 'react';

import classes from './SearchBar.module.css';
import Input from '../Input/Input';

interface IProps {
    style: Object;
    value: string;
    onChange: FormEventHandler<HTMLElement>;
    onSearch: () => void;
}


const SearchBar = (props: IProps) => {
    let searchButton: HTMLElement | null;
    const onEnterUpHandler = (event: KeyboardEvent) =>{
        if(event.key==='Enter'){
            (searchButton as HTMLElement).click();
        }
    }
    return (
        <div className={classes.Search} style={props.style}>
            <Input placeholder="Search" value={props.value} onChange={props.onChange} onKeyUp={(event: KeyboardEvent)=>{onEnterUpHandler(event)}}/>
            <i ref={i => searchButton=i } className="fa fa-search" onClick={props.onSearch}></i>
        </div>
    );
}

export default SearchBar;