<script setup>
import { ref, onMounted } from 'vue';
import { getData } from '@/services/axios';

const figuras = ref([]);

async function cargarFiguras() {
    const data = await getData('/figura'); // Aquí solo pasas la ruta relativa
        console.log(data);
      // Ordenar los datos, por ejemplo, por nombre (de la A a la Z)
     figuras.value = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
    figuras.value = data;
}

onMounted(() => {
  
  cargarFiguras();
});
</script>

<template>
    <table class="table-auto border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
        
          <th class="border border-gray-300 px-4 py-2">Nombre</th>
          <th class="border border-gray-300 px-4 py-2">Show</th>
          <th class="border border-gray-300 px-4 py-2">Modelo</th>
          <th class="border border-gray-300 px-4 py-2">Marca</th>
          <th class="border border-gray-300 px-4 py-2">Fecha Compra</th>
          <th class="border border-gray-300 px-4 py-2">Precio</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="figura in figuras" :key="figura.id" class="hover:bg-gray-100">
    
          <td class="border border-gray-300 px-4 py-2">{{ figura.nombre }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ figura.show.nombre }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ figura.modelo.nombre }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ figura.modelo.marca.nombre }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ figura.fechaCompra }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ figura.precio }}</td>
        </tr>
      </tbody>
    </table>
  </template>
