import axios, { AxiosRequestHeaders } from 'axios'
import { message } from 'antd';
import { userInfo } from '../util/session-obj';

const user = userInfo()

const service = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    responseType: 'json',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})

// 请求拦截
service.interceptors.request.use(
    (config: any) => {
        console.log(config, '请求拦截')
        const token = user?.token
        if (token) {
            (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`
        }
        return config;
    },
    error => {
        message.error(error);
        return Promise.reject(error);
    })


// 响应拦截
service.interceptors.response.use(
    response => {
        console.log(response, '响应拦截')
        return Promise.resolve({ data: response?.data, status: response?.status });
    },
    ({ response }) => {
        return Promise.resolve({ data: response?.data, status: response?.status });
    }
);

export function get(url: string, param: any = {}) {
    return service.get(url, { params: param })
}


export default service
