<template>
    <NavBar />
    <div class="cont">
      <div class="card">
        <div class="left-section">
          <h2>Inicia Sesión</h2>
          <p>para ir a FileDepot</p>
        </div>
        <div class="right-section">
          <input type="email" placeholder="Ingresa tu correo" />
          <input type="password" placeholder="Ingresa tu contraseña" />
          <div class="button-container">
            <button class="crear" @click="irARegistro">Crear cuenta</button>
            <button class="iniciar">Iniciar sesión</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/views/navbar_view.vue';
  
  export default {
    name: "LoginView",
    components: {
      NavBar,
    },
    methods: {
      irARegistro() {
        this.$router.push('/registro');
      }
    }
  };
  </script>
  
  <style>
  @import url('../style/login.css');
</style>