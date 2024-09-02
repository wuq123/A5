<template>
    <body>
    <div class="box">
        <div class="pre-box">
            <h1>WELCOME</h1>
            <p>JOIN US!</p>
            <div class="img-box">
                <img src="../assets/images/RC.jpg" alt="">
            </div>
        </div>
        <div class="register-form">
            <div class="title-box">
                <h1>注册</h1>
            </div>
            <el-form ref="registerFormRef" :model="registerForm" :rules="rules" lable-width="5px">
                <el-form-item prop="userId" label=" ">
                    <el-input type="text" placeholder="用户名" v-model="registerForm.userId" :suffix-icon="User"/>
                </el-form-item>
                <el-form-item prop="password" label=" ">
                    <el-input type="password" placeholder="密码" v-model="registerForm.password" :suffix-icon="Lock"/>
                </el-form-item>
                <el-form-item prop="checkPassword" label=" ">
                    <el-input type="password" placeholder="确认密码" v-model="registerForm.checkPassword" :suffix-icon="Lock"/>
                </el-form-item>
            </el-form>
            <!-- <form class="input-box">
                <input type="text" placeholder="用户名">
                <input type="password" placeholder="密码">
                <input type="password" placeholder="确认密码">
            </form> -->
            <div class="btn-box">
                <button @click="register">注册</button>
                <p @click="SwichFlag()">已有账号？去登录</p>    
            </div>
        </div>
        <div class="login-form" :model="user">
            <div class="title-box">
                <h1>登录</h1>
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" lable-width="5px">
                <el-form-item prop="userId" label=" ">
                    <el-input type="text" placeholder="用户名" v-model="loginForm.userId" :suffix-icon="User"/>
                </el-form-item>
                <el-form-item prop="password" label=" ">
                    <el-input type="password" placeholder="密码" v-model="loginForm.password" :suffix-icon="Lock"/>
                </el-form-item>
            </el-form>
            <div class="btn-box">
                <button @click="login">登录</button>
                <p @click="SwichFlag()">没有账号？去注册</p>
            </div>
        </div>
    </div>
    
</body>
</template>


<script setup>
import SwichFlag from '@/utils/SwichFlag';
import { Lock,User } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
import { computed,reactive,ref } from 'vue'; 
import api from '@/api/login'
import { error } from 'jquery';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';


const loginForm = reactive ({
    userId:'',
    password:''
})

const registerForm = reactive ({
    userId:'',
    password:'',
    checkPassword:''
})

const loginFormRef = ref('')

const registerFormRef = ref('')

const rules = reactive({
    userId: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度应在2~10个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '长度应在6~8个字符之间', trigger: 'blur' },
  ],
  checkPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '长度应在6~8个字符之间', trigger: 'blur' },
  ],
})

const router = useRouter()

const login = () => {
    loginFormRef.value.validate((valid)=>{
        if(valid){
            api.loginApi(loginForm).then((res)=> {
            console.log('login',res)
            if(res.code==200){
                window.sessionStorage.setItem("user",JSON.stringify(res.data))
                ElMessage.success(res.msg)
                router.push({
                    path: "/"
                })
            }
        }).catch((error)=>{
            console.log(error);
        })
        }else{
            return
        }
    })
}

const register = () => {
    registerFormRef.value.validate((valid)=>{
        if(valid){
            api.registerApi(registerForm).then((res)=> {
            if(res.code==200){
                window.sessionStorage.setItem("user",JSON.stringify(registerForm))
                ElMessage.success(res.msg)
                router.push({
                    path: "/"
                })
            }
        }).catch((error)=>{
            console.log(error);
        })
        }else{
            return
        }
    })
}

</script>


<style lang="less" scoped>

* {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    input {
        outline: none;
    }
    
    html,body {
        overflow: hidden;
    }

    body {
        width: 100%;
        height: 100vh;
        display: flex;
        background: linear-gradient(to right,rgb(247,209,215),rgb(140, 213, 245));
        overflow: hidden;
    }

    .box {
        width: 1050px;
        height: 600px;
        display: flex;
        position: relative;
        /* background-color: #fff; */
        margin:auto; //水平垂直居中
        border-radius: 8px;
        border: 1px solid #c4c4c4;
        box-shadow: 4px 4px 3px #454545;
    }

    .pre-box {
        width: calc(1050px / 2);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
        border-radius: 4px;
        background-color:rgb(254, 225, 230);
        box-shadow: 4px 4px 3px #454545;
        transition: 1s ease-in-out;
    }

    .pre-box h1 {
        margin-top: 150px;
        text-align: center;
        letter-spacing: 5px;
        user-select: none;//禁止选中
        color: #fff;
        text-shadow: 4px 4px 3px #454545;
    }

    .pre-box p {
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin: 20px 0;
        user-select: none;//禁止选中
        font-weight: bold;
        text-shadow: 4px 4px 3px #454545;
    }

    .img-box {
        width: 250px;
        height: 250px;
        margin: 20px auto;
        border-radius: 50%;
        user-select: none;
        overflow: hidden; //超出隐藏   
        box-shadow: 4px 4px 3px #454545;
    }

    .img-box img {
        width: 100%;
        transition: 0.5s;
    }
    
    .register-form,.login-form {
        flex: 1;
        height: 100%;
    }

    .title-box{
        height: 300px;
        color: #ffffff;
        line-height: 500px;
    }

    .title-box h1 {
        text-align: center; //居中
        letter-spacing: 5px;
        user-select: none;//禁止选中
        text-shadow: 4px 4px 3px #454545;
    }

    .el-form,.input-box {
        display: flex;//纵向布局
        flex-direction: column;
        align-items: center;//垂直居中
    }

    .el-form-item,input {
        width:60% ;
        height: 40px;//间距
        margin-bottom: 20px;
        // text-indent: 4px;
        // border: 1px solid #e0cccc;
        // border-radius: 4px;
        // backdrop-filter: blur(10px);
    }

    input:focus {
        color: #5576e2;
    }
    //聚焦时隐藏文字
    input:focus::placeholder {
        opacity: 0;
    }

    .btn-box {
        display: flex;
        justify-content: center;//水平居中
    }

    button {
        width: 100px;
        height: 30px;
        margin: 0 7px;
        line-height: 30px;
        border: none;
        border-radius: 4px;
        background-color: #819df7;
        color: #fff;
    }

    button:hover {
        cursor: pointer;
        opacity: .8;
    }

    .btn-box p {
        height: 30px;
        color: #000;
        line-height: 30px;
        font-size: 14px;
        user-select: none;//禁止选中
    }

    .btn-box p:hover {
        cursor: pointer;
        border-bottom: 1px solid white;
    }

</style>