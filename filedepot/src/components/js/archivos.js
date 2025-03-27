import { ref } from 'vue';

export const ventana_agregar = ref(false);
export const ventana_opciones = ref(false);

export const togglePopup = (tipo) => {
  if (tipo === "agregar") {
    ventana_agregar.value = !ventana_agregar.value;
    ventana_opciones.value = false;
  } else if (tipo === "opciones") {
    ventana_opciones.value = !ventana_opciones.value;
    ventana_agregar.value = false;
  }
};

export const cerrar_ventana = () => {
  ventana_agregar.value = false;
  ventana_opciones.value = false;
};
