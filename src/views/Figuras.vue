<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getData } from '@/services/axios';

// Estado reactivo para las figuras
const figuras = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Cargar datos desde la API
async function cargarFiguras() {
  const data = await getData('/figura');
  figuras.value = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

// Filtrar figuras según la búsqueda
const figurasFiltradas = computed(() => {
  if (!searchQuery.value) return figuras.value;
  return figuras.value.filter(figura =>
    figura.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Paginación
const totalPages = computed(() => Math.ceil(figurasFiltradas.value.length / itemsPerPage.value));
const figurasPaginadas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return figurasFiltradas.value.slice(start, start + Number(itemsPerPage.value));
});

function setPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// Resetear `currentPage` cuando cambia `itemsPerPage`
watch(itemsPerPage, () => {
  currentPage.value = 1;
});

// Montar datos al iniciar
onMounted(() => {
  cargarFiguras();
});
</script>

<template>
  <body class="antialiased font-sans bg-gray-200">
    <div class="container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <h2 class="text-2xl font-semibold leading-tight">Figuras</h2>
        
        <!-- Controles de búsqueda y paginación -->
        <div class="my-2 flex flex-col sm:flex-row justify-between">
          <!-- Selector de cantidad por página -->
          <select v-model="itemsPerPage"
            class="h-full rounded border bg-white text-gray-700 py-2 px-4">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <!-- Input de búsqueda -->
          <input v-model="searchQuery" placeholder="Buscar..."
            class="appearance-none border border-gray-400 rounded py-2 px-4 text-gray-700 focus:outline-none" />
        </div>

        <!-- Tabla de datos -->
        <div class="overflow-x-auto shadow rounded-lg bg-white">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Nombre</th>
                <th class="px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Show</th>
                <th class="px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Modelo</th>
                <th class="px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Marca</th>
                <th class="px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Fecha de Compra</th>
                <th class="px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Precio</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="figura in figurasPaginadas" :key="figura.id">
                <td class="px-5 py-5 border-b text-gray-900">{{ figura.nombre }}</td>
                <td class="px-5 py-5 border-b text-gray-900">{{ figura.show.nombre }}</td>
                <td class="px-5 py-5 border-b text-gray-900">{{ figura.modelo.nombre }}</td>
                <td class="px-5 py-5 border-b text-gray-900">{{ figura.modelo.marca.nombre }}</td>
                <td class="px-5 py-5 border-b text-gray-900">{{ figura.fechaCompra }}</td>
                <td class="px-5 py-5 border-b text-gray-900">${{ figura.precio }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="flex justify-between items-center mt-4">
          <span class="text-xs text-gray-900">
            Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} - 
            {{ Math.min(currentPage * itemsPerPage, figurasFiltradas.length) }} de 
            {{ figurasFiltradas.length }} registros
          </span>
          <div>
            <button @click="setPage(currentPage - 1)" :disabled="currentPage === 1"
              class="bg-gray-300 px-4 py-2 rounded-l disabled:opacity-50">Anterior</button>
            <button @click="setPage(currentPage + 1)" :disabled="currentPage === totalPages"
              class="bg-gray-300 px-4 py-2 rounded-r disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
