import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Shows from '@/views/Shows.vue'
import Login from '@/views/Login.vue'
import Figuras from '@/views/Figuras.vue'
import Dashboard from '@/views/Dashboard.vue'
import { useAuthStore } from '@/stores/authStore'
import Marca from '@/views/Marca.vue'
import SidebarLayout from '@/layout/SidebarLayout.vue'

import type { RouteRecordRaw } from 'vue-router'
import DetallesFigura from '@/views/DetallesFigura.vue'
import Modelo from '@/views/Modelo.vue'
import FormFiguras from '@/views/FormFiguras.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/', name: 'landing', component: SidebarLayout, meta: { requiresAuth: true }, children: [
      { path: '/about', name: 'About', component: About, meta: { requiresAuth: true } },
      { path: '/show', name: 'Shows', component: Shows, meta: { requiresAuth: true } },
      { path: '/marca', name: 'Marcas', component: Marca, meta: { requiresAuth: true } },
      { path: '/modelo', name: 'Modelos', component: Modelo, meta: { requiresAuth: true } },
      { path: '/figura', name: 'Figuras', component: Figuras, meta: { requiresAuth: true } },
      { path: '/nueva-figura', name: 'FormFiguras', component: FormFiguras, meta: { requiresAuth: true } },
      { path: '/figura/:id', name: 'DetallesFigura', component: DetallesFigura, props: true ,meta: { requiresAuth: true } }
    ]
  },


  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } // Solo accesible si el usuario está autenticado
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Middleware para proteger rutas privadas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.token) {
    next('/login') // Si no está autenticado, redirigir a login
  } else {
    next()
  }
})

export default router
