<template>
    <div class="contai">
      <h1>Tu Filedepot </h1>
      <div class="content">
        <div class="file-table">
          <div class="header row">
            <p>Nombre</p>
            <p>Fecha de creación</p>
            <p>Última modificación</p>
            <p>Tamaño</p>
          </div>
          <Archivo_view :idDirectorio="directorioActualId"  />
          <Carpeta_view :idDirectorio="directorioActualId" />
        </div>
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
import Archivo_view from './archivo_view.vue';
import Carpeta_view from './carpeta_view.vue';
import { directorioActualId, directorioActualPath } from '@/components/js/principalViewLogic';
import { vistaActual, cambiarVista } from '@/components/js/principalViewLogic';
import { ref, onMounted } from 'vue';

export default {
  name: "archivos_carpeta",
  components: {
    Archivo_view,
    Carpeta_view
  },
  setup(_, { emit }) {
    const directorioActualLocal = ref(directorioActualId.value);

    onMounted(() => {
      directorioActualLocal.value = directorioActualId.value;

      // console.log("📁 Directorio actual ID (local):", directorioActualLocal.value);
      // console.log("🛤️ Path directorio actual:", directorioActualPath.value);

      // 🔁 Emitimos el cambio para que el padre (PrincipalView.vue) lo escuche
      emit('directorio-cambiado', {
        id: directorioActualLocal.value,
        path: directorioActualPath.value ?? ''
      });

      // console.log("📤 Evento emitido → directorio-cambiado:", {
      //   id: directorioActualLocal.value,
      //   path: directorioActualPath.value ?? ''
      // });
    });

    return {
      ventana_opciones,
      togglePopup,
      cerrar_ventana,
      directorioActualId,
      vistaActual,
      cambiarVista,
    };
  },
};
</script>

<style>
@import url('../style/lista.css');
</style>
