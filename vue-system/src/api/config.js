import axios from "axios";
import { ElMessage } from "element-plus";


//创建axios实例
const Service = axios.create({
    baseURL:'http://localhost:9090',
    //定义统一的请求头
    headers:{
            'Content-Type':"application/json;charset=UTF-8"
    },
    //配置请求超时时间
    timeout:10000
})

//请求拦截器
Service.interceptors.request.use((config)=>{
    //配置请求头
    // console.log(config.headers.common)
    config.headers['Authorization'] = window.sessionStorage.getItem('token') === null ? null : window.sessionStorage.getItem('token')
    return config
})
//响应拦截器
Service.interceptors.response.use((response)=>{
    const res = response.data
    if(res.code==200){
        return res
    }
    else{
        ElMessage.error(res.msg)
        return res
    }
})

export default Service