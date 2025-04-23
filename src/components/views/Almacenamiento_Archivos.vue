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
        <Archivo_view :idDirectorio="null" @actualizarTotal="actualizarTotal" />
      </div>
    </div>
  </div>
</template>

<script>
import Archivo_view from './archivo_view.vue';

export default {
  name: "AlmacenamientoArchivos",
  components: {
    Archivo_view
  },
  data() {
    return {
      total:0,
      limite: 1000, // Límite de almacenamiento en MB
      idActual: null
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
    };
  },
};
</script>

<style>
@import url('../style/lista.css');
</style>
