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
          <li @click="cambiarVista('principal', 0)"><i class="pi pi-home"></i> Principal</li>
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

      <input type="file" ref="fileInput" style="display: none" @change="manejarArchivo" multiple />

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
          <button @click="cerrarModal" >Cancelar</button>
          <button @click="crearCarpeta" id="cancelar">Crear</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from '@/stores/authStore';
import apiClient from "@/api/api";
import { vistaActual, cambiarVista } from '@/components/js/principalViewLogic';
import { ventana_agregar, togglePopup, cerrar_ventana } from '../js/archivos';
import { fileInput, subirArchivo, manejarArchivo } from '@/components/js/subir_archivo';
import { cargarTodosLosDirectorios, cargarCarpetas } from '@/components/js/carpetas';
import { useToast } from 'vue-toastification';
import { directorioActualId, directorioActualPath } from '@/components/js/principalViewLogic';


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
    const toast = useToast();

    // Abre el modal
    const mostrarNuevaCarpeta = () => {
      mostrarModal.value = true;
    };

    // Cierra y resetea modal
    const cerrarModal = () => {
      mostrarModal.value = false;
      nombreCarpeta.value = "";
    };

    const cerrar = cerrar_ventana;

    // Crea nueva carpeta en el directorio activo
    const crearCarpeta = async () => {
      if (!nombreCarpeta.value.trim()) {
        return toast.warning("El nombre de la carpeta no puede estar vacío.");
      }

      if (!directorioActualId.value || !directorioActualPath.value) {
        return toast.warning("No se especificó el directorio padre o el path está vacío.");
      }

      const basePath = directorioActualPath.value.replace(/\/+$/, "");
      const nuevaRuta = `${basePath}/${nombreCarpeta.value}`;

      console.log("📁 Creando carpeta...");
      console.log("🧭 parentDirectory:", directorioActualId.value);
      console.log("📂 path completo:", nuevaRuta);

      try {
        const res = await apiClient.post("/directories", {
          path: nuevaRuta,
          isRoot: false,
          parentDirectory: directorioActualId.value,
        });

        if (res.status === 201) {
          toast.success("Carpeta creada exitosamente.", { timeout: 2000 });
          await cargarCarpetas(directorioActualId.value);
          pathdirectorio.value = basePath;
        }

        cerrarModal();
      } catch (err) {
        console.error("Error al crear la carpeta:", err);
        toast.error("Error al crear la carpeta.", { timeout: 2000 });
      }
    };

    // Inicializa con el primer directorio disponible
    onMounted(async () => {
      const primero = await cargarTodosLosDirectorios();
      if (primero) {
        idPadreCarpeta.value = primero.id;
        pathdirectorio.value = primero.path.replace(/\/+$/, "");
        directorioActualId.value = primero.id;
        directorioActualPath.value = primero.path;
      }

      // Cuando presionas recargar (o F5), antes de recargar la página, marca en sessionStorage
      window.addEventListener('beforeunload', (event) => {
        console.log(event);
        
        sessionStorage.setItem('isPageReloaded', 'true');
      });

      // Cuando la página ya se recargó, limpia esa marca
      if (sessionStorage.getItem('isPageReloaded') === 'true') {
        sessionStorage.removeItem('isPageReloaded');
      } else {
        // Si no hay marca, es un cierre real de pestaña o ventana
        window.addEventListener('unload', logoutOnClose);
      }
    });


    // Limpiar el evento cuando el componente se destruye
    onBeforeUnmount(() => {
      window.removeEventListener('unload', logoutOnClose);
    });


    const logoutOnClose = async () => {
      if (sessionStorage.getItem('isPageReloaded') !== 'true') {
        try {
          const auth = useAuthStore();
          await apiClient.post("/auth/logout");
          auth.authenticated = false; // Actualiza el estado de autenticación
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      }
    };

    const directorioActivo = ref({ id: null, path: '' });

    // Se actualiza cuando cambia el directorio activo
    const actualizarDirectorioActivo = ({ id, path }) => {
      idPadreCarpeta.value = id;
      pathdirectorio.value = path.replace(/\/+$/, "");
      directorioActualId.value = id;
      directorioActualPath.value = path; // ✅ sincronizar path global
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
      cerrar,
      crearCarpeta,
      actualizarDirectorioActivo,
      cargarTodosLosDirectorios,
      cargarCarpetas
    };
  },
  methods: {
    async signOut() {
      const auth = useAuthStore();
      await auth.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
@import url('../style/sidebar.css');
</style>