import { ref } from "vue";
import apiClient from "@/api/api"; // Axios
import { useToast } from 'vue-toastification';
import { cargarCarpetas, toast } from "./carpetas";
import { directorioActualId } from "@/components/js/principalViewLogic";

const mostrarModal = ref(false);
const nombreCarpeta = ref("");
export const directorioActualId = ref(null); // Nuevo: para guardar el ID del directorio padre
const useToast = useToast();

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
      parentDirectory: idPadreCarpeta ,
    });

    if (response.status === 201) {
      toast.success("Carpeta creada exitosamente.", { timeout: 3500 });
      cargarCarpetas(directorioActualId.value);
    }
    cerrarModal();
  } catch (error) {
    console.error("Error al crear la carpeta:", error);
    toast.error("Error al crear la carpeta.", { timeout: 3500 });
  }
};

export {
  mostrarModal,
  nombreCarpeta,
  mostrarNuevaCarpeta,
  cerrarModal,
  crearCarpeta,
};
