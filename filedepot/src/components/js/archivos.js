import { ref } from 'vue';

export const ventana_agregar = ref(false);

export const togglePopup = () => {
  ventana_agregar.value = !ventana_agregar.value;
};

export const cerrar_ventana = () => {
  ventana_agregar.value = false;
};