import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Desktop from '../views/Desktop.vue'
import NotFound from '../views/NotFound.vue'
import Airdrop from '../views/Airdrop.vue'
import Whitelist from '../views/Whitelist.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/desktop',
    name: 'Desktop',
    component: Desktop
  },
  {
    path: '/404',
    component: NotFound
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/airdrop',
    name: 'Airdrop',
    component: Airdrop
  },
  {
    path: '/whitelist',
    name: 'Whitelist',
    component: Whitelist
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
