<script setup>
import { ref, onMounted } from 'vue';
import { getData } from '@/services/axios';

const marcas = ref([]);

async function cargarMarcas() {
    const data = await getData('/marca'); // Aquí solo pasas la ruta relativa
    
      // Ordenar los datos, por ejemplo, por nombre (de la A a la Z)
     marcas.value = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    marcas.value = data;
}

onMounted(() => {
  cargarMarcas();
});
</script>

<template>
    <table class="table-auto border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          
          <th class="border border-gray-300 px-4 py-2">Nombre</th>
          <th class="border border-gray-300 px-4 py-2">Pais</th>
          <!-- <th class="border border-gray-300 px-4 py-2">Usuario</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="marca in marcas" :key="marca.id" class="hover:bg-gray-100">
          
          <td class="border border-gray-300 px-4 py-2">{{ marca.nombre }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ marca.pais.nombre }}</td>
          <!-- <td class="border border-gray-300 px-4 py-2">{{ marca.usuario.email }}</td> -->
        </tr>
      </tbody>
    </table>
  </template>
