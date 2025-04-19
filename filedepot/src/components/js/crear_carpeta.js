import { ref } from "vue";
import apiClient from "@/api/api"; // Axios

const mostrarModal = ref(false);
const nombreCarpeta = ref("");
export const directorioActualId = ref(null); // Nuevo: para guardar el ID del directorio padre

const mostrarNuevaCarpeta = (directorioActualId) => {
  idPadreCarpeta.value = directorioActualId;
  mostrarModal.value = true;
};
const cerrarModal = () => {
  mostrarModal.value = false;
  nombreCarpeta.value = "";
  idPadreCarpeta.value = null;
};

const crearCarpeta = async () => {
  if (!nombreCarpeta.value.trim()) {
    alert("El nombre de la carpeta no puede estar vacío.");
    return;
  }

  if (!directorioActualId.value) {
    alert("No se especificó el directorio padre.");
    return;
  }

  const nuevaRuta = `${String(directorioActualId.value)}/${String(nombreCarpeta.value)}`;


  try {
    const response = await apiClient.post("/directories", {
      path: nuevaRuta,
      isRoot: false,
      parentDirectory: idPadreCarpeta ,  // Asegúrate de que esto sea lo que espera la API
    });

    if (response.status === 201) {
      alert("Carpeta creada exitosamente.");
    }

    cerrarModal();
  } catch (error) {
    console.error("Error al crear la carpeta:", error);
    alert("Error al crear la carpeta.");
  }
};

export {
  mostrarModal,
  nombreCarpeta,
  mostrarNuevaCarpeta,
  cerrarModal,
  crearCarpeta,
};
