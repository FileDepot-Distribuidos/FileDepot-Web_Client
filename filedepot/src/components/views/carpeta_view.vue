<template>
  <div>
    <div
      class="archivo row"
      v-for="carpeta in carpetas"
      :key="carpeta.idDIRECTORY"
    >
      <p  @click="cambiarVista('archivos_carpeta',carpeta.idDIRECTORY)">
        <i class="pi pi-folder" style="margin-right: 8px;"></i>
        {{ carpeta.path.split('/').pop() }}
      </p>
      <p>{{ new Date(carpeta.creation_date).toLocaleDateString('en-GB') || '00/00/2000' }}</p>
      <p>—</p>
      <p>—</p>

      <i
  class="pi pi-ellipsis-v"
  @click.stop="togglePopupCarpeta('opciones', carpeta.idFOLDER)"
></i>

      <div v-if="carpetaSeleccionadaId === carpeta.idFOLDER" class="opciones" @click.stop>
        <div class="conte">
          <p @click="abrirVentanaRenombrar(carpeta)">
            <i class="pi pi-file-edit" style="margin-right: 8px;"></i> Cambiar nombre
          </p>
          <p @click="eliminarCarpetaDesdeVista(carpeta.idFOLDER)">
            <i class="pi pi-trash" style="margin-right: 8px;"></i> Eliminar carpeta
          </p>
        </div>
      </div>
    </div>

    <div v-if="carpetas.length === 0" class="mensaje-vacio">
      <p style="text-align: center; margin-top: 2rem; color: gray;">Todavía no hay carpetas</p>
    </div>

    <div v-if="ventanaRenombrar" class="renombrar">
      <div class="ventana" @click.stop>
        <h3>Cambiar nombre de la carpeta</h3>
        <input type="text" v-model="carpetaRenombrar.name" />
        <div class="modal-buttons">
          <button @click="confirmarRenombrar">Guardar</button>
          <button @click.stop id="cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  carpetas,
  carpetaSeleccionadaId,
  cargarCarpetas,
  eliminarCarpeta,
  actualizarNombreCarpeta,
  togglePopupCarpeta,
  cerrar_ventana_carpetas,
  ventana_renombrar_carpeta,
  carpetaParaRenombrar
} from '../js/carpetas.js';
import {

  togglePopup,

} from '../js/archivos.js'
import { vistaActual, cambiarVista } from '@/components/js/principalViewLogic';

import { onMounted, computed } from 'vue';

export default {
  name: 'carpeta_view',
  props: {
    idDirectorio: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const abrirCarpeta = (id) => {
      // Aquí puedes emitir o cambiar el directorio actual para que se actualicen archivos y carpetas
      console.log("Abrir carpeta", id);
    };

    const abrirVentanaRenombrar = (carpeta) => togglePopupCarpeta('renombrar', carpeta);
    const eliminarCarpetaDesdeVista = async (id) => {
      if (confirm("¿Estás seguro de eliminar esta carpeta?")) {
        await eliminarCarpeta(id);
      }
    };

    const confirmarRenombrar = () => {
      if (carpetaRenombrar.value) {
        actualizarNombreCarpeta(carpetaRenombrar.value.idFOLDER, carpetaRenombrar.value.name);
      }
    };

    const cerrarVentana = () => cerrar_ventana_carpetas();

    const ventanaRenombrar = computed(() => ventana_renombrar_carpeta.value);
    const carpetaRenombrar = computed(() => carpetaParaRenombrar.value);

    onMounted(() => {
      cargarCarpetas(props.idDirectorio);
    });

    return {
      vistaActual,
      cambiarVista,
      carpetas,
      carpetaSeleccionadaId,
      abrirCarpeta,
      abrirVentanaRenombrar,
      eliminarCarpetaDesdeVista,
      confirmarRenombrar,
      cerrarVentana,
      ventanaRenombrar,
      carpetaRenombrar,
      togglePopup,
      togglePopupCarpeta
    };
  }
};
</script>

<style scoped>
@import url('../style/lista.css');
</style>
