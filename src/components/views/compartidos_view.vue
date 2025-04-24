<template>
    <div>
      <div
        class="archivo row"
        v-for="archivo in archivos"
        :key="archivo.idFILE"
      >
        <p>
          <i 
            :class="['pi', obtenerIcono(archivo.type), obtenerColorIcono(archivo.type)]" 
            style="margin-right: 8px;">
          </i>
          {{ archivo.name.length > 37 ? archivo.name.substring(0, 35) + '...' : archivo.name }}
        </p>
        <p>{{ new Date(archivo.creation_date).toLocaleDateString('en-GB') || '00/00/2000' }}</p>
        <p>{{ new Date(archivo.last_modified).toLocaleDateString('en-GB') || '00/00/2000' }}</p>
        <p>{{ archivo.parsedSize }}</p>
  
        <i
          class="pi pi-ellipsis-v"
          @click.stop="togglePopup('opciones', archivo.idFILE)"
        ></i>
  
        <div v-if="archivoSeleccionadoId === archivo.idFILE" class="opciones" @click.stop>
          <div class="conte">
            <p @click="leerArchivo(archivo.idFILE)">
              <i class="pi pi-eye" style="margin-right: 8px;"></i> Ver archivo
            </p>
            <p @click="descargarArchivo(archivo.idFILE)">
              <i class="pi pi-download" style="margin-right: 8px;"></i> Descargar archivo
            </p>
            <!-- <p @click="abrirVentanaCompartir(archivo)">
              <i class="pi pi-share-alt" style="margin-right: 8px;"></i> Compartir archivo
            </p> -->
            <!-- <p @click="abrirVentanaMover(archivo)">
              <i class="pi pi-arrows-alt" style="margin-right: 8px;"></i> Mover archivo
            </p> -->
            <!-- <p @click="abrirVentanaRenombrar(archivo)">
              <i class="pi pi-file-edit" style="margin-right: 8px;"></i> Cambiar nombre
            </p> -->
            <!-- <p @click="eliminarArchivoDesdeVista(archivo.idFILE)">
              <i class="pi pi-trash" style="margin-right: 8px;"></i> Eliminar archivo
            </p> -->
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
    cargarArchivosCompartidos,
    descargarArchivo as descargarArchivoDesdeJS,
    leerArchivo as leerArchivoDesdeJS,
  } from '../js/archivos.js';
  import { directorioActualId } from '../js/principalViewLogic.js';

  import { onMounted, watch } from 'vue';
  
  export default {
    name: 'compartidos_view',
    components : {
      // Carpeta_view
    },
    props: {
      idDirectorio: {
        type: Number,
        default: null,
      },
    },
    emits: ['actualizarTotal'],
    setup() {
      const obtenerIcono = (tipo) => {
        if (!tipo) return 'pi pi-file';
        if (tipo.includes('pdf')) return 'pi pi-file-pdf';
        if (tipo.includes('word')) return 'pi pi-file-word';
        if (tipo.includes('image')) return 'pi pi-image';
        if (tipo.includes('presentation')) return 'pi pi-file-check';
        if (tipo.includes('spreadsheet')) return 'pi pi-file-excel';
        return 'pi pi-file';
      };
  
      const obtenerColorIcono = (tipo) => {
        if (!tipo) return 'color-default';
        if (tipo.includes('pdf')) return 'color-pdf';
        if (tipo.includes('word')) return 'color-word';
        if (tipo.includes('image')) return 'color-image';
        if (tipo.includes('presentationml')) return 'color-pptx';
        if (tipo.includes('spreadsheet')) return 'color-excel';
        return 'color-default';
      };
  
      const verArchivo = () => console.log('Ver archivo');
      const leerArchivo = idFILE => leerArchivoDesdeJS(idFILE);
  
      const descargarArchivo = (idFILE) => {
        return descargarArchivoDesdeJS(idFILE);
      };
  
      const subirArchivo = () => console.log('Acción no implementada');
  
      const cerrarVentana = () => cerrar_ventana();

  
      watch(archivos);
      onMounted(() => {
        cargarArchivosCompartidos();
      });

      return {
        archivos,
        archivoSeleccionadoId,
        togglePopup,
        obtenerIcono,
        obtenerColorIcono,
        verArchivo,
        descargarArchivo,
        subirArchivo,
        cerrarVentana,
        directorioActualId,
        leerArchivo,
      };
    },
  };
  </script>
  
  <style>
  @import url('../style/lista.css');
  </style>
  