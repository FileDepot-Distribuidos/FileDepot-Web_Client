import { ref } from "vue";
import apiClient from "@/api/api";
import { useToast } from 'vue-toastification';
import { cargarArchivos } from "@/components/js/archivos";

const fileInput = ref(null);
const toast = useToast();

const subirArchivo = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const manejarArchivo = (event) => {
  const archivoSeleccionado = event.target.files[0];

  if (!archivoSeleccionado) return;

  const tiposPermitidos = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",       // .xlsx
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    "application/pdf",
    "image/png",
    "image/jpeg",
  ];

  if (!tiposPermitidos.includes(archivoSeleccionado.type)) {
    toast.warning('Tipo de archivo no permitido. Solo se permiten Word, Excel, PowerPoint, PDF y PNG.', { timeout: 3500 });
    setTimeout(() => {
      window.location.reload();
    }, 3500);
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const base64Data = reader.result;

    const fileData = {
      name: archivoSeleccionado.name,
      type: archivoSeleccionado.type,
      size: archivoSeleccionado.size,
      base64: base64Data,
    };

    apiClient
      .post("/files", fileData)
      .then((response) => {
        console.log(response.data);
        toast.success('Archivo subido correctamente', { timeout: 2000 });
        setTimeout(() => {
          cargarArchivos();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error al enviar el archivo:", error);
        toast.error('Error al subir el archivo', { timeout: 2000 });
        setTimeout(() => {
          cargarArchivos();
        }, 2000);
      });
  };

  reader.onerror = (error) => {
    console.error("Error al leer el archivo:", error);
    alert("No se pudo leer el archivo");
  };

  reader.readAsDataURL(archivoSeleccionado);
};

export { fileInput, subirArchivo, manejarArchivo };
