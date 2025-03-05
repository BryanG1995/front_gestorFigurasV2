<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getData } from '@/services/axios';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination } from 'swiper/modules'; // Importa los módulos necesarios
import 'swiper/swiper-bundle.css'; // Importa los estilos de Swiper



const route = useRoute();
const figura = ref({});
const imagenes = ref([]); // Almacenar imágenes
const modalVisible = ref(false); // Controla la visibilidad del modal
const imagenSeleccionada = ref(null); // Almacena la imagen seleccionada


const props = defineProps({
    id: String // O Number, dependiendo del tipo de dato
});

async function cargarDetalles() {
    const id = route.params.id;
    const data = await getData(`/figura/${id}`);
    const dataImagen = await getData(`/figura-imagen/figura/${id}`);
    console.log(dataImagen)


    if (Array.isArray(data)) {
        figura.value = data[0] || {};
        imagenes.value = Array.isArray(dataImagen) ? dataImagen : [dataImagen]; // Asegúrate de que sea un array
    } else {
        figura.value = data;
        imagenes.value = Array.isArray(dataImagen) ? dataImagen : [dataImagen]; // Asegúrate de que sea un array
    }
}

// Función para abrir el modal con la imagen seleccionada
function abrirModal(imagen) {
    imagenSeleccionada.value = imagen;
    modalVisible.value = true;
}

// Función para cerrar el modal
function cerrarModal() {
    modalVisible.value = false;
}

onMounted(() => {
    cargarDetalles();
});
</script>

<template>

    <div class="bg-white overflow-hidden shadow rounded-lg border">
        <div v-if="figura && figura.nombre" class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ figura.nombre }}
            </h3>


        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Show
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ figura.show?.nombre }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Modelo
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ figura.modelo?.nombre }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Marca
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ figura.modelo?.marca.nombre }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Fecha Compra
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ figura.fechaCompra }}
                    </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium text-gray-500">
                        Precio
                    </dt>
                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ figura.precio }}
                    </dd>
                </div>
            </dl>
        </div>




    </div>

    <!-- Carrusel de imágenes -->
    <div v-if="imagenes.length > 0" class="max-w-2xl mx-auto">
        <swiper 
        :modules="[Autoplay, Pagination]" 
        :slides-per-view="1" 
        :loop="true" 
        :autoplay="{ delay: 3000 }"
        :pagination="{ clickable: true }" 
        :autoHeight="true" 
        class="rounded-lg shadow-lg"
        >
            <swiper-slide v-for="imagen in imagenes" :key="imagen.id">
                <img :src="imagen.imagenUrl" :alt="imagen.descripcion"
                    class="w-full h-64 object-cover rounded-lg cursor-pointer" @click="abrirModal(imagen)" />
                                        <!-- Descripción superpuesta -->
                    <div class="absolute bottom-0  right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                        <p class="text-sm text-center">{{ imagen.descripcion }}</p>
                    </div>
            </swiper-slide>
        </swiper>
    </div>
    <!-- Modal para la imagen expandida -->
<!-- Modal con transición -->
<transition name="fade">
        <div v-if="modalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" @click.self="cerrarModal">
            <div class="relative bg-white rounded-lg p-4 max-w-3xl max-h-[90vh] overflow-auto">
                <button @click="cerrarModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    &times;
                </button>
                <p class="mt-2 text-sm text-gray-700">{{ imagenSeleccionada.descripcion }}</p>
                <img
                    :src="imagenSeleccionada.imagenUrl"
                    :alt="imagenSeleccionada.descripcion"
                    class="w-full h-auto object-contain rounded-lg"
                />
                <!-- Descripción en el modal -->
              
            </div>
        </div>
    </transition>

</template>

