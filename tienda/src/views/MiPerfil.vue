<template>
  <div class="mi-perfil p-grid">
    <Button
      icon="pi pi-bars"
      @click="panelLeft = true"
      class="ml-2 position-sticky"
      style="top: 10px; z-index: 1000; margin-top: -35px"
    />

    <Sidebar
      :visible.sync="panelLeft"
      :baseZIndex="1000"
      style="background-color: rgb(209 209 209)"
    >
      <h3 class="mt-4 mb-4">Mi perfil</h3>
      <Menu :model="items" class="w-100" />
      <Menu v-if="esAdmin" :model="itemsAdmin" class="mb-auto w-100" />
    </Sidebar>
    <div class="col-12 d-flex mb-3" style="background-color: #efefef">
      <h1 class="ml-auto mt-4 mb-4">{{ Ruta }}</h1>
      <Avatar
        class="ml-auto mt-4 mb-4"
        v-if="!fotoPerfil"
        icon="pi pi-user"
        size="large"
      />
      <div role="button" class="ml-auto mt-4 mb-4 pointer-event" @click="panelLeft = true">
        <Avatar
          v-if="fotoPerfil"
          :image="'http://13.58.30.123:8000' + fotoPerfil"
          size="large"
        />
      </div>
    </div>
    <Dialog
      :visible.sync="dialogoCambiarContrasena"
      :style="{ width: '450px' }"
      header="Cambiar contraseña"
      :modal="true"
    >
      <div class="p-5">
        <div class="p-field mb-3">
          <label for="old">Contraseña actual</label>
          <Password v-model="oldPass" toggleMask></Password>
        </div>
        <div class="p-field mb-3">
          <label for="old">Nueva contraseña</label>
          <Password v-model="newPass" toggleMask></Password>
        </div>
        <div class="p-field mb-3">
          <Button label="Actualizar" @click="actualizarContrasena()" />
        </div>
      </div>
    </Dialog>
    <router-view class="col-12 mt-5 mt-xl-0" />
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "MiPerfil",
  data() {
    return {
      esAdmin:false,
      panelLeft: true,
      fotoPerfil: null,
      oldPass: "",
      newPass: "",
      dialogoCambiarContrasena: false,
      itemsAdmin: [
        {
          label: "Ir a Administración",
          icon: "pi pi-fw pi-sitemap",
          to: "/admin",
        },
      ],
      items: [
        {
          label: "Volver a la tienda",
          icon: "pi pi-fw pi-home",
          to: "/",
        },
        {
          label: "Ir al carrito",
          icon: "pi pi-fw pi-shopping-cart",
          to: "/carrito",
        },
        {
          label: "Mis datos",
          icon: "pi pi-fw pi-id-card",
          to: "/perfil/info",
          command: () => {
            this.panelLeft = false;
            this.Ruta = this.$route.name;
          },
        },
        {
          label: "Favoritos",
          icon: "pi pi-fw pi-heart",
          to: "/perfil/favoritos",
          command: () => {
            this.panelLeft = false;
            this.Ruta = this.$route.name;
          },
        },
        {
          label: "Pedidos",
          icon: "pi pi-fw pi-book",
          to: "/perfil/pedidos",
          command: () => {
            this.panelLeft = false;
            this.Ruta = this.$route.name;
          },
        },
        {
          separator: true,
        },
        {
          label: "Cambiar contraseña",
          icon: "pi pi-fw pi-lock",
          command: () => {
            this.panelLeft = false;
            this.dialogoCambiarContrasena = true;
          },
        },
        {
          label: "Cerrar sesión",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            this.$store.dispatch("auth/logout");
            this.$router.push("/");
          },
        },
      ],
      Ruta: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    this.Ruta = this.$route.name;
    UserService.getUsuario().then((res) => {
      if (res.data.success) this.fotoPerfil = res.data.usuario.ximagen;
    });
    UserService.esAdministrador().then((res)=>{
      if(res.data.success)
        this.esAdmin=true
    }).catch()
  },
  methods: {
    actualizarContrasena() {
      if (this.newPass == this.oldPass)
        return this.$toast.add({
          severity: "error",
          summary: "La contraseña no puede ser la misma",
          life: 8000,
        });
      UserService.postActualizarPass(this.oldPass, this.newPass).then((res) => {
        if (res.data.success) {
          this.$toast.add({
            severity: "success",
            summary: res.data.descripcion,
            life: 300,
          });
          this.dialogoCambiarContrasena = false;
          this.$store.dispatch("auth/logout");
          this.$toast.add({
            severity: "info",
            summary: "Actualización de credenciales",
            life: 10000,
          });
          this.$router.push("/");
        } else {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: res.data.descripcion,
            life: 8000,
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
