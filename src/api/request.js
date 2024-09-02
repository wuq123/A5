import Service from './config';

//封装get请求
const get = (config) => {
    return Service({
        ...config,
        method:'get',
        params: config.data
    })
}


//封装post请求
const post = (config) => {
    return Service({
        ...config,
        method:'post',
        data: config.data
    })
}

const put = (config) => {
    return Service({
        ...config,
        method:'put',
        data: config.data
    })
}

export default {
    get,post,put
}