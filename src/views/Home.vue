<template>
    <div class="home">
      <h1>Bienvenido a la página de inicio</h1>
      <p>Este es el contenido de la página principal</p>
      <button @click="goToAboutPage">Ir a la página "Acerca de"</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Home',
    methods: {
      goToAboutPage() {
        // Aquí podrías usar Vue Router para navegar
        this.$router.push({ name: 'About' });
      }
    }
  });
  </script>
  
  <style scoped>
  .home {
    text-align: center;
  }
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  