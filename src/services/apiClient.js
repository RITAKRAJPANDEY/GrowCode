import axios from "axios";
export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": "application/json",

    }
});

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            error.response?.data?.code === 'TOKEN_EXPIRED' &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['authorization'] = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                console.log("Access Token Expired rotating using Axios interceptor");
                const response = await axios.post('/api/auth/refresh');
                const { accessToken } = response.data;
                apiClient.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers['authorization'] = `Bearer ${accessToken}`;
                processQueue(null, accessToken);
                return apiClient(originalRequest);

            } catch (refreshError) {
                console.log("Token expired check Axios service");
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error)
    }
)