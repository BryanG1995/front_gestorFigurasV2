import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Shows from '@/views/Shows.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },  
  { path: '/about', name: 'About', component: About },  
  { path: '/show', name: 'Shows', component: Shows } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
