import React , { Fragment , Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import axios, { AxiosInstance, AxiosError } from 'axios';

const withErrorHandler = (WrappedComponent: any , axios: AxiosInstance) =>{
    interface IProps{

    }
    interface IState{
        error: AxiosError
    }
    const axiosErrorNullInstance: AxiosError={config:{},isAxiosError:false,name:'',message:'',toJSON: ()=> new Object()}; 
    return class extends Component<IProps,IState> {
        state = {
            error: axiosErrorNullInstance
        }
        reqInterceptor: number;
        resInterceptor: number;
        constructor(props: IProps){
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(((request: any): Promise <any>=>{
                this.setState({error:axiosErrorNullInstance});// clear error after every request
                return request;
            }));
            this.resInterceptor = axios.interceptors.response.use(((response: any): Promise<any> => response
            ),(error: AxiosError)=>{
                this.setState({error:error});
            });
        }

        componentWillUnmount(){
            // very important to not acummulate old interceptors
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () =>{
            this.setState({error:axiosErrorNullInstance});
        } 

        render(){
            return (
                <Fragment>
                    <Modal show={this.state.error!==axiosErrorNullInstance} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error!==axiosErrorNullInstance?this.state.error.message:''}
                    </Modal>
                    <WrappedComponent{...this.props}/>
                </Fragment>
            ); 
        }
    }
}

export default withErrorHandler;