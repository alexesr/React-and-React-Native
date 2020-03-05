import React , {Fragment, ReactNode} from 'react';

import classes from './Layout.module.css';

interface IProps{
    children: ReactNode
}

const Layout = (props: IProps) =>
    <Fragment>
        <div> Toolbar, SideDrawer, Backgrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
export default Layout;