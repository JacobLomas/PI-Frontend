<template>
  <div class="loginsignup container">
    <TabMenu :model="items" class="mt-4"/>
    <router-view />

  </div>
</template>

<script>
export default {
  name: "LoginSignup",
  components: {},
  data() {
    return {
      items:[
        {label: "Iniciar sesión", icon: "pi pi-fw pi-user", to:"/login-signup/login"},
        {label: "Registrarse", icon: "pi pi-fw pi-user-plus", to:"/login-signup/signup"}
      ]
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped></style>
