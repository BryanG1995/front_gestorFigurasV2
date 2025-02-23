import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Shows from '@/views/Shows.vue'
import Login from '@/views/Login.vue'
import Figuras from '@/views/Figuras.vue'
import Dashboard from '@/views/Dashboard.vue'
import { useAuthStore } from '@/stores/authStore'
import Marca from '@/views/Marca.vue'

const routes = [
  { path: '/', name: 'Home', component: Home , meta: { requiresAuth: true }},  
  { path: '/about', name: 'About', component: About, meta: { requiresAuth: true } },  
  { path: '/show', name: 'Shows', component: Shows, meta: { requiresAuth: true } }, 
  { path: '/marca', name: 'Marcas', component: Marca, meta: { requiresAuth: true } }, 
  { path: '/figura', name: 'Figuras', component: Figuras, meta: { requiresAuth: true } }, 
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
