export default {
    name: "ListaArchivos",
    data() {
      return {
        files: [
          { id: 'excel', name: 'Archivo x', owner: 'Juan Diego', created: '20/03/2025', modified: '20/03/2025', size: '2MB', icon: 'pi-file-excel' },
          { id: 'word', name: 'Archivo x', owner: 'Juan Diego', created: '20/03/2025', modified: '20/03/2025', size: '2MB', icon: 'pi-file-word' },
          { id: 'pdf', name: 'Archivo x', owner: 'Juan Diego', created: '20/03/2025', modified: '20/03/2025', size: '2MB', icon: 'pi-file-pdf' },
          { id: 'image', name: 'Archivo x', owner: 'Juan Diego', created: '20/03/2025', modified: '20/03/2025', size: '2MB', icon: 'pi-image' },
          { id: 'folder', name: 'Archivo x', owner: 'Juan Diego', created: '20/03/2025', modified: '20/03/2025', size: '2MB', icon: 'pi-folder' }
        ],
        activeIndex: null,
        menuPosition: { top: '0px', left: '0px' }
      };
    },
    methods: {
      toggleMenu(index, event) {
        if (this.activeIndex === index) {
          this.activeIndex = null;
        } else {
          this.activeIndex = index;
          this.menuPosition = {
            top: `${event.clientY}px`,
            left: `${event.clientX}px`
          };
        }
      },
      closeMenu() {
        this.activeIndex = null;
      },
      openFile(file) {
        alert(`Abriendo ${file.name}`);
      },
      downloadFile(file) {
        alert(`Descargando ${file.name}`);
      },
      shareFile(file) {
        alert(`Compartiendo ${file.name}`);
      }
    }
  };    