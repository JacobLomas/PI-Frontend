<template>
  <div class="inicio p-grid">
    <div class="info p-grid p-5 col-11 ml-auto mr-auto">
      <ContextMenu ref="menu" :model="items" appendTo="body" />
      <div class="col-12 col-md-3 m-md-5">
        <img
          class="foto W-100"
          :src="'http://13.58.30.123:8000' + usuario.ximagen"
          :alt="'Foto de ' + usuario.xnombre"
          @contextmenu="onImageRightClick"
          aria-haspopup="true"
        />
      </div>

      <div
        class="
          mt-5 mt-md-0
          p-md-5
          col-12 col-md-7
          d-flex
          flex-wrap
          justify-content-xl-between
          p-fluid
        "
      >
        <div class="p-field p-field2">
          <label for="name">Nombre</label>
          <InputText
            id="name"
            v-model.trim="usuario.xnombre"
            required="true"
            :class="{ 'p-invalid': !nameValidation }"
          />
          <small class="p-invalid" v-if="!nameValidation"
            >Nombre requerido.</small
          >
        </div>
        <div class="p-field p-field2">
          <label for="name">Apellidos</label>
          <InputText
            id="apellidos"
            v-model.trim="usuario.xapellidos"
            required="true"
            :class="{ 'p-invalid': !lastnameValidation }"
          />
          <small class="p-invalid" v-if="!lastnameValidation"
            >Apellido requerido.</small
          >
        </div>
        <div class="p-field p-field2">
          <label for="name">E-mail</label>
          <InputText
            id="mail"
            v-model.trim="usuario.xmail"
            required="true"
            :class="{ 'p-invalid': !mailValidation }"
          />
          <small class="p-invalid" v-if="!mailValidation"
            >Correo requerido.</small
          >
        </div>
        <div class="p-field p-field2">
          <label for="telf">Móvil</label>
          <InputMask
            type="text"
            v-model="usuario.xtelf"
            mask="999-99-99-99"
            :class="{ 'p-invalid': !mailValidation }"
          />

          <small class="p-invalid" v-if="!telfValidation"
            >Teléfono invalido.</small
          >
        </div>
        <div class="p-field p-field2">
          <label for="name">Dirección</label>
          <InputText
            id="direccion"
            v-model.trim="usuario.xdireccion"
            required="true"
            :class="{ 'p-invalid': !usuario.xdireccion }"
          />
          <small class="p-invalid" v-if="!usuario.xdireccion"
            >Dirección requerido.</small
          >
        </div>
        <div class="p-field p-field2 mt-4">
          <Button
            class="mt-1 w-100 w-md-70"
            @click="actualizarUsuario"
            iconPos="right"
            icon="pi pi-refresh"
            :disabled="!validarActualizacion"
            >Actualizar</Button
          >
        </div>
      </div>
    </div>
    <Dialog
      :visible.sync="dialogoSubirFoto"
      :style="{ width: '450px' }"
      header="Cambiar foto"
      :modal="true"
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
        class="mb-2"
        @uploader="actualizarFoto"
      >
        <template #empty>
          <p>Arrastra hasta aquí la imagen</p>
        </template>
      </FileUpload>
    </Dialog>
  </div>
</template>

<script>
import UserService from "../../services/user.service";
export default {
  name: "inicio",
  data() {
    return {
      dialogoSubirFoto: false,
      usuario: {
        ximagen: null,
        xnombre: null,
      },
      items: [
        {
          label: "Actualizar foto",
          icon: "pi pi-fw pi-refresh",
          command: () => {
            this.dialogoSubirFoto = true;
          },
        },
        {
          label: "Quitar foto",
          icon: "pi pi-fw pi-ban",
          command: () => {this.eliminarFoto()},
        },
      ],
    };
  },
  mounted() {
    UserService.getUsuario()
      .then((res) => {
        if (res.data.success) {
          this.usuario = res.data.usuario;
        }
      })
      .catch((e) => console.error(e));
  },
  methods: {
    actualizarFoto() {
      let foto = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("image", foto);
      UserService.postActualizarFotoPerfil(formData).then((res) =>{
        if(res.data.success){
          this.usuario.ximagen= res.data.url
          this.dialogoSubirFoto = false;
          this.$toast.add({
            severity:"info",
            summary:"Foto de perfil actualizada",
            life:800
          })
        }
      })
    },
    eliminarFoto(){
      UserService.postEliminarFotoPerfil().then((res) => {
        if(res.data.success){
          this.usuario.ximagen = res.data.url
          this.$toast.add({
            severity:"info",
            summary:"Foto eliminada",
            life:800
          })
        }
      })
    },
    onImageRightClick(event) {
      this.$refs.menu.show(event);
    },
    actualizarUsuario() {
      if(this.validarActualizacion)
        UserService.postActualizarUsuario(this.usuario).then((res) =>{
          if(res.data.success){
            this.$toast.add({
              severity:"info",
              summary:"Información actualizada",
              life:800
            })
          }
        })
    },
  },
  computed: {
    validarActualizacion(){
      return this.nameValidation && this.lastnameValidation && this.mailValidation && this.telfValidation
    },
    nameValidation() {
      return this.usuario.xnombre && /^[a-zA-Z]{2,30}$/.test(this.usuario.xnombre);
    },
    lastnameValidation() {
      return (
        this.usuario.xapellidos && /^[a-zA-Z]{2,30}$/.test(this.usuario.xapellidos)
      );
    },
    mailValidation() {
      const regexp =
        /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
      return this.usuario.xmail && regexp.test(this.usuario.xmail);
    },
    telfValidation() {
      return this.usuario.xtelf && this.usuario.xtelf.length == 12;
    },
  }
};
</script>

<style scoped>
.foto {
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  width: 100%;
}
.p-field2 {
  width: 250px;
  min-width: 150px;
}
</style>
