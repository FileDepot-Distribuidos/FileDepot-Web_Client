import { ref } from 'vue';
import apiClient from '@/api/api.js';

export const archivos = ref([]);
export const ventana_agregar = ref(false);
export const ventana_renombrar = ref(false);
export const archivoSeleccionadoId = ref(null);
export const archivoParaRenombrar = ref(null);
export const archivoParaMover = ref(false);

export const togglePopup = (tipo, payload = null) => {
  switch (tipo) {
    case 'agregar':
      ventana_agregar.value = !ventana_agregar.value;
      archivoSeleccionadoId.value = null;
      break;
    case 'opciones':
      archivoSeleccionadoId.value = archivoSeleccionadoId.value === payload ? null : payload;
      ventana_agregar.value = false;
      break;
    case 'renombrar':
      archivoParaRenombrar.value = { ...payload };
      ventana_renombrar.value = true;
      break;
    case 'mover':
      archivoParaMover.value = { ...payload };
      break;
  }
};

export const cerrar_ventana = () => {
  ventana_agregar.value = false;
  ventana_renombrar.value = false;
  archivoSeleccionadoId.value = null;
  archivoParaMover.value = false;
};

export const cargarArchivos = async (idDirectorio) => {
  try {
    const res = await apiClient.get(`/files/dir/${idDirectorio}`);
    const data = Array.isArray(res.data) ? res.data : res.data.files;

    archivos.value = data.map((archivo) => {
      const sizeMB = archivo.size / (1024 * 1024);
      return {
        ...archivo,
        parsedSize: sizeMB < 1
          ? `${(archivo.size / 1024).toFixed(0)} KB`
          : `${sizeMB.toFixed(2)} MB`
      };
    });
  } catch (error) {
    console.error('Error al cargar archivos:', error);
  }
};

export const eliminarArchivo = async (idFILE) => {
  try {
    await apiClient.delete('/files', {
      data: { fileID: idFILE },
    });
    await cargarArchivos();
    cerrar_ventana();
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
  }
};

export const actualizarNombreArchivo = async (idFILE, newName) => {
  try {
    await apiClient.put('/rename', {
      oldFileName: idFILE,
      newFileName: newName,
    });
    await cargarArchivos();
    cerrar_ventana();
  } catch (error) {
    console.error('Error al renombrar archivo:', error);
  }
};
