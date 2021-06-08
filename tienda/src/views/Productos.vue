<template>
  <div class="productos">
    <Breadcrumb :home="home" :model="items" class="mb-3" />
    <DataView
      :value="productos"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="p-grid p-nogutter">
          <div class="p-col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Ordenar"
              @change="onSortChange($event)"
            />
          </div>
          <div class="p-col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="p-col-12">
          <div class="product-list-item">
            <img
              :src="'http://localhost:8000' + slotProps.data.ximagen"
              :alt="slotProps.data.xnombre"
            />
            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.xnombre }}</div>
              <div class="product-description">
                {{ slotProps.data.xdescripcion }}
              </div>
              <Rating :value="0" :readonly="true" :cancel="false"></Rating>
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">{{
                slotProps.data.xsubfamilia_id
              }}</span>
            </div>
            <div class="product-list-action">
              <span class="product-price">{{ slotProps.data.xprecio }}€</span>
              <Button
                icon="pi pi-shopping-cart"
                label="Añadir al carrito"
                :disabled="estaDeshabilitadaCompra(slotProps.data.xstock)"
                @click="anadirCarrito(slotProps.data)"
              ></Button>
              <span
                :class="
                  'product-badge status-' +
                  estadoProducto(slotProps.data.xstock)
                "
                >{{ estadoProducto(slotProps.data.xstock).toUpperCase() }}</span
              >
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="p-col-12 p-md-4 m-md-2">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{
                  slotProps.data.xsubfamilia_id
                }}</span>
              </div>
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
            </div>
            <div class="product-grid-item-content">
              <img
                :src="'http://localhost:8000' + slotProps.data.ximagen"
                :alt="slotProps.data.xnombre"
              />
              <div class="product-name">{{ slotProps.data.xnombre }}</div>
              <div class="product-description">
                {{ slotProps.data.xdescripcion }}
              </div>
              <Rating :value="5" :readonly="true" :cancel="false"></Rating>
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">{{ slotProps.data.xprecio }}€</span>

              <Button
                icon="pi pi-shopping-cart"
                :disabled="estaDeshabilitadaCompra(3)"
                @click="anadirCarrito(slotProps.data)"
              ></Button>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script>
import ArticulosService from "../services/articulos.service";

export default {
  name: "Productos",
  data() {
    return {
      p: 0,
      home: { icon: "pi pi-home", to: "/" },
      items: [
        {
          label: this.$route.params.familia,
          to:"/tienda/" + this.$route.params.familia,
          command: ()=>{ this.$router.go("/tienda/" + this.$route.params.familia)}
        },
        {
          label: this.$route.params.subfamilia,
          to:
            "/tienda/" +
            this.$route.params.familia +
            "/" +
            this.$route.params.subfamilia,
        },
      ],
      familia: "",
      subfamilia: "",
      productos: [],
      layout: "grid",
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: "Precio: Más alto primero", value: "!xprecio" },
        { label: "Precio: Más bajo primero", value: "xprecio" },
      ],
    };
  },
  methods: {
    async getProductos() {
      this.familia = this.$route.params.familia;
      this.subfamilia = this.$route.params.subfamilia;
      this.productos= await ArticulosService.getArticulosFamSubF(this.familia, this.subfamilia)

      this.productos = this.productos.data.articulos;
    },
    onSortChange(event) {
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
        this.sortKey = sortValue;
      } else {
        this.sortOrder = 1;
        this.sortField = value;
        this.sortKey = sortValue;
      }
    },
    anadirCarrito(articulo) {
      this.$store.dispatch('carritoStorage/anadirArticulo', articulo)
    },
    estadoProducto(stock) {
      if (stock == 0 || stock == null) return "sin-stock";
      if (stock < 20) return "bajo-stock";
      else return "en-stock";
    },
    estaDeshabilitadaCompra(stock) {
      return (
        stock == 0 || stock == null 
      );
    },
  },
  async mounted() {
    this.getProductos()
  },
  async beforeUpdate() {
    this.getProductos()
  },
};
</script>

<style>
.productos .card {
  background: var(--surface-e);
  padding: 2rem;
  -webkit-box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%),
    0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.product-grid-item {
  margin: 0.5rem;
  border: 1px solid #dee2e6;
}
.product-grid-item .product-grid-item-bottom,
.product-grid-item .product-grid-item-top {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.product-grid-item .product-price {
  font-size: 1.5rem;
  font-weight: 600;
}
.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}
.product-description {
  margin: 0 0 1rem 0;
}

.product-grid-item .product-grid-item-content {
  text-align: center;
}

.product-grid-item img {
  width: 75%;
  -webkit-box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  margin: 2rem 0;
}

.product-grid-item .product-grid-item-top {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
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
.p-grid {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
}
.p-col-6 {
  width: 50%;
}
.p-col-12 {
  width: 100%;
}

/* LISTA */
.product-list-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
}
.product-list-item .product-list-action {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.product-list-item .product-list-detail {
  text-align: left;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 0px;
  flex: 1 1 0;
}
.product-list-item img {
  width: 150px;
  -webkit-box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  margin-right: 2rem;
}

.p-nogutter > .p-col,
.p-nogutter > [class*="p-col-"] {
  padding: 0;
}
.p-grid > .p-col,
.p-grid > [class*="p-col"] {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.product-list-item .product-price {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  -ms-flex-item-align: end;
  align-self: flex-end;
}
.product-list-item .p-button {
  margin-bottom: 0.5rem;
}
.product-badge.status-instock {
  background: #c8e6c9;
  color: #256029;
}
.product-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;
}
.product-list-item .p-rating {
  margin: 0 0 0.5rem 0;
}
.product-category {
  font-weight: 600;
  vertical-align: middle;
}
.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}
@media screen and (min-width: 768px) {
  .p-md-4 {
    width: 32.196%;
  }
}
</style>
