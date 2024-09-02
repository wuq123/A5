<template>
    <div class="bg">
        <div class="show">
            <div class="img-box">
                <img src="@/assets/images/welcome2.jpg" alt="">
            </div>
            <el-form class="info-box" ref="userFormInfomation" :model="userForm" :rules="rules">
                <el-form-item prop="userName">
                    <p>昵称:</p><el-input type="text" v-model="userForm.userName"></el-input>
                </el-form-item> 
                <el-form-item prop="email">
                    <p>邮箱:</p><el-input type="text" v-model="userForm.email"></el-input>
                </el-form-item> 
                <el-form-item prop="sex">
                    <p>性别:</p>
                    <el-select v-model="userForm.sex">
                        <el-option value="男"></el-option>
                        <el-option value="女"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item prop="phone">
                    <p>联系方式:</p><el-input type="text" v-model="userForm.phone"></el-input>
                </el-form-item> 
                <el-form-item prop="password">
                    <p>输入旧密码:</p><el-input type="text" v-model="oldpassword.inputpassword"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <p>输入新密码:</p><el-input type="text" v-model="userForm.password"></el-input>
                </el-form-item> 
                    <el-button @click="upload()">确认</el-button>
                     <el-button @click="returnhome()" class="bt">返回首页</el-button>               
            </el-form>

        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import api from '@/api/login'
import { reactive,ref } from 'vue';
import { error } from 'jquery';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const userForm = reactive ({
    userId:'',
    password:'',
    userName:'',
    email:'',
    phone:'',
    sex:'',
    isAdmin:''
})

const oldpassword = reactive({
    password:'',
    inputpassword:''
})

oldpassword.password = JSON.parse(window.sessionStorage.getItem("user")).password

userForm.userId=JSON.parse(window.sessionStorage.getItem("user")).userId
userForm.userName=JSON.parse(window.sessionStorage.getItem("user")).userName
userForm.email=JSON.parse(window.sessionStorage.getItem("user")).email
userForm.phone=JSON.parse(window.sessionStorage.getItem("user")).phone
userForm.sex=JSON.parse(window.sessionStorage.getItem("user")).sex
userForm.isAdmin=JSON.parse(window.sessionStorage.getItem("user")).isAdmin
const userFormInfomation = ref('')

const router = useRouter();

const upload = () => {  
    
    userFormInfomation.value.validate((valid)=>{
        if(valid){
            if(oldpassword.inputpassword==oldpassword.password)
            {
                api.updateApi(userForm).then((res) => {
                    if (res.code == 200) {
                        window.sessionStorage.setItem("user",JSON.stringify(res.data))
                        ElMessage.success(res.msg)
                        router.push({
                            path: '/information'
                        })
                    }
                }).catch((error) => {
                    console.group(error)
                })
            }
            else{
                ElMessage.error("原密码错误请重试")
            }
        }
        else{
            return
        }
    })
}

const returnhome = () => {
    router.push({
        path:"/"
    })
}

const rules = reactive({
    userId: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度应在2~10个字符之间', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '长度应在6~8个字符之间', trigger: 'blur' },
  ],
  oldpassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 8, message: '长度应在6~8个字符之间', trigger: 'blur' },
  ],
  userName: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 2, max: 20, message: '长度应在2~20个字符之间', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { min: 6, max: 20, message: 'error', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入正确的格式', trigger: 'blur' },
  ]
})

</script>

<style lang="less" scoped>

.bg {
    position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -10;
      background-color: #fff;
      background-image: url(@/assets/images/background.jpg) ;
    //   background-repeat: no-repeat;
    //   background-size: cover;
    //   -webkit-background-size: cover;
    //   -o-background-size: cover;
      background-position: center 0;
}

.show {
    display: flex;
    width: 800px;
    height: 600px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 10px 10px 0 0 ;
    border-color: lightgoldenrodyellow;
    border: 1px solid lightgoldenrodyellow;
}

.img-box{
    width: 150px;
    height: 150px;
    margin: 100px auto;
    border-radius: 50%;
    overflow: hidden;
    background-color: #fff;
    z-index: -1;
}

.img-box img {
    width: 100%;
    position: relative;
    justify-items: auto;
    user-select: none;
    z-index: 1;
}

.info-box {
    width: 450px;
    height: 600px;
    display: flex;//纵向布局
    justify-content: left;
    flex-direction: column;
    align-items: left;//垂直居中
    padding-left: 40px;
    background-color: #fff;
    opacity: 0.8;
}

.info-box p {
    display: inline-block;
    padding-top: 20px;
    line-height: 50px;
    user-select: none;
    font-weight: bolder;
}

.info-box .el-input {
    margin: auto;
    width:60% ;
    border-radius: 4px;
    height: 30px;//间距
    margin-bottom: 20px;
    font-weight: bolder;
    border: #000;
}

.info-box .el-select {
    width: 30%;
    margin: auto;
}

button {
    height: 30px;
    z-index:2;
    border: 1px solid lightgoldenrodyellow;
}

.bt {
    border-radius: 0 0 10px 10px;
}
button:hover {
        cursor: pointer;
        opacity: .8;
}
</style>