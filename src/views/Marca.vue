<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getData } from '@/services/axios';

const marca = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);

async function cargarMarcas() {
  const data = await getData('/marca');
  marca.value = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

// Filtrado de datos por búsqueda
const marcaFiltrados = computed(() => {
  if (!searchQuery.value) return marca.value;
  return marca.value.filter(marca =>
    marca.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Paginación
const totalPages = computed(() => Math.ceil(marcaFiltrados.value.length / itemsPerPage.value));
const marcaPaginadas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return marcaFiltrados.value.slice(start, start + Number(itemsPerPage.value));
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

onMounted(() => {
  cargarMarcas();
});
</script>

<template>

  <body class="antialiased font-sans bg-gray-200">
    <div class="container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <h2 class="text-2xl font-semibold leading-tight">Marcas</h2>

        <!-- Controles de búsqueda y paginación -->
        <div class="my-2 flex flex-col sm:flex-row justify-between">
          <select v-model="itemsPerPage" class="h-full rounded border bg-white text-gray-700 py-2 px-4">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>

          <input v-model="searchQuery" placeholder="Buscar..."
            class="appearance-none border border-gray-400 rounded py-2 px-4 text-gray-700 focus:outline-none" />
        </div>

        <!-- Tabla de datos -->
        <div class="overflow-x-auto shadow rounded-lg bg-white">
          <div class="max-h-160 overflow-y-auto">
            <table class="min-w-full">
              <thead class="bg-gray-100 sticky top-0 z-10 shadow">
                <tr>
                  <th
                    class="w-40  px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                    Nombre</th>
                  <th
                    class="w-40  px-5 py-3 border-b bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                    Pais</th>
                </tr>

              </thead>
              <tbody>
                <tr v-for="marcas in marcaPaginadas" :key="marcas.id">
                  <td class="px-5 py-5 border-b text-gray-900">{{ marcas.nombre }}</td>
                  <td class="px-5 py-5 border-b text-gray-900">{{ marcas.pais.nombre }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Paginación -->
        <div class="flex justify-between items-center mt-4">
          <span class="text-xs text-gray-900">
            Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} -
            {{ Math.min(currentPage * itemsPerPage, marcaFiltrados.length) }} de
            {{ marcaFiltrados.length }} registros
          </span>
          <div>
            <button @click="setPage(currentPage - 1)" :disabled="currentPage === 1"
              class="bg-gray-300 px-4 py-2 rounded-l disabled:opacity-50">Anterior</button>
            <button @click="setPage(currentPage + 1)" :disabled="currentPage >= totalPages.value"
              class="bg-gray-300 px-4 py-2 rounded-r disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
