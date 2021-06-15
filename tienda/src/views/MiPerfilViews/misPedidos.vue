<template>
  <div class="mis-pedidos">
    <DataTable
      :value="pedidos"
      class="
        p-datatable-customers p-datatable-responsive-demo p-datatable-striped
      "
      dataKey="cabecera.xpedido_id"
      :expandedRows.sync="expandedRows"
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      currentPageReportTemplate="Pedidos del {first} al {last} de {totalRecords}"
    >
      <template #header>
        <div class="table-header-container text-left">
          <Button
            icon="pi pi-plus"
            label="Expandir todos"
            @click="expandAll"
            class="ml-auto mr-2"
          />
          <Button
            icon="pi pi-minus"
            label="Cerrar todos"
            @click="collapseAll"
          />
        </div>
      </template>
      <Column :expander="true" headerStyle="width: 3rem" />
      <Column field="cabecera.xpedido_id" header="Id" sortable>
        <template #body="slotProps">
          <span class="p-column-title">ID</span>
          {{ slotProps.data.cabecera.xpedido_id }}
        </template>
      </Column>
      <Column field="cabecera.xnombre" header="Cliente" sortable>
        <template #body="slotProps">
          <span class="p-column-title">Cliente</span>
          {{ slotProps.data.cabecera.xnombre }}
        </template>
      </Column>
      <Column field="cabecera.xdireccion" header="Dirección" sortable>
        <template #body="slotProps">
          <span class="p-column-title">Dirección</span>
          {{ slotProps.data.cabecera.xdireccion }}
        </template>
      </Column>
      <Column field="cabecera.xpagado" header="Pagado" sortable>
        <template #body="slotProps">
          <span class="p-column-title">Pagado</span>
          <Checkbox
            v-model="slotProps.data.cabecera.xpagado"
            disabled="disabled"
            :binary="true"
          />
        </template>
      </Column>
      <Column field="cabecera.xentregado" header="Entregado" sortable>
        <template #body="slotProps">
          <span class="p-column-title">Entregado</span>
          <Checkbox
            v-model="slotProps.data.cabecera.xentregado"
            :binary="true"
            disabled="disabled"
          />
        </template>
      </Column>
      <Column field="cabecera.xpedido_fecha" header="Fecha" sortable>
        <template #body="slotProps">
          <span class="p-column-title">Fecha</span>
          {{ slotProps.data.cabecera.xpedido_fecha }}
        </template>
      </Column>
      <Column field="cabecera.xtotal" header="Total" sortable>
        <template #body="slotProps">
          {{ slotProps.data.cabecera.xtotal }} €
        </template>
      </Column>

      <template #expansion="slotProps">
        <div class="orders-subtable">
          <h5>
            Articulos para el pedido {{ slotProps.data.cabecera.xpedido_id }}
          </h5>
          <DataTable
            :value="slotProps.data.lineas"
            class="
              p-datatable-customers
              p-datatable-responsive-demo
              p-datatable-striped
            "
            dataKey=".xpedido_lin_id"
            :paginator="true"
            :rows="5"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 15]"
          >
            <Column
              field="xpedido_lin_id"
              header="Id"
              headerStyle="width:5rem"
              sortable
            >
            <template #header>
              <span>Id</span>
            </template>
              <template #body="slotProps">
                <span class="p-column-title">ID</span>
                {{ slotProps.data.xpedido_lin_id }}
              </template>
            </Column>
            <Column field="imagen" header="Imagen">
            <template #header>
              <span>Imagen</span>
            </template>
              <template #body="slotProps">
                <span class="p-column-title">Imagen</span>
                <img
                  :src="'http://13.58.30.123:8000' + slotProps.data.imagen"
                  :alt="slotProps.data.nombreArt"
                  class="product-image"
                />
              </template>
            </Column>
            <Column field="nombreArt" header="Artículo">
            <template #header>
              <span>Artículo</span>
            </template>
              <template #body="slotProps">
                <span class="p-column-title">Artículo</span>
                {{ slotProps.data.nombreArt }}
              </template>
            </Column>
            <Column field="precio" header="Precio">
            <template #header>
              <span>Precio</span>
            </template>
              <template #body="slotProps">
                <span class="p-column-title">Precio</span>
                {{ slotProps.data.precio }} €
              </template>
            </Column>
            <Column field="xcantidad" header="Cantidad">
            <template #header>
              <span>Cantidad</span>
            </template>
              <template #body="slotProps">
                <span class="p-column-title">Cantidad</span>
                {{ slotProps.data.xcantidad }}
              </template>
            </Column>
            <Column field="xsubtotal" header="Subtotal">
            <template #header>
              <span>Subtotal</span>
            </template>
              <template #body="slotProps">
                <span class="p-column-title">Subtotal</span>
                {{ slotProps.data.xsubtotal }} €
              </template>
            </Column>
            <Column>
              <template #body="slotProps">
                <Button
                  label="Ver"
                  icon="pi pi-eye"
                  @click="irArticulo(slotProps.data.xarticulo_id)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
export default {
  name: "misPedidos",
  data() {
    return {
      pedidos: [],
      expandedRows: [],
    };
  },
  async mounted() {
    let ped = await UserService.getPedidos();
    this.pedidos = ped.data.pedidos;
  },
  methods: {
    irArticulo(id) {
      this.$router.push("/articulo/" + id);
    },
    expandAll() {
      this.expandedRows = this.pedidos.filter((p) => p.lineas);
    },
    collapseAll() {
      this.expandedRows = null;
    },
  },
};
</script>

<style scoped>
.product-image {
  width: 150px;
  max-height: 100px;
  margin: 0 auto 2rem auto;
  display: block;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
}
.orders-subtable {
  padding: 1rem;
}
</style>
