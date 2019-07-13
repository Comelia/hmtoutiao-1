import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import Home from '../views/home'
import welcome from '../views/welcome'
import NotFound from '../views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎页
        { name: 'welcome', path: '/', component: welcome }
      ] },
    { name: '404', path: '*', component: NotFound }
  ]
})

// 路由拦截器
// 前置守卫
router.beforeEach((to, from, next) => {
  // 每一次跳转路由都会执行这个函数
  // 1.如果要去登录页面会 放行
  if (to.path === '/login') return next()
  // 2.如果有 token 放行
  const user = window.sessionStorage.getItem('hm1-toutiao')
  if (user) return next()
  // 3.如果没有 token 则跳转回登录页 '/login'
  next('/login')
})

export default router
