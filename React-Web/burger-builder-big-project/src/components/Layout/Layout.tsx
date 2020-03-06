import React , {Fragment, ReactNode} from 'react';

import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

interface IProps{
    children: ReactNode
}

const Layout = (props: IProps) =>
    <Fragment>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>
export default Layout;