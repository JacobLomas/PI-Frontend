import Inicio from '../views/Inicio'
import Productos from '../views/Productos'
import LoginSignup from '../views/LoginSignup'
import MiPerfil from '../views/MiPerfil'
import Carrito from '../views/Carrito'
import BackOffice from '../views/BackOffice'
import login from '../components/login'
import signup from '../components/signup'
import UserService from '../services/user.service';
import articulos from '../views/BackOfficeViews/articulos'
import pedidos from '../views/BackOfficeViews/pedidos'
import usuarios from '../views/BackOfficeViews/usuarios'
import familias from '../views/BackOfficeViews/familias'
import subfamilias from '../views/BackOfficeViews/subfamilias'
//import axios from 'axios'

export default [{
    path: '/',
    component: Inicio,
    name: "Inicio"
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
    name: 'BackOffice',
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
    children: [{
        path: 'pedidos',
        component: pedidos,
        name: "adminPedidos"
      },
      {
        path: 'pedidosCompletados',
        component: signup,
        name: "signup"
      },
      {
        path: 'pedidosPendientes',
        component: signup,
        name: "signup"
      },
      {
        path: 'usuarios',
        component: usuarios,
        name: "adminUsuarios"
      },
      {
        path: 'articulos',
        component: articulos,
        name: "adminArticulos"
      },
      {
        path: 'familias',
        component: familias,
        name: "familias"
      },
      {
        path: 'subfamilias',
        component: subfamilias,
        name: "subfamilias"
      }
    ]
  },
  {
    path: '/perfil',
    component: MiPerfil,
    name: "MiPerfil"
  }
]