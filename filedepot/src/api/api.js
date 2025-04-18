import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'vue-toastification';
// import router from '@/router'; // Asegúrate de que el router esté importado

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Interceptor para agregar el token a cada solicitud
apiClient.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    console.log('[TOKEN INTERCEPTOR]', authStore.token);
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
