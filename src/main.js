// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Login from './components/Login';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'es6-promise/auto';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
Vue.prototype.$http = axios;
// Vue.http.options.emulateJSON = true;
Vue.prototype.$http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
Vue.use(ElementUI,{"size":'small'})
   .use(Vuex)
const store = new Vuex.Store({
  state: {
    isContentShow: true
  },
  getters: {},
  mutations:{
    hideContent(state){
      console.log(123);
      state.isContentShow = false;
    }
  },
  plugins: [createPersistedState()]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    'Login': Login,
    'App': App
  },
  template: `<App>
                  <Login></Login>
              </App>`
  })
