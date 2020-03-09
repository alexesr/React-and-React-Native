import React , { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/Toolbar/NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

interface IProps{
    closed: () => void;
    open: boolean;
}

const sideDrawer = (props: IProps) =>{
    let openOrCloseClass = classes.Close;
    if(props.open){
        openOrCloseClass = classes.Open;
    }
    return(
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={[classes.SideDrawer,openOrCloseClass].join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Fragment>
    );
}

export default sideDrawer;