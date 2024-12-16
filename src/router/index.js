import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Guard from '../services/middleware'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/authentication/Login.vue')
  },
  {
    path: '/cadastro-usuario',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/authentication/Register.vue')
  },
  {
    path: '/perfil',
    name: 'profile',
    beforeEnter: Guard.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/authentication/Profile.vue'),
  },
  {
    path: '/cadastro-cachorro',
    name: 'dog-register',
    beforeEnter: Guard.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/dogs/Create.vue')
  },
  {
    path: '/editar-cachorro/:id',
    name: 'dog-edit',
    beforeEnter: Guard.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/dogs/Edit.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
