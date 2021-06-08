<template>
  <div class="inicio">
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
        <template #header>
        </template>
        <template #item="slotProps">
          <div class="product-item">
            <div class="product-item-content">
              <div class="mb-3">
                <img
                  :src="'http://localhost:8000' + slotProps.data.ximagen"
                  :alt="slotProps.data.xnombre"
                  class="product-image"
                />
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
                  <Button
                    icon="pi pi-star"
                    class="p-button-success p-button-rounded mr-2"
                  />
                  <Button
                    icon="pi pi-shopping-cart"
                    class="p-button p-button-rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
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
					breakpoint: '1024px',
					numVisible: 3,
					numScroll: 3
				},
				{
					breakpoint: '600px',
					numVisible: 2,
					numScroll: 2
				},
				{
					breakpoint: '480px',
					numVisible: 1,
					numScroll: 1
				}
			]
    };
  },
  methods:{
    estadoProducto(stock) {
      if (stock == 0 || stock == null) return "sin-stock";
      if (stock < 20) return "bajo-stock";
      else return "en-stock";
    },
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/ultimosArticulos/9")
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
.product-item .product-item-content {
    border: 1px solid var(--surface-d);
    border-radius: 3px;
    margin: .3rem;
    text-align: center;
    padding: 2rem 0;
    background-color: #883cae49;
    height: 100% !important;
}
.product-item .product-image {
    width: 50%;
    -webkit-box-shadow: 0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);
    box-shadow: 0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23);
}
.p-carousel-item .product-item{
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
