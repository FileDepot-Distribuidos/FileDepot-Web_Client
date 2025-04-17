import { ref } from 'vue';

const vistaActual = ref('principal');
export const directorioActualId = ref(null); // Agregado para saber en qué carpeta estamos

const cambiarVista = (vista, id=null) => {
  vistaActual.value = vista;
  // window.history.pushState(null, '', `/${vista}`);
  directorioActualId.value = id;
};

export { vistaActual, cambiarVista };
