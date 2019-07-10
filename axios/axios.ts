import axios from 'axios';
import qs from 'qs';

// 创建 axios 实例
const Axios = axios.create({
    baseUrl: '/',
    timeout: 10000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
});

// 添加请求拦截器
Axios.interceptors.request.use(config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
        config.data = qs.stringify(config.data);
    }

    return config;
}, err => {
    return Promise.reject(err);
});

// 添加响应拦截器
Axios.interceptors.response.use(res => {
    if (res.status === 200) {
        return res.data;
    }

    return Promise.reject(res);
}, err => {
    return Promise.reject(err);
});

export const fetch = (url, data, method = 'post'): Promise<any> => {
    return Axios({
        url,
        data,
        method,
        params: data && method === 'get',
        paramsSerializer: (params) => {
            return qs.stringify(params);
        }
    })
}

export const businessFetch = async(url, data, method = 'post'): Promise<any> => {
    const res = await fetch(url, data, method);

    if (res.code !== 0 || res.status !== 'success') {
        return Promise.reject(res);
    }
    return res.content || {};
}

export default { fetch, businessFetch }