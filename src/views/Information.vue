<template>
    <!-- <div class="bg"> -->
        <div class="show">
            <div class="img-box">
                <img src="@/assets/images/RC.jpg" alt="">
            </div>
            <div class="info-box">
                <p>昵称:{{ userForm.userName }}</p>
                <p>联系方式:{{ userForm.phone }}</p>
                <p>性别:{{ userForm.sex }}</p>
                <p>邮箱:{{ userForm.email }}</p>
            </div>
            <el-button @click="edit()" color="#303133" :dark="isDark" style="border-radius: 0 0 10px 10px;width: 100.5%">修改用户信息</el-button>
        </div>
    <!-- </div> -->
</template>

<script setup>
import { reactive,ref  } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isAlive = ref('false')


const edit = () => {
    router.push({
        path:"/edit"
    })
}
const userForm = reactive({
    userId:'',
    userName:'',
    email:'',
    phone:'',
    sex:'',
})

userForm.userId=JSON.parse(window.sessionStorage.getItem("user")).userId
userForm.userName=JSON.parse(window.sessionStorage.getItem("user")).userName
userForm.email=JSON.parse(window.sessionStorage.getItem("user")).email
userForm.phone=JSON.parse(window.sessionStorage.getItem("user")).phone
userForm.sex=JSON.parse(window.sessionStorage.getItem("user")).sex
</script>

<style lang="less" scoped>

.bg {
    position: fixed;
    //   top: 0;
    //   left: 0;
      width: 100%;
      height: 100%;
      min-width: 1000px;
      z-index: 0;
      zoom: 1;
      background-color: #fff;
      background-image: url(@/assets/images/background.jpg) ;
    //   background-repeat: no-repeat;
    //   background-size: cover;
    //   -webkit-background-size: cover;
    //   -o-background-size: cover;
      background-position: center 0;
}

.show {
    display: grid;
    width: 350px;
    height: 485px;
    position: absolute;
    top: 30px;
    left: 69%;
    // background-image: url(@/assets/images/background.jpg) ;
    margin: auto;
    z-index: 98;
    border-radius: 10px 10px 10px 10px ;
    border-color: lightgoldenrodyellow;
    border: 1px solid #000;
    overflow:hidden ;
    box-shadow: 4px 4px 3px #454545;
}

.img-box{
    flex:1;
    width: 120px;
    height: 120px;
    margin: 20px auto;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #000;
    // opacity: 0;
}

.img-box img {
    width: 100%;
    user-select: none;
    z-index: 1;
}

.info-box {
    flex:1;
    height: 300px;
    background-color: #fff;
    z-index: 0;
    overflow: hidden;
    opacity: 0.9;
}

.info-box p {
    line-height: 50px;
    margin: 20px auto;
    user-select: none;
    text-align:center;
    color: #000;
    font-weight: bolder;
    font-weight: bolder;
}

</style>