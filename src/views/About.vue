<template>
    <div class="about">
      <h1>Acerca de Nosotros</h1>
      <p>Esta es la página donde hablamos sobre nuestra empresa.</p>
      <button @click="goToHomePage">Ir a la página de inicio</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'About',
    methods: {
      goToHomePage() {
        // Redirigir a la página de inicio
        this.$router.push({ name: 'Home' });
      }
    }
  });
  </script>
  
  <style scoped>
  .about {
    text-align: center;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #35495e;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  