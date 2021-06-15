<template>
  <div class="art-visitados">
    <h1 class="m-3 mt-5">Los más vistos</h1>
    <div class="background">
      <Carousel
        :value="articulos"
        :numVisible="1"
        :numScroll="1"
        class="carousel-maVistos"
        :circular="true"
      >
        <template #item="slotProps">
          <div class="item w-100 h-75 h-lg-100 row align-content-center">
            <div class="item-img col-12 d-flex col-md-5">
              
                <img
                  class="w-100 align-self-center"
                  :src="'http://13.58.30.123:8000' + slotProps.data.ximagen"
                  :alt="'Foto de ' + slotProps.data.xnombre"
              />
            </div>
            <div
              class="
                item-content
                mt-3 mt-md-0
                align-self-center
                col-12 col-md-7
              "
            >
              <h2 class="text-center w-100">{{ slotProps.data.xnombre }}</h2>
              <p>{{ slotProps.data.xdescripcion }}</p>
              
                <Button
                @click="irArticulo(slotProps.data.xarticulo_id)"
                  icon="pi pi-eye"
                  class="p-button-info p-button-rounded mr-2"
              />
              <Button
                icon="pi pi-shopping-cart"
                class="p-button p-button-rounded"
                @click="anadirCarrito(slotProps.data)"
              />
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>

<script>
import ArticulosService from "../services/articulos.service";
export default {
  name: "artVisitados",
  data() {
    return {
      articulos: [],
    };
  },
  async mounted() {
    try {
      let res = await ArticulosService.getMasVisitados();
      if (res.data.success) this.articulos = res.data.articulos;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    irArticulo(id){
      console.log(id)
      this.$router.push("/articulo/"+id)
      location.reload()
    },
    anadirCarrito(articulo) {
      this.$store.dispatch("carritoStorage/anadirArticulo", articulo);
      this.$toast.add({
        severity: "info",
        summary: "Añadido al carrito",
        life: 600,
      });
    },
  },
};
</script>

<style scoped>
.item-img {
  min-height: 100%;
}
@media (min-width: 768px) {
  .carousel-maVistos {
    margin-left: auto;
    margin-right: auto;
    max-width: 60vw;
  }
}
@media (min-width: 998px) {
  .carousel-maVistos {
    margin-left: auto;
    margin-right: auto;
    max-width: 55vw;
  }
}
.background {
  padding-top: 20px;
  background: radial-gradient(#e6d6ee, #ffff);
}
</style>
