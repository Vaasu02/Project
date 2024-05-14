import axios from 'axios';
import {BASE_URL} from './constants'

const axiosInstance=axios.create({
    baseURL:BASE_URL,//The base URL for all requests made with this instance
    timeout:70000,//! The maximum time (in milliseconds) to wait for a response before aborting the request, set to 10 seconds (10000 milliseconds).
    headers:{//Default headers to be sent with every request, setting the 
        'Content-Type':'application/json',
        
    },

});


//The interceptor function is executed before each request is sent.
axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`;
        }

        return config;//The modified request configuration object (
            // config
            // ) is returned to allow the request to proceed
    },
    (error)=>{
        return Promise.reject(error);//If an error occurs within the interceptor, it is handled by returning a rejected Promise with the error.
    }
);

export default axiosInstance;