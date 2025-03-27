<template>
  <div class="contai">
    <h1>Te damos la bienvenida a tu FileDepot</h1>
    <div class="content">
        <table class="file-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Propietario</th>
              <th>Fecha de creación</th>
              <th>Última modificación</th>
              <th>Tamaño</th>
            </tr>
          </thead>
          <tbody>
            <tr class="archivo">
              <td class="pi pi-file-excel" id="excel"> Archivo x</td>
              <td>Juan Diego</td>
              <td>20/03/2025</td>
              <td>20/03/2025</td>
              <td>2MB</td>
              <td class="pi pi-ellipsis-v" @click.stop="togglePopup('opciones')"></td>
            </tr>
          </tbody>
          <tbody>
            <tr class="archivo">
              <td class="pi pi-file-word" id ="word"> Archivo x</td>
              <td>Juan Diego</td>
              <td>20/03/2025</td>
              <td>20/03/2025</td>
              <td>2MB</td>
              <td class="pi pi-ellipsis-v"></td>
            </tr>
          </tbody>
          <tbody>
            <tr class="archivo">
              <td class="pi pi-file-pdf" id="pdf"> Archivo x</td>
              <td>Juan Diego</td>
              <td>20/03/2025</td>
              <td>20/03/2025</td>
              <td>2MB</td>
              <td class="pi pi-ellipsis-v"></td>
            </tr>
          </tbody>
          <tbody>
            <tr class="archivo">
              <td class="pi pi-image" id="image"> Archivo x</td>
              <td>Juan Diego</td>
              <td>20/03/2025</td>
              <td>20/03/2025</td>
              <td>2MB</td>
              <td class="pi pi-ellipsis-v"></td>
            </tr>
          </tbody>
          <tbody>
            <tr class="archivo">
              <td class="pi pi-folder" id="folder"> Archivo x</td>
              <td>Juan Diego</td>
              <td>20/03/2025</td>
              <td>20/03/2025</td>
              <td>2MB</td>
              <td class="pi pi-ellipsis-v"></td>
            </tr>
          </tbody>
        </table>
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

export default {
  name: "ListaArchivos",
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