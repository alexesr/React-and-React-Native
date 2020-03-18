import React , { Component } from 'react';

import axios from '../../axios-orders';
import order , { emptyOrder } from '../../interfaces/order.interface';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

interface IProps {

}

interface IState {
    orders : order[];
    loading: boolean;
}

class Orders extends Component<IProps,IState>{
    state = {
        orders: [...emptyOrder],
        loading: true
    };

    componentDidMount(){
        axios.get('/orders.json')
            .then(res=>{
                const fetchedOrders: order[] = [];
                for(let key in res.data){
                    fetchedOrders.push({...res.data[key],id:key});
                }
                console.log('fetched orders: ',fetchedOrders);
                this.setState({loading:false, orders: fetchedOrders});
            }).catch(err=>{
                this.setState({loading:false});
            });
    }

    render(){
        return (
            <div>
                {this.state.orders.map(order=>
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}/>
                )}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);