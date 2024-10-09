import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import accountRouter from './account'
import userRouter from './user'
import Login from '@/views/auth/Login.vue'
import Layout from '@/views/auth/Layout.vue'
import HomeLayout from '@/views/user/Layout.vue'
import { useAuthStore } from '@/stores/auth'
import PageNotFound from '@/views/PageNotFound.vue'

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
        },
        {
          path: '/about',
          name: 'About',
          component: About
        },
      ]
    },
    { ...accountRouter },
    { ...userRouter },
    {
      path: '/auth',
      component: Layout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
// eslint-disable-next-line
Router.beforeEach((to, from, next) => {
  if (to.href.includes('/user')) {
    const { isLogIn } = useAuthStore();
    if (!isLogIn()) {
      next({ name: "login" });
    } else {
      next()
    }
  }
  else {
    next()
  }
})
export default Router;