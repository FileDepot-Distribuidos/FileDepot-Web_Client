<template>
  <div>
    <!-- Lista de archivos -->
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

      <!-- Opciones -->
      <i
        class="pi pi-ellipsis-v"
        @click.stop="togglePopup('opciones', archivo.idFILE)"
      ></i>

      <!-- Menú de opciones -->
      <div v-if="archivoSeleccionadoId === archivo.idFILE" class="opciones" @click.stop>
        <div class="conte">
          <p @click="leerArchivo(archivo.idFILE)">
            <i class="pi pi-eye" style="margin-right: 8px;"></i> Ver archivo
          </p>
        
          <p @click="descargarArchivo(archivo.idFILE)">
            <i class="pi pi-download" style="margin-right: 8px;"></i> Descargar archivo
          </p>
          <p @click="abrirVentanaCompartir(archivo)">
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
    </div>

    <!-- Mensaje vacío -->
    <div v-if="archivos.length === 0" class="mensaje-vacio">
      <p style="text-align: center; margin-top: 2rem; color: gray;">
        Todavía no hay archivos
      </p>
    </div>

    <!-- Modal: Renombrar -->
    <div v-if="ventanaRenombrar" class="renombrar">
      <div class="ventana" @click.stop>
        <h3>Cambiar nombre del archivo</h3>
        <input type="text" v-model="archivoRenombrar.name" />
        <div class="modal-buttons">
          <button @click="confirmarRenombrar">Guardar</button>
          <button @click="cerrarVentana" id="cancelar">Cancelar</button>
        </div>
      </div>
    </div>

    <!-- Modal: Compartir -->
    <div v-if="ventanaCompartir" class="renombrar">
      <div class="ventana" @click.stop>
        <h3>Compartir archivo</h3>
        <input
          type="email"
          v-model="emailCompartir"
          placeholder="Escribe el correo del usuario"
        />
        <div class="modal-buttons">
          <button @click="handleCompartir">Compartir</button>
          <button @click="cerrarVentana" id="cancelar">Cancelar</button>
        </div>
      </div>
    </div>



    <!-- Modal: Mover archivo -->
    <div v-if="archivoParaMover" class="mover">
      <div class="ventana" @click.stop>
        <h3>Mover archivo</h3>
        <!-- Scrollable list de carpetas -->
        <div class="contenedor-carpetas-scroll">
          <div
            class="carpeta"
            v-for="carpeta in carpetasParaMover"
            :key="carpeta.idDIRECTORY"
            @click="selectedMoveFolder = carpeta"
            :class="{ selected: selectedMoveFolder && selectedMoveFolder.idDIRECTORY === carpeta.idDIRECTORY }"
          >
            <i class="pi pi-folder" style="margin-right: 8px;"></i>
            {{ '/' + carpeta.path.split('/').slice(1).join('/') }}
          </div>
        </div>
        <!-- Botones -->
        <div class="modal-buttons">
          <button 
            :disabled="!selectedMoveFolder" 
            @click="moverArchivo(archivoParaMover.idFILE, selectedMoveFolder.idDIRECTORY)"
          >
            Mover
          </button>
          <button @click="cerrarVentana" id="cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  archivos,
  archivoSeleccionadoId,
  togglePopup,
  cerrar_ventana,
  cargarArchivos,
  eliminarArchivo,
  actualizarNombreArchivo,
  ventana_renombrar,
  ventana_compartir,
  archivoParaRenombrar,
  archivoParaMover,
  archivoParaCompartir,
  compartirArchivo,
  descargarArchivo as descargarArchivoDesdeJS,
  moverArchivo,
  leerArchivo as leerArchivoDesdeJS,

} from '../js/archivos.js';
import { directorioActualId } from '../js/principalViewLogic.js';
// import Carpeta_view from './carpeta_view.vue';
import {
  carpetas,
  cargarCarpetas,
  listarTodosLosDirectorios,
  todasLasCarpetas
} from '../js/carpetas.js';
import { ref, onMounted, computed, watch } from 'vue';

