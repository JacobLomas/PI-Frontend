import Vue from 'vue'
import App from './App.vue';
import store from './store';

/* Vue resize images */
import ImageUploader from 'vue-image-upload-resize'
Vue.use(ImageUploader);

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
import InputMask from 'primevue/inputmask';
import Calendar from 'primevue/calendar';
import InputSwitch from 'primevue/inputswitch';
import InlineMessage from 'primevue/inlinemessage';
import ToastService from 'primevue/toastservice';
Vue.use(ToastService);
import Toast from 'primevue/toast';
import Avatar from 'primevue/avatar';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Menu from 'primevue/menu';
import Dropdown from 'primevue/dropdown';
import Rating from 'primevue/rating';
import Breadcrumb from 'primevue/breadcrumb';
import Carousel from 'primevue/carousel';
import ScrollTop from 'primevue/scrolltop';
import PanelMenu from 'primevue/panelmenu';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import MultiSelect from 'primevue/multiselect';
import RadioButton from 'primevue/radiobutton';
import InputNumber from 'primevue/inputnumber';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import OverlayPanel from 'primevue/overlaypanel';
import ConfirmPopup from 'primevue/confirmpopup';
import ConfirmDialog from 'primevue/confirmdialog';
import OrderList from 'primevue/orderlist';
import Badge from 'primevue/badge';
import Galleria from 'primevue/galleria';
import Sidebar from 'primevue/sidebar';
import ContextMenu from 'primevue/contextmenu';
import Checkbox from 'primevue/checkbox';
import Chart from 'primevue/chart';




Vue.component('Password', Password);
Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Menubar', Menubar);
Vue.component('TabMenu', TabMenu);
Vue.component('InputMask', InputMask);
Vue.component('Calendar', Calendar);
Vue.component('InputSwitch', InputSwitch);
Vue.component('InlineMessage', InlineMessage);
Vue.component('Toast', Toast);
Vue.component('Avatar', Avatar);
Vue.component('DataView', DataView);
Vue.component('DataViewLayoutOptions', DataViewLayoutOptions);
Vue.component('Menu', Menu);
Vue.component('Dropdown', Dropdown);
Vue.component('Rating', Rating);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('Carousel', Carousel);
Vue.component('ScrollTop', ScrollTop);
Vue.component('PanelMenu', PanelMenu);
Vue.component('DataTable', DataTable);
Vue.component('Column', Column);
Vue.component('ColumnGroup', ColumnGroup);
Vue.component('MultiSelect', MultiSelect);
Vue.component('RadioButton', RadioButton);
Vue.component('InputNumber', InputNumber);
Vue.component('Dialog', Dialog);
Vue.component('Textarea', Textarea);
Vue.component('Toolbar', Toolbar);
Vue.component('FileUpload', FileUpload);
Vue.component('OverlayPanel', OverlayPanel);
Vue.component('ConfirmPopup', ConfirmPopup);
Vue.component('ConfirmDialog', ConfirmDialog);
Vue.component('OrderList', OrderList);
Vue.component('Badge', Badge);
Vue.component('Galleria', Galleria);
Vue.component('Sidebar', Sidebar);
Vue.component('ContextMenu', ContextMenu);
Vue.component('Checkbox', Checkbox);
Vue.component('Chart', Chart);



import ConfirmationService from 'primevue/confirmationservice';
Vue.use(ConfirmationService);


Vue.use(PrimeVue, {
  devtool: 'source-map',
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

import footerPers from './components/footerPers'
Vue.component('footerPers',footerPers);

import artVisitados from './components/artVisitados'
Vue.component('artVisitados',artVisitados);

import LoginSignup from './views/LoginSignup'
Vue.component(LoginSignup);

/**
 * VueRouter
 */
import VueRouter from 'vue-router'
import Routes from './routes/routes';
import './registerServiceWorker'
Vue.use(VueRouter)
// Objeto VueRouter
const router = new VueRouter({
  routes: Routes,
  /* mode: 'history' */
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  window.scrollTo(0,0)
  next();
});


/**
 * Lanzar Vue
 */
Vue.config.productionTip = false
new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
