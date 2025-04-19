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
  @click.stop="() => {
    console.log('Abriendo opciones para', carpeta.idDIRECTORY);
    togglePopupCarpeta('opciones', carpeta.idDIRECTORY);
  }"
/>

      <div v-if="carpetaSeleccionadaId === carpeta.idDIRECTORY" class="opciones" @click.stop>
        <div class="conte">
          <p @click="abrirVentanaRenombrar(carpeta)">
            <i class="pi pi-file-edit" style="margin-right: 8px;"></i> Cambiar nombre
          </p>
          <p @click="eliminarCarpetaDesdeVista(carpeta.idDIRECTORY)">
            <i class="pi pi-trash" style="margin-right: 8px;"></i> Eliminar carpeta
          </p>
          <p @click="abrirVentanaCompartir(carpeta)">
            <i class="pi pi-share-alt" style="margin-right: 8px;"></i> Compartir carpeta
          </p>
        </div>
      </div>
    </div>

    <div v-if="carpetas.length === 0" class="mensaje-vacio">
      <p style="text-align: center; margin-top: 2rem; color: gray;">Todavía no hay carpetas</p>
    </div>

    <!-- Modal para renombrar -->
    <div v-if="ventanaRenombrar" class="renombrar">
      <div class="ventana" @click.stop>
        <h3>Cambiar nombre de la carpeta</h3>
        <input type="text" v-model="carpetaRenombrar.name" />
        <div class="modal-buttons">
          <button @click="confirmarRenombrar">Guardar</button>
          <button @click="cerrarVentana" id="cancelar">Cancelar</button>
        </div>
      </div>
    </div>


        <!-- Modal para compartir -->
        <div v-if="ventanaCompartir" class="renombrar">
          <div class="ventana" @click.stop>
            <h3>Compartir carpeta</h3>
            <input
              type="email"
              v-model="emailCompartir"
              placeholder="Escribe el correo del usuario"
            />
            <div class="modal-buttons">
              <button @click="handleCompartir">Compartir</button>
              <button @click="cerrarVentana" id="cancelar">Cancelar</button>
            </div>
          </div>
        </div>

  </div>
</template>

<script>
import {
  carpetas,
  cargarCarpetas,
  eliminarCarpeta,
  actualizarNombreCarpeta,
  carpetaSeleccionadaId,
  togglePopupCarpeta,
  cerrar_ventana_carpetas,
  ventana_renombrar_carpeta,
  carpetaParaRenombrar,
  ventana_compartir_carpeta,
  carpetaParaCompartir,
  compartirCarpeta
} from '../js/carpetas.js';

import {
  togglePopup,
} from '../js/archivos.js'
import { vistaActual, cambiarVista } from '@/components/js/principalViewLogic';

import { ref, onMounted, computed } from 'vue';

export default {
  name: 'carpeta_view',
  props: {
    idDirectorio: {
      type: Number,
      default: null,
    },
  },
  setup(props) {

    const emailCompartir = ref('');

    const handleCompartir = async () => {
      if (!emailCompartir.value) {
        alert('Por favor ingresa un correo electrónico válido.');
        return;
      }

      const carpeta = carpetaParaCompartir.value;
      if (carpeta && carpeta.idDIRECTORY) {
        await compartirCarpeta(carpeta.idDIRECTORY, emailCompartir.value);
        emailCompartir.value = '';
        cerrarVentana(); // <- esto cierra el modal

      } else {
        console.error('No se ha seleccionado carpeta para compartir.');
      }
    };


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
    const abrirVentanaCompartir = (carpeta) => togglePopupCarpeta('compartir', carpeta);

    const confirmarRenombrar = () => {
      if (carpetaRenombrar.value) {
        actualizarNombreCarpeta(carpetaRenombrar.value.idDIRECTORY, carpetaRenombrar.value.name);
      }
    };

  const ventanaCompartir = computed(() => ventana_compartir_carpeta.value);

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
      abrirVentanaCompartir,
      eliminarCarpetaDesdeVista,
      confirmarRenombrar,
      cerrarVentana,
      ventanaRenombrar,
      carpetaRenombrar,
      togglePopup,
      togglePopupCarpeta,
      ventanaCompartir,
      handleCompartir,
      emailCompartir,
    };
  }
};
</script>

<style scoped>
@import url('../style/lista.css');
</style>
