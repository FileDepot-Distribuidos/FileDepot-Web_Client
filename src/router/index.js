// router/index.js
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
import archivo_view from '@/components/views/archivo_view.vue';
import carpeta_view from '@/components/views/carpeta_view.vue';
import archivos_carpeta from '@/components/views/Archivos_carpeta.vue';
  


const routes = [
  {
    path: '/',
    name: 'PrincipalView',
    component: Principal,
    meta: { requiresAuth: true },
  },
  {
    path: '/Archivos',
    name: 'ListaArchivos',
    component: ListaArchivos,
    meta: { requiresAuth: true },
  },
  {
    path: '/Compartidos',
    name: 'ArchivosCompartidos',
    component: ArchivosCompartidos,
    meta: { requiresAuth: true },
  },
  {
    path: '/Almacenamiento',
    name: 'AlmacenamientoArchivos',
    component: AlmacenamientoArchivos,
    meta: { requiresAuth: true },
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage,
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
  },
  {
    path: '/',
    name: 'archivo_view',
    component: archivo_view
  },
  {
    path: '/',
    name: ' carpeta_view',
    component: carpeta_view
  },
  {
    path: '/archivos_carpeta',
    name: 'archivos_carpeta',
    component: archivos_carpeta,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;