<template>
  <div class="inicio">
    <h1>Novedades</h1>
    <div class="mt-3">
      <Carousel
        :value="ultimosArticulos"
        :numVisible="3"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        class="custom-carousel"
        :circular="true"
        :autoplayInterval="3000"
      >
        <template #header> </template>
        <template #item="slotProps">
          <div class="product-item">
            <div class="product-item-content">
              <div class="mb-3">
                <router-link :to="'/articulo/' + slotProps.data.xarticulo_id">
                  <img
                    :src="'http://13.58.30.123:8000' + slotProps.data.ximagen"
                    :alt="slotProps.data.xnombre"
                    class="product-image"
                  />
                </router-link>
              </div>
              <div>
                <h3 class="mb-1">{{ slotProps.data.xnombre }}</h3>
                <h4 class="mt-0 mb-3">{{ slotProps.data.xprecio }}€</h4>
                <span
                  :class="
                    'product-badge status-' +
                    estadoProducto(slotProps.data.xstock)
                  "
                  >{{
                    estadoProducto(slotProps.data.xstock)
                      .replace("-", " ")
                      .toUpperCase()
                  }}</span
                >
                <div class="car-buttons mt-3">
                  <router-link :to="'/articulo/' + slotProps.data.xarticulo_id">
                    <Button
                      icon="pi pi-eye"
                      class="p-button-info p-button-rounded mr-2"
                  /></router-link>
                  <Button
                    icon="pi pi-shopping-cart"
                    class="p-button p-button-rounded"
                    @click="anadirCarrito(slotProps.data)"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
    <h1 class="text-center">Categorías</h1>
    <div class="card-container">
      <div class="card card-5" @click="irAHombre">
        <h2 class="card__title">Hombre</h2>
      </div>
      <div class="card card-5" @click="irAMujer">
        <h2 class="card__title">Mujer</h2>
      </div>
      <div class="card card-5" @click="irANino">
        <h2 class="card__title">Niño</h2>
      </div>
    </div>
    <artVisitados/>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Inicio",
  data() {
    return {
      ultimosArticulos: null,
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 3,
          numScroll: 3,
        },
        {
          breakpoint: "768px",
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: "578px",
          numVisible: 1,
          numScroll: 1,
        },
      ],
    };
  },
  methods: {
    irAHombre() {
      this.$router.push("/tienda/Hombre");
    },
    irAMujer() {
      this.$router.push("/tienda/Mujer");
    },
    irANino() {
      this.$router.push("/tienda/Niño");
    },
    estadoProducto(stock) {
      if (stock == 0 || stock == null) return "sin-stock";
      if (stock < 20) return "bajo-stock";
      else return "en-stock";
    },
    anadirCarrito(articulo) {
      this.$store.dispatch("carritoStorage/anadirArticulo", articulo);
      this.$toast.add({
        severity:"info",
        summary:"Añadido al carrito",
        life:600
      })
    },
  },
  mounted() {
    axios
      .get("http://13.58.30.123:8000/api/ultimosArticulos/9")
      .then((response) => {
        if (response.data.success)
          this.ultimosArticulos = response.data.articulos;
        else
          this.this.$toast.add({
            severity: "error",
            summary: "Vuelva a cargar la página",
            detail: this.response.data.descripcion,
            life: 7000,
          });
      });
  },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.heading-container {
  text-align: center;
}

.heading {
  font-weight: 600;
}

.credit {
  margin: 10px 0px;
  color: #888888;
  font-size: 25px;
  transition: all 0.5s;
}

.credit {
  color: inherit;
}

.card__exit,
.card__icon {
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
}

.main-container {
  padding: 30px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.card {
  margin: 20px;
  padding: 20px;
  width: 300px;
  min-height: 150px;
  display: grid;
  grid-template-rows: 20px 50px 1fr 50px;
  border-radius: 10px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
}

.card:hover {
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
  transform: scale(1.01);
}

.card__exit {
  grid-row: 1/2;
  justify-self: end;
}

.card__icon {
  grid-row: 2/3;
  font-size: 30px;
}

.card__title {
  margin-top: 10%;
  font-weight: 400;
  color: #ffffff;
}

.card__apply {
  grid-row: 4/5;
  align-self: center;
}


.card-5 {
  background: radial-gradient(#cea7c4, #c0a3e5);
}
.card-5:hover{
  cursor: pointer;
}

@media (max-width: 1600px) {
  .card-container {
    justify-content: center;
  }
}

.product-item .product-item-content {
  border: 1px solid var(--surface-d);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
  padding: 2rem 0;
  background-color: #883cae36;
  height: 100% !important;
}
.product-item .product-image {
  width: 217px;
  max-height: 136px;
  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.p-carousel-item .product-item {
  height: 100% !important;
}

.product-badge.status-en-stock {
  background: #c8e6c9;
  color: #256029;
}
.product-badge.status-bajo-stock {
  background: #feedaf;
  color: #8a5340;
}
.product-badge.status-sin-stock {
  background: #ffcdd2;
  color: #c63737;
}
</style>
