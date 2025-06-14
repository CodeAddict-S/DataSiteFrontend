import axios from "axios";
import { isJsonValid, showToast } from "./utils";
import { router } from "./router";

const baseURL = 'http://localhost:8000/api/'

const api = axios.create({
    baseURL: baseURL, // Replace with your API base URL
    timeout: 10000, // Set a timeout (in ms)
    headers: {
        'Content-Type': 'application/json',
    },
});

const tokens = isJsonValid(localStorage.getItem('tokens')) ? JSON.parse(localStorage.getItem('tokens')) : null

// Add interceptors if needed (optional)
if(tokens){
    api.defaults.headers.common.Authorization = `Bearer ${tokens.access}`
}

api.interceptors.response.use(
    response => response,
    async error => {
        showToast('error', t('something_went_wrong'))

        const originalRequest = error.config

        if(!error.response){
            return Promise.reject(error)
        }
        console.log(error)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                let end_result
                // using fetch to avoid infinite recursion when the refresh/ endpoint returns 401
                await fetch(baseURL + 'token/refresh/', {
                    method: 'POST',
                    body: JSON.stringify({
                        "refresh": tokens.refresh
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    if (response.status === 401) {
                        throw new Error('Unauthorized: Token may be expired');
                    }
                    return response.json()
                }).then((data) => {
                    const { access } = data;
                    if (access.length <= 0) {
                        throw new Error("No Access Token");
                    }
                    tokens.access = access
                    localStorage.setItem('tokens', JSON.stringify(tokens));
                    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                    end_result = api(originalRequest)
                })
                return end_result
            } catch {
                console.log('Token refresh failed: pushing user to "/login" page');
                localStorage.removeItem('tokens');
                router.push('/login')
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export { api }
