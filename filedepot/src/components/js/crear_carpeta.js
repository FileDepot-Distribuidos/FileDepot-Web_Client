import { ref } from "vue";
import apiClient from "@/api/api"; // Axios

const mostrarModal = ref(false);
const nombreCarpeta = ref("");
const idPadreCarpeta = ref(null); // Nuevo: para guardar el ID del directorio padre

const mostrarNuevaCarpeta = (idPadre) => {
  idPadreCarpeta.value = idPadre;
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

  if (!idPadreCarpeta.value) {
    alert("No se especificó el directorio padre.");
    return;
  }

  try {
    const response = await apiClient.post(`/directories/${idPadreCarpeta.value}`, {
      subdirectory: nombreCarpeta.value,
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
