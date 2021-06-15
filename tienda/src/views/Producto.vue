<template>
  <div class="producto">
    <Breadcrumb :home="home" :model="items" class="mb-3" />
    <div class="p-grid">
      <Galleria
        :numVisible="articulo.imagenes.length"
        :responsiveOptions="responsiveOptions"
        :value="articulo.imagenes"
        :showItemNavigators="true"
        :showItemNavigatorsOnHover="true"
        :circular="true"
        :showThumbnails="true"
        :showThumbnailNavigators="true"
        class="col-12 col-md-6 col-lg-7"
      >
        <template #item="slotProps">
          <img
            :src="'http://13.58.30.123:8000' + slotProps.item.xruta"
            :alt="articulo.xnombre"
            style="height: 60vh"
          />
        </template>
        <template #thumbnail="slotProps">
          <img
            :src="'http://13.58.30.123:8000' + slotProps.item.xruta"
            :alt="slotProps.item.alt"
            class="mr-3 img-thumbnail"
          />
        </template>
      </Galleria>
      <div class="d-none d-lg-block col-lg-1 w-75"></div>
      <div
        class="
          d-flex
          flex-column
          text-left
          pt-5
          col-12 col-md-6 col-lg-4
          pl-md-3
          articulo
        "
      >
        <h1 class="articulo-nombre">{{ articulo.xnombre }}</h1>
        <p class="articulo-precio">{{ round(articulo.xprecio, 2) }}€</p>
        <p class="articulo-descripcion">{{ articulo.xdescripcion }}</p>
        <Rating
          :disabled="!loggedIn"
          :cancel="false"
          v-model="articulo.puntuacion"
          class="align-self-center mt-3"
          @change="puntuar()"
        />

        <Button
          label="Comprar"
          class="articulo-btn-comprar w-100 align-self-center mt-4"
          iconPos="right"
          icon="pi pi-paypal"
          @click="comprarYa"
        />
        <Button
          label="Añadir al carrito"
          class="
            articulo-btn-comprar
            w-100
            align-self-center
            p-button-outlined
            mt-3
          "
          iconPos="right"
          icon="pi pi-paypal pi-shopping-cart"
          @click="anadirCarrito"
        />
        <Button
          label="Favorito"
          :class="{ 'p-button-outlined': !articulo.favorito }"
          class="
            articulo-btn-comprar
            w-100
            align-self-center
            mt-3
            p-button-danger
          "
          iconPos="right"
          icon="pi pi-heart"
          @click="toggleFavorito()"
        />
      </div>
    </div>
    <div class="mt-5">
      <artVisitados />
    </div>
  </div>
</template>

<script>
import ArticulosService from "../services/articulos.service";
import UserService from "../services/user.service";
export default {
  name: "Producto",
  data() {
    return {
      articuloID: null,
      articulo: { imagenes: [] },
      home: { icon: "pi pi-home", to: "/" },
      items: [],
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 5,
        },
        {
          breakpoint: "768px",
          numVisible: 3,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ],
    };
  },
  mounted() {
    this.articuloID = this.$route.params.articuloId;
    ArticulosService.getArticulo(this.articuloID)
      .then(async (response) => {
        if (response.data.success) {
          this.articulo = response.data.articulo;
          this.articulo.imagenes = [];
          let res = await UserService.getImagenesArt(
            this.articulo.xarticulo_id
          );
          if (res.status == 200 && res.data.success) {
            this.articulo.imagenes = res.data.imagenes;
          }
          this.articulo.imagenes.unshift({ xruta: this.articulo.ximagen });
          let rutaBread = {
            label: this.articulo.descFam,
            command: () => {
              this.$router.push({
                path: "/tienda/" + this.articulo.descFam + "",
              });
            },
          };
          this.items.push(rutaBread);
          rutaBread = {
            label: this.articulo.descSubF,
            command: () => {
              this.$router.push({
                path:
                  "/tienda/" +
                  this.articulo.descFam +
                  "/" +
                  this.articulo.descSubF,
              });
            },
          };
          this.items.push(rutaBread);
          rutaBread = {
            label: this.articulo.xnombre,
            command: () => {
              this.$router.push({ path: "/articulo/" + this.articuloID });
            },
          };
          this.items.push(rutaBread);
        } else {
          this.$router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
        this.push("/");
      });
  },
  methods: {
    toggleFavorito() {
      UserService.postToggleFavorito(this.articulo.xarticulo_id).then((res) => {
        if (res.data.success) {
          this.articulo.favorito = res.data.favorito;
        }
      });
    },
    anadirCarrito() {
      this.$store.dispatch("carritoStorage/anadirArticulo", this.articulo);
      this.$toast.add({
        severity: "info",
        summary: this.articulo.xnombre + " añadido",
        life: 800,
      });
    },
    comprarYa() {
      this.$store.dispatch("carritoStorage/borrarTodoCarrito");
      this.$store.dispatch("carritoStorage/anadirArticulo", this.articulo);
      this.$router.push("/carrito");
    },
    puntuar() {
      if (this.loggedIn) {
        UserService.postPuntuarArticulo(
          this.articulo.xarticulo_id,
          this.articulo.puntuacion
        ).catch((e) => console.error(e));
      }
    },
    round(num, decimales = 2) {
      var signo = num >= 0 ? 1 : -1;
      num = num * signo;
      if (decimales === 0)
        //con 0 decimales
        return signo * Math.round(num);
      // round(x * 10 ^ decimales)
      num = num.toString().split("e");
      num = Math.round(
        +(num[0] + "e" + (num[1] ? +num[1] + decimales : decimales))
      );
      // x * 10 ^ (-decimales)
      num = num.toString().split("e");
      return (
        signo * (num[0] + "e" + (num[1] ? +num[1] - decimales : -decimales))
      );
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");
.p-galleria-thumbnail-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.img-thumbnail {
  height: 11vh;
  @media (width: 578px) {
    height: 2vw;
  }
}
.articulo,
h3 {
  font-family: "Rubik", sans-serif;
}
h3,
h2,
h1 {
  font-weight: bold;
  color: #883caee7;
}
.articulo-nombre {
  letter-spacing: 2.5px;
  font-weight: bold;
}
.articulo-precio {
  font-size: 2rem;
  letter-spacing: 2.5px;
  font-weight: 1000;
}
.articulo-btn-comprar {
  font-family: "Rubik", sans-serif;
  font-size: 1.3rem;
  letter-spacing: 2.5px;
}
.p-galleria .p-galleria-item-nav {
  background: #00000014;
  color: #883cae;
  width: 4rem;
  height: 4rem;
  transition: box-shadow 0.15s, background-color 0.3s;
  border-radius: 4px;
  margin: 0 0.5rem;
}
.p-galleria .p-galleria-item-nav:not(.p-disabled):hover {
  background: #883cae;
  color: white;
}
.p-galleria .p-galleria-thumbnail-container {
  background: rgba(0, 0, 0, 0);
  padding: 1rem 0.25rem;
}
</style>
