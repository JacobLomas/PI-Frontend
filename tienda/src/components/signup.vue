<template>
  <div class="signup">
    <div class="row mt-5 justify-content-center">
      <img
        class="col-md-6 d-md-block d-none"
        src="https://firebasestorage.googleapis.com/v0/b/tienda-online-15565.appspot.com/o/bag-1868758_960_720.webp?alt=media&token=ae23bbde-1eac-44fc-bafb-46e7689f441e"
      />
      <form @submit.prevent="handleSignup" class="p-fluid col-md-6">
        <h2>Registrarse</h2>
        <div class="row justify-content-center">
          <div class="p-col-12 p-col-md-6 p-3">
            <span class="p-float-label">
              <InputText
                type="text"
                v-model="user.nombre"
                :class="{ 'p-invalid': !nameValidation }"
              />
              <label for="username">Nombre</label>
            </span>
            <span class="p-float-label mt-4">
              <InputText
                type="text"
                v-model="user.apellidos"
                :class="{ 'p-invalid': !lastnameValidation }"
              />
              <label for="username">Apellido</label>
            </span>
            <span class="p-float-label mt-4">
              <InputText
                type="text"
                v-model="user.mail"
                :class="{ 'p-invalid': !mailValidation }"
              />
              <label for="username">Correo electrónico</label>
            </span>
            <span class="p-float-label mt-4">
              <Password
                inputClass="form-control"
                v-model="user.password"
                promptLabel="No válida"
                :feedback="true"
                :toggleMask="true"
                type="text"
                :class="{ 'p-invalid': !passwordValidation }"
              >
              </Password>
              <label for="password" class="d-block">Contraseña</label>
            </span>
          </div>
          <div class="p-col-12 p-col-md-6 p-3">
            <span class="p-float-label">
              <InputMask
                type="text"
                v-model="user.telf"
                mask="999-99-99-99"
                :class="{ 'p-invalid': !telfValidation }"
              />
              <label for="telf">Móvil</label>
            </span>
            <span class="p-float-label mt-4">
              <Calendar
                name="fechaNacimiento"
                v-model="fechaDat"
                dateFormat="dd-mm-yy"
                :manualInput="false"
                :monthNavigator="true"
                :yearNavigator="true"
                :maxDate="new Date()"
                :yearRange="'1900:' + new Date().getFullYear()"
                :class="{ 'p-invalid': !fechaNacimientoValidation }"
              />
              <label for="fechaNacimiento">Fecha de nacimiento</label>
            </span>
            <span class="p-float-label mt-4">
              
              <InputText
                id="direccion"
                v-model="user.direccion"
                required="true"
                :class="{ 'p-invalid': !user.direccion }"
              />
              <label for="name">Dirección</label>
            </span>
            <span class="p-inputgroup mt-4">
              <InputSwitch v-model="politicasAceptadas" name="privacidad" />
              <label class="ml-2" for="privacidad"
                >Acepto los <a href="https://ayudaleyprotecciondatos.es/wp-content/uploads/2018/07/terminos-condiciones-app.pdf" target="_blank" >términos y condiciones</a></label
              >
            </span>
          </div>
        </div>

        <div class="p-col-12 p-3">
          <Button
            type="submit"
            class="w-auto"
            label="Registrarse"
            :disabled="!sendForm"
            :icon="iconSubmit"
          >
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
export default {
  name: "signup",
  data() {
    return {
      user: new User(),
      fechaDat: null,
      submitted: false,
      message: "",
      politicasAceptadas: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    iconSubmit() {
      return this.submitted ? "pi pi-spin pi-spinner" : "pi pi-check";
    },
    nameValidation() {
      return this.user.nombre && /^[a-zA-Z]{2,30}$/.test(this.user.nombre);
    },
    lastnameValidation() {
      return (
        this.user.apellidos && /^[a-zA-Z]{2,30}$/.test(this.user.apellidos)
      );
    },
    mailValidation() {
      const regexp =
        /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
      return this.user.mail && regexp.test(this.user.mail);
    },
    passwordValidation() {
      return (
        this.user.password &&
        this.user.password.length <= 30 &&
        this.user.password.length >= 4
      );
    },
    telfValidation() {
      return this.user.telf && this.user.telf.length == 12;
    },
    fechaNacimientoValidation() {
      return this.fechaDat != null;
    },
    sendForm() {
      return (
        this.nameValidation &&
        this.lastnameValidation &&
        this.mailValidation &&
        this.passwordValidation &&
        this.telfValidation &&
        this.fechaNacimientoValidation &&
        this.politicasAceptadas
      );
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleSignup() {
      this.message = "";
      this.submitted = true;

      this.user.telf = this.user.telf.replace("-", "");
      this.user.telf = this.user.telf.replace("-", "");
      this.user.telf = this.user.telf.replace("-", "");
      this.user.fechaNacimiento =
        this.fechaDat.getDate() +
        "-" +
        this.fechaDat.getMonth() +
        "-" +
        this.fechaDat.getFullYear();
      this.$store.dispatch("auth/register", this.user).then(
        (data) => {
          this.message = data.descripcion;
          this.$router.push("/");
          this.$toast.add({
            severity: "success",
            summary: "Inicio sesión",
            detail: this.message + " " + this.user.nombre,
            life: 7000,
          });
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.$toast.add({
            severity: "error",
            summary: "Error inicio sesión",
            detail: this.message.descripcion,
            life: 7000,
          });
          this.submitted = false;
        }
      );
      this.submitted = false;
    },
  },
};
</script>

<style scoped></style>
