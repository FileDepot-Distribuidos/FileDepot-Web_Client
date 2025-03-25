<template>
  <div class="container">
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
        <button id="new-button">Nuevo</button>
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
          <li>
            <a href="/login" style="text-decoration: none; color: inherit;">
              <i class="pi pi-sign-out" id="icon"></i> Cerrar sesión
            </a>
          </li>
        </ul>
      </aside>

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
    };
  },
};
</script>

<style>
@import url('../style/sidebar.css');
</style>
