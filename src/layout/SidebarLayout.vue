<template>
  <!-- component -->
  <div class="flex flex-row h-screen ">
 
  <div
    class="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)]  max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
    <div class="mb-2 p-4">
      <h5 class="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Gestor Figuras</h5>
    </div>
    <nav class="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">

      <RouterLink to="/figura"
        class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4">
          <BoxIcon />
        </div>
        Figuras
      </RouterLink>

      <RouterLink to="/marca"
        class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4">
          <RegisteredIcon />
        </div>Marca
      </RouterLink>

      <RouterLink to="/modelo"
        class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4">
          <RobotIcon />
        </div>Modelo
      </RouterLink>

      <RouterLink to="/show"
        class="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4">
          <TvIcon />
        </div>Show
      </RouterLink>

      <button @click="logout"
        class="cursor-pointer flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
        <div class="grid place-items-center mr-4">
          <LogOutIcon />
        </div>Log Out
      </button>
    </nav>
  </div>





  <div class=" bg-gray-100 w-full">
    <main class="p-10 ">
      <RouterView />
    </main>
  </div>

  </div>
</template>

<script setup>
import BoxIcon from '@/icons/BoxIcon.vue';
import LogOutIcon from '@/icons/LogOutIcon.vue';
import RegisteredIcon from '@/icons/RegisteredIcon.vue';
import RobotIcon from '@/icons/RobotIcon.vue';
import TvIcon from '@/icons/TvIcon.vue';

import { useAuthStore } from '@/stores/authStore'
  import { useRouter } from 'vue-router'
  
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const logout = () => {
    console.log("estoy en logout")
    authStore.logout()
    router.push('/login') // Redirigir al login después de cerrar sesión
  }



</script>