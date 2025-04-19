<template>
        <nav class="navbar">
        <div class="logo"  @click="irLogin">
            <img src="@/assets/logo.png" alt="FileDepot" />
        <span>FileDepot</span>
        </div>
        <button class="button_login">Iniciar sesion</button>
        </nav>
</template>
<script>
export default {
    name: "NavBarHome",
    methods: {
        irLogin() {
        this.$router.push('/login');
    },
    }
};
</script>