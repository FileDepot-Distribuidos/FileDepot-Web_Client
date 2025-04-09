import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'primeicons/primeicons.css';
import { useAuthStore } from './stores/authStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/HomePage');
  } else if ((to.path === '/login' || to.path === '/registro') && auth.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

app.mount('#app');