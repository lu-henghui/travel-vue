import Vue from 'vue'
import ElementUI from 'element-ui'

import '@/lin/plugins'

import router from '@/router'
import store from '@/store'
import App from '@/App.vue'

import StickyTop from '@/components/base/sticky-top/sticky-top'

import '@/assets/styles/index.scss' // eslint-disable-line
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

// base 组件注册
Vue.component('sticky-top', StickyTop)

const AppInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 设置 App 实例
window.App = AppInstance
