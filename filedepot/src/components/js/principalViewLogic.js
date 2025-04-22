import { ref, watch } from 'vue';
import { cargarTodosLosDirectorios } from '@/components/js/carpetas.js'; // Asegúrate de tener la ruta correcta

const vistaActual = ref('principal');

export const directorioActualId = ref(0);
export const directorioActualPath = ref(null); // Nuevo


watch(directorioActualId, (nuevoValor) => {
  console.log('📁 Cambió directorio actual a:', nuevoValor);
});

const cambiarVista = async (vista, id = 0) => {
  vistaActual.value = vista;
  directorioActualId.value = id;

  // Obtener el path del directorio usando la función ya existente
  if (id !== null) {
    const resultado = await cargarTodosLosDirectorios({ id });
    if (resultado?.path) {
      directorioActualPath.value = resultado.path;
      console.log('📂 Path del directorio actual:', resultado.path);
    } else {
      directorioActualPath.value = null;
    }
  } else {
    directorioActualPath.value = null;
  }
};

export { vistaActual, cambiarVista };
