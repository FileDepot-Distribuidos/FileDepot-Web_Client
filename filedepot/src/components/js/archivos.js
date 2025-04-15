import { ref } from 'vue';
import apiClient from '@/api/api.js';

export const archivos = ref([]);
export const ventana_agregar = ref(false);
export const ventana_renombrar = ref(false); // Popup para renombrar
export const archivoSeleccionadoId = ref(null); // Para opciones
export const archivoParaRenombrar = ref(null);  // Objeto del archivo a renombrar

// Abre o cierra la ventana para agregar o mostrar opciones
export const togglePopup = (tipo, id = null) => {
  if (tipo === 'agregar') {
    ventana_agregar.value = !ventana_agregar.value;
    archivoSeleccionadoId.value = null;
  } else if (tipo === 'opciones') {
    archivoSeleccionadoId.value = archivoSeleccionadoId.value === id ? null : id;
    ventana_agregar.value = false;
  }
};

// Abre o cierra la ventana de renombrar
export const toggleRenamePopup = (archivo = null) => {
  if (archivo) {
    archivoParaRenombrar.value = { ...archivo }; // Clonamos el objeto para editarlo
    ventana_renombrar.value = true;
  } else {
    ventana_renombrar.value = false;
  }
};

// Cierra todas las ventanas emergentes
export const cerrar_ventana = () => {
  ventana_agregar.value = false;
  ventana_renombrar.value = false;

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
          ? `${(archivo.size / 1024).toFixed(0)} KB`
          : `${sizeMB.toFixed(2)} MB`
      };
    });

    console.log('Archivos cargados:', archivos.value);
  } catch (error) {
    console.error("Error al cargar archivos:", error);
  }
};

// Eliminar archivo
export const eliminarArchivo = async (idFILE) => {
  try {
    const res = await apiClient.delete('/files', {
      data: { fileID: idFILE },
    });
    console.log(res.data.message || 'Archivo eliminado');

    // Actualizar la lista después de eliminar
    await cargarArchivos();
    cerrar_ventana();
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
  }
};

// Actualizar el nombre del archivo
export const actualizarNombreArchivo = async (idFILE, newName) => {
  try {
    const res = await apiClient.put('/rename', { oldFileName: idFILE, newFileName: newName });
    console.log(res.data.message || 'Archivo renombrado');

    // Actualizar la lista
    await cargarArchivos();
    cerrar_ventana();
  } catch (error) {
    console.error('Error al renombrar archivo:', error);
  }
};
