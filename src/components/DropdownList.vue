<template>
    <div class="relative group">
      <button
        type="button" 
        @click="toggleDropdown"
        class="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
      >
        <span>{{ selectedOption || placeholder }}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 w-full z-10"
        style="max-height: 200px; overflow-y: auto;"
      >
        <!-- Search input -->
        <input
          v-model="searchQuery"
          class="block w-full px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
          type="text"
          placeholder="Buscar..."
          autocomplete="off"
        />
        <!-- Dropdown content -->
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          @click="selectItem(item)"
          class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
        >
          {{ item.nombre }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Seleccione una opción',
    },
  });
  
  const emit = defineEmits(['select']);
  
  const isOpen = ref(false);
  const searchQuery = ref('');
  const selectedOption = ref('');
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const selectItem = (item) => {
    selectedOption.value = item.nombre;
    emit('select', item);
    isOpen.value = false;
  };
  
  const filteredItems = computed(() => {
    return props.items
      .filter((item) =>
        item.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
  });
  </script>