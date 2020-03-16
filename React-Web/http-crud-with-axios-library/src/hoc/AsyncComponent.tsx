import React , { Component } from 'react';


interface IState{
    component: any
}

const AsyncComponent = (importComponent: () => Promise<any>) =>{
    return class extends Component<any,IState>{
        state = {
            component: null
        }
        componentDidMount(){
            importComponent()
                .then((cmp: any)=>{
                    this.setState({component: cmp.default}); // relying on create-react-app configuration
                });
        }
        render(){
            const C: any = this.state.component;
            return C ? <C {...this.props}/>  : null;
        }
    }
}

export default AsyncComponent;