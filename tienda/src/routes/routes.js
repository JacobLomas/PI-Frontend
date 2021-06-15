import Inicio from '../views/Inicio'
import Productos from '../views/Productos'
import LoginSignup from '../views/LoginSignup'
import MiPerfil from '../views/MiPerfil'
import misPedidos from '../views/MiPerfilViews/misPedidos'
import inicio from '../views/MiPerfilViews/inicio'
import favoritos from '../views/MiPerfilViews/favoritos'
import Carrito from '../views/Carrito'
import BackOffice from '../views/BackOffice'
import Producto from '../views/Producto'
import login from '../components/login'
import signup from '../components/signup'
import UserService from '../services/user.service';
import articulos from '../views/BackOfficeViews/articulos'
import pedidos from '../views/BackOfficeViews/pedidos'
import usuarios from '../views/BackOfficeViews/usuarios'
import familias from '../views/BackOfficeViews/familias'
import subfamilias from '../views/BackOfficeViews/subfamilias'
import ventasAno from '../views/BackOfficeViews/ventasAno'
import masVendidos from '../views/BackOfficeViews/masVendidos'
import masVisitados from '../views/BackOfficeViews/masVisitados'
//import axios from 'axios'

export default [
  {
    path: '/',
    component: Inicio,
    name: "Inicio"
  },
  {
    path: '/articulo/:articuloId',
    component: Producto,
    name: "Producto"
  },
  {
    path: '/tienda/:familia/:subfamilia',
    component: Productos,
    name: "Productos"
  },
  {
    path: '/tienda/:familia',
    component: Productos,
    name: "ProductosFam"
  },
  {
    path: '/login-signup',
    component: LoginSignup,
    name: "LoginSignup",
    children: [{
        path: 'login',
        component: login,
        name: "login"
      },
      {
        path: 'signup',
        component: signup,
        name: "signup"
      }
    ]
  },
  {
    path:'/carrito',
    component: Carrito,
    name: 'Carrito'
  },
  {
    path: '/admin',
    component: BackOffice,
    beforeEnter: async (to, from, next) => {
      try {
        const response = await UserService.esAdministrador();
        if (response.data.esAdministador)
          next();
        else
          next({
            name: 'Inicio'
          });
      } catch (e) {
        next({
          name: 'Inicio'
        });
        console.error(e)
      }
    },
    children: [
      {
        path: '',
        component: articulos,
        name: "BackOffice"
      },
      {
        path: 'pedidos',
        component: pedidos,
        name: "Pedidos"
      },
      {
        path: 'usuarios',
        component: usuarios,
        name: "Usuarios"
      },
      {
        path: 'articulos',
        component: articulos,
        name: "Artículos"
      },
      {
        path: 'familias',
        component: familias,
        name: "Familias"
      },
      {
        path: 'subfamilias',
        component: subfamilias,
        name: "Subfamilias"
      },
      {
        path: 'chartVentas',
        component: ventasAno,
        name: "Ventas en el año"
      },
      {
        path: 'chartMasVendidos',
        component: masVendidos,
        name: "Articulos más vendidos"
      },
      {
        path: 'chartMasVisitados',
        component: masVisitados,
        name: "Articulos más visitados"
      },
    ]
  },
  {
    path: '/perfil',
    component: MiPerfil,
    children: [
      {
        path:'',
        component: inicio,
        name:'Mi Perfil'
      },
      {
        path:'info',
        component: inicio,
        name:'Mis datos'
      },
      {
        path:'pedidos',
        component: misPedidos,
        name:'Mis pedidos'
      },
      {
        path:'favoritos',
        component: favoritos,
        name:'Favoritos'
      }
    ]
  }
]