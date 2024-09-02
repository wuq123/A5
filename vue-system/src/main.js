import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

router.beforeEach((to, from, next) => {
    if (to.fullPath != '/login') { // 判断该路由是否不为登录界面
      if (window.sessionStorage.getItem('user')) { // 通过vuex state获取当前的token是否存在
        next();
      }
      else {
        next({
          path: '/login'
        })
      }
    }
    else {
      next();
    }
  })
  