<template>
  <div class="container" @click="cerrar_ventana">
    <nav class="navbar">
      <div class="logo">
        <img src="@/assets/logo.png" alt="FileDepot" />
        <span>FileDepot</span>
      </div>

    </nav>
    
    <div class="sidebar-container">
      <aside class="sidebar">
        <div id="new-button" @click.stop="togglePopup('agregar')">
          <h4 class="pi pi-plus-circle"></h4>
          <h4 class="text">Nuevo</h4>
        </div>
        <ul>
          <li @click="cambiarVista('principal')"><i class="pi pi-home"></i> Principal</li>
          <li @click="cambiarVista('compartidos')"><i class="pi pi-users"></i> Compartidos</li>
          <li @click="cambiarVista('almacenamiento')"><i class="pi pi-cloud"></i> Almacenamiento</li>
          <li @click="signOut"><i class="pi pi-sign-out"></i> Cerrar sesión</li>
        </ul>
      </aside>

      <div v-if="ventana_agregar" class="agregar" @click.stop>
        <div class="conte">
          <p @click="mostrarNuevaCarpeta">
            <i class="pi pi-folder" style="margin-right: 8px;"></i>
            Nueva carpeta
          </p>
          <p @click="subirArchivo">
            <i class="pi pi-upload" style="margin-right: 8px;"></i>
            Subir archivo
          </p>
        </div>
      </div>

      <input type="file" ref="fileInput" style="display: none" @change="manejarArchivo" />
      
      <div class="contenido">
        <ListaArchivos v-if="vistaActual === 'principal'" />
        <ArchivosCompartidos v-if="vistaActual === 'compartidos'" />
        <AlmacenamientoArchivos v-if="vistaActual === 'almacenamiento'" />
      </div>
    </div>

    <!-- Modal Nueva Carpeta -->
    <div v-if="mostrarModal" class="agregar_carpeta">
      <div class="modal-contenido">
        <h3>Nueva carpeta</h3>
        <input type="text" v-model="nombreCarpeta" placeholder="Título" />
        <div class="modal-botones">
          <button @click="cerrarModal" id="cancelar">Cancelar</button>
          <button @click="crearCarpeta">Crear</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { vistaActual, cambiarVista } from '@/components/js/principalViewLogic';
import { ventana_agregar, togglePopup, cerrar_ventana } from '../js/archivos';
import { fileInput, subirArchivo, manejarArchivo } from '@/components/js/subir_archivo';
import ListaArchivos from '@/components/views/Lista_Archivos.vue';
import ArchivosCompartidos from '@/components/views/Archivos_Compartidos.vue';
import AlmacenamientoArchivos from '@/components/views/Almacenamiento_Archivos.vue';
import { mostrarModal, nombreCarpeta, mostrarNuevaCarpeta, cerrarModal, crearCarpeta } from '@/components/js/crear_carpeta';
// import { sign } from 'core-js/core/number';
import { useAuthStore } from '@/stores/authStore';


export default {
  name: "PrincipalView",
  components: {
    ListaArchivos,
    ArchivosCompartidos,
    AlmacenamientoArchivos,
  },
  setup() {
    return {
      vistaActual,
      cambiarVista,
      ventana_agregar,
      togglePopup,
      cerrar_ventana,
      subirArchivo,
      manejarArchivo,
      fileInput,
      mostrarModal,
      nombreCarpeta,
      mostrarNuevaCarpeta,
      cerrarModal,
      crearCarpeta,
    };
  },
  methods: {
    irHome() {
      this.$router.push('/homepage');
    },
    signOut() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
@import url('../style/sidebar.css');
</style>
