<template>
  <div class="favoritos">
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
              class="img-producto"
              :src="'http://13.58.30.123:8000' + slotProps.data.ximagen"
              :alt="slotProps.data.xnombre"
              @click="irArticulo(slotProps.data.xarticulo_id)"
            />
            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.data.xnombre }}</div>
              <div class="product-description">
                {{ slotProps.data.xdescripcion }}
              </div>
              <Rating :value="0" :readonly="true" :cancel="false"></Rating>
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">{{
                slotProps.data.descSubF
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
              <Button
                icon="pi pi-eye"
                label="Ver"
                class="p-button-outlined"
                @click="irArticulo(slotProps.data.xarticulo_id)"
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
        <div class="p-col-12 p-md-4">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">{{
                  slotProps.data.descSubF
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
                class="img-producto"
                :src="'http://13.58.30.123:8000' + slotProps.data.ximagen"
                :alt="slotProps.data.xnombre"
                @click="irArticulo(slotProps.data.xarticulo_id)"
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
import UserService from "../../services/user.service";
export default {
  name: "favoritos",
  data() {
    return {
      productos: [],
      sortKey: null,
      sortOrder: null,
      sortField: null,
      layout: "list",
      sortOptions: [
        { label: "Precio: Más alto primero", value: "!xprecio" },
        { label: "Precio: Más bajo primero", value: "xprecio" },
      ],
    };
  },
  async mounted() {
    var prod = await UserService.getFavoritos();
    this.productos = prod.data.favoritos;
  },
  methods: {
    irArticulo(id) {
      this.$router.push("/articulo/" + id);
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
      this.$store.dispatch("carritoStorage/anadirArticulo", articulo);
    },
    estadoProducto(stock) {
      if (stock == 0 || stock == null) return "sin-stock";
      if (stock < 20) return "bajo-stock";
      else return "en-stock";
    },
    estaDeshabilitadaCompra(stock) {
      return stock == 0 || stock == null;
    },
  },
};
</script>

<style>
.img-producto:hover {
  cursor: pointer;
}
</style>
