import { ref } from 'vue';
import apiClient from '@/api/api.js';
import { useToast } from 'vue-toastification';

export const carpetas = ref([]);
export const carpetaSeleccionadaId = ref(null);
export const ventana_renombrar_carpeta = ref(false);
export const carpetaParaRenombrar = ref(null);
export const ventana_compartir_carpeta = ref(false);
export const carpetaParaCompartir = ref(null);
export const toast = useToast();

export const togglePopupCarpeta = (tipo, payload = null) => {
  switch (tipo) {
    case 'opciones':
      carpetaSeleccionadaId.value = carpetaSeleccionadaId.value === payload ? null : payload;
      break;
    case 'renombrar':
      carpetaParaRenombrar.value = { ...payload };
      ventana_renombrar_carpeta.value = true;
      break;
    case 'compartir':
      carpetaParaCompartir.value = { ...payload };
      ventana_compartir_carpeta.value = true;
      break;
  }
};

export const cargarCarpetas = async (idDirectorio) => {
  try {
    const res = await apiClient.get(`/directories/dir/${idDirectorio}`);
    const data = Array.isArray(res.data) ? res.data : res.data.folders;

    console.log('Carpetas:', data);
    // Imprimir el path de cada carpeta
    data.forEach(carpeta => console.log(`Carpeta ID ${carpeta.idDIRECTORY}: path = ${carpeta.path}`));

    carpetas.value = data;
  } catch (error) {
    console.error('Error al cargar carpetas:', error);
  }
};

export const cargarTodosLosDirectorios = async () => {
  try {
    const res = await apiClient.get('/directories');
    
    const data = Array.isArray(res.data) ? res.data : res.data.folders;

    console.log('Todos los directorios del usuario:', data);
    console.log("Primer objeto en la lista:", data[0]);

    const primerDirectorio = data[0]?.idDIRECTORY;
    console.log("Primer ID de directorio:", primerDirectorio);
    const pathDirectorio = data[0]?.path;
    console.log("Primer path:", pathDirectorio)

    return {
      id: primerDirectorio,
      path: pathDirectorio
    };

  } catch (error) {
    console.error('Error al cargar todos los directorios:', error);
  }
};


// export const togglePopupCarpeta = (tipo, payload = null) => {
//   switch (tipo) {
//     case 'opciones':
//       carpetaSeleccionadaId.value =
//         carpetaSeleccionadaId.value === payload ? null : payload;
//       break;
//     case 'renombrar':
//       carpetaParaRenombrar.value = { ...payload };
//       ventana_renombrar_carpeta.value = true;
//       carpetaSeleccionadaId.value = null;
//       break;
//   }
// };


// export const eliminarCarpeta = async (idFOLDER) => {
//   try {
//     await apiClient.delete('/folders', {
//       data: { folderID: idFOLDER },
//     });
//     await cargarCarpetas(); // Recargar
//     cerrar_ventana_carpetas();
//   } catch (error) {
//     console.error('Error al eliminar carpeta:', error);
//   }
// };

// export const actualizarNombreCarpeta = async (idFOLDER, newName) => {
//   try {
//     await apiClient.put('/folders/rename', {
//       oldFolderName: idFOLDER,
//       newFolderName: newName,
//     });
//     await cargarCarpetas();
//     cerrar_ventana_carpetas();
//   } catch (error) {
//     console.error('Error al renombrar carpeta:', error);
//   }
// };


export const cerrar_ventana_carpetas = () => {
  ventana_compartir_carpeta.value = false;
  ventana_renombrar_carpeta.value = false;
  carpetaSeleccionadaId.value = null;
};