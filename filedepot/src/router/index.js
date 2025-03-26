import { createRouter, createWebHistory } from 'vue-router';
import Principal from "@/components/views/principal.vue";
import ListaArchivos from '@/components/views/Lista_Archivos.vue';
import ArchivosCompartidos from '@/components/views/Archivos_Compartidos.vue'
import AlmacenamientoArchivos from '@/components/views/Almacenamiento_Archivos.vue'
import LoginView  from '@/components/views/login_view.vue'
import NavBar from '@/components/views/navbar_view.vue'
import RegisterView from '@/components/views/registro_view.vue'
import HomePage from '@/components/views/Home_Page.vue'
import NavBarHome from '@/components/views/navbar_home.vue';

const routes = [
  {
    path: '/',
    name: 'PrincipalView',
    component: Principal,
  },
  {
    path: '/Archivos',
    name: 'ListaArchivos',
    component: ListaArchivos,
  },
  {
    path: '/Compartidos',
    name: 'ArchivosCompartidos',
    component: ArchivosCompartidos,
  },
  {
    path: '/Almacenamiento',
    name: 'AlmacenamientoArchivos',
    component: AlmacenamientoArchivos,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'NavBar',
    component: NavBar,
  }
  ,
  {
    path: '/registro',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/HomePage',
    name: 'Homepage',
    component: HomePage,
  }
  ,
  {
    path: '/',
    name: 'NavBarHome',
    component: NavBarHome,
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;