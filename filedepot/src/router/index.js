// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Principal from "@/components/views/principal.vue";
import ListaArchivos from '@/components/views/Lista_Archivos.vue';
import ArchivosCompartidos from '@/components/views/Archivos_Compartidos.vue';
import AlmacenamientoArchivos from '@/components/views/Almacenamiento_Archivos.vue';
import LoginView from '@/components/views/login_view.vue';
import RegisterView from '@/components/views/registro_view.vue';
import HomePage from '@/components/views/Home_Page.vue';

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
    path: '/registro',
    name: 'Register',
    component: RegisterView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;