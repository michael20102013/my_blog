import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import home from '@/views/home'
import App from '@/App'
import welcome from '@/views/welcome'
import dashboard from '@/views/dashboard'
import article1 from '@/views/article1'
import article2 from '@/views/article2'
import header from '@/views/header'
import home from '@/views/home'
import write from '@/views/write'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/app',
      name: 'App',
      component: App
    },
    {
      path: '/header',
      name: 'header',
      component: header
    },    
    {
      path: '/home',
      name: 'home',
      component: home
    },  
    {
      path: '/write',
      name: 'write',
      component: write
    }       
  ]
})
