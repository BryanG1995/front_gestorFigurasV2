<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getData } from '@/services/axios';

const modelo = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(5);

async function cargarModelos() {
    const data = await getData('/modelo');
    modelo.value = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
}

// Filtrado de datos por búsqueda
const modelosFiltrados = computed(() => {
    if (!searchQuery.value) return modelo.value;
    return modelo.value.filter(modelo =>
        modelo.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Paginación
const totalPages = computed(() => Math.ceil(modelosFiltrados.value.length / itemsPerPage.value));
const modeloPaginadas = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return modelosFiltrados.value.slice(start, start + Number(itemsPerPage.value));
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
    cargarModelos();
});
</script>

<template>

    <body class="antialiased font-sans bg-gray-200">
        <div class="container mx-auto px-4 sm:px-8">
            <div class="py-8">
                <h2 class="text-2xl font-semibold leading-tight">Modelos</h2>

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
                                        Marca</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr v-for="modelo in modeloPaginadas" :key="modelo.id">
                                    <td class="px-5 py-5 border-b text-gray-900">{{ modelo.nombre }}</td>
                                    <td class="px-5 py-5 border-b text-gray-900">{{ modelo.marca.nombre }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Paginación -->
                <div class="flex justify-between items-center mt-4">
                    <span class="text-xs text-gray-900">
                        Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} -
                        {{ Math.min(currentPage * itemsPerPage, modelosFiltrados.length) }} de
                        {{ modelosFiltrados.length }} registros
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
