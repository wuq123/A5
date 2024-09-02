<template>
    <div class="input-box">  
        <!-- @keydown.enter.prevent="submitForm" :model="submitText" -->
        <!-- <textarea name="" id="" rows="4" placeholder="请输入你想要学习的内容" v-model="question"></textarea> -->
        <el-form ref="questionRef" :model="questionForm" lable-width="5px">
                <el-form-item prop="question" label=" ">
                    <el-input type="text" placeholder="请输入" v-model="questionForm.question"/>
                </el-form-item>
        </el-form>
        <button @click="question">提交</button>
    </div>
</template>

<script setup>
import api from '@/api/login'
import { reactive, ref } from 'vue'

const questionForm = reactive({
    question:' '
})

const questionRef = ref(' ')

const question = () => {
    questionRef.value.validate((valid)=>{
        if(valid){
            api.questionApi(questionForm).then((res)=> {
            console.log('question',res)
            if(res.code==200){
                ElMessage.success(res.msg)
                window.sessionStorage.setItem('token',res.token)
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

.input-box{
    // flex: 1;
    width: 1100px;
    height: 30%;
    background-color: #bc6e6e;
    overflow: hidden;
    position: relative;
}

textarea{
    display: flex;
    position: absolute;
    transform: translateX(40%);
    margin: 20px ;
    width: 600px;
    line-height: 1.5;//行间距
    height: 150px;
    border-radius: 20px;
    border: 1px solid #bc6e6e;
    outline: none;
    text-indent: 10px;
    padding: 10px 25px;
    resize: none;
    overflow: hidden;
}
textarea:focus::placeholder {
        opacity: 0;
    }

    
</style>