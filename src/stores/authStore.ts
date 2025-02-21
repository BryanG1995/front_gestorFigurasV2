import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postData } from '@/services/axios'  // Importar la función postData

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(null)
  const router = useRouter()

  async function login(email: string, password: string) {
    try {
      // Usamos postData para hacer la solicitud POST
      const response = await postData('/auth/login', { email, password })
      
      token.value = response.token
      localStorage.setItem('token', response.token)

      router.push({ name: 'Dashboard' }) // Redirigir tras login
    } catch (error) {
      throw new Error('Credenciales incorrectas')
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push({ name: 'Login' }) // Redirigir tras logout
  }

  return { token, user, login, logout }
})
