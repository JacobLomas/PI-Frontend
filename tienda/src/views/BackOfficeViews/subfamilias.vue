<template>
  <div class="subfamilias">
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
            !subfamiliasSeleccionadas || !subfamiliasSeleccionadas.length
          "
        />
      </template>
    </Toolbar>

    <DataTable
      :value="subfamilias"
      :paginator="true"
      class="
        p-datatable-customers p-datatable-responsive-demo p-datatable-striped
      "
      :rows="10"
      dataKey="xsubfamilia_id"
      :rowHover="true"
      :selection.sync="subfamiliasSeleccionadas"
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
          Lista de subfamilias
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
      <template #empty> No se han encontrado subfamilias </template>
      <template #loading> Cargando subfamilias. Espere... </template>

      <!-- Columna de marcado -->
      <Column selectionMode="multiple" headerStyle="width: 2.5em"></Column>
      <!-- Columna id -->
      <Column
        field="xsubfamilia_id"
        header="Id"
        headerStyle="width: 9em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">ID</span>
          {{ slotProps.data.xsubfamilia_id }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xsubfamilia_id']"
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
      <!-- Columna Familia ID -->
      <Column
        field="xfamilia_id"
        header="Familia ID"
        headerStyle="width: 9em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Familia ID</span>
          {{ slotProps.data.xfamilia_id }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xfamilia_id']"
            class="p-column-filter w-100"
            placeholder="Familia ID"
          />
        </template>
      </Column>
      <!-- Columna Familia Descripcion -->
      <Column
        field="famDesc"
        header="Familia Descripción"
        headerStyle="width: 9em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Familia Descripción</span>
          {{ slotProps.data.famDesc }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['famDesc']"
            class="p-column-filter w-100"
            placeholder="Familia"
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
            @click="confirmBorrarSubfamilia(slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>

    <!-- Diálogo de borrado -->
    <Dialog
      :visible.sync="borrarSubFDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="subfamilia"
          >¿Seguro que quieres borrar la subfamilia:
          <b>{{ subfamilia.xdescripcion }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="borrarSubFDialog = false"
        />
        <Button
          label="Sí"
          icon="pi pi-check"
          class="p-button-text"
          @click="borrarSubFamilia"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="borrarSubfamiliasDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="subfamilia"
          >¿Estás seguro de que quieres eliminar las subfamilias?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="borrarSubfamiliasDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="borrarSubfamiliasSeleccionadas"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="subfamiliaDialog"
      :style="{ width: '350px' }"
      header="Nueva subfamilia"
      :modal="true"
      class="p-fluid text-left"
    >
      <form class="d-flex flex-row flex-wrap mt-3">
        <div class="p-field w-100">
          <label for="name">Nombre</label>
          <InputText
            id="name"
            v-model.trim="subfamilia.xdescripcion"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !subfamilia.xnombre }"
          />
          <small class="p-invalid" v-if="submitted && !articulo.xnombre"
            >Nombre requerido.</small
          >
        </div>
        <div class="p-field w-100">
          <label class="mb-3 ml-2">Subfamilias</label>
          <div class="p-formgrid p-grid">
            <Dropdown
              v-model="subfamilia.xfamilia_id"
              :options="familias"
              optionLabel="xdescripcion"
              optionValue="xfamilia_id"
              placeholder="Selecciona la familia"
              :filter="true"
              filterPlaceholder="Selecciona una"
              class="col-12"
            />
          </div>
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
          @click="saveSubFamilia"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserService from "../../services/user.service.js";
export default {
  name: "subfamilias",
  data() {
    return {
      subfamilias: [],
      subfamilia: {},
      familias: [],
      subfamiliasSeleccionadas: null,
      filters: {},
      loading: true,
      submitted: false,
      borrarSubFDialog: false,
      borrarSubfamiliasDialog: false,
      subfamiliaDialog: false,
    };
  },
  mounted() {
    this.recargarSubF();
  },
  methods: {
    recargarSubF() {
      UserService.getSubFamilias().then((res) => {
        if (res.data.success) {
          let subF = res.data.subfamilias;
          UserService.getFamilias().then((res) => {
            if (res.data.success) {
              let familias = res.data.familias;
              subF.forEach((subF) => {
                let { xdescripcion } = familias.find((fam) => {
                  return fam.xfamilia_id == subF.xfamilia_id;
                });
                subF.famDesc = xdescripcion;
              });
              this.familias = familias;
              this.subfamilias = subF;
              this.loading = false;
            }
          });
        }
      });
    },
    openNew() {
      this.subfamilia = {};
      this.submitted = false;
      this.subfamiliaDialog = true;
    },
    hideDialog() {
      this.subfamiliaDialog = false;
      this.submitted = false;
    },
    saveSubFamilia() {
      UserService.postSubFamilia(this.subfamilia)
        .then((res) => {
          if (res.data.success) {
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: res.data.descripcion,
              life: 3000,
            });
            this.subfamiliaDialog = false;
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
    confirmBorrarSubfamilia(subF) {
      this.subfamilia = subF;
      this.borrarSubFDialog = true;
    },
    confirmarBorrarSeleccionados() {
      this.borrarSubfamiliasDialog = true;
    },
    borrarSubFamilia() {
      UserService.deleteSubfamilia(this.subfamilia.xsubfamilia_id)
        .then((res) => {
          if (res.data.success) {
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: res.data.descripcion,
              life: 3000,
            });
            this.borrarSubFDialog = false;
            this.recargarSubF();
          }
        })
        .catch((e) => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error al borrar la subfamilia " + e,
            life: 3000,
          });
          this.borrarSubFDialog = false;
        });
    },
    borrarSubfamiliasSeleccionadas() {
      this.subfamiliasSeleccionadas.forEach((subF) => {
        UserService.deleteSubfamilia(subF.xsubfamilia_id).catch(() => {
          this.$toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error al borrar las subfamilias",
            life: 3000,
          });
          this.recargarSubF();
        });
      });
      this.borrarSubfamiliasDialog = false;
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Subfamilias eliminadas",
        life: 3000,
      });
      this.recargarSubF();
    },
  },
};
</script>

<style scoped></style>
