<template>
  <div class="container" @click="cerrar_ventana">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/logo.png" alt="FileDepot" />
        <span>FileDepot</span>
      </div>
      <input class="search-bar" type="text" placeholder="Buscar" />
      <i class="pi pi-user" style="color: transparent;"></i>
    </nav>
    
    <!-- Sidebar -->
    <div class="sidebar-container">
      <aside class="sidebar">
        <div id="new-button" @click.stop="togglePopup">
          <h4 class="pi pi-plus-circle"></h4>
          <h4 class="text">Nuevo</h4>
        </div>
        <ul>
          <li @click="cambiarVista('principal')">
            <i class="pi pi-home" id="icon"></i> Principal
          </li>
          <li @click="cambiarVista('compartidos')">
            <i class="pi pi-users" id="icon"></i> Compartidos
          </li>
          <li @click="cambiarVista('almacenamiento')">
            <i class="pi pi-cloud" id="icon"></i> Almacenamiento
          </li>
          <li @click="irHome">
            <i class="pi pi-sign-out" id="icon"></i> Cerrar sesión
          </li>
        </ul>
      </aside>
      <!-- Ventana agrehar -->
      <div v-if="ventana_agregar" class="agregar" @click.stop>
        <div class="conte">
          <p @click="crearCarpeta">
            <i class="pi pi-folder" style="margin-right: 8px;"></i>
            Nueva carpeta
          </p>
          <p @click="subirArchivo">
            <i class="pi pi-upload" style="margin-right: 8px;"></i>
            Subir archivo
          </p>
        </div>
      </div>

      <!-- Contenido dinámico -->
      <div class="contenido">
        <ListaArchivos v-if="vistaActual === 'principal'" />
        <ArchivosCompartidos v-if="vistaActual === 'compartidos'" />
        <AlmacenamientoArchivos v-if="vistaActual === 'almacenamiento'" />
      </div>
    </div>
  </div>
</template>

<script> 
import { vistaActual, cambiarVista } from '@/components/js/principalViewLogic';
import ListaArchivos from '@/components/views/Lista_Archivos.vue';
import ArchivosCompartidos from '@/components/views/Archivos_Compartidos.vue';
import AlmacenamientoArchivos from '@/components/views/Almacenamiento_Archivos.vue';
import { ventana_agregar, togglePopup, cerrar_ventana } from '../js/archivos';

export default {
  name: "PrincipalView",
  components: {
    ListaArchivos,
    ArchivosCompartidos,
    AlmacenamientoArchivos
  },
  setup() {
    return {
      vistaActual,
      cambiarVista,
      ventana_agregar,
      togglePopup,
      cerrar_ventana,
    };
  },
  methods: {
    irHome() {
      this.$router.push('/homepage');
    },
  },
};
</script>

<style scoped>
@import url('../style/sidebar.css');

</style>