import { ref } from 'vue';

const vistaActual = ref('principal');

const cambiarVista = (vista) => {
  vistaActual.value = vista;
  // window.history.pushState(null, '', `/${vista}`);
};

export { vistaActual, cambiarVista };
