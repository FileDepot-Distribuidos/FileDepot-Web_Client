import { ref } from 'vue';
import apiClient from '@/api/api.js';
import { useToast } from 'vue-toastification';
import { directorioActualId } from '@/components/js/principalViewLogic';


export const carpetas = ref([]);
export const todasLasCarpetas = ref([]);
export const carpetaSeleccionadaId = ref(null);
export const ventana_renombrar_carpeta = ref(false);
export const carpetaParaRenombrar = ref(null);
export const ventana_compartir_carpeta = ref(false);
export const ventana_mover_carpeta = ref(false);
export const carpetaParaCompartir = ref(null);
export const carpetaParaMover = ref(null);
export const ventana_agregar = ref(true);

export const toast = useToast();

export const togglePopupCarpeta = (tipo, payload = null) => {
  switch (tipo) {
    case 'opciones':
      carpetaSeleccionadaId.value = carpetaSeleccionadaId.value === payload ? null : payload;
      ventana_agregar.value = false;
      break;
    case 'renombrar':
      carpetaParaRenombrar.value = { ...payload };
      ventana_renombrar_carpeta.value = true;
      carpetaSeleccionadaId.value = null;
      break;
    case 'mover':
      carpetaParaMover.value = { ...payload };
      carpetaSeleccionadaId.value = null;
      break;
    case 'compartir':
      carpetaParaCompartir.value = { ...payload };
      ventana_compartir_carpeta.value = true;
      carpetaSeleccionadaId.value = null;
      break;
  }
};

export const cerrar_ventana_carpetas = () => {
  ventana_agregar.value = false;
  ventana_compartir_carpeta.value = false;
  ventana_renombrar_carpeta.value = false;
  ventana_mover_carpeta.value = false;
  carpetaSeleccionadaId.value = null;
  carpetaParaMover.value = null;
};

export const cargarCarpetas = async (idDirectorio) => {
  try {
    const res = await apiClient.get(`/directories/dir/${idDirectorio}`);
    const data = Array.isArray(res.data) ? res.data : res.data.folders;
    carpetas.value = data;
  } catch (error) {
    console.error('Error al cargar carpetas:', error);
  }
};

export const cargarCarpetasCompartidas = async () => {
  try {
    const res = await apiClient.get('/share/dirList');
    const data = Array.isArray(res.data) ? res.data : res.data.folders;
    carpetas.value = data;
  } catch (error) {
    console.error('Error al cargar carpetas:', error);
  }
};

export const cargarTodosLosDirectorios = async () => {
  try {
    const res = await apiClient.get('/directories');
    
    const data = Array.isArray(res.data) ? res.data : res.data.folders;

    const primerDirectorio = data[0]?.idDIRECTORY;
    const pathDirectorio = data[0]?.path;

    return {
      id: primerDirectorio,
      path: pathDirectorio
    };

  } catch (error) {
    console.error('Error al cargar todos los directorios:', error);
  }
};

export const listarTodosLosDirectorios = async () => {
  try {
    const res = await apiClient.get('/directories');
    const data = Array.isArray(res.data) ? res.data : res.data.folders;
    todasLasCarpetas.value = data;
  } catch (error) {
    console.error('Error al cargar todos los directorios:', error);
  }
};

export const compartirCarpeta = async (idDIRECTORY, email) => {
  try {
    await apiClient.post('/share/directory', {
      sharedDirectory: idDIRECTORY,
      sharedWith: email,
    }).then((response) => {
      console.log(response.data);
      toast.success('Carpeta compartida correctamente', { timeout: 2000 });
      cerrar_ventana_carpetas();
    }).catch((error) => {
      console.error('Error al compartir carpeta:', error);
      toast.error('Error al compartir la carpeta', { timeout: 2000 });
    });
  } catch (error) {
    console.error('Error al compartir carpeta:', error);
    toast.error('Error al compartir la carpeta', { timeout: 2000 });
  }
};


export const eliminarCarpeta = async (idDIRECTORY) => {
  try {
    await apiClient.delete('/directories', {
      data: { directoryID: idDIRECTORY },
    });
    toast.success('Carpeta eliminada correctamente', { timeout: 2000 });
    await cargarCarpetas(directorioActualId.value);
    cerrar_ventana_carpetas();
  } catch (error) {
    console.error('Error al eliminar carpeta:', error);
    toast.error('Error al eliminar carpeta', { timeout: 2000 });
    cerrar_ventana_carpetas();  
  }
};

export const actualizarNombreCarpeta = async (idDIRECTORY, newName) => {
  try {
    
    await apiClient.put('/directories/rename', {
      directoryID: idDIRECTORY,
      newName: newName,
    });

    toast.success('Carpeta renombrada correctamente', { timeout: 2000 });
    await cargarCarpetas(directorioActualId.value);
    cerrar_ventana_carpetas();
  } catch (error) {
    console.error('Error al renombrar carpeta:', error);
    toast.error('Error al renombrar carpeta', { timeout: 2000 });
    cerrar_ventana_carpetas();
  }
};

export const moverCarpeta = async (dirID, newDir) => {
  
  if (!dirID || !newDir) return;

  try {
    const response = await apiClient.put('/directoriessss/move', {
      directoryID: dirID,
      newDirectoryID: newDir,
    });

    if (response.status === 200) {
      toast.success(`Carpeta movida correctamente`);
      cerrar_ventana_carpetas();
      cargarCarpetas(directorioActualId.value);
    } else {
      toast.error('No se pudo mover el archivo');
    }
  } catch (error) {
    console.error('Error al mover carpeta:', error);
    toast.error('Ocurrió un error al mover la carpeta');
    cerrar_ventana_carpetas();
  }
};