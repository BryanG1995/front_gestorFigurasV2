<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { postData, getData } from '@/services/axios';
import DropdownList from '@/components/DropdownList.vue'; // Importa el componente DropdownList

const router = useRouter();

// Campos para la figura
const nombre = ref('');
const idModelo = ref(null);
const idShow = ref(null);
const precio = ref('');
const fechaCompra = ref('');

// Listas de modelos y shows
const modelos = ref([]);
const shows = ref([]);

// Obtener los modelos y shows al montar el componente
onMounted(async () => {
  try {
    const modelosResponse = await getData('/modelo'); // Endpoint para obtener los modelos
    modelos.value = modelosResponse;

    const showsResponse = await getData('/show'); // Endpoint para obtener los shows
    shows.value = showsResponse;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
});

// Función para manejar la selección de un modelo
const selectModelo = (modelo) => {
  idModelo.value = modelo.id;
};

// Función para manejar la selección de un show
const selectShow = (show) => {
  idShow.value = show.id;
};

// Campos para las imágenes (máximo 3, con descripciones predefinidas)
const imagenes = ref([
  { file: null, descripcion: 'Frente' },
  { file: null, descripcion: 'Lado' },
  { file: null, descripcion: 'Atrás' }
]);

// Función para capturar el archivo seleccionado en el input
const handleFileUpload = (event, index) => {
  imagenes.value[index].file = event.target.files[0];
};

// Función para enviar el formulario
const submitForm = async () => {
  try {
    // Convertir idModelo e idShow a números enteros
    const idModeloNumber = Number(idModelo.value);
    const idShowNumber = Number(idShow.value);



    // Crear el objeto de datos
    const figuraData = {
      nombre: nombre.value,
      idModelo: idModeloNumber,
      idShow: idShowNumber,
      precio: precio.value,
      fechaCompra: fechaCompra.value || null,
    };

    // Enviar los datos al servidor
    const figuraResponse = await postData('/figura', figuraData);
    const idFigura = figuraResponse.id;

    // Subir imágenes (si las hay)
    //#TODO: probar si funciona carga al cargar imagenes y ademas probar si funciona el form al agregar una fecha
    for (const imagen of imagenes.value) {
      if (imagen.file) {
        const formData = new FormData();
        formData.append('idFigura', idFigura);
        formData.append('file', imagen.file);
        formData.append('descripcion', imagen.descripcion);
        await postData('/figura-imagenes', formData, true);
      }
    }

    // Redirigir a la lista de figuras
    router.push('/figura');
  } catch (error) {
    console.error('Error al enviar el formulario:', error.message || error.response?.data);
  }
};
</script>

<template>
  <section class="bg-white p-6 sm:p-8">
    <div class="max-w-2xl mx-auto border border-green-700 rounded-lg p-8">
      <h2 class="text-xl font-bold mb-6">Crear Figura</h2>
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <!-- Campo: Nombre -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              v-model="nombre"
              
              class="w-full border p-2 rounded"
            />
          </div>

          <!-- Campo: Show -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Show</label>
            <DropdownList
              :items="shows"
              placeholder="Seleccione un show"
              @select="selectShow"
            />
          </div>

          <!-- Campo: Modelo -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Modelo</label>
            <DropdownList
              :items="modelos"
              placeholder="Seleccione un modelo"
              @select="selectModelo"
            />
          </div>


          <!-- Campo: Precio -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              v-model="precio"
              
              class="w-full border p-2 rounded"
            />
          </div>

          <!-- Campo: Fecha de Compra -->
          <div>
            <label class="block text-sm font-medium text-gray-700">Fecha de Compra</label>
            <input
              type="date"
              v-model="fechaCompra"
              class="w-full border p-2 rounded"
            />
          </div>

          <!-- Sección: Subida de Imágenes -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div v-for="(imagen, index) in imagenes" :key="index">
              <label class="block text-sm font-medium text-gray-700">
                {{ imagen.descripcion }}
              </label>
              <input
                type="file"
                @change="(event) => handleFileUpload(event, index)"
                class="w-full border p-2 rounded"
              />
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            type="submit"
            class="bg-green-700 text-white px-6 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </section>
</template>