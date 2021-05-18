<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <router-link to="/">
          <img src="../assets/logo.png" alt="Logo" height="70" />
        </router-link>
      </template>
      <template #end>
        <router-link to="/login-signup/login">
          <Button label="Iniciar sesión" icon="pi pi-users"/>
        </router-link>
    </template>
    </Menubar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "navbar",
  data() {
    return {
      items: [
        {
          label: "Cerrar sesión",
          icon: "pi pi-fw pi-power-off",
          visible: () => this.$store.state.auth.status.loggedIn,
          command: () => this.$store.dispatch('auth/logout'),
        },
      ],
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/familias_subfamilias")
      .then((response) => {
        var data = response.data;
        data.forEach((element) => {
          var item1 = {
            label: "",
            to: "",
            icon: "pi pi-fw pi-chevron-down",
            items: [],
          };
          item1.label = element.familiaItem;
          item1.to = "/tienda/" + element.familiaItem;
          console.log(element.subfamiliasItem);
          element.subfamiliasItem.forEach((element) => {
            var item2 = {
              label: "",
              to: "",
            };
            item2.label = element;
            item2.to = "/tienda/" + element.familiaItem + "/" + element;
            item1.items.unshift(item2);
          });

          this.items.unshift(item1);
        });
      });
  },
};
</script>

<style scoped></style>
