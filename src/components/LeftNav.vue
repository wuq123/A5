<template>
    <div class="left-box">
        <div class="title-left-box">
            <a href="https://xinghuo.xfyun.cn/spark"><i class="iconfont icon-kedaxunfeiLOGO-" style="color: #fff;font-size:35px"></i></a>
            <span>|</span>
            <a href="https://xinghuo.xfyun.cn/spark"><i class="iconfont icon-xunfeixinghuo1" style="color: #fff;font-size:35px"></i></a>
            <span>讯飞星火</span>
        </div>
        <div class="bt">
            <el-button @click="first_add()"><i class="iconfont icon-jia"></i>新建对话</el-button>
            <el-button-group  v-for="item in items" @click="chooseSomeOne()"  :key="item.dialogueId" style="margin-left: 0px; margin-top: 20px;display: flex;width: 80%">
                <el-button style="width:80%" @click="getdialogId(item.dialogueId,item.jsonData)" :type="ifshow==item.dialogueId?'primary':''">
                   {{ item.dialogueName }} 
                   <!-- {{ item.dialogueId }} -->
                </el-button>
                <el-button @click="del(item.dialogueId)" style="width: 20%" :type="ifshow==item.dialogueId?'danger':''"><i class="iconfont icon-shanchu"></i></el-button> 
            </el-button-group>
            <el-button @click="delAll()" type="danger" style="margin-top: 20px;margin-left: 0px"><i class="iconfont icon-shanchu"></i>删除全部对话</el-button>
        </div>
    </div>
    <div class="add-box" v-if="isAlive">
        <p style="text-align: center;margin-top: 5%">对话标题</p>
        <i class="iconfont icon-hongcha" @click="quit()" style="position: absolute;margin:-40px 380px;"></i>
        <el-input v-model="dialogForm.dialogueName" style="width: 60%;  display: flex;flex-direction: column;margin: auto;margin-top: 5%;border: 2px solid #000"></el-input>
        <el-button @click="addnews(dialogForm)" style="width:40%;margin: 50px 120px;">确认</el-button>
        <!-- <el-button @click="quit()" style="width:40%;margin: 50px 120px;">取消</el-button> -->
    </div>
</template>

<script setup>
import { reactive, ref, onMounted,provide } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessageBox } from 'element-plus';
import bus from '@/eventBus';
import api from '@/api/login'

let items = ref([
   
]);

const dialog = reactive({
    userId:'',
    dialogId:'',
    diaglogueName:''
})

let ifshow = ref('')

ifshow.value = JSON.parse(window.sessionStorage.getItem("dialog"))
console.log(ifshow.value)

const dialogForm = reactive({
    dialogueName:''
})

dialog.userId = JSON.parse(window.sessionStorage.getItem("user")).userId

const isAlive = ref(false)

const first_add = () => {
    isAlive.value = true
}

const addnews = (name) => {
    isAlive.value = false
    // console.log(name)
    axios.post(`http://localhost:9090/dialogue/add/${dialog.userId}`,name,{
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        }
    }).then(res => {
    window.sessionStorage.setItem("dialog",JSON.stringify(res.data.data))
    selectDialogId()
    location.reload() 
    })   
}

const quit = () =>{
    isAlive.value = false
}

const selectDialogId = () => {
    axios.get(`http://localhost:9090/dialogue/select/${dialog.userId}`).then(res => {
        items.value = res.data.data
        // console.log(items)
    })
}

const getdialogId = (dialogueId,jsonData) =>{
    console.log(jsonData)
    window.sessionStorage.setItem("dialog",JSON.stringify(dialogueId))
    window.sessionStorage.setItem("jsonData",JSON.stringify(jsonData))
    bus.emit('brotherEvent',dialogueId)
    location.reload() 
    console.log(JSON.parse(window.sessionStorage.getItem("dialog")))
}

const del = (id) => {
  ElMessageBox.confirm(
  '此操作将永久删除该对话, 是否继续?',
  '提示',
  {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }
).then(() => {
    console.log('确认')
    axios.delete(`http://localhost:9090/dialogue/delete/${id}`).then(res => {
    selectDialogId()
  }).catch(error=>{
    console.log(error)
  })
}).catch(() => {
  console.log('取消')
})
}

const delAll = () => {
    ElMessageBox.confirm(
  '此操作将删除该用户的全部对话, 是否继续?',
  '提示',
  {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }
).then(() => {
    console.log('确认')
    axios.delete(`http://localhost:9090/dialogue/delete/batch/${dialog.userId}`).then(res => {
    selectDialogId()
  }).catch(error=>{
    console.log(error)
  })
}).catch(() => {
  console.log('取消')
})
}

const chooseSomeOne = () => {
    // axios.post(`http://localhost:9090/dialogue/select/${dialog.userId}`).then(res => {
    //     items.value = res.data.data
    //     console.log(items.value)
    // })
}

onMounted(() => {
    selectDialogId()
})

</script>

<style lang="less" scoped>
.left-box{
    display: flex;

    // flex: 1;
    width: 20%;
    height: 100%;
    position: absolute;
    // border-radius: 0px 30px 30px 10px;
    background-color: #000;
    box-shadow: 4px 4px 3px #454545;
    overflow: hidden;
    z-index: 0;
}
.title-left-box{
    position: absolute;
    top: 5%;
    transform: translateX(5%);
}
.bt {
    position: absolute;
    top:15%;
    left: 10%;
    width: 100%;
    .el-button {
            width: 80%;
           height: 60px;
           border-radius: 10px;
        }
    p{
        color:#fff
    }
}

.add-box{
    width: 400px;
    height: 200px;
    position: absolute;
    margin-left: 40%;
    margin-top:180px;
    background-color: #fff;
    z-index:99;
    display: block;
    border:3px solid #000;
}

i{
    margin: 5px;
}
span{
    color: #fff;
    user-select: none;
    font-size: 20px;
    margin: 2px;
    font-family: kaiti, serif;
}

.btn-active{
    background: #409EFF;
    color: #fff;
}
</style>