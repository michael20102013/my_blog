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
import 'font-awesome/css/font-awesome.css';
import "./assets/css/global.css";
import Qs from 'qs';
// import createPersistedState from 'vuex-persistedstate'

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
Vue.prototype.$http = axios;
// Vue.http.options.emulateJSON = true;
Vue.prototype.$http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
Vue.use(ElementUI,{"size":'small'})
   .use(Vuex)
//begin vuex 判断一些全局的状态
const store = new Vuex.Store({
  state: {
    isContentShow: true,
    islogin:false
  },
  getters: {},
  mutations:{
    islogin(state){
        let token = window.localStorage.getItem('token_name');
        if (token) {
            // Vue.prototype.$http.defaults.headers.common['Authorization'] = JSON.parse(token).token;
            // Vue.prototype.$http({
            //     url: '/api/jwt',
            //     method: 'post',
            //     data: Qs.stringify({})
            // }).then((res) => {
            //     let _res = res.data;
            //     if (_res.cc === 0) {
            //         console.log('state.islogin', state.islogin)
            //         state.islogin = true;
            //         Vue.prototype.$http.defaults.headers.common['Authorization'] = JSON.parse(token).token;
            //     }
            //     else {
            //         state.islogin = false;
            //     }
            // })
            state.islogin = true;
            Vue.prototype.$http.defaults.headers.common['Authorization'] = JSON.parse(token).token;
        } else {
            state.islogin = false;
        }
    },
    changeTologout(state){
        state.islogin = false;
    },
    changeTologin(state){
        state.islogin = true;
    }
  }
})
store.commit('islogin')
//end vuex 判断一些全局的状态

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    'App': App
  },
  template: `<App></App>`
  })
