<template>
  <div class="carrito p-grid mt-4">
    <div class="404 w-100" @mousemove="gosthMove($event)" v-if="this.carritoVacio">
      <div class="box">
        <div class="box__ghost">
          <div class="symbol"></div>
          <div class="symbol"></div>
          <div class="symbol"></div>
          <div class="symbol"></div>
          <div class="symbol"></div>
          <div class="symbol"></div>

          <div class="box__ghost-container">
            <div class="box__ghost-eyes">
              <div class="box__eye-left"></div>
              <div class="box__eye-right"></div>
            </div>
            <div class="box__ghost-bottom">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="box__ghost-shadow"></div>
        </div>

        <div class="box__description">
          <div class="box__description-container">
            <div class="box__description-title">Whoops!</div>
            <div class="box__description-text">
              Parece que no hay nada en tu cesta
            </div>
          </div>

          <Button
            @click="irInicio()"
            class="box__button"
            >Volver a inicio</Button
          >
        </div>
      </div>
    </div>

    <OrderList
      v-model="carrito"
      listStyle="height:auto; max-height: 90vh"
      class="col-12 col-md-8"
      dataKey="xarticulo_id"
      @click="clickOrder($event)"
      v-if="!this.carritoVacio"
    >
      <template #header> Lista de compra </template>
      <template #item="slotProps" @click="clickOrder($event)">
        <div class="product-item">
          <div class="image-container">
            <img
              :src="'http://13.58.30.123:8000' + slotProps.item.ximagen"
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
              class="mr-3"
              decrementButtonClass="p-button-secondary"
              incrementButtonClass="p-button-secondary"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              :max="slotProps.item.xstock"
              :min="1"
              @input="actualizarCarrito()"
            >
            </InputNumber>
            <Button
              type="button"
              icon="pi pi-trash"
              class="p-button-danger p-button-rounded ml-1"
              @click="borrarArticulo(slotProps.item)"
            ></Button>
          </div>
        </div>
      </template>
    </OrderList>
    <!-- Carrito vacío -->
    <div class="col-12 col-md-4 mt-2 text-left" v-if="!this.carritoVacio">
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
            @click="mostrarDialogoPago()"
          ></Button>
        </li>
      </ul>
    </div>
    <!-- =========== -->
    <!-- Dialogo de loggin -->
    <Dialog
      :visible.sync="logginDialog"
      :style="{ width: '350px' }"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span>Necesitas estár registrado para comprar</span>
      </div>
      <template #footer>
        <Button
          label="Iniciar Session"
          icon="pi pi-check"
          @click="redirectLogin"
          class="p-button-text"
          autofocus
        />
      </template>
    </Dialog>

    <!-- Dialogo de pago -->
    <Dialog
      :visible.sync="pedidoCreado"
      :style="{ width: '450px' }"
      :modal="true"
      @show="tramitarPedido"
    >
      <h3>Formas de pago</h3>
      <div ref="paypal" class="paypalButtons"></div>
      
    </Dialog>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import { paypalID } from "../keys";
