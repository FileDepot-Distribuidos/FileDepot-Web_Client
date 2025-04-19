import { ref, watch } from 'vue';

const vistaActual = ref('principal');
export const directorioActualId = ref(null);

watch(directorioActualId, (nuevoValor) => {
  console.log('📁 Cambió directorio actual a:', nuevoValor);
});

const cambiarVista = (vista, id=null) => {
  vistaActual.value = vista;
  // window.history.pushState(null, '', `/${vista}`);
  directorioActualId.value = id;
};

export { vistaActual, cambiarVista };
