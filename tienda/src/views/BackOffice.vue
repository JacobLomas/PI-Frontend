<template>
  <div class="back-office p-grid pt-1">
    <Button
      icon="pi pi-bars"
      @click="visibleLeft = true"
      class="ml-3 position-sticky"
      style="top: 10px; z-index: 1000; margin-top: -35px"
    />
    <div class="col-12 d-flex mb-3" style="background-color: #efefef">
      <h1 class="ml-auto mt-4 mb-4">{{ Ruta }}</h1>
      <div
        role="button"
        class="ml-auto mt-4 mb-4 pointer-event"
        @click="visibleLeft = true"
      >
        <Avatar
          v-if="fotoPerfil"
          :image="'http://13.58.30.123:8000' + fotoPerfil"
          size="large"
        />
      </div>
    </div>

    <Sidebar
      :visible.sync="visibleLeft"
      :baseZIndex="1000"
      style="background-color: rgb(209 209 209)"
    >
      <h3 class="mt-4 mb-4">BackOffice</h3>
      <PanelMenu :model="items" class="" />
    </Sidebar>

    <router-view class="col-12 mt-5 mt-xl-0" />
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "BackOffice",
  data() {
    return {
      visibleLeft: true,
      Ruta: null,
      fotoPerfil: null,
      items: [
        {
          label: "Volver a la tienda",
          icon: "pi pi-fw pi-home",
          command: () => {
            this.$router.push("/");
          },
        },
        {
          label: "Ventas",
          disabled: true,
        },
        {
          label: "Pedidos",
          icon: "pi pi-fw pi-bell",
          items: [
            {
              label: "Todos",
              icon: "pi pi-fw pi-book",
              to: "/admin/pedidos",
              command: () => {
                this.visibleLeft = false;
                this.Ruta = this.$route.name;
              },
            },
          ],
        },
        {
          label: "Clientes / Usuarios",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Todos",
              icon: "pi pi-fw pi-users",
              to: "/admin/usuarios",
              command: () => {
                this.visibleLeft = false;
                this.Ruta = this.$route.name;
              },
            },
          ],
        },
        {
          label: "Catálogo",
          icon: "pi pi-fw pi-book",
          items: [
            {
              label: "Productos",
              icon: "pi pi-fw pi-microsoft",
              to: "/admin/articulos",
              command: () => {
                this.visibleLeft = false;
                this.Ruta = this.$route.name;
              },
            },
            {
              label: "Familias",
              icon: "pi pi-fw pi-tag",
              to: "/admin/familias",
              command: () => {
                this.visibleLeft = false;
                this.Ruta = this.$route.name;
              },
            },
            {
              label: "Subfamilias",
              icon: "pi pi-fw pi-tags",
              to: "/admin/subfamilias",
              command: () => {
                this.visibleLeft = false;
                this.Ruta = this.$route.name;
              },
            },
          ],
        },
        {
          label: "Estadísticas",
          icon: "pi pi-fw pi-chart-bar",
          items: [
            {
              label: "Ventas",
              icon: "pi pi-fw pi-euro",
              items: [
                
                {
                  label: "Este año",
                  icon: "pi pi-fw pi-calendar",
                  to:"/admin/chartVentas",
                  command: () => {
                    this.visibleLeft = false;
                    this.Ruta = this.$route.name;
                  },
                },
              ],
            },
            {
              label: "Artículos",
              icon: "pi pi-fw pi-microsoft",
              items: [
                {
                  label: "Más vendidos",
                  icon: "pi pi-fw pi-chart-line",
                  to:"/admin/chartMasVendidos",
                  command: () => {
                    this.visibleLeft = false;
                    this.Ruta = this.$route.name;
                  },
                },
                {
                  label: "Más visitados",
                  icon: "pi pi-fw pi-globe",
                  to:"/admin/chartMasVisitados",
                  command: () => {
                    this.visibleLeft = false;
                    this.Ruta = this.$route.name;
                  },
                },
              ],
            },
          ],
        },
        {
          disabled:true
        },
        {
          label: "Cerrar sesión",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            this.$store.dispatch('auth/logout'); 
            this.$router.push("/");
          },
        },
      ],
    };
  },
  mounted() {
    this.Ruta = this.$route.name;
    UserService.getUsuario().then((res) => {
      if (res.data.success) this.fotoPerfil = res.data.usuario.ximagen;
    });
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>

<style>
.p-panelmenu
  .p-panelmenu-panel:last-child
  .p-panelmenu-header:not(.p-highlight)
  > a {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.p-panelmenu .p-panelmenu-header > a {
  border: 0px;
}
</style>
