<template>
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="text" id="email" required />
        </div>
  
        <div class="form-group">
          <label for="password">Contraseña:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
  
        <button type="submit">Iniciar sesión</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/authStore'
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  const authStore = useAuthStore()
  
  async function handleLogin() {
    try {
      await authStore.login(email.value, password.value)
    } catch (err) {
      error.value = err.message
    }
  }
  </script>
  