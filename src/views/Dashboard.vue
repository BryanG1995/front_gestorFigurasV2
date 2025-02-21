<template>
    <div class="dashboard">
      <h1>Bienvenido al Dashboard</h1>
      <p>Esta es una página protegida, solo accesible si estás autenticado.</p>
      <button @click="logout">Cerrar sesión</button>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '@/stores/authStore'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const logout = () => {
    authStore.logout()
    router.push('/login') // Redirigir al login después de cerrar sesión
  }
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    padding: 20px;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #e74c3c;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  