import axios from "axios";

export const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const getStoredToken = () => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('accessToken');
    return token && token !== 'null' && token !== 'undefined' ? token : null;
};

apiClient.interceptors.request.use((config) => {
    const token = getStoredToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

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
                        originalRequest.headers = originalRequest.headers || {};
                        originalRequest.headers['authorization'] = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }
            originalRequest._retry = true;
            isRefreshing = true;
            try {
                console.log("Access Token expired, refreshing...");
                const response = await axios.post('/api/auth/refresh', null, { withCredentials: true });
                const { accessToken } = response.data;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('accessToken', accessToken);
                }
                apiClient.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers['authorization'] = `Bearer ${accessToken}`;
                processQueue(null, accessToken);
                return apiClient(originalRequest);
            } catch (refreshError) {
                console.log("Refresh failed:", refreshError?.response?.data || refreshError?.message || refreshError);
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);
