import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d2d9d.firebaseio.com'
});

export default instance;