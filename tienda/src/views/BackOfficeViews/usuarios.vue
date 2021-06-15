<template>
  <div class="usuarios">
    <Toolbar class="mb-2">
      <template #left>
        <Button
          label="Borrar"
          icon="pi pi-trash"
          class="p-button-danger"
          @click="confirmarBorrarSeleccionados"
          :disabled="!usuariosSeleccionados || !usuariosSeleccionados.length"
        />
      </template>
    </Toolbar>

    <DataTable
      :value="usuarios"
      :paginator="true"
      class="
        p-datatable-customers p-datatable-responsive-demo p-datatable-striped
      "
      :rows="10"
      dataKey="xcliente_id"
      :rowHover="true"
      :selection.sync="usuariosSeleccionados"
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
          Lista de usuarios
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
      <template #empty> No se han encontrado usuarios </template>
      <template #loading> Cargando clientes. Espere... </template>

      <!-- Columna de marcado -->
      <Column selectionMode="multiple" headerStyle="width: 2.5em"></Column>
      <!-- Columna id -->
      <Column
        field="xcliente_id"
        header="Id"
        headerStyle="width: 4em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">ID</span>
          {{ slotProps.data.xcliente_id }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xcliente_id']"
            class="p-column-filter w-100"
            placeholder="ID"
          />
        </template>
      </Column>
      <!-- Columna nombre -->
      <Column
        field="xnombre"
        header="Nombre"
        headerStyle="width: 6em"
        :sortable="true"
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
            placeholder="Nombre"
          />
        </template>
      </Column>

      <Column
        field="xapellidos"
        header="Apellidos"
        headerStyle="width: 7em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Apellidos</span>
          {{ slotProps.data.xapellidos }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xapellidos']"
            class="p-column-filter w-100"
            placeholder="Apellidos"
          />
        </template>
      </Column>

      <Column
        field="xdireccion"
        header="Dirección"
        headerStyle="width: 9em"
        :sortable="true"
      >
        <template #body="slotProps" style="overflow: hidden">
          <span class="p-column-title">Dirección</span>
          <span class="overflow-hidden">{{ slotProps.data.xdireccion }}</span>
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xdireccion']"
            class="p-column-filter w-100"
            placeholder="Dirección"
          />
        </template>
      </Column>

      <Column
        field="xmail"
        header="Email"
        headerStyle="width: 12em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Email</span>
          <span class="overflow-hidden">{{ slotProps.data.xmail }}</span>
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xmail']"
            class="p-column-filter w-100"
            placeholder="Email"
          />
        </template>
      </Column>
      <!-- Columna telf -->
      <Column
        field="xtelf"
        header="Móvil"
        headerStyle="width: 7em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Móvil</span>
          {{ slotProps.data.xtelf }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xtelf']"
            class="p-column-filter w-100"
            placeholder="Móvil"
          />
        </template>
      </Column>
      <!-- Columna fecha ultima -->
      <Column
        field="xultima_conexion"
        header="Ultima conexión "
        headerStyle="width: 6em"
        :sortable="true"
      >
        <template #body="slotProps">
          <span class="p-column-title">Ultima conexión</span>
          {{
            slotProps.data.xultima_conexion
              ? slotProps.data.xultima_conexion.split("T")[0]
              : "Nunca"
          }}
        </template>
        <template #filter>
          <InputText
            type="text"
            v-model="filters['xultima_conexion']"
            class="p-column-filter w-100"
            placeholder="Ultima conexión"
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
            @click="confirmarBorrarCliente(slotProps.data)"
          ></Button>
        </template>
      </Column>
    </DataTable>

    <!-- Diálogo de borrado -->
    <Dialog
      :visible.sync="borrarUsuarioDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="usuario"
          >¿Seguro que quieres borrar el usuario:
          <b>{{ usuario.xnombre + " " + usuario.xapellidos }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="borrarUsuarioDialog = false"
        />
        <Button
          label="Sí"
          icon="pi pi-check"
          class="p-button-text"
          @click="borrarUsuario"
        />
      </template>
    </Dialog>

    <Dialog
      :visible.sync="borrarUsuariosDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="usuario"
          >¿Estás seguro de que quieres eliminar estos usuarios?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="borrarUsuariosDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="borrarUsuariosSeleccionados"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
export default {
  name: "usuarios",
  data() {
    return {
      usuarios: [],
      usuario: {},
      usuariosSeleccionados: null,
      borrarUsuarioDialog: false,
      borrarUsuariosDialog: false,
      filters: {},
      loading: true,
    };
  },
  mounted() {
    UserService.getUsuarios().then((res) => {
      if (res.data.success) {
        this.usuarios = res.data.usuarios;
        this.loading = false;
      }
    });
  },
  methods: {
    confirmarBorrarCliente(usuario) {
      this.usuario = usuario;
      this.borrarUsuarioDialog = true;
    },
    confirmarBorrarSeleccionados() {
      this.borrarUsuariosDialog = true;
    },
    borrarUsuario() {
      UserService.deleteUsuario(this.usuario.xcliente_id).then((res1) => {
        if (res1.data.success) this.borrarUsuarioDialog = false;
        UserService.getUsuarios().then((res) => {
          if (res.data.success) {
            this.usuarios = res.data.usuarios;
          }
        });
      });
    },
    borrarUsuariosSeleccionados() {
      try {
        this.usuariosSeleccionados.forEach(async (u) => {
          await UserService.deleteUsuario(u.xcliente_id);
        });
      } catch (e) {
        console.error(e);
      }
      this.borrarUsuariosDialog = false;
      UserService.getUsuarios().then((res) => {
        if (res.data.success) {
          this.usuarios = res.data.usuarios;
        }
      });
    },
  },
};
</script>

<style scoped></style>
