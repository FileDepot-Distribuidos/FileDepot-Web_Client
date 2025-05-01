<template>
    <div>
      <div
        class="archivo row"
        v-for="carpeta in carpetas"
        :key="carpeta.idDIRECTORY"
      >
        <p @click="abrirCarpeta(carpeta)">
          <i class="pi pi-folder" style="margin-right: 8px;"></i>
          {{ carpeta.path.split('/').pop() }}
        </p>
        <p>{{ new Date(carpeta.creation_date).toLocaleDateString('en-GB') || '00/00/2000' }}</p>
        <p>—</p>
        <p>—</p>
      </div>
  
      <div v-if="carpetas && carpetas.length === 0" class="mensaje-vacio">
        <p style="text-align: center; margin-top: 2rem; color: gray;">
          Todavía no hay carpetas
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import {
    carpetas,
    cerrar_ventana_carpetas,
    cargarCarpetas,
    cargarCarpetasCompartidas

  } from '../js/carpetas.js';
  
  import { useOpcionesStore } from '@/stores/store'; 
  import { vistaActual, cambiarVista } from '@/components/js/principalViewLogic';
  
  import { watch, onMounted, computed  } from 'vue';
  
  export default {
    name: 'compartidosdir_view',
    props: {
      idDirectorio: {
        type: Number,
        default: null,
      },
    },
    setup(props, { emit }) {

      const opcionesStore = useOpcionesStore();
      const mostrarOpciones = computed(() => opcionesStore.mostrarOpciones);
      const abrirCarpeta = (carpeta) => {
        // console.log('📁 ID carpeta:', carpeta.idDIRECTORY);
        // console.log('📂 Path carpeta:', carpeta.path);
        cambiarVista('archivos_carpeta', carpeta.idDIRECTORY, carpeta.path);
        emit('directorio-cambiado', { id: carpeta.idDIRECTORY, path: carpeta.path });
      };
  
      const cerrarVentana = () => cerrar_ventana_carpetas();
  
      watch(
        () => props.idDirectorio,
        (nuevoId) => {
          cargarCarpetas(nuevoId);
        },
        { immediate: true }
      );
  
      onMounted(() => {
            cargarCarpetasCompartidas();
      });
  
      return {
        vistaActual,
        cambiarVista,
        carpetas,
        abrirCarpeta,
        cerrarVentana,
        cargarCarpetasCompartidas,
        mostrarOpciones
      };
    },
  };
  </script>
  
  <style scoped>
  @import url('../style/lista.css');
</style>