export default {
    namespaced:true,
    state : () =>{
        return {
            userinfo:{
                token:'',
                username:'李四',
                password:'123456'
            }
        }
    },
    mutations: {
        updateName(state,payload) {
            state.userinfo.username = payload;
        }
    },
    action: {
        updateNameAsync({commit},payload){
            setTimeout(()=> {
                commit('updateName',payload)
            },2000);
        }
    },
    getters:{
         
    }
}