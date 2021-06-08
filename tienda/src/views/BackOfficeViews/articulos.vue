<template>
  <div class="articulos">
    <Toolbar class="mb-2">
      <template #left>
        <Button
          label="Nuevo"
          icon="pi pi-plus"
          class="p-button-info mr-2"
          @click="openNew"
        />
        <Button
          label="Borrar"
          icon="pi pi-trash"
          class="p-button-danger"
          @click="confirmarBorrarSeleccionados"
          :disabled="!articulosSeleccionados || !articulosSeleccionados.length"
        />
      </template>
    </Toolbar>

    <DataTable
      :value="articulos"
      :paginator="true"
      class="p-datatable-customers p-datatable-responsive-demo p-datatable-striped"
      :rows="10"
      dataKey="xarticulo_id"
      :rowHover="true"
      :selection.sync="articulosSeleccionados"
      :filters="filters"
      :loading="loading"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 25, 50]"
      currentPageReportTemplate="Muestra {first} a {last} de {totalRecords}"
      columnResizeMode="fit | expand"
      sortMode="multiple"
      removableSort
    >
      <template #header>
        <div class="table-header">
          Lista de artículos
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global']"
              placeholder="Busqueda global"
              class="w-100"
            />
          </span>
        </div>
      </template>
      <template #empty> No se han encontrado articulos </template>
      <template #loading> Cargando articulos. Espere... </template>
      <!-- Fila de marcado -->
      <Column selectionMode="multiple" headerStyle="width: 2.5em"></Column>
      <!-- Columna id y foto -->
      <Column
        field="xarticulo_id"
        header="Id"
        headerStyle="width: 9em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">ID</span>
          <img
            :src="'http://localhost:8000' + slotProps.data.ximagen"
            width="80px"
          />
          <span class="image-text ml-2">{{ slotProps.data.xarticulo_id }}</span>
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xarticulo_id']"
            class="p-column-filter w-100"
            placeholder="ID"
          />
        </template>
      </Column>
      <!-- Columna Nombre -->
      <Column
        field="xnombre"
        header="Nombre"
        :sortable="true"
        headerStyle="width: 12em"
      >
        <template #body="slotProps">
          <span class="p-column-title">Nombre</span>
          {{ slotProps.data.xnombre }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xnombre']"
            class="p-column-filter w-100"
            placeholder="Buscar por nombre"
          />
        </template>
      </Column>
      <!-- Columna Familia -->
      <Column
        header="Familia"
        :sortable="true"
        sortField="descFam"
        filterField="descFam"
        filterMatchMode="in"
        headerStyle="width: 11em"
      >
        <template #body="slotProps">
          <span class="p-column-title">Familia</span>
          {{ slotProps.data.descFam }}
        </template>

        <template #filter>
          <MultiSelect
            v-model="filters['descFam']"
            :options="familias"
            optionLabel="xdescripcion"
            optionValue="xdescripcion"
            placeholder="Familias"
            class="p-column-filter w-100"
            display="chip"
          >
          </MultiSelect>
        </template>
      </Column>
      <!-- Columna SubFamilia -->
      <Column
        header="Subfamilia"
        :sortable="true"
        sortField="descSubF"
        filterField="descSubF"
        filterMatchMode="in"
        headerStyle="width: 11em"
        :reorderableColumn="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Subfamilia</span>
          {{ slotProps.data.descSubF }}
        </template>

        <template #filter>
          <MultiSelect
            v-model="filters['descSubF']"
            :options="subfamilias"
            optionLabel="xdescripcion"
            optionValue="xdescripcion"
            placeholder="Subfamilia"
            class="p-column-filter w-100"
            display="chip"
          >
          </MultiSelect>
        </template>
      </Column>
      <!-- Columna Precio -->
      <Column
        field="xprecio"
        header="Precio"
        :sortable="true"
        sortField="xprecio"
        filterMatchMode="equals"
        headerStyle="width: 4.5em"
        :reorderableColumn="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Precio</span>
          {{ slotProps.data.xprecio }} €
        </template>
      </Column>

      <!-- Columna Stock -->
      <Column
        field="stock"
        header="Stock"
        :sortable="true"
        sortField="xstock"
        filterMatchMode="equals"
        headerStyle="width: 4.5em"
        :reorderableColumn="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Stock</span>
          {{ slotProps.data.xstock == null ? 0 : slotProps.data.xstock }}
        </template>
      </Column>

      <!-- Columna botones -->
      <Column
        headerStyle="width: 8rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body="slotProps">
          <Button
            type="button"
            icon="pi pi-pencil"
            class="p-button-info p-button-rounded"
            @click="editArticulo(slotProps.data)"
          ></Button>
          <Button
            type="button"
            icon="pi pi-trash"
            class="p-button-danger p-button-rounded ml-2"
            @click="confirmBorrarArticulo(slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>
    <!-- Diálogo de detalle -->
    <Dialog
      :visible.sync="articulosDialog"
      :style="{ width: '550px' }"
      header="Detalles del articulo"
      :modal="true"
      class="p-fluid text-left"
    >
      <FileUpload
        name="foto"
        :multiple="false"
        accept="image/*"
        :maxFileSize="1000000"
        :fileLimit="1"
        :customUpload="true"
        :showUploadButton="true"
        ref="file"
        v-if="!articulo.ximagen"
        class="mb-2"
      >
        <template #empty>
          <p>Arrastra hasta aquí la imagen</p>
        </template>
      </FileUpload>
      <img
        :src="'http://localhost:8000' + articulo.ximagen"
        :alt="articulo.ximagen"
        class="product-image"
        v-if="articulo.ximagen"
      />
      <div class="p-field">
        <label for="name">Nombre</label>
        <InputText
          id="name"
          v-model.trim="articulo.xnombre"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !articulo.xnombre }"
        />
        <small class="p-invalid" v-if="submitted && !articulo.xnombre"
          >Nombre requerido.</small
        >
      </div>
      <div class="p-field">
        <label for="description">Descripcion</label>
        <Textarea
          id="description"
          v-model="articulo.xdescripcion"
          required="true"
          rows="3"
          cols="20"
        />
      </div>

      <div class="p-field">
        <label class="mb-3 ml-2">Familia</label>
        <div class="p-formgrid p-grid">
          <div
            class="p-field-radiobutton col-6"
            v-for="(familia, index) of familias"
            :key="familias.xdescripcion + '_' + index"
          >
            <RadioButton
              :id="index"
              name="category"
              v-model="articulo.xfamilia_id"
              :value="familia.xfamilia_id"
            />
            <label :for="index">{{ familia.xdescripcion }}</label>
          </div>
        </div>
      </div>

      <!-- Dropdown Subfamilia -->
      <div class="p-field">
        <label class="mb-3 ml-2">Subfamilias</label>
        <div class="p-formgrid p-grid">
          <Dropdown
            v-model="articulo.xsubfamilia_id"
            :options="subfamiliasCalculadas"
            optionLabel="xdescripcion"
            optionValue="xsubfamilia_id"
            placeholder="Selecciona la subfamilia"
            :filter="true"
            filterPlaceholder="Selecciona una"
            class="col-12"
          />
        </div>
      </div>

      <div class="p-formgrid p-grid">
        <div class="p-field col-6">
          <label for="price">Precio</label>
          <InputNumber
            id="price"
            v-model="articulo.xprecio"
            mode="currency"
            currency="EUR"
            locale="es-ES"
          />
        </div>
        <div class="p-field col-6">
          <label for="quantity">Cantidad</label>
          <InputNumber id="quantity" v-model="articulo.xstock" />
        </div>
      </div>
      <template #footer>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveProduct"
        />
      </template>
    </Dialog>

    <!-- Diálogo de borrado -->
    <Dialog
      :visible.sync="borrarArticuloDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="articulo"
          >Are you sure you want to delete <b>{{ articulo.xnombre }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="borrarArticuloDialog = false"
        />
        <Button
          label="Sí"
          icon="pi pi-check"
          class="p-button-text"
          @click="borrarArticulo"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="borrarArticulosDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="articulo"
          >¿Estás seguro de que quieres eliminar el artículo?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="borrarArticulosDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="borrarArticulosSeleccionados"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserService from "../../services/user.service.js";
export default {
  name: "articulos",
  data() {
    return {
      file: null,
      articulos: null,
      articulosSeleccionados: null,
      articulosDialog: false,
      borrarArticuloDialog: false,
      borrarArticulosDialog: false,
      articulo: {},
      filters: {},
      loading: true,
      familias: [],
      subfamilias: [],
      submitted: false,
    };
  },
  computed: {
    subfamiliasCalculadas() {
      if (this.articulo.xfamilia_id)
        return this.subfamilias.filter((value) => {
          return value.xfamilia_id == this.articulo.xfamilia_id;
        });
      return ["Selecciona una familia primero"];
    },
  },
  mounted() {
    UserService.todosArticulos().then((res) => {
      if (res.data.success) {
        this.articulos = res.data.articulos;
        this.loading = false;
      }
    });
    UserService.getFamilias().then((res) => {
      if (res.data.success) {
        this.familias = res.data.familias;
      }
    });
    UserService.getSubFamilias().then((res) => {
      if (res.data.success) {
        this.subfamilias = res.data.subfamilias;
      }
    });
  },
  methods: {
    filterDate(value, filter) {
      if (
        filter === undefined ||
        filter === null ||
        (typeof filter === "string" && filter.trim() === "")
      ) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return value === this.formatDate(filter);
    },
    formatDate(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
        month = "0" + month;
      }

      if (day < 10) {
        day = "0" + day;
      }

      return date.getFullYear() + "-" + month + "-" + day;
    },
    editArticulo(product) {
      this.articulo = { ...product };
      this.articulosDialog = true;
    },
    borrarArticulo() {
      UserService.deleteArticulo(this.articulo.xarticulo_id).then(
        (response) => {
          this.articulos = this.articulos.filter(
            (val) => val.xarticulo_id !== this.articulo.xarticulo_id
          );
          this.borrarArticuloDialog = false;
          this.articulo = {};
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: response.data.descripcion,
            life: 3000,
          });
        }
      );
    },
    borrarArticulosSeleccionados() {
      this.articulosSeleccionados.forEach((art) => {
        UserService.deleteArticulo(art.xarticulo_id).then((response) => {
          this.articulos = this.articulos.filter(
            (val) => !this.articulosSeleccionados.includes(val)
          );
          this.borrarArticuloDialog = false;
          this.articulo = {};
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: response.data.descripcion,
            life: 3000,
          });
        });
      });

      this.articulos = this.articulos.filter(
        (val) => !this.articulosSeleccionados.includes(val)
      );
      this.borrarArticulosDialog = false;
      this.articulosSeleccionados = null;
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Artículos eliminados",
        life: 3000,
      });
    },
    confirmBorrarArticulo(product) {
      this.articulo = product;
      this.borrarArticuloDialog = true;
    },
    confirmarBorrarSeleccionados() {
      this.borrarArticulosDialog = true;
    },
    openNew() {
      this.articulo = {};
      this.submitted = false;
      this.articulosDialog = true;
    },
    hideDialog() {
      this.articulosDialog = false;
      this.submitted = false;
    },
    saveProduct() {
      this.submitted = true;
      if (!this.articulo.xarticulo_id) {
        if (this.$refs.file.files[0]) {
          let foto = this.$refs.file.files[0];
          let formData = new FormData();
          formData.append("image", foto);
          UserService.postSubirFoto(formData).then((response) => {
            let url = response.data.url;
            this.articulo.ximagen = url;
            UserService.postNuevoArticulo(this.articulo).then((response) => {
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: response.data.descripcion,
                life: 3000,
              });
              this.articulo = {};
              this.submitted = false;
              this.articulosDialog = false;
              console.log(response.data.nuevoArticulo);

              this.articulos.push(response.data.nuevoArticulo);
            });
          });
        } else {
          UserService.postNuevoArticulo(this.articulo).then((response) => {
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: response.data.descripcion,
              life: 3000,
            });
            this.articulo = {};
            this.submitted = false;
            this.articulosDialog = false;
            console.log(response.data.nuevoArticulo);
            this.articulos.push(response.data.nuevoArticulo);
          });
        }
      } else {
        if (this.$refs.files && this.$refs.file.files[0]) {
          let foto = this.$refs.file.files[0];
          let formData = new FormData();
          formData.append("image", foto);
          UserService.postSubirFoto(formData).then((response) => {
            let url = response.data.url;
            this.articulo.ximagen = url;
            UserService.postActualizarArticulo(this.articulo).then(
              (response) => {
                this.$toast.add({
                  severity: "success",
                  summary: "Successful",
                  detail: response.data.descripcion,
                  life: 3000,
                });
                this.submitted = false;
                this.articulosDialog = false;
                this.articulo = {};
                this.recargarArticulos();
              }
            );
          });
        } else {
          UserService.postActualizarArticulo(this.articulo).then((response) => {
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: response.data.descripcion,
              life: 3000,
            });
            this.submitted = false;
            this.articulosDialog = false;
            this.articulo = {};
            this.recargarArticulos();
          });
        }
      }
    },
    recargarArticulos() {
      UserService.todosArticulos().then((res) => {
        if (res.data.success) {
          this.articulos = res.data.articulos;
          this.loading = false;
        }
      });
    },
    myUploader(event) {
      var foto = event.files[0];
      console.log(foto);
      var formData = new FormData();
      formData.append("image", foto, "foto.jpg");
      console.log(formData.getAll("image"));
      UserService.postSubirFoto(1, formData).then();
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    prueba() {
      console.log(this.$refs.file.files[0]);
    },

    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.articulos.length; i++) {
        if (this.articulos[i].xarticulo_id === id) {
          index = i;
          break;
        }
      }

      return index;
    },
  },
};
</script>

