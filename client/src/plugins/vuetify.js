// import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
// import 'vuetify/dist/vuetify.min.css'
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'
// import 'vuetify/src/stylus/app.styl'




Vue.use(VeeValidate)
Vue.use(Vuetify, {
  iconfont: 'md',
  // theme: {
  //   primary: '#2196F3',
  //   secondary: '#E91E63',
  //   accent: '#FFFFFF',
  //   error: '#F44336',
  //   warning: '#FFC107',
  //   info: '#03A9F4',
  //   success: '#4CAF50'
  // }
})

// export default new Vuetify({ ... })


// export default new Vuetify({
//   icons: {
//     iconfont: 'mdi' // default
//   }
// })
