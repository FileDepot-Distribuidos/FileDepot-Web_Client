<template>
  <div class="contai">
    <h1>Compartidos conmigo</h1>
    <div class="content">
      <div class="file-table">
        <div class="header row">
          <p>Nombre</p>
          <p>Fecha de creación</p>
          <p>Última modificación</p>
          <p>Tamaño</p>
        </div>
        <Compartidos_view />
        <Compartidosdir_view @directorio-cambiado="handleDirectorioCambiado" />
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
import Compartidos_view from './compartidos_view.vue';
import Compartidosdir_view from './compartidosdir_view.vue';

import { cargarArchivosCompartidos } from '../js/archivos';
import { cargarCarpetasCompartidas } from '../js/carpetas';

export default {
  name: "ArchivosCompartidos",
  components: {
    Compartidos_view,
    Compartidosdir_view,
  },
  setup() {
    const handleDirectorioCambiado = ({ id }) => {
      cargarCarpetasCompartidas(id);
      cargarArchivosCompartidos(id);
    };

    return {
      ventana_opciones,
      togglePopup,
      cerrar_ventana,
      handleDirectorioCambiado,
    };
  },
};
</script>

<style>
@import url('../style/lista.css');
</style>