import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import iView from 'iview'
import locale from 'iview/dist/locale/en-US'
import '../styles/index.less'

import App from './App'
import routes from './router'
import store from './store'

Vue.use(Router)

const router = new Router({
  routes: routes
})

Vue.use(iView, { locale })

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  console.log('store.getters.token', store.getters.token, to)
  if (store.getters.token) {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, from, next) => {
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
