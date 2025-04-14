import { ref } from "vue";
import apiClient from "@/api/api"; // Asegúrate de que api.js contiene la configuración de Axios

const mostrarModal = ref(false);
const nombreCarpeta = ref("");

const mostrarNuevaCarpeta = () => {
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  nombreCarpeta.value = ""; // Limpiar el input
};

const crearCarpeta = async () => {
  if (!nombreCarpeta.value.trim()) {
    alert("El nombre de la carpeta no puede estar vacío.");
    return;
  }

  try {
    const response = await apiClient.post("/directories", {
      nombre: nombreCarpeta.value,
    });

    alert(response.data.message); // Mostrar mensaje de respuesta del backend
    cerrarModal(); // Cerrar modal después de crear la carpeta
  } catch (error) {
    console.error("Error al crear la carpeta:", error);
    alert("Error al crear la carpeta.");
  }
};

export { mostrarModal, nombreCarpeta, mostrarNuevaCarpeta, cerrarModal, crearCarpeta };
