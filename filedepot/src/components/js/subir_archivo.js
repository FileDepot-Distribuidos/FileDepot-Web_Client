import { ref } from "vue";
import apiClient from "@/api/api";

const fileInput = ref(null);

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
    alert("Tipo de archivo no permitido. Solo se permiten Word, Excel, PowerPoint, PDF y PNG.");
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
      .post("/files/recibe", fileData)
      .then((response) => {
        console.log(response.data);
        alert("Archivo enviado correctamente al servidor");
      })
      .catch((error) => {
        console.error("Error al enviar el archivo:", error);
        alert("Error al enviar el archivo al servidor");
      });
  };

  reader.onerror = (error) => {
    console.error("Error al leer el archivo:", error);
    alert("No se pudo leer el archivo");
  };

  reader.readAsDataURL(archivoSeleccionado);
};

export { fileInput, subirArchivo, manejarArchivo };
