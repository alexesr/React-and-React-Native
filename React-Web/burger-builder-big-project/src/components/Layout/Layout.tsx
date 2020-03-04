import React , {Fragment, ReactNode} from 'react';

interface LayoutType{
    children: ReactNode
}

const Layout = (props: LayoutType) =>
    <Fragment>
        <div> Toolbar, SideDrawer, Backgrop</div>
        <main>
            {props.children}
        </main>
    </Fragment>
export default Layout;