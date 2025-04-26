import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css';
import { useAuthStore } from './stores/authStore';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: false,
});

const auth = useAuthStore();

// No montes hasta saber si está autenticado
auth.checkAuth().then(() => {

  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !auth.isAuthenticated) {
      next('/login');
    } else if ((to.path === '/login' || to.path === '/registro') && auth.isAuthenticated) {
      next('/');
    } else {
      next();
    }
  });

  // Aquí revisas si ya estás en una ruta protegida
  if (router.currentRoute.value.meta.requiresAuth && !auth.isAuthenticated) {
    router.push('/login');
  }

  app.mount('#app');
});