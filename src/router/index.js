import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import home from '@/views/home'
import App from '@/App'
import dashboard from '@/views/dashboard'
import article1 from '@/views/article1'
import article2 from '@/views/article2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'article1',
      component: article1
    },
    {
      path: '/article1',
      name: 'article1',
      component: article1
    },
    {
      path: '/article2',
      name: 'article2',
      component: article2
    }        
  ]
})
