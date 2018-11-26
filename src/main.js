// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'es6-promise/auto';
import Vuex from 'vuex';
import 'font-awesome/css/font-awesome.css';
import "./assets/css/global.css";
import Qs from 'qs';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
Vue.prototype.$http = axios;
Vue.prototype.$http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
Vue.use(ElementUI,{"size":'small'})
   .use(Vuex)
   .use(mavonEditor)


//初始化
let checkLogin = () => {
  store.commit('islogin');  
};
//begin vuex 判断一些全局的状态
const store = new Vuex.Store({
  state: {
    isContentShow: true,
    islogin: false,
    username: '登录'
  },
  getters: {},
  mutations:{
    islogin(state){
        let token = window.localStorage.getItem('token_name');
        if (token) {
            state.username = JSON.parse(token).name;
            Vue.prototype.$http.defaults.headers.common['Authorization'] = JSON.parse(token).token;
            Vue.prototype.$http({
                url: '/api/jwt',
                method: 'post',
                data: Qs.stringify({})
            }).then((res) => {
                let _res = res.data;
                if (_res.cc === 0) {
                    state.islogin = true;
                    Vue.prototype.$http.defaults.headers.common['Authorization'] = JSON.parse(token).token;
                }
                else {
                    state.islogin = false;
                    state.username = '登录';
                    window.localStorage.setItem('token_name', '');
                    Vue.prototype.$http.defaults.headers.common['Authorization'] = '';
                }
            })

        } else {
            state.islogin = false;
            state.username = '登录'
            Vue.prototype.$http.defaults.headers.common['Authorization'] = ''
        }
        // setTimeout(checkLogin, 2000)

    },
    //登出
    changeTologout(state){
        state.islogin = false;
        state.username = '登录'
    },
    //登录
    changeTologin(state){
        state.islogin = true;
    },
    //修改用户名
    changeName(state, name) {
      state.username = name;
    }
  }
});
//检查登录状态
checkLogin();
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