<style>
/* Dialog */
.p-dialog .product-image {
  width: 150px;
  margin: 0 auto 2rem auto;
  display: block;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
}
.p-dialog .p-dialog-content {
  background: #ffffff;
  color: #495057;
  padding: 0 1.5rem 2rem 1.5rem;
}
.p-field > label {
  display: inline-block;
  margin-bottom: 1rem;
}
.p-field {
  margin-bottom: 1rem;
}
.p-fluid .p-inputtext {
  width: 100%;
}

.p-fluid .p-inputtextarea {
  width: 100%;
}
.p-inputtext {
  margin: 0;
}
.p-field {
  margin-bottom: 1rem;
}
.p-field > label {
  display: inline-block;
  margin-bottom: 0.5rem;
}
.p-field.p-grid,
.p-formgrid.p-grid {
  margin-top: 0;
}
.p-dialog .product-image[data-v-56e76697] {
  width: 150px;
  margin: 0 auto 2rem auto;
  display: block;
}
.p-field-radiobutton {
  margin-bottom: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.p-field-checkbox > label,
.p-field-radiobutton > label {
  margin-left: 0.5rem;
  line-height: 1;
}
/* DataTable */
.p-paginator .p-paginator-current {
  margin-left: auto;
}
.p-progressbar {
  height: 0.5rem;
  background-color: #d8dadc;
}
.p-progressbar .p-progressbar-value {
  background-color: #00acad;
}
.table-header {
  display: flex;
  justify-content: space-between;
}
.p-datepicker {
  min-width: 25rem;
}
.p-datepicker td {
  font-weight: 400;
}
.p-datatable.p-datatable-customers .p-datatable-header {
  padding: 1rem;
  text-align: left;
  font-size: 1.5rem;
}
.p-datatable.p-datatable-customers .p-paginator {
  padding: 1rem;
}
.p-datatable.p-datatable-customers .p-datatable-thead > tr > th {
  text-align: left;
}
.p-datatable.p-datatable-customers .p-datatable-tbody > tr > td {
  cursor: auto;
}
.p-datatable.p-datatable-customers .p-dropdown-label:not(.p-placeholder) {
  text-transform: uppercase;
}
/* Responsive */
.p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
  display: none;
}
@media screen and (max-width: 64em) {
  .p-datatable.p-datatable-customers .p-datatable-thead > tr > th,
  .p-datatable.p-datatable-customers .p-datatable-tfoot > tr > td {
    display: none !important;
  }
  .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td {
    text-align: left;
    display: block;
    border: 0 none !important;
    width: 100% !important;
    float: left;
    clear: left;
    border: 0 none;
  }
  .p-datatable.p-datatable-customers
    .p-datatable-tbody
    > tr
    > td
    .p-column-title {
    padding: 0.4rem;
    min-width: 30%;
    display: inline-block;
    margin: -0.4rem 1rem -0.4rem -0.4rem;
    font-weight: bold;
  }
}
</style>
