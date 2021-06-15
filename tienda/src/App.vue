<template>
  <div id="app" class="container-fluid">
    <navbar v-if="routeBackOffice && routePerfil"></navbar>
    <botonCarrito v-if="routeBackOffice && routeCarrito && routePerfil"></botonCarrito>
    <router-view class="routerview"></router-view>
    <Toast position="top-right" />
    <ScrollTop :threshold="200" />    
    <footerPers/>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'
import botonCarrito from './components/botonCarrito.vue'
export default {
  name: 'App',
  components: {
    navbar,
    botonCarrito
  },
  computed: {
    routeBackOffice(){
      return this.$route.fullPath.split('/')[1] != "admin"
    },
    routeCarrito(){
      return this.$route.fullPath.split('/')[1] != "carrito"
    },
    routePerfil(){
      return this.$route.fullPath.split('/')[1] != "perfil"
    }
  }
}
</script>

<style>
.routerview{
  margin-top: -60px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a{
  text-decoration: none;
}
a:hover{
  text-decoration: none !important;
}
</style>