export default {
  name: 'archivo_view',
  props: {
    idDirectorio: { type: Number, default: null }
  },
  emits: ['actualizarTotal'],
  setup(props, { emit }) {

    const carpetasParaMover = computed(() =>
      todasLasCarpetas.value.filter(c => c.idDIRECTORY !== directorioActualId.value)
    );

    const emailCompartir = ref('');
    const selectedMoveFolder = ref(null);

    const handleCompartir = async () => {
      if (!emailCompartir.value) {
        alert('Por favor ingresa un correo electrónico válido.');
        return;
      }

      const archivo = archivoParaCompartir.value;
      if (archivo && archivo.idFILE) {
        await compartirArchivo(archivo.idFILE, emailCompartir.value);
        emailCompartir.value = '';
        cerrarVentana(); // <- esto cierra el modal

      } else {
        console.error('No se ha seleccionado archivo para compartir.');
      }
    };
    

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
    const descargarArchivo = idFILE => descargarArchivoDesdeJS(idFILE);
    const leerArchivo = idFILE => leerArchivoDesdeJS(idFILE);

    const abrirVentanaRenombrar = archivo => togglePopup('renombrar', archivo);
    const abrirVentanaCompartir = archivo => togglePopup('compartir', archivo);
    const abrirVentanaMover = archivo => {
      togglePopup('mover', archivo);
      selectedMoveFolder.value = null;
      listarTodosLosDirectorios();
    };

    const ventanaRenombrar = computed(() => ventana_renombrar.value);
    const ventanaCompartir = computed(() => ventana_compartir.value);
    const archivoRenombrar = computed(() => archivoParaRenombrar.value);

    const confirmarRenombrar = () => {
      if (archivoRenombrar.value) {
        actualizarNombreArchivo(archivoRenombrar.value.idFILE, archivoRenombrar.value.name);
      }
    };

    const cerrarVentana = () => {
      cerrar_ventana();
    };

    const eliminarArchivoDesdeVista = id => {
      if (confirm('¿Estás seguro de que deseas eliminar este archivo?')) {
        eliminarArchivo(id);
      }
    };

    const calcularTotalTamano = () => {
      let total = 0;
      archivos.value.forEach(a => {
        let p = a.parsedSize;
        if (p.includes('KB')) p = parseFloat(p)/1024;
        else p = parseFloat(p);
        if (!isNaN(p)) total += p;
      });
      emit('actualizarTotal', total);
    };

     // Efectos
     watch(archivos, calcularTotalTamano);

// Observamos el cambio en el idDirectorio y cargamos los archivos y carpetas correspondientes
watch(
  () => props.idDirectorio,
  (nuevoIdDirectorio) => {
    cargarArchivos(nuevoIdDirectorio); // Cargar los archivos del nuevo directorio
    cargarCarpetas(nuevoIdDirectorio);  // Cargar las carpetas del nuevo directorio
    calcularTotalTamano();
  },
  { immediate: true }  // Ejecutar al montar el componente también
);

onMounted(() => {
  cargarArchivos(props.idDirectorio);
  cargarCarpetas(props.idDirectorio);
  calcularTotalTamano();
});

    return {
      archivos,
      archivoSeleccionadoId,
      togglePopup,
      obtenerIcono,
      obtenerColorIcono,
      verArchivo,
      descargarArchivo,
      abrirVentanaRenombrar,
      abrirVentanaCompartir,
      abrirVentanaMover,
      eliminarArchivoDesdeVista,
      ventanaRenombrar,
      ventanaCompartir,
      archivoRenombrar,
      confirmarRenombrar,
      cerrarVentana,
      archivoParaMover,
      archivoParaCompartir,
      directorioActualId,
      handleCompartir,
      emailCompartir,
      carpetas,
      selectedMoveFolder,
      moverArchivo,
      leerArchivo,
      carpetasParaMover,
      todasLasCarpetas,
      listarTodosLosDirectorios
    };
  }
};
</script>

<style>
@import url('../style/lista.css');

/* Destacar carpeta seleccionada */
.carpeta.selected {
  background-color: rgba(0,123,255,0.1);
}

/* Scroll en listado de carpetas */
.contenedor-carpetas-scroll {
  max-height: 300px;
  overflow-y: auto;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 0.5rem;
}
</style>
