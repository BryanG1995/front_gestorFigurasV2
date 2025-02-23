import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { postData } from '@/services/axios'  // Importar la función postData

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const router = useRouter()

  async function login(email: string, password: string) {
    try {
      // Usamos postData para hacer la solicitud POST
      const response = await postData('/auth/login', { email, password })
      
      token.value = response.token
      user.value = {
        id: response.id,
        email: response.email,
        nombre: response.nombre,
      };
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value)) // Guardamos el usuario en localStorage

      router.push({ name: 'Dashboard' }) // Redirigir tras login
    } catch (error) {
      throw new Error('Credenciales incorrectas')
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user');
    router.push({ name: 'Login' }) // Redirigir tras logout
  }

  return { token, user, login, logout }
})
