<template>
    <Transition name="slide-fade">
        <information v-if="isshow"></information>
    </Transition>
    <div class="app-top-nav">
        <div class="x">
            <ul>
                <!-- userinfo.token -->
                <template v-if="true"> 
                    <li><a href="javascript:;" @click="ifshow()"> 
                        欢迎 {{ userForm.userName }}
                    </a></li>
                    <li><a href="javascript:;"><RouterLink to="/login">退出登录</RouterLink></a></li>
                </template>
                <li v-else>
                    <a href="javascript:;">
                        <RouterLink to="/login"><i class="iconfont icon-denglu"></i></RouterLink>
                    </a>
                </li>
                <template v-if="userForm.isAdmin">
                    <li><a href="javascript:;">
                        <RouterLink to="/adminhome">管理员中心</RouterLink>
                    </a></li>
                 </template>
            </ul>           
        </div>
    </div>
</template>

<script setup>
import { reactive,ref } from 'vue'
import Information from '@/views/Information.vue';


const userForm = reactive({
    userId:'',
    isAdmin:'',
    userName:''
})

const isshow = ref(false)

const ifshow =()=>{
    isshow.value = !isshow.value
}

// console.log(JSON.parse(window.sessionStorage.getItem("user")).userId)
userForm.userId=JSON.parse(window.sessionStorage.getItem("user")).userId
userForm.isAdmin=JSON.parse(window.sessionStorage.getItem("user")).isAdmin
userForm.userName=JSON.parse(window.sessionStorage.getItem("user")).userName
</script>

<style lang="less" scoped>
@import url('../assets/styles/variables.less');

.x {
    width: 95%;
}

.app-top-nav{ 
    background-color: #333;
    width: 100%;
    ul {
        display: flex; 
        height: 30px;
        line-height: 30px;
        justify-content: flex-end;
        li {
            a{
                font-size: 12px;
                padding: 0 10px;
                color:#cccccc;
                border-left: 1px solid #ccc;
                &:hover {
                    color: @xtxColor;
                }
            }
        }
        li:nth-child(1) {
            a {
                border-left: 0;
            }
        }
    }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
//   transition: opacity 0.8s ease;
}


.slide-fade-enter-from{
    transform: translateY(-20px);
    opacity: 0;
}

.slide-fade-leave-to {
    // transform: translateY(-20px);
    opacity: 0;
}


</style>