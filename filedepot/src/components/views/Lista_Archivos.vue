<template>
  <div class="contai">
    <h1>Te damos la bienvenida a tu FileDepot</h1>
    <!-- Contenido -->
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
              <td class="pi pi-ellipsis-v"></td>
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
  </div>
</template>

<script>
export default {
  name: "ListaArchivos",
};
</script>

<style>
@import url('../style/lista.css');
</style>