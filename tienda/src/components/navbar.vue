<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <router-link to="/">
          <img src="../assets/logo.png" alt="Logo" height="70" />
        </router-link>
      </template>
      <template #end>
        <router-link to="/login-signup/login" v-if="!loggedIn">
          <Button label="Iniciar sesión" icon="pi pi-users"/>
        </router-link>
        <div v-if="loggedIn">
          <div @click="toggle" class="avatar">
            <Avatar v-if="!fotoPerfil" icon="pi pi-user" size="large"/>
            <Avatar v-if="fotoPerfil" :image="'http://13.58.30.123:8000'+fotoPerfil" size="large"/>
            <i class="pi pi-fw pi-angle-down"></i>
          </div>          
          <div @click="toggle">
            <Menu ref="menu" :model="avatarMenu" :popup="true"/>
          </div>
          
        </div>
    </template>
    </Menubar>
  </div>
</template>

<script>
import axios from "axios";
import UserService from "../services/user.service";

export default {
  name: "navbar",
  data() {
    return {
      fotoPerfil:null,
      items: [
        {
          label: "Inicio",
          icon: "pi pi-fw pi-home",
          to: "/"
        },
      ],
      avatarMenu: [
        {
          label: "Mi perfil",
          icon: 'pi pi-fw pi-id-card',
          to: "/perfil"
        },
        {
          label: "Mis pedidos",
          icon: 'pi pi-fw pi-book',
          to: "/perfil/pedidos"
        },    
        {
          label: 'Cerrar sesión',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.$store.dispatch('auth/logout'); 
            this.$router.push("/");
            }
        }
      ]
    };
  },
  methods:{
    toggle(event){
      this.$refs.menu.toggle(event);
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    axios
      .get("http://13.58.30.123:8000/api/familias_subfamilias")
      .then((response) => {
        var data = response.data;
        data.forEach((element) => {
          var item1 = {
            label: "",
            to: "",
            items: [],
          };
          item1.label = element.familiaItem;
          //item1.to = "/tienda/" + element.familiaItem;
          element.subfamiliasItem.forEach((element) => {
            var item2 = {
              label: "",
            };
            item2.label = element;
            item2.to = "/tienda/" + item1.label + "/" + element;
            item2.command = ()=>{this.$router.go("/tienda/"+item1.label+"/"+element)}
            item1.items.unshift(item2);
          });

          this.items.push(item1);
        });
      });
    UserService.getUsuario().then((res)=>{
      if(res.data.success)
        this.fotoPerfil = res.data.usuario.ximagen
    })
  },
};
</script>

<style scoped>
a{
  text-decoration: none;
}

.avatar{
  background-color: #dee2e6;
}
.avatar:hover{
  cursor: pointer;
}
</style>
