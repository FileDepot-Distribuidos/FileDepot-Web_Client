import axios from 'axios';
import { useToast } from 'vue-toastification';
import router from '@/router'; // importa tu router

const host = process.env.VUE_APP_API_HOST;
const port = process.env.VUE_APP_API_PORT;

const apiClient = axios.create({
  baseURL: `http://${host}:${port}/api`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

// Interceptor global para manejar errores
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 403) {
      const toast = useToast();
      const currentRoute = router.currentRoute.value; // ruta actual

      if (currentRoute.meta.requiresAuth) {
        toast.warning('Por favor, vuelve a iniciar sesión.');

        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }
    }

    return Promise.reject(error);
  }
);


export default apiClient;
