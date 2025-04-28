import { defineStore } from 'pinia';

export const useOpcionesStore = defineStore('opciones', {
  state: () => ({
    mostrarOpciones: true, // Estado para controlar la visibilidad de las opciones
  }),
  actions: {
    ocultarOpciones() {
      this.mostrarOpciones = false;
    },
    mostrarOpciones() {
      this.mostrarOpciones = true;
    },
  },
});
