import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/add',
    name: 'AddNote',
    component: () => import('@/views/AddNote.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditNote',
    component: () => import('@/views/EditNote.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
