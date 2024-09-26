import Register from '@/views/account/Register.vue'
import Layout from '@/views/account/Layout.vue'
import Active from '@/views/account/Active.vue'

export default {
  path: '/account',
  component: Layout,
  children: [
    {
      path: 'register',
      name: 'register',
      component: Register,
    },
    {
      path: 'register/active',
      name: 'active',
      component: Active,
    }
  ],
}