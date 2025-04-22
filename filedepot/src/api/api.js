import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'vue-toastification';


const host = import.meta.env.VITE_API_HOST;
const port = import.meta.env.VITE_API_PORT;

const apiClient = axios.create({
  baseURL: `http://${host}:${port}/api`,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor para agregar el token a cada solicitud
apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}, error => Promise.reject(new Error(error)));

// Interceptor global para manejar errores
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403) {
      const authStore = useAuthStore();
      const toast = useToast();
      
      toast.warning('Caducó el acceso. Por favor, vuelve a iniciar sesión.');

      setTimeout(() => {
        authStore.logout();
        window.location.href = '/login';
      }, 3000);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
