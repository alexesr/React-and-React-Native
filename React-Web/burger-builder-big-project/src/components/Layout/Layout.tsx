import React , {Fragment, ReactNode} from 'react';

interface type{
    children: ReactNode
}

const Layout = (props: type) =>
    <Fragment>
        <div> Toolbar, SideDrawer, Backgrop</div>
        <main>
            {props.children}
        </main>
    </Fragment>
export default Layout;