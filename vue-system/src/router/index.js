import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout.vue'
import Home from '@/views/Home/Home.vue'
const Login=()=>import('@/views/Login.vue')
const Information=()=>import('@/views/Information.vue')
const edit=()=>import('@/views/Home/edit.vue')
const AdminHome=()=>import('@/views/Admin/AdminHome.vue')


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),//hash模式
  routes: [
    {
      path:'/',
      name:'Layout',
      component:Layout,
      children:[
        {
          path:'/',
          component:Home,
        }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
   
    {
      path:'/information',
      name:'information',
      component:Information
    },
    {
      path:'/edit',
      name:'edit',
      component:edit
    },
    {
      path:'/adminhome',
      name:'adminhome',
      component:AdminHome
    }
  ]
})
 
export default router
