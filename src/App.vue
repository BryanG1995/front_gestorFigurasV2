<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> | 
    <router-link :to="{name:'About'}">About</router-link> | 
    <router-link to="/show">Shows</router-link> | 
    <router-link to="/marca">Marcas</router-link> | 
    <router-link to="/figura">Figuras</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App'
});
</script>


