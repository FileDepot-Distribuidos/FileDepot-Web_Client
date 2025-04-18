import { ref } from 'vue';
import apiClient from '@/api/api.js';
import { useToast } from 'vue-toastification';
import { directorioActualId } from '@/components/js/directorio_actual.js';

export const archivos = ref([]);
export const ventana_agregar = ref(false);
export const ventana_renombrar = ref(false);
export const ventana_compartir = ref(false);
export const archivoSeleccionadoId = ref(null);
export const carpetaSeleccionadaId = ref(null);
export const archivoParaRenombrar = ref(null);
export const archivoParaMover = ref(false);
export const archivoParaCompartir = ref(false);
const toast = useToast();


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
      archivoSeleccionadoId.value = null;
      break;
    case 'mover':
      archivoParaMover.value = { ...payload };
      archivoSeleccionadoId.value = null;
      break;
    case 'compartir':
      archivoParaCompartir.value = { ...payload};
      ventana_compartir.value = true;
  }
};

export const cerrar_ventana = () => {
  ventana_agregar.value = false;
  ventana_renombrar.value = false;
  archivoSeleccionadoId.value = null;
  ventana_compartir.value = false;
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

export const cargarArchivosCompartidos = async () => {
  try {
    const res = await apiClient.get(`/share/list`);
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
    }).then((response) => {
      console.log(response.data);
      toast.info('Archivo eliminado correctamente', { timeout: 2000 });
      cerrar_ventana();
      setTimeout(() => {
        cargarArchivos(directorioActualId.value);
      }, 2000);
    }).catch((error) => {
      console.error('Error al eliminar archivo:', error);
      toast.error('Error al eliminar el archivo', { timeout: 2000 });
      cerrar_ventana();
      setTimeout(() => {
        cargarArchivos(directorioActualId.value);
      }, 2000);
    });
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

export const compartirArchivo = async (idFILE, email) => {
  try {
    await apiClient.post('/share/file', {
      sharedFile: idFILE,
      sharedWith: email,
    }).then((response) => {
      console.log(response.data);
      toast.success('Archivo compartido correctamente', { timeout: 2000 });
      cerrar_ventana();
    }).catch((error) => {
      console.error('Error al compartir archivo:', error);
      toast.error('Error al compartir el archivo', { timeout: 2000 });
    });
  } catch (error) {
    console.error('Error al compartir archivo:', error);
    toast.error('Error al compartir el archivo', { timeout: 2000 });
  }
}

//Download
export const descargarArchivo = async (idFILE) => {
  try {
    const response = await apiClient.get(`/archivo/${idFILE}`, {
      responseType: 'blob'
    });

    // Intentamos extraer el nombre del archivo desde los headers
    const disposition = response.headers['content-disposition'];
    let fileName = 'archivo_descargado';

    if (disposition && disposition.includes('filename=')) {
      fileName = disposition
        .split('filename=')[1]
        .replace(/"/g, '')
        .trim();
    }

    // Crear un blob y un enlace para forzar la descarga
    const blob = new Blob([response.data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();

    // Limpiar
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error al descargar archivo:', error);
  }
};
