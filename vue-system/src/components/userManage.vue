<template>
  <div>
    
    <!--------------------------------------面包屑导航区域------------------------------------>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-input
      style="max-width: 600px"
      placeholder="Please input"
      v-model="searchinput"
      class="input">
      
    </el-input>
    
    <el-button @click="selectSb()">查询</el-button>
    <el-button @click="selectA()">刷新</el-button>
    <!------------------------------------卡片视图区域------------------------------------------>
    <el-card class="box-card">
      <!--------------------------------------------- 用户列表区域 ----------------------------------------->
      <el-table :data="userlist.slice((page.currentPage-1)*page.PageSize,page.currentPage*page.PageSize)" :key="table.flushkey">
        <el-table-column type="index"></el-table-column>
        <el-tableColumn label="用户名" prop="userId"></el-tableColumn>
        <el-tableColumn label="密码" prop="password"></el-tableColumn>
        <el-tableColumn label="昵称" prop="userName"></el-tableColumn>
        <el-tableColumn label="邮箱" prop="email"></el-tableColumn>
        <el-tableColumn label="手机号" prop="phone"></el-tableColumn>
        <el-tableColumn label="性别" prop="sex"></el-tableColumn>
        <el-tableColumn label="权限" prop="isAdmin" :formatter="ifAdmin"></el-tableColumn>
        <el-table-column label="操作" width="200px">
                <template v-slot="scope">
                    <el-button @click="change(scope.row)">修改</el-button>
                    <el-button type="danger" @click="del(scope.row.userId)">删除</el-button>
                </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes=page.pageSizes
        :page-size="12" 
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalCount">
      </el-pagination>
    </el-card>
  </div>
<div class="rq" v-if="isChange">
      <el-form class="" ref="userFormInfomation" :model="userForm" :rules="rules">
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
                    <p>电话:</p><el-input type="text" v-model="userForm.phone"></el-input>
                </el-form-item> 
                <el-form-item prop="phone">
                    <p>权限:</p>                    
                    <el-select v-model="userForm.isAdmin">
                        <el-option label="普通用户" value="0"></el-option>
                        <el-option label="管理员" value="1"></el-option>
                    </el-select>
                </el-form-item> 
                    <el-button @click="upload()">确认</el-button>
                    <el-button @click="close()">取消</el-button>
            </el-form>
          </div>
</template>

<script setup>
import { onMounted, reactive,ref } from 'vue';
import api from '@/api/login'
import axios from 'axios';
import { error } from 'jquery';
import { ElMessage,ElMessageBox } from 'element-plus'

const page = reactive({
   //默认显示第几页
   currentPage:1,
   // 总条数，根据接口获取数据长度(注意：这里不能为空)
   totalCount:1,
   // 个数选择器（可修改）
   pageSizes:[1],
   // 默认每页显示的条数（可修改）
   PageSize:12,
})

const ifAdmin=(row,index)=> {
  if(row.isAdmin==0){
  return "普通用户"
  }else if(row.isAdmin == 1){
    return "管理员"
  }
}

const searchinput = ref('')

const userFormInfomation = ref('')

const isChange = ref(false)

const userForm = reactive({
    userId:'',
    password:'',
    userName:'',
    email:'',
    phone:'',
    sex:'',
    isAdmin:''
})

const table = reactive({
  flushkey:false
})

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
    { required: true, message: '请输入昵称', trigger: 'blur' },
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

let userlist = [];

axios.defaults.baseURL = 'http://localhost:9090'

function testget() {
    axios.get('/user/selectById/user').then(response => {
        // console.log("user", response.data)
        const res = response.data
        table.flushkey=!table.flushkey//vue会在表格key值发生变化时实时渲染dom
        userlist = [res.data]
        console.log("user", userlist)
    })
}

const selectSb =()=>{
  axios.get('/user/selectAll').then(res => {

    var filterList = filterList = Object.keys(res.data.data[0])
        // console.log(filterList)
    if(searchinput){
      userlist = res.data.data.filter(v=>{
        return filterList.some(key=>{
			    return v[key].toString().indexOf(searchinput.value)>-1
        })
      })
    }
    table.flushkey=!table.flushkey//vue会在表格key值发生变化时实时渲染dom
    handleCurrentChange()
    handleSizeChange()
  })
}

function selectA() {
    axios.get('/user/selectAll').then(response => {
        // console.log("All", response.data)
        const list = response.data
        table.flushkey=!table.flushkey//vue会在表格key值发生变化时实时渲染dom
        userlist =list.data
        page.totalCount = userlist.length
    })
    handleCurrentChange()
    handleSizeChange()
}

const del = (id) => {
  ElMessageBox.confirm(
  '此操作将永久删除该用户, 是否继续?',
  '提示',
  {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }
).then(() => {
  console.log('确认')
    axios.delete(`http://localhost:9090/user/delete/${id}`).then(res => {
    selectA()
    handleCurrentChange()
    handleSizeChange()
  }).catch(error=>{
    console.log(res.msg)
  })
}).catch(() => {
  console.log('取消')
})
}


const change = (row) => {
  isChange.value = true
  // console.log(row)
  userForm.userId = row.userId
  userForm.password = row.password
  userForm.userName = row.userName
  userForm.email = row.email
  userForm.phone = row.phone
  userForm.sex = row.sex
}

const upload = () => {
            api.updateApi(userForm).then((res) => {
                    if (res.code == 200) {
                      selectA()
                      handleCurrentChange()
                      handleSizeChange()
                        isChange.value = false
                        ElMessage.success("修改成功")
                    }
                }).catch((error) => {
                    console.log(error)
                })
              }

const close = () =>{
  isChange.value = false
}
  
const handleSizeChange =(val) => {
  page.pageSize = val
  page.currentPage = 1
}

const handleCurrentChange = (val) => {
  page.currentPage = val
}



onMounted(() => {
  selectA()
  handleCurrentChange()
  handleSizeChange()
})
</script>

<style lang="less" scoped>

.bg {
    background-color:#0000
}

.rq {
  width: 30%;
  height: 50%;
  position: absolute;
  margin: auto;
  border: 2px solid #000;
  border-radius: 10px;
  text-align: center;
  top: 0;
  left:0;
  right:0;
  bottom: 0;
  z-index: 99;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;//垂直居中
  p{
    vertical-align: middle;
    text-align: right;
    font-size: large;
    font-weight: bolder;
    user-select: none;
  }
  .el-input{
    margin: 10px 10px 0 10px;
    width: 60%;
    margin-bottom: 8px;

  }
  .el-select{
    margin: 10px 10px 0 10px;
    width:60%;

  }
  .el-button{
    width: 30%;
    height: 30px;
    margin: 0 7px;
    line-height: 30px;
    border: none;
    background-color: #819df7;
    color: #fff;
  }
}

.el-input:focus {
        color: #000000;
}
</style>