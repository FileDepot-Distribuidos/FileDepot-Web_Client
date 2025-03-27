<template>
    <nav class="navbar">
      <div class="logo"  @click="irHome">
        <img src="@/assets/logo.png" alt="FileDepot" />
        <span>FileDepot</span>
      </div>
    </nav>
</template>
<script>
export default {
    name: "NavBar",
    methods: {
        irHome() {
        this.$router.push('/homepage');
    },
    }
    };
</script>