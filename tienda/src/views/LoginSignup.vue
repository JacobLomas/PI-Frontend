<template>
  <div class="loginsignup m-sm-5 ">
    <Breadcrumb :home="home" :model="itemsBread" class="mb-3"/>
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
      home: { icon: "pi pi-home", to: "/" },
      itemsBread: [],
      
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
    console.log(this.$route)
    this.itemsBread = [{label: this.$route.name[0].toUpperCase() + this.$route.name.slice(1)}]
    console.log(this.routeName)
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  beforeUpdate(){
    this.itemsBread = [{label: this.$route.name[0].toUpperCase() + this.$route.name.slice(1)}]
  }
};
</script>

<style scoped></style>
