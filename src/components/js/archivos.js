import { ref } from 'vue';
import apiClient from '@/api/api.js';
import { useToast } from 'vue-toastification';
import { directorioActualId } from '@/components/js/principalViewLogic';

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
    const archivo = archivos.value.find(a => a.idFILE === idFILE);
    if (!archivo) {
      console.error('Archivo no encontrado');
      return;
    }

    await apiClient.put('/files/rename', {
      fileID: idFILE,
      oldFileName: archivo.name,
      newFileName: newName,
    }).then;

    toast.success('Archivo renombrado correctamente', { timeout: 2000 });
    await cargarArchivos(directorioActualId.value);
    cerrar_ventana();
  } catch (error) {
    console.error('Error al renombrar archivo:', error);
    toast.error('Error al renombrar el archivo', { timeout: 2000 });
    cerrar_ventana();
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
   
    const response = await apiClient.get(`/files/download/${idFILE}`, {
      responseType: 'json'  
    });

   
    if (response.data.success) {
      const { filename, fileType, data } = response.data;

     
      const binaryData = atob(data); 
      const byteArray = new Uint8Array(binaryData.length);

      // Convertimos el string binario a un arreglo de bytes
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }

      
      const blob = new Blob([byteArray], { type: fileType });

   
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);  
      link.href = url;
      link.setAttribute('download', filename);  
      document.body.appendChild(link);
      link.click();  

     
      link.remove();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Error en la respuesta del servidor:', response.data.message);
    }
  } catch (error) {
    console.error('Error al descargar archivo:', error);
  }
};

//leer

export const leerArchivo = async (fileID) => {
 //se abre una ventana antes de realizar el proceso
  const previewWindow = window.open('', '_blank');
  if (!previewWindow) {
    return descargarArchivo(fileID);
  }

  try {
   
    const response = await apiClient.get(`/files/download/${fileID}`);
    const { success, data: base64Data, fileType, filename } = response.data;
    if (!success || !base64Data) throw new Error('No hay datos de archivo');

    
    previewWindow.document.title = filename;

   
    const byteChars   = atob(base64Data);
    const byteNumbers = Array.from(byteChars, c => c.charCodeAt(0));
    const blob        = new Blob([new Uint8Array(byteNumbers)], { type: fileType });
    const url         = URL.createObjectURL(blob);

   
    if (fileType.startsWith('image/')) {
      previewWindow.document.body.innerHTML = `
        <h1 style="font-family:sans-serif;">${filename}</h1>
        <img src="${url}" style="max-width:100%; height:auto;" />
      `;
    } else if (fileType === 'application/pdf') {
      previewWindow.document.body.innerHTML = `
        <h1 style="font-family:sans-serif;">${filename}</h1>
        <embed src="${url}" type="application/pdf" width="100%" height="100%"/>
      `;
    } else {
     
      previewWindow.location.href = url;
    }

  } catch (err) {
    console.error('No se pudo leer en línea:', err);
    previewWindow.close();
    descargarArchivo(fileID);
  }
};


//mover archivo
export const moverArchivo = async (carpeta) => {
  if (!archivoParaMover.value || !carpeta.idDIRECTORY) return;

  try {
    const response = await apiClient.put('/directories/move', {
      fileID: archivoParaMover.value.idFILE,
      newDirectoryID: carpeta.idDIRECTORY,
    });

    if (response.status === 200) {
      alert(`Archivo movido correctamente`);
      cerrar_ventana();
      cargarArchivos(carpetaSeleccionadaId.value || carpeta.idDIRECTORY); // Actualiza según contexto
    } else {
      alert('No se pudo mover el archivo');
    }
  } catch (error) {
    console.error('Error al mover archivo:', error);
    alert('Ocurrió un error al mover el archivo');
  }
};

