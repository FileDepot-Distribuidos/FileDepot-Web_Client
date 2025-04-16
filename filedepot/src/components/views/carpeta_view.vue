<template>
    <div>
        <div class="archivo row">
            <p>
                <i class="pi pi-folder"></i>
                Nombre carpeta
            </p>
            <p>00/00/0000</p>
            <p>00/00/0000</p>
            <p>00</p>
        <!-- <div v-if="archivoSeleccionadoId === archivo.idFILE" class="opciones" @click.stop>
        <div class="conte">
            <p @click="verArchivo">
              <i class="pi pi-eye" style="margin-right: 8px;"></i> Ver archivo
            </p>
            <p @click="descargarArchivo">
              <i class="pi pi-download" style="margin-right: 8px;"></i> Descargar archivo
            </p>
            <p @click="subirArchivo">
              <i class="pi pi-share-alt" style="margin-right: 8px;"></i> Compartir archivo
            </p>
            <p @click="abrirVentanaMover(archivo)">
              <i class="pi pi-arrows-alt" style="margin-right: 8px;"></i> Mover archivo
            </p>
            <p @click="abrirVentanaRenombrar(archivo)">
              <i class="pi pi-file-edit" style="margin-right: 8px;"></i> Cambiar nombre
            </p>
            <p @click="eliminarArchivoDesdeVista(archivo.idFILE)">
              <i class="pi pi-trash" style="margin-right: 8px;"></i> Eliminar archivo
            </p>
          </div>
        </div>
      </div> -->
    </div>
    </div>
  </template>

  <script>
  import { ventana_opciones, togglePopup, cerrar_ventana } from '../js/archivos';
  
  export default {
    name: "carpeta_view",
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