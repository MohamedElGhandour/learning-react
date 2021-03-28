import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-ghandour-default-rtdb.firebaseio.com/',
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

export default instance