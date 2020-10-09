import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'ShopLists',
    component: () => import('@/views/ShopLists.vue')
  },
  {
    path: '/add',
    name: 'AddList',
    component: () => import('@/views/AddList.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditList',
    component: () => import('@/views/EditList.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
