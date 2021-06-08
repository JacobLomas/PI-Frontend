<template>
  <div class="familias">
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
          :disabled="
            !familiasSeleccionadas || !familiasSeleccionadas.length
          "
        />
      </template>
    </Toolbar>

    <DataTable
      :value="familias"
      :paginator="true"
      class="
        p-datatable-customers p-datatable-responsive-demo p-datatable-striped
      "
      :rows="10"
      dataKey="xfamilia_id"
      :rowHover="true"
      :selection.sync="familiasSeleccionadas"
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
          Lista de familias
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
      <template #empty> No se han encontrado familias </template>
      <template #loading> Cargando familias. Espere... </template>

      <!-- Columna de marcado -->
      <Column selectionMode="multiple" headerStyle="width: 2.5em"></Column>
      <!-- Columna id -->
      <Column
        field="xfamilia_id"
        header="Id"
        headerStyle="width: 9em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">ID</span>
          {{ slotProps.data.xfamilia_id }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xfamilia_id']"
            class="p-column-filter w-100"
            placeholder="ID"
          />
        </template>
      </Column>
      <!-- Columna descripción -->
      <Column
        field="xdescripcion"
        header="Descripción"
        headerStyle="width: 9em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Descripción</span>
          {{ slotProps.data.xdescripcion }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xdescripcion']"
            class="p-column-filter w-100"
            placeholder="Descripción"
          />
        </template>
      </Column>
      <!-- Columna botones -->
      <Column
        headerStyle="width: 3.4rem; text-align: center"
        bodyStyle="text-align: center; overflow: visible"
      >
        <template #body="slotProps">
          <Button
            type="button"
            icon="pi pi-trash"
            class="p-button-danger p-button-rounded"
            @click="confirmBorrarFamilia(slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>

    <!-- Diálogo de borrado -->
    <Dialog
      :visible.sync="borrarFamiliaDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="familia"
          >¿Seguro que quieres borrar la familia:
          <b>{{ familia.xdescripcion }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="borrarFamiliaDialog = false"
        />
        <Button
          label="Sí"
          icon="pi pi-check"
          class="p-button-text"
          @click="borrarFamilia"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="borrarFamiliasDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="familia"
          >¿Estás seguro de que quieres eliminar las familias?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="borrarFamiliasDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="borrarFamiliasSeleccionadas"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="familiaDialog"
      :style="{ width: '350px' }"
      header="Nueva familia"
      :modal="true"
      class="p-fluid text-left"
    >
      <form class="d-flex flex-row flex-wrap mt-3">
        <div class="p-field w-100">
          <label for="name">Nombre</label>
          <InputText
            id="name"
            v-model.trim="familia.xdescripcion"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !familia.xnombre }"
          />
          <small class="p-invalid" v-if="submitted && !articulo.xnombre"
            >Nombre requerido.</small
          >
        </div>
        
      </form>
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
          @click="saveFamilia"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserService from "../../services/user.service.js";
export default {
  name: "familias",
  data() {
    return {
      familias: [],
      familia: {},
      familiasSeleccionadas: null,
      filters: {},
      loading: true,
      submitted: false,
      borrarFamiliaDialog: false,
      borrarFamiliasDialog: false,
      familiaDialog: false,
    };
  },
  mounted() {
    this.recargarSubF();
  },
  methods: {
    recargarSubF() {
      UserService.getFamilias().then((res) => {
            console.log(res);
            if (res.data.success) {
              this.familias = res.data.familias;
              this.loading = false;
            }
          });
    },
    openNew() {
      this.articulo = {};
      this.submitted = false;
      this.familiaDialog = true;
    },
    hideDialog() {
      this.familiaDialog = false;
      this.submitted = false;
    },
    saveFamilia() {
      console.log(this.familia);
      UserService.postFamilia(this.familia)
        .then((res) => {
          if (res.data.success) {
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: res.data.descripcion,
              life: 3000,
            });
            this.familiaDialog = false;
            this.submitted = false;
            this.recargarSubF();
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Error",
              detail: res.data.descripcion,
              life: 3000,
            });
          }
        })
        .catch((res) => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: res.data.descripcion,
            life: 3000,
          });
        });
    },
    confirmBorrarFamilia(subF) {
      this.familia = subF;
      this.borrarFamiliaDialog = true;
      this.recargarSubF()
    },
    confirmarBorrarSeleccionados() {
      this.borrarFamiliasDialog = true;
      this.recargarSubF()
    },
    borrarFamilia() {
      UserService.deleteFamilia(this.familia.xfamilia_id)
        .then((res) => {
          if (res.data.success) {
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: res.data.descripcion,
              life: 3000,
            });
            this.borrarFamiliaDialog = false;
            this.recargarSubF();
          }
        })
        .catch((e) => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error al borrar la familia " + e,
            life: 3000,
          });
          this.borrarFamiliaDialog = false;
        });
    },
    borrarFamiliasSeleccionadas() {
      this.familiasSeleccionadas.forEach((subF) => {
        UserService.deleteFamilia(subF.xfamilia_id).catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error al borrar las familias",
            life: 3000,
          });
          this.recargarSubF()
        });
      });
      this.borrarFamiliasDialog = false;
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Familias eliminadas",
        life: 3000,
      });
      this.recargarSubF()
    },
  },
};
</script>

<style scoped></style>
