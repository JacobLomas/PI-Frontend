<template>
  <div class="back-office p-grid pt-5">
    <PanelMenu :model="items" class="col-xl-2 col-12"/>
    <router-view class="col-xl-10 col-12 mt-5 mt-xl-0"/>
  </div>
</template>

<script>
export default {
  name: "BackOffice",
  data() {
    return {
      items: [
        {
          label: "Inicio",
          icon: "pi pi-fw pi-home",
          command: ()=>{this.$router.push("/")}
        },
        { 
          label:"Ventas",
          disabled:true
        },
        {
          label: "Pedidos",
          icon: "pi pi-fw pi-bell",
          items: [
            {
              label: "Pedidos pendientes",
              icon: "pi pi-fw pi-circle-off",
              
            },
            {
              label: "Pedidos completados",
              icon: "pi pi-fw pi-circle-on",
            },
            {
              label: "Todos",
              icon: "pi pi-fw pi-book",
              to: "admin/pedidos"
            }
          ],
        },
        {
          label: "Clientes / Usuarios",
          icon: "pi pi-fw pi-users",
          
        },
        {
          label: "Catálogo",
          icon: "pi pi-fw pi-book",
          items: [
            {
              label: "Productos",
              icon: "pi pi-fw pi-microsoft",
              to: "/admin/articulos"
            },
            {
              label: "Familias",
              icon: "pi pi-fw pi-tag",
              to: "/admin/familias"
            },
            {
              label: "Subfamilias",
              icon: "pi pi-fw pi-tags",
              to: "/admin/subfamilias"
            }
          ],
        },
        {
          label:"Estadísticas",
          icon: "pi pi-fw pi-chart-bar",
          items: [
            {
              label:"Ventas",
              icon: "pi pi-fw pi-euro",
              items:[
                {
                  label:"Último mes",
                  icon: "pi pi-fw pi-calendar"
                },
                {
                  label:"Este año",
                  icon: "pi pi-fw pi-calendar-times"
                }
              ]

            },
            {
              label:"Artículos",
              icon: "pi pi-fw pi-microsoft",
              items:[
                {
                  label:"Más vendidos",
                  icon: "pi pi-fw pi-chart-line"
                },
                {
                  label:"Más visitados",
                  icon: "pi pi-fw pi-globe"
                }
              ]

            }
          ]
        },
        {
          label:"Configuración de la tienda",
          disabled:true
        },
        { 
          label:"Puntos de venta",
          icon: "pi pi-fw pi-map-marker"
        }
      ],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>

<style scoped></style>
