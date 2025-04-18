import { ref } from 'vue';
import apiClient from '@/api/api.js';

export const carpetas = ref([]);
export const carpetaSeleccionadaId = ref(null);
export const ventana_renombrar_carpeta = ref(false);
export const carpetaParaRenombrar = ref(null);


export const cargarCarpetas = async (idDirectorio) => {
  try {
    const res = await apiClient.get(`/directories/dir/${idDirectorio}`);
    const data = Array.isArray(res.data) ? res.data : res.data.folders;

    console.log('Carpetas:', data);

    carpetas.value = data;
    
  } catch (error) {
    console.error('Error al cargar carpetas:', error);
  }
};

export const togglePopupCarpeta = (tipo, payload = null) => {
  switch (tipo) {
    case 'opciones':
      carpetaSeleccionadaId.value =
        carpetaSeleccionadaId.value === payload ? null : payload;
      break;
    case 'renombrar':
      carpetaParaRenombrar.value = { ...payload };
      ventana_renombrar_carpeta.value = true;
      carpetaSeleccionadaId.value = null;
      break;
  }
};

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
