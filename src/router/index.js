import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Guard from '../services/middleware';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/cadastro-cachorro',
    name: 'dog-register',
    component: () => import(/* webpackChunkName: "about" */ '../views/DogRegister.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/cadastro-usuario',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/perfil',
    name: 'profile',
    beforeEnter: Guard.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
