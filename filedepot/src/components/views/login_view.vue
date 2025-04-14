<template>
  <NavBar />
  <div class="cont">
    <div class="card">
      <div class="left-section">
        <h2>Inicia Sesión</h2>
        <p>para ir a FileDepot</p>
      </div>
      <div class="right-section">
        <input v-model="email" type="email" placeholder="Ingresa tu correo" />
        <input v-model="password" type="password" placeholder="Ingresa tu contraseña" />
        <div class="button-container">
          <button class="crear" @click="irARegistro">Crear cuenta</button>
          <button class="iniciar" @click="login">Iniciar sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/views/navbar_view.vue';
import { useAuthStore } from '@/stores/authStore';
import apiClient from '@/api/api'; // Asegúrate de importar el servicio API
import { ref } from 'vue';

export default {
  components: { NavBar },
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();

    const login = async () => {
      try {
        const response = await apiClient.post('/auth/login', { email: email.value, password: password.value });
        authStore.setToken(response.data.token); 
        alert('Login exitoso');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        window.location.href = '/';
      } catch (error) {
        console.error('Error en login:', error);
        alert('Error al iniciar sesión');
      }
    };

    return { email, password, login, irARegistro: () => window.location.href = '/registro' };
  }
};
</script>

<style>
@import url('../style/login.css');
</style>