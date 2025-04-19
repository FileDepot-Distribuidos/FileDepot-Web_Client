<template>
  <div class="contai">
    <h1>Este es tu almacenamiento en tu FileDepot</h1>
    <div class="content">
      <div class="barra-container">
        <div class="barra-fondo">
          <div class="barra-progreso" :style="{ width: porcentaje + '%' }"></div>
        </div>
        <p class="detalle">{{ total.toFixed(2) }} MB de {{ limite }} MB</p>
      </div>
      <div class="file-table">
        <div class="header row">
          <p>Nombre</p>
          <p>Fecha de creación</p>
          <p>Última modificación</p>
          <p>Tamaño</p>
        </div>

        <!-- Componente usado correctamente -->
        <Archivo_view @actualizarTotal="actualizarTotal" />
      </div>
    </div>

    <div v-if="ventana_opciones" class="opciones" @click.stop>
      <div class="conte">
        <p @click="crearCarpeta">
          <i class="pi pi-eye" style="margin-right: 8px;"></i>
          Ver archivo
        </p>
        <p @click="subirArchivo">
          <i class="pi pi-download" style="margin-right: 8px;"></i>
          Descargar archivo
        </p>
        <p @click="subirArchivo">
          <i class="pi pi-share-alt" style="margin-right: 8px;"></i>
          Compartir archivo
        </p>
        <p @click="subirArchivo">
          <i class="pi pi-arrows-alt" style="margin-right: 8px;"></i>
          Mover archivo
        </p>
        <p @click="subirArchivo">
          <i class="pi pi-file-edit" style="margin-right: 8px;"></i>
          Cambiar nombre
        </p>
        <p @click="subirArchivo">
          <i class="pi pi-trash" style="margin-right: 8px;"></i>
          Eliminar archivo
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ventana_opciones, togglePopup, cerrar_ventana } from '../js/archivos';
import Archivo_view from './archivo_view.vue';

export default {
  name: "AlmacenamientoArchivos",
  components: {
    Archivo_view
  },
  data() {
    return {
      total:0,
      limite: 500, // Límite de almacenamiento en MB
    };
  },
  computed: {
    porcentaje() {
      return (this.total / this.limite) * 100;
    },
  },
  methods: {
    actualizarTotal(nuevoTotal) {
      this.total = nuevoTotal;
    },
  },
  setup() {
    return {
      ventana_opciones,
      togglePopup,
      cerrar_ventana,
    };
  },
};
</script>

<style>
@import url('../style/lista.css');
</style>
