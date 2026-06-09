import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?:boolean;
}

interface FailedRequest {
    resolve:(token:string|null)=>void;
    reject:(error:unknown)=>void;
}


// lets see the initial settup required for the main course 


export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});// this is the base url on which the axios service would work on 

const getStoredToken = ():string|null => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('accessToken');
    return token && token !== 'null' && token !== 'undefined' ? token : null;
};//checks if we are on the client browser then gets the accesstoken from the localstorage


// this intercepts every request gets the accesstoken if token is found it first checks whether the config.headers is undifined or not if not it sets the authorization bearer 
// other wise returns an error 
apiClient.interceptors.request.use((config:InternalAxiosRequestConfig):InternalAxiosRequestConfig => {
    const token = getStoredToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error:AxiosError):Promise<never> => Promise.reject(error));



//setting the flag and the ques storage so that multiple refresh request at the same time don't trigger multiple refreshes 

let isRefreshing:boolean = false;
let failedQueue:FailedRequest[] = [];


// this is the function which keeps all the requests in the que whether failed or successfull and defensively sets token to null so that each of them have this property and then checks each one of them if there is an error it fails them gracefully otherwise gives them the token  at the end after going through all the request it sets failed que to null 

const processQueue = (error:unknown, token:string|null = null):void => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};


// let's start the maincourse

apiClient.interceptors.response.use(
    (response:AxiosResponse):AxiosResponse => response,//if there is a response (token is not expired )then respond
    //eslint-ignore-next-line
    async (error:AxiosError):Promise<AxiosResponse> => {// but if there is an error my friend then 
        const originalRequest = error.config as CustomAxiosRequestConfig;
        if (
            error.response?.status === 401 &&
            (error.response?.data as {code:string})?.code === 'TOKEN_EXPIRED' &&
            !originalRequest._retry//if this flag is fale means first try
        ) {
            if (isRefreshing) {// not called at first time as we fetch the refresh token first for the first request and then if multiple requests are found we slap that same token to other requests 

                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })// this return just makes the request float in the array without doing anything till the first ever request made is finished 
                    .then(token => {
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers['authorization'] = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })// when the firstever request is resolved it attackes the headers 

                    .catch(err => Promise.reject(err));
            }
            originalRequest._retry = true;
            isRefreshing = true;// this activates the upper if block for second and rest requests
            try {
                console.log("Access Token expired, refreshing...");
                const response = await axios.post('/api/auth/refresh', null, { withCredentials: true });// fetches the refresh route and gets new token 
                const { accessToken } = response.data;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('accessToken', accessToken);
                }// sets the new accesstoken after checking whether headers is defiend or not 
                
                apiClient.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers['authorization'] = `Bearer ${accessToken}`;
                processQueue(null, accessToken);
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.log("Refresh failed:", (refreshError as {response:AxiosResponse}).response?.data || (refreshError as {message:string}).message || refreshError);
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);
