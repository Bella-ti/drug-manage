import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import '../static/css/theme-green/index.css' // 浅绿色主题
const VueResource = require('vue-resource')
Vue.use(VueResource)
Vue.use(ElementUI)
new Vue({
  router,
  store,
  ...App
}).$mount('#app')
