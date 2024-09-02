import login from '@/api/request'

const loginApi = data => {
    return login.post({
        url:'/login',
        data
    })
}

const registerApi = data => {
    return login.post({
        url:'/user/add',
        data
    })
}


const questionApi = data => {
    return login.post({
        url:'/text/tree',
        data
    })
}

const updateApi = data => {
    return login.put({
        url:'/user/update',
        data
    })
}

const addNewApi = data => {
    return login.post({
        url:'dialogue/add',
        data
    })
}

export default {
    loginApi,registerApi,questionApi,updateApi,addNewApi
}