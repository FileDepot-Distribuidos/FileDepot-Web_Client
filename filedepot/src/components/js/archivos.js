import { ref } from 'vue';
import apiClient from '@/api/api.js';

export const archivos = ref([]);
export const ventana_agregar = ref(false);
export const archivoSeleccionadoId = ref(null); // 👉 Para manejar la visibilidad del popup por ID

// Abre o cierra la ventana correspondiente
export const togglePopup = (tipo, id = null) => {
  if (tipo === 'agregar') {
    ventana_agregar.value = !ventana_agregar.value;
    archivoSeleccionadoId.value = null;
  } else if (tipo === 'opciones') {
    archivoSeleccionadoId.value = archivoSeleccionadoId.value === id ? null : id;
    ventana_agregar.value = false;
  }
};

// Cierra todas las ventanas
export const cerrar_ventana = () => {
  ventana_agregar.value = false;
  archivoSeleccionadoId.value = null;
};

// Carga los archivos desde la API
export const cargarArchivos = async () => {
  try {
    const res = await apiClient.get('/files');
    const data = Array.isArray(res.data) ? res.data : res.data.files;

    archivos.value = data.map((archivo) => ({
      ...archivo,
      tamañoMB: (archivo.size / (1024 * 1024)).toFixed(2), // convierte a MB
    }));

    console.log('Archivos cargados:', archivos.value);
  } catch (error) {
    console.error("Error al cargar archivos:", error);
  }
};
