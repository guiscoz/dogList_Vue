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
  },
  {
    path: '/cadastro-cachorro',
    name: 'dog-register',
    beforeEnter: Guard.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/DogRegister.vue')
  },
  {
    path: '/editar-cachorro/:id',
    name: 'dog-edit',
    beforeEnter: Guard.auth,
    component: () => import(/* webpackChunkName: "about" */ '../views/DogEdition.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
