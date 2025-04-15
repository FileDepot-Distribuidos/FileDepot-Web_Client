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

    console.log('Archivos obtenidos:', data);
    

    archivos.value = data.map((archivo) => {
      const sizeMB = archivo.size / (1024 * 1024);
      return {
        ...archivo,
        parsedSize: sizeMB < 1
          ? `${(archivo.size / 1024).toFixed(0)} KB` // convertir a KB si es < 1MB
          : `${sizeMB.toFixed(2)} MB` // mostrar MB si es >= 1MB
      };
    });

    console.log('Archivos cargados:', archivos.value);
  } catch (error) {
    console.error("Error al cargar archivos:", error);
  }
};
