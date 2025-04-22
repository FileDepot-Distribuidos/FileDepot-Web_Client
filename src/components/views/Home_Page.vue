<template>
    <NavBarHome />
    <div class="contain">
        <div class="conten">
            <div class="left">
                <h1>Gestiona, almacena y comparte archivos fácilmente con FileDepot</h1>
                <p>Olvídate de las complicaciones. Con FileDepot, tus archivos están siempre seguros y disponibles en la nube, listos para ser compartidos en segundos.</p>
                <button class="primary-btn" @click="irLogin">Iniciar sesión</button>
                <button @click="irRegistro">Registrate</button>
            </div>
            <div class="right">
            </div>
        </div>
    </div>
</template>
<script>
import NavBarHome from '@/components/views/navbar_home.vue';
export default {
    name: "HomePage",
    components: {
        NavBarHome,
    },
    methods: {
        irLogin() {
        this.$router.push('/login');
    },
    irRegistro(){
        this.$router.push('/registro')
    }
    }
    };
</script>
<style>
@import url('../style/home.css');
</style>