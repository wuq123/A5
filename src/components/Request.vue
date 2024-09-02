<template>
    <div class="request-box">
        <textarea readonly></textarea>
        <button @click="test()">test</button>
        <br>
        <button @click="info()">information</button>

        <br>
        <button @click="admin()">admin</button>

        <p>《网络爬虫入门教程》 https://www.example.com/web-crawling-advanced</p>
        <p>《网络爬虫高级实战》https://www.example.com/web-crawling-advanced</p>
        <p>《网络爬虫精通之路》https://www.example.com/web-crawling-mastery</p>
        
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

    
const router = useRouter()

const test =()=>{
    router.push({
        path:"/test"
    })
}

const info =()=>{
    router.push({
        path:"/information"
    })
}

const admin =()=>{
    router.push({
        path:"/adminhome"
    })
}

</script>

<style lang="less" scoped>
.request-box {
    // padding: 300px 0px 0px 500px;
    flex: 1;
    width: 1100px;
    height: 70%;
    background-color: #fff;
}
textarea {
    display: flex;
    width: 750px;
    height: 500px;
    line-height: 1.5;
    position: absolute;
    transform: translateX(18%);
    margin: 20px ;
    resize: none;
    border: none;
    outline: none;
    font-size: medium;
}
 

p {
    // margin: 20px 50px auto;
    line-height: 50px;;
}

</style>