import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Users from '@/components/Users'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/users',
          component: Users
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
    return
  }

  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
