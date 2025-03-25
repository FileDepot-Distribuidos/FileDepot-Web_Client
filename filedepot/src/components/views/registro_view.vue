<template>
  <NavBar />
  <div class="cont">
    <div class="card">
      <div class="left-section">
        <h2>Crea una cuenta de FileDepot</h2>
        <p>Crear una cuenta en FileDepot es muy fácil</p>
      </div>
      <div class="right-section">
        <input type="email" placeholder="Ingresa tu correo" />
        <!-- <div class="password-input"> -->
          <input type="password" placeholder="Ingresa tu contraseña" />
          <!-- <i class="pi pi-eye-slash"></i>
        </div> -->
        <div class="button-container">
            <button class="crear">Cancelar</button>
            <button class="iniciar">crear cuenta</button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/views/navbar_view.vue';

export default {
  name: "RegisterView",
  components: {
    NavBar,
  },
 
};</script>
<style>
@import url('../style/login.css');
</style>