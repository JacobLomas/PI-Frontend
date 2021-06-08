<template>
  <div class="boton-carrito ml-auto mr-4 w-25 d-flex mt-2">
    <Button id="carrito" class="p-button-rounded" @click="toggle">
      <div class="d-block p-1">
        <i class="pi pi-shopping-cart"></i>
      </div>
    </Button>
    <OverlayPanel
      ref="op"
      appendTo="body"
      :showCloseIcon="true"
      id="overlay_panel"
      style="width: 400px"
    >
      <DataTable
        :value="carrito"
        :selection.sync="selectedProduct"
        selectionMode="single"
        :paginator="true"
        :rows="3"
      >
        <Column field="xnombre" header="Nombre">
          <template #body="slotProps">
            {{ slotProps.data.xnombre }}
          </template>
        </Column>
        <Column header="Imagen">
          <template #body="slotProps">
            <img
              :src="'http://localhost:8000' + slotProps.data.ximagen"
              :alt="slotProps.data.ximagen"
              class="product-image"
            />
          </template>
        </Column>
        <Column field="cantidad" header="Cantidad">
          <template #body="slotProps">
            <InputNumber
              v-model="slotProps.data.cantidad"
              mode="decimal"
              showButtons
              buttonLayout="vertical"
              style="width: 2.5rem"
              decrementButtonClass="p-button-secondary"
              incrementButtonClass="p-button-secondary"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              :min="1"
              :max="slotProps.data.xstock"
            >
            </InputNumber>
          </template>
        </Column>
        <Column field="xprecio" header="Price" sortable>
          <template #body="slotProps">
            {{ slotProps.data.xprecio }} €
          </template>
        </Column>
        <!-- Columna botones -->
        <Column
          headerStyle="width: 3.5rem; text-align: center"
          bodyStyle="text-align: center; overflow: visible"
        >
          <template #body="slotProps">
            <Button
              type="button"
              icon="pi pi-trash"
              class="p-button-danger p-button-rounded p-button-text"
              @click="borrarArticulo(slotProps.data)"
            ></Button>
          </template>
        </Column>
        <template #footer>
          <div class="d-flex justify-content-end">
            <Button
              label="Pasar por caja"
              class="p-button-outlined p-button-raised"
              @click="irCarrito()"
              :disabled="!carrito ||carrito.length<0"
            >
            </Button>
          </div>
        </template>
      </DataTable>
    </OverlayPanel>
  </div>
</template>

<script>
export default {
  name: "botonCarrito",
  data() {
    return {
      selectedProduct: null,
    };
  },
  computed: {
    carrito() {
      return this.$store.state.carritoStorage.carrito;
    },
  },
  methods: {
    toggle(event) {
      this.$refs.op.toggle(event);
    },
    borrarArticulo(articulo) {
      this.$store.dispatch(
        "carritoStorage/borrarArticulo",
        articulo.xarticulo_id,
        -1
      );
    },
    irCarrito(){
      this.$router.push('/carrito')
    }
  },
};
</script>

<style scoped>
.boton-carrito {
  z-index: 10;
  position: sticky;
  top: 20px;
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: flex-end;
  opacity: 0.8;
  transition: opacity 0.25s ease-in-out;
}
#carrito {
  transition: opacity 0.25s ease-in-out;
}
#carrito:hover {
  opacity: 1;
}
.product-image {
  width: 50px;
  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.p-datatable .p-datatable-thead > tr > th {
  text-align: left;
  padding: 1rem 1rem;
  border: 1px solid #e9ecef;
  border-width: 0 0 1px 0;
  font-weight: 600;
  color: #495057;
  background: #f8f9fa;
  transition: box-shadow 0.2s;
}
</style>
