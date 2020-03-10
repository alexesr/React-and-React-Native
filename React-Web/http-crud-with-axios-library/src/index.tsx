import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';//all axios share the same configuration

/* Removing interceptors example
var myInterceptor = axios.interceptors.request.use(function () {});
axios.interceptors.request.eject(myInterceptor); 
*/

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(((request: any): Promise<any>=>{
    console.log(request);
    return request;
}),error =>{ // error function is triggered with errors related to not being able to send the request,etc.
    console.log(error);
    return Promise.reject(error);//to still forward error for local error handling, etc.
});

axios.interceptors.response.use(((response: any): Promise<any>=>{
    console.log(response);
    return response;
}),error=>{
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
