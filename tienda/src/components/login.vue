<template>
  <div class="login">
    <div class="row mt-5">
      <img 
          class="col-md-6 d-md-block d-none"
          src="https://firebasestorage.googleapis.com/v0/b/tienda-online-15565.appspot.com/o/handbag-1478814_1920.jpg?alt=media&token=183a2f75-755d-4f87-bfbe-6147f6a0577b"
        >
      <form @submit.prevent="handleLogin" class=" p-fluid col-md-6" >     
        <h2>Iniciar sesión</h2>  
        <div class="p-col-12 p-3">
          <span class="p-float-label">
            <InputText type="text" v-model="user.mail" />
            <label for="username">Correo electrónico</label>
          </span>
        </div>
        <div class="p-col-12 p-3">
          <span class="p-float-label">
            <Password
              inputClass="form-control"
              v-model="user.password"
              promptLabel="No válida"
              :feedback="false"
              :toggleMask="true"
              type="text"
            >
            </Password>
            <label for="password" class="d-block">Contraseña</label>
          </span>
        </div>
        <div class="p-col-12 p-3">
          <Button type="submit" class="w-auto" label="Iniciar sesión" :disabled="loading" :icon="iconSubmit">
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
export default {
  name: "LoginSignup",
  components: {},
  data() {
    return {
      user: new User("", "", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    iconSubmit(){
      return this.loading 
      ? "pi pi-spin pi-spinner"
      : "pi pi-check"
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
    /*  this.$validator.validateAll().then((isValid) => {
          if (!isValid) {
            this.loading = false;
            return;
          }
        }); */

        if (this.user.mail && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      this.loading = false;

    },
  },
}
</script>

<style scoped></style>
