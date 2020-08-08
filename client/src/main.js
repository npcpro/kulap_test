import Vue from 'vue'
import './plugins/vuetify'
import 'vuetify/src/stylus/app.styl'
import App from './App.vue'
import axios  from  'axios'
import router from './router'
import store from './store/'
Vue.prototype.$http  =  axios;
let  token = localStorage.getItem('token');
if(token && token.length)Vue.prototype.$http.defaults.headers.common['Authorization'] = token
Vue.prototype.$http.defaults.baseURL =  'http://localhost:6000/'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
