import { ref } from "vue";
import apiClient from "@/api/api";
import { useToast } from 'vue-toastification';
import { cargarArchivos } from "@/components/js/archivos";
// import { directorioActualId } from "@/components/js/directorio_actual";
import { directorioActualId } from '@/components/js/principalViewLogic';

const fileInput = ref(null);
const toast = useToast();

const subirArchivo = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const manejarArchivo = (event) => {
  const archivosSeleccionados = Array.from(event.target.files);

  if (!archivosSeleccionados.length) return;

  if (archivosSeleccionados.length > 5) {
    toast.warning("Solo puedes subir hasta 5 archivos al mismo tiempo", { timeout: 3500 });
    return;
  }

  const tiposPermitidos = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",       // .xlsx
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    "application/pdf",
    "image/png",
    "image/jpeg",
  ];

  const archivosValidos = archivosSeleccionados.filter(archivo =>
    tiposPermitidos.includes(archivo.type)
  );

  if (archivosValidos.length !== archivosSeleccionados.length) {
    toast.warning('Algunos archivos tienen un tipo no permitido. Solo se permiten Word, Excel, PowerPoint, PDF, PNG y JPG.', { timeout: 4000 });
    return;
  }

  // Leer archivos como base64
  const leerArchivo = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          name: archivo.name,
          type: archivo.type,
          size: archivo.size,
          base64: reader.result,
        });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(archivo);
    });
  };
  Promise.all(archivosValidos.map(leerArchivo))
  .then((archivosProcesados) => {
    return apiClient.post("/files", {
      files: archivosProcesados,
      directoryId: directorioActualId.value, 
    });
  })
    .then((response) => {
      console.log(response.data);
      toast.success("Archivos subidos correctamente", { timeout: 2000 });
      setTimeout(() => {
        cargarArchivos(directorioActualId.value);
      }, 2000);
    })
    .catch((error) => {
      console.error("Error al subir archivos:", error);
      toast.error("Error al subir los archivos", { timeout: 2000 });
      setTimeout(() => {
        cargarArchivos(directorioActualId.value);
      }, 2000);
    });
};

export { fileInput, subirArchivo, manejarArchivo };