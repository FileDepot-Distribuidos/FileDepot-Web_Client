<template>
  <NavBar />
  <div class="cont">
    <div class="card">
      <div class="left-section">
        <h2>Crea una cuenta de FileDepot</h2>
        <p>Crear una cuenta en FileDepot es muy fácil</p>
      </div>
      <div class="right-section">
        <input v-model="email" type="email" placeholder="Ingresa tu correo" @input="validateEmail" />
        <span v-if="emailError" class="error">{{ emailError }}</span>

        <input v-model="password" type="password" placeholder="Ingresa tu contraseña" @input="validatePassword" />
        <span v-if="passwordError" class="error">{{ passwordError }}</span>

        <input v-model="phone" type="text" placeholder="Ingresa tu teléfono" @input="validatePhone" maxlength="10" />
        <span v-if="phoneError" class="error">{{ phoneError }}</span>

        <div class="button-container">
          <button class="crear" @click="irHome">Cancelar</button>
          <button class="iniciar" @click="register" :disabled="emailError || passwordError || phoneError">Crear cuenta</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/views/navbar_view.vue';
import apiClient from '@/api/api'; // Asegúrate de importar el servicio API
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  components: { NavBar },
  setup() {
    const toast = useToast();
    const email = ref('');
    const password = ref('');
    const phone = ref('');

    const register = async () => {
    try {
      await apiClient.post('/auth/register', {
        email: email.value,
        password: password.value,
        phone: phone.value
      }).then((response) => {
        console.log(response.data);
        toast.success('Registro exitoso. Ahora inicia sesión.');
        email.value = '';
        password.value = '';
        phone.value = '';

        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);

      }).catch((error) => {
        console.error('Error en el registro:', error.response.data);
        toast.error('Error al crear la cuenta. Intenta de nuevo.');
      });

    } catch (error) {
      console.error('Error en registro:', error);
      toast.error('Error al crear la cuenta. Intenta de nuevo.');
    }
  };


    return { email, password, phone, register, irHome: () => window.location.href = '/homepage' };
  }
};
</script>

<style>
@import url('../style/login.css');
</style>