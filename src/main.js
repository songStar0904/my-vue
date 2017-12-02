// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
// 导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
// 导入状态管理
import store from './store/index'
// 导入请求框架
import api from './api'
Vue.use(api)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    localStorage.removeItem('token')
  }
  if (!store.state.userInfo.islogin && to.path !== '/login') {
    store.dispatch('IS_LOGIN').then((res) => {
      let islogin = res
      if (!islogin && to.path !== '/login') {
        next({ path: '/login' })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  }
}).$mount('#app')
