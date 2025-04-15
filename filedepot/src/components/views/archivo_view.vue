<template>
  <div>
    <div
      class="archivo row"
      v-for="archivo in archivos"
      :key="archivo.idFILE"
    >
      <p>
        <i :class="obtenerIcono(archivo.type)" style="margin-right: 8px;"></i>
        {{ archivo.name }}
      </p> 
      <p>{{ new Date(archivo.creation_date).toLocaleDateString('en-GB') || '00/00/2000' }}</p>
      <p>{{ new Date(archivo.last_modified).toLocaleDateString('en-GB') || '00/00/2000' }}</p>
      <p>{{ archivo.parsedSize }}</p>
      
      <!-- Botón de opciones -->
      <i
        class="pi pi-ellipsis-v"
        @click.stop="togglePopup('opciones', archivo.idFILE)"
      ></i>

      <!-- Opciones solo si el ID coincide -->
      <div v-if="archivoSeleccionadoId === archivo.idFILE" class="opciones" @click.stop>
        <div class="conte">
          <p @click="verArchivo"><i class="pi pi-eye" style="margin-right: 8px;"></i> Ver archivo</p>
          <p @click="descargarArchivo"><i class="pi pi-download" style="margin-right: 8px;"></i> Descargar archivo</p>
          <p @click="subirArchivo"><i class="pi pi-share-alt" style="margin-right: 8px;"></i> Compartir archivo</p>
          <p @click="subirArchivo"><i class="pi pi-arrows-alt" style="margin-right: 8px;"></i> Mover archivo</p>
          <p @click="subirArchivo"><i class="pi pi-file-edit" style="margin-right: 8px;"></i> Cambiar nombre</p>
          <p @click="subirArchivo"><i class="pi pi-trash" style="margin-right: 8px;"></i> Eliminar archivo</p>
        </div>
      </div>
    </div>

    <div v-if="archivos.length === 0" class="mensaje-vacio">
      <p style="text-align: center; margin-top: 2rem; color: gray;">Todavía no hay archivos</p>
    </div>
  </div>
</template>

<script>
import {
  archivos,
  archivoSeleccionadoId,
  togglePopup,
  cerrar_ventana,
  cargarArchivos,
} from '../js/archivos.js';

import { onMounted } from 'vue';

export default {
  name: 'archivo_view',
  setup() {
    const obtenerIcono = (tipo) => {
      if (!tipo) return 'pi pi-file';
      if (tipo.includes('pdf')) return 'pi pi-file-pdf';
      if (tipo.includes('word')) return 'pi pi-file-word';
      if (tipo.includes('image')) return 'pi pi-image';
      return 'pi pi-file';
    };

    const verArchivo = () => console.log('Ver archivo');
    const descargarArchivo = () => console.log('Descargar archivo');
    const subirArchivo = () => console.log('Acción no implementada');

    onMounted(() => {
      cargarArchivos();
    });

    return {
      archivos,
      archivoSeleccionadoId,
      togglePopup,
      cerrar_ventana,
      obtenerIcono,
      verArchivo,
      descargarArchivo,
      subirArchivo,
    };
  },
};
</script>

<style>
@import url('../style/lista.css');
</style>
