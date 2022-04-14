import axios from 'axios'
import { message } from 'antd';

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
    config => {
        console.log(config, '请求拦截')
        // 在发送请求之前做什么
        if (config.method === "post") {
            // 序列化
            // config.data = qs.stringify(config.data);
            // config.data = JSON.stringify(config.data);
            // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
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
        if (response?.status === 200) {
            return Promise.resolve({ data: response?.data, status: response?.status });
        } else {
            return Promise.reject(response);
        }
    },
    ({ response }) => {
        return Promise.resolve({ data: response?.data, status: response?.status });
    }
);


export default service
