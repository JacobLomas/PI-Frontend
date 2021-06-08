<template>
  <div class="carrito p-grid mt-4">
    <OrderList
      v-model="carrito"
      listStyle="height:auto; max-height: 90vh"
      class="col-12 col-md-8"
      dataKey="xarticulo_id"
    >
      <template #header> Lista de compra </template>
      <template #item="slotProps">
        <div class="product-item">
          <div class="image-container">
            <img
              :src="'http://localhost:8000' + slotProps.item.ximagen"
              :alt="slotProps.item.xnombre"
            />
          </div>
          <div class="product-list-detail">
            <h5 class="p-mb-2">{{ slotProps.item.xnombre }}</h5>
            <i class="pi pi-tag product-category-icon"></i>
            <span class="product-category">{{ slotProps.item.descSubF }}</span>
            <h5 class="p-mb-2">{{ slotProps.item.xprecio }}€</h5>
          </div>
          <div class="product-list-action p-grid">
            <InputNumber
              v-model="slotProps.item.cantidad"
              mode="decimal"
              showButtons
              buttonLayout="vertical"
              style="width: 2.3rem"
              decrementButtonClass="p-button-secondary"
              incrementButtonClass="p-button-secondary"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              :max="slotProps.item.xstock"
              :min="1"
            >
            </InputNumber>
            <Button
              type="button"
              icon="pi pi-trash"
              class="p-button-danger p-button-rounded ml-1"
              @click="borrarArticulo(slotProps.data)"
            ></Button>
          </div>
        </div>
      </template>
    </OrderList>
    <div class="col-12 col-md-4 mt-2 text-left">
      <h4 class="mb-3 ml-1">Resumen de compra</h4>
      <ul class="p-grid ml-1 list-group">
        <li class="list-group-item d-flex justify-content-between">
          Subtotal: <span class="mr-5">{{ round(importeTotal) }}€</span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          Gastos de envío: <span class="mr-5">{{ gastosEnvio }}€</span>
        </li>
        <li class="list-group-item text-right">
          <h4 class="mr-5 font-weight-bold">
            Total: {{ round(importeTotal + gastosEnvio) }}€
          </h4>
          <Button
            class="mr-5"
            label="Realizar pedido"
            :disabled="!isTramitable"
            @click="tramitarPedido()"
          ></Button>
        </li>
      </ul>
    </div>
    <Dialog
      visible.sync="logginDialog"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span>Necesitas estár registrado para comprar</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          @click="closeConfirmation"
          class="p-button-text"
        />
        <Button
          label="Iniciar Session"
          icon="pi pi-check"
          @click="redirectLogin"
          class="p-button-text"
          autofocus
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserService from "../services/user.service";
export default {
  name: "Carrito",
  data() {
    return {
      carrito: [],
      gastosEnvio: 3.99,
      logginDialog: false,
    };
  },
  mounted() {
    this.carrito = this.$store.state.carritoStorage.carrito;
  },
  computed: {
    importeTotal() {
      var importe = 0;
      this.carrito.forEach((element) => {
        importe += element.xprecio * element.cantidad;
      });
      return importe;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    isTramitable() {
      return this.importeTotal > 0;
    },
  },
  methods: {
    redirectLogin(){
      this.$router.push('/login-signup/login')
    },
    tramitarPedido() {
      if (!this.loggedIn) {
        this.logginDialog = true;
        return;
      }

      var pedido = {
        total: this.round(this.importeTotal + this.gastosEnvio),
        lineas: [],
      };

      this.carrito.forEach((lineaCar) => {
        let linea = {};
        linea.xarticulo_id = lineaCar.xarticulo_id;
        linea.xcantidad = lineaCar.cantidad;
        linea.xporc_dto = lineaCar.xporc_dto;
        linea.xsubtotal = this.round(lineaCar.xprecio * lineaCar.cantidad);
        pedido.lineas.push(linea);
      });
      UserService.postNuevoPedido(pedido).then((response) => {
        if (response.data.success) {
          this.$router.push("/");
          this.$store.dispatch("carritoStorage/borrarCarrito");
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: response.data.descripcion,
            life: 3000,
          });
        }
      });
    },
    closeConfirmation(){
      this.logginDialog = false
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
};
</script>

<style scoped>
.product-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
}
.product-item img {
  width: 75px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 1rem;
}
.product-item .product-list-detail {
  flex: 1 1 0;
  text-align: left;
}
.product-item .product-list-action {
  display: flex;
  flex-direction: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.product-item .product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}
.product-item .product-category {
  vertical-align: middle;
  line-height: 1;
}
@media screen and (max-width: 576px) {
  .product-item {
    flex-wrap: wrap;
  }
  .product-item .image-container {
    width: 100%;
    text-align: center;
  }
  .product-item img {
    margin: 0 0 1rem 0;
    width: 100px;
  }
}
</style>
