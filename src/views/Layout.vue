<template>
    <div class="big-box">
        <!--1. 顶部通栏 -->
        <AppTopNav/>    
        <!--2. 头部通栏 -->
        <!-- <MyHeader/>    -->
        <div class="middle-box">
            <LeftNav/>
            <div class="show">
                <Question></Question>
                <!-- <Home/> -->
                <!-- <Requsest/> -->
                <!--4. 底部通栏 -->
                <!-- <TextInput/> -->
            </div>
        </div>
        
        
    </div>
</template>

<script setup>
import AppTopNav from '@/components/AppTopNav.vue'
import MyHeader from '@/components/MyHeader.vue'
import TextInput from '@/components/TextInput.vue'
import Requsest from '@/components/Request.vue'
import LeftNav from '@/components/LeftNav.vue'
import Question from '@/components/Question.vue'
import Home from '@/views/Home/Home.vue'

</script>

<style lang="less" scoped>
.big-box{
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #fff;
    overflow: hidden;
}
.middle-box {
    width: 100%;
    display: flex;
    justify-content: left;
}

.show{
  margin: auto;
}

</style>