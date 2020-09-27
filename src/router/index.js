import VueRouter from "vue-router"
import Vue from 'vue'

import Autorization from '../views/Autorization'
import Chat from '@/views/Chat'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Chat, name: 'chat' },
  { path: '/autorization', component: Autorization, name: 'autorization' }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user') && to.name !== 'chat') {
    next({ name: 'chat' })
  } else if (!localStorage.getItem('user') && to.name !== 'autorization') {
    next({ name: 'autorization' })
  } else next()
})

export default router
