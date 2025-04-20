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
        <!-- Escucha evento para actualizar ruta -->
        <ListaArchivos
          v-if="vistaActual === 'principal'"
          @directorio-cambiado="actualizarDirectorioActivo"
        />
        <ArchivosCompartidos v-if="vistaActual === 'compartidos'" />
        <AlmacenamientoArchivos v-if="vistaActual === 'almacenamiento'" />
        <Archivos_carpeta
          v-if="vistaActual === 'archivos_carpeta'"
          @directorio-cambiado="actualizarDirectorioActivo"
        />
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
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore';
import apiClient from "@/api/api";
import { vistaActual, cambiarVista } from '@/components/js/principalViewLogic';
import { ventana_agregar, togglePopup, cerrar_ventana } from '../js/archivos';
import { fileInput, subirArchivo, manejarArchivo } from '@/components/js/subir_archivo';
import { cargarTodosLosDirectorios } from '@/components/js/carpetas';

import ListaArchivos from '@/components/views/Lista_Archivos.vue';
import ArchivosCompartidos from '@/components/views/Archivos_Compartidos.vue';
import AlmacenamientoArchivos from '@/components/views/Almacenamiento_Archivos.vue';
import Archivos_carpeta from '@/components/views/Archivos_carpeta.vue';

export default {
  name: "PrincipalView",
  components: {
    ListaArchivos,
    ArchivosCompartidos,
    AlmacenamientoArchivos,
    Archivos_carpeta
  },
  setup() {
    const mostrarModal = ref(false);
    const nombreCarpeta = ref("");
    const idPadreCarpeta = ref(null);
    const pathdirectorio = ref("");

    // Abre el modal
    const mostrarNuevaCarpeta = () => {
      mostrarModal.value = true;
    };

    // Cierra y resetea modal
    const cerrarModal = () => {
      mostrarModal.value = false;
      nombreCarpeta.value = "";
    };

    // Crea nueva carpeta en el directorio activo
    const crearCarpeta = async () => {
      if (!nombreCarpeta.value.trim()) {
        return alert("El nombre de la carpeta no puede estar vacío.");
      }
      if (!idPadreCarpeta.value || !pathdirectorio.value) {
        return alert("No se especificó el directorio padre o el path está vacío.");
      }
      const basePath = pathdirectorio.value.replace(/\/+$/, "");
      const nuevaRuta = `${basePath}/${nombreCarpeta.value}`;

      try {
        const res = await apiClient.post("/directories", {
          path: nuevaRuta,
          isRoot: false,
          parentDirectory: idPadreCarpeta.value,
        });
        if (res.status === 201) {
          alert("Carpeta creada exitosamente.");
          // Solo actualizamos la ruta limpia
          pathdirectorio.value = basePath;
        }
        cerrarModal();
      } catch (err) {
        console.error("Error al crear la carpeta:", err);
        alert("Error al crear la carpeta.");
      }
    };

    // Inicializa con el primer directorio disponible
    onMounted(async () => {
      const primero = await cargarTodosLosDirectorios();
      if (primero) {
        idPadreCarpeta.value = primero.id;
        pathdirectorio.value = primero.path.replace(/\/+$/, "");
      }
    });
    const directorioActivo = ref({ id: null, path: '' });
    // Se dispara desde los hijos cuando varía el directorio
    const actualizarDirectorioActivo = ({ id, path }) => {
      idPadreCarpeta.value = id;
      pathdirectorio.value = path.replace(/\/+$/, "");
      console.log("📁 Directorio activo actualizado:", id, pathdirectorio.value);
      console.log("🧭 Nuevo directorio activo:", id, path);
      directorioActivo.value = { id, path };
    };

    return {
      vistaActual,
      cambiarVista,
      ventana_agregar,
      togglePopup,
      cerrar_ventana,
      fileInput,
      subirArchivo,
      manejarArchivo,
      mostrarModal,
      nombreCarpeta,
      mostrarNuevaCarpeta,
      cerrarModal,
      crearCarpeta,
      actualizarDirectorioActivo
    };
  },
  methods: {
    signOut() {
      useAuthStore().logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
@import url('../style/sidebar.css');
</style>
