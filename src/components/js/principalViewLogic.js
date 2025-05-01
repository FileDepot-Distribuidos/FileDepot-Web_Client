import { ref, watch } from 'vue';
import { cargarTodosLosDirectorios } from '@/components/js/carpetas';

const vistaActual = ref('principal');

export const directorioActualId = ref(0);
export const directorioActualPath = ref(null);


watch(directorioActualId, (nuevoValor) => {
  console.log(nuevoValor);
});

const cambiarVista = async (vista, id = 0, path = null) => {

  if (id === 0) {
    const parent = await cargarTodosLosDirectorios();    
    id = parent.id;
    path = parent.path;
  }

  vistaActual.value = vista;
  directorioActualId.value = id;
  
  if (id !== null) {

    if (path !== null) {
      directorioActualPath.value = path;
    } else {
      directorioActualPath.value = null;
    }
  } else {
    directorioActualPath.value = null;
  }
};

export { vistaActual, cambiarVista };
