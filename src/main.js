// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/base.less'
import axios from 'axios'

// 把axios绑定个给VUE的原型
Vue.prototype.axios = axios

// 给axios对象设置一个全局默认的baseURL
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 给axios配置请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 每次请求的时候，都会给config.headers增加一个Authorization
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 配置响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
