<script setup>
import { ref, onMounted } from 'vue';
import { getData } from '@/services/axios';

const shows = ref([]);

async function cargarShows() {
    const data = await getData('/show'); // Aquí solo pasas la ruta relativa
    
      // Ordenar los datos, por ejemplo, por nombre (de la A a la Z)
     shows.value = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    shows.value = data;
}

onMounted(() => {
  //TODO: que no se cargue a cada rato al montar, que se guarden en un estado, con pinia
  cargarShows();
});
</script>

<template>
    <table class="table-auto border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2">ID</th>
          <th class="border border-gray-300 px-4 py-2">Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="show in shows" :key="show.id" class="hover:bg-gray-100">
          <td class="border border-gray-300 px-4 py-2">{{ show.id }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ show.nombre }}</td>
        </tr>
      </tbody>
    </table>
  </template>