import $ from "jquery";
export default {
  name: "Carrito",
  data() {
    return {
      carrito: [1],
      gastosEnvio: 3.99,
      logginDialog: false,
      pedidoCreado: false,
    };
  },
  mounted() {
    try{this.carrito = this.$store.state.carritoStorage.carrito;}catch(e){this.carrito=[]}
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=" + paypalID + "&currency=EUR";
    document.body.appendChild(script);
  },
  computed: {
    importeTotal() {
      if (!this.carrito) return;
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
    carritoVacio(){
      return this.carrito.length == 0 ? true : false
    }
  },
  methods: {
    irInicio(){this.$router.push('/')},
    gosthMove(event) {

      var pageX = $(document).width();
      var pageY = $(document).height();
      var mouseY = 0;
      var mouseX = 0;

      //verticalAxis
      mouseY = event.pageY;
      var yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
      //horizontalAxis
      mouseX = event.pageX / -pageX;
      var xAxis = -mouseX * 100 - 100;

      $(".box__ghost-eyes").css({
        transform: "translate(" + xAxis + "%,-" + yAxis + "%)",
      });
    },
    actualizarCarrito() {
      this.$store.dispatch("carritoStorage/actualizarCarrito", this.carrito);
    },
    mostrarDialogoPago() {
      if (!this.loggedIn) {
        this.logginDialog = true;
        return;
      }
      this.pedidoCreado = true;
    },
    redirectLogin() {
      this.$router.push("/login-signup/login");
    },
    borrarArticulo(articulo) {
      this.$store.dispatch(
        "carritoStorage/borrarArticulo",
        articulo.xarticulo_id
      );
      this.carrito = this.$store.state.carritoStorage.carrito;
    },
    tramitarPedido() {
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
      pedido.gastosEnvio = this.gastosEnvio;
      UserService.postNuevoPedido(pedido).then((response) => {
        if (response.data.success) {
          this.pedidoCreado = true;
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: response.data.purchase_units,
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                UserService.postPagarPedido(response.data.id_pedido, order)
                  .then((res) => {
                    if (res.data.success) {
                      this.pedidoCreado = false;
                      this.$store.dispatch("carritoStorage/borrarTodoCarrito");
                      this.$toast.add({
                        severity: "success",
                        summary: "Pagado",
                        detail: "Disfrute de su pedido ♥",
                      });
                      this.$router.push("/");
                    } else {
                      this.$toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: res.data.descripcion,
                        life: 15000,
                      });
                    }
                  })
                  .catch((e) => {
                    this.$toast.add({
                      severity: "error",
                      summary: "Error",
                      detail: e.data.descripcion,
                      life: 15000,
                    });
                  });
              },
              onError: (err) => {
                console.warn(err);
                this.$toast.add({
                  severity: "error",
                  summary: "Error",
                  detail: err,
                  life: 15000,
                });
              },
            })
            .render(this.$refs.paypal);
          /* this.$router.push("/");
          this.$store.dispatch("carritoStorage/borrarCarrito");
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: response.data.descripcion,
            life: 3000,
          }); */
        }
      });
    },
    closeConfirmation() {
      this.logginDialog = false;
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
.confirmation-content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
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

/* 404 */
@import url(https://fonts.googleapis.com/css?family=Ubuntu);
html,
body {
  background: #28254c;
  font-family: "Ubuntu";
}

* {
  box-sizing: border-box;
}

.box {
  width: 350px;
  height: 100%;
  max-height: 600px;
  min-height: 450px;
  background: #332f63;
  border-radius: 20px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 50px;
}
.box .box__ghost {
  padding: 15px 25px 25px;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
}
.box .box__ghost .symbol:nth-child(1) {
  opacity: 0.2;
  animation: shine 4s ease-in-out 3s infinite;
}
.box .box__ghost .symbol:nth-child(1):before,
.box .box__ghost .symbol:nth-child(1):after {
  content: "";
  width: 12px;
  height: 4px;
  background: #fff;
  position: absolute;
  border-radius: 5px;
  bottom: 65px;
  left: 0;
}
.box .box__ghost .symbol:nth-child(1):before {
  transform: rotate(45deg);
}
.box .box__ghost .symbol:nth-child(1):after {
  transform: rotate(-45deg);
}
.box .box__ghost .symbol:nth-child(2) {
  position: absolute;
  left: -5px;
  top: 30px;
  height: 18px;
  width: 18px;
  border: 4px solid;
  border-radius: 50%;
  border-color: #fff;
  opacity: 0.2;
  animation: shine 4s ease-in-out 1.3s infinite;
}
.box .box__ghost .symbol:nth-child(3) {
  opacity: 0.2;
  animation: shine 3s ease-in-out 0.5s infinite;
}
.box .box__ghost .symbol:nth-child(3):before,
.box .box__ghost .symbol:nth-child(3):after {
  content: "";
  width: 12px;
  height: 4px;
  background: #fff;
  position: absolute;
  border-radius: 5px;
  top: 5px;
  left: 40px;
}
.box .box__ghost .symbol:nth-child(3):before {
  transform: rotate(90deg);
}
.box .box__ghost .symbol:nth-child(3):after {
  transform: rotate(180deg);
}
.box .box__ghost .symbol:nth-child(4) {
  opacity: 0.2;
  animation: shine 6s ease-in-out 1.6s infinite;
}
.box .box__ghost .symbol:nth-child(4):before,
.box .box__ghost .symbol:nth-child(4):after {
  content: "";
  width: 15px;
  height: 4px;
  background: #fff;
  position: absolute;
  border-radius: 5px;
  top: 10px;
  right: 30px;
}
.box .box__ghost .symbol:nth-child(4):before {
  transform: rotate(45deg);
}
.box .box__ghost .symbol:nth-child(4):after {
  transform: rotate(-45deg);
}
.box .box__ghost .symbol:nth-child(5) {
  position: absolute;
  right: 5px;
  top: 40px;
  height: 12px;
  width: 12px;
  border: 3px solid;
  border-radius: 50%;
  border-color: #fff;
  opacity: 0.2;
  animation: shine 1.7s ease-in-out 7s infinite;
}
.box .box__ghost .symbol:nth-child(6) {
  opacity: 0.2;
  animation: shine 2s ease-in-out 6s infinite;
}
.box .box__ghost .symbol:nth-child(6):before,
.box .box__ghost .symbol:nth-child(6):after {
  content: "";
  width: 15px;
  height: 4px;
  background: #fff;
  position: absolute;
  border-radius: 5px;
  bottom: 65px;
  right: -5px;
}
.box .box__ghost .symbol:nth-child(6):before {
  transform: rotate(90deg);
}
.box .box__ghost .symbol:nth-child(6):after {
  transform: rotate(180deg);
}
.box .box__ghost .box__ghost-container {
  background: #fff;
  width: 100px;
  height: 100px;
  border-radius: 100px 100px 0 0;
  position: relative;
  margin: 0 auto;
  animation: upndown 3s ease-in-out infinite;
}
.box .box__ghost .box__ghost-container .box__ghost-eyes {
  position: absolute;
  left: 50%;
  top: 45%;
  height: 12px;
  width: 70px;
}
.box .box__ghost .box__ghost-container .box__ghost-eyes .box__eye-left {
  width: 12px;
  height: 12px;
  background: #332f63;
  border-radius: 50%;
  margin: 0 10px;
  position: absolute;
  left: 0;
}
.box .box__ghost .box__ghost-container .box__ghost-eyes .box__eye-right {
  width: 12px;
  height: 12px;
  background: #332f63;
  border-radius: 50%;
  margin: 0 10px;
  position: absolute;
  right: 0;
}
.box .box__ghost .box__ghost-container .box__ghost-bottom {
  display: flex;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
}
.box .box__ghost .box__ghost-container .box__ghost-bottom div {
  flex-grow: 1;
  position: relative;
  top: -10px;
  height: 20px;
  border-radius: 100%;
  background-color: #fff;
}
.box .box__ghost .box__ghost-container .box__ghost-bottom div:nth-child(2n) {
  top: -12px;
  margin: 0 0px;
  border-top: 15px solid #332f63;
  background: transparent;
}
.box .box__ghost .box__ghost-shadow {
  height: 20px;
  box-shadow: 0 50px 15px 5px #3b3769;
  border-radius: 50%;
  margin: 0 auto;
  animation: smallnbig 3s ease-in-out infinite;
}
.box .box__description {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
.box .box__description .box__description-container {
  color: #fff;
  text-align: center;
  width: 200px;
  font-size: 16px;
  margin: 0 auto;
}
.box .box__description .box__description-container .box__description-title {
  font-size: 24px;
  letter-spacing: 0.5px;
}
.box .box__description .box__description-container .box__description-text {
  color: #8c8aa7;
  line-height: 20px;
  margin-top: 20px;
}
.box .box__description .box__button {
  display: block;
  position: relative;
  border: 1px solid transparent;
  height: 50px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  line-height: 50px;
  font-size: 18px;
  padding: 0 70px;
  white-space: nowrap;
  margin-top: 25px;
  transition: background 0.5s ease;
  overflow: hidden;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  mask-image: -webkit-radial-gradient(white, black);
}
.box .box__description .box__button:before {
  content: "";
  position: absolute;
  width: 20px;
  height: 100px;
  background: #fff;
  bottom: -25px;
  left: 0;
  border: 2px solid #fff;
  transform: translateX(-50px) rotate(45deg);
  transition: transform 0.5s ease;
}
.box .box__description .box__button:hover {
  background: transparent;
  border-color: #fff;
}
.box .box__description .box__button:hover:before {
  transform: translateX(250px) rotate(45deg);
}

@keyframes upndown {
  0% {
    transform: translateY(5px);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(5px);
  }
}
@keyframes smallnbig {
  0% {
    width: 90px;
  }
  50% {
    width: 100px;
  }
  100% {
    width: 90px;
  }
}
@keyframes shine {
  0% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
