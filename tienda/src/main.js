import Vue from 'vue'
import App from './App.vue';
import store from './store';
/**
 * Bootstrap & BootstrapVue
 */
import 'jquery';
import 'popper.js';
import 'bootstrap';
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

/**
 * VUEPRIME
 */
import 'primevue/resources/themes/bootstrap4-light-purple/theme.css';
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import Password from "primevue/password/Password";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import TabMenu from 'primevue/tabmenu';


Vue.component('Password', Password);
Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Menubar', Menubar);
Vue.component('TabMenu', TabMenu);



Vue.use(PrimeVue, {
  ripple: true,
  locale: {
    accept: 'Aceptar',
    reject: 'Rechazar',
    choose: 'Elegir',
    upload: 'Subir',
    cancel: 'Cancelar',
    dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
    dayNamesMin: 	["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
    monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
    monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: "Hoy",
    weak: "Débil",
    medium: "Medio",
    strong: "Fuerte"
    //...
  }
});

/**
 * VueAxios
 */
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);

/**
  * Vistas
  */
import Inicio from './views/Inicio'
Vue.component(Inicio);

import Productos from './views/Productos'
Vue.component(Productos);

import LoginSignup from './views/LoginSignup'
Vue.component(LoginSignup);

/**
 * VueRouter
 */
 import VueRouter from 'vue-router'
 import Routes from './routes/routes';
 Vue.use(VueRouter)
// Objeto VueRouter
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})


/**
 * Lanzar Vue
 */
 Vue.config.productionTip = false
new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')