import Inicio from '../views/Inicio'
import Productos from '../views/Productos'
import LoginSignup from '../views/LoginSignup'
import login from '../components/login'
import signup from '../components/signup'

export default [
    {path: '/', component: Inicio},
    {path: '/tienda/:familia/:subfamilia', component: Productos},
    {
      path: '/login-signup', 
      component: LoginSignup,
      children: [
        { path: 'login', component: login },
        { path: 'signup', component: signup }
      ]
    }
  ]