import React , {Fragment, ReactNode , Component } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

interface IProps{
    children: ReactNode
}
interface IState{
    showSideDrawer: boolean;
}

class Layout extends Component<IProps,IState> {
    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () =>{
        this.setState( (prevState) => {
            return {showSideDrawer:!prevState.showSideDrawer}
        });
    }

    render(){
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}
export default Layout;