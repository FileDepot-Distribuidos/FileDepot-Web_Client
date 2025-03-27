import { ref } from "vue";

const fileInput = ref(null);

const subirArchivo = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const manejarArchivo = (event) => {
  const archivoSeleccionado = event.target.files[0];
  if (archivoSeleccionado) {
    alert(`Archivo seleccionado: ${archivoSeleccionado.name}`);
  }
};

export { fileInput, subirArchivo, manejarArchivo };
