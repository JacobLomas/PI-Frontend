import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://13.58.30.123:8000/';

class UserService {
  esAdministrador() {
    return axios.get(API_URL + 'api/auth/esAdministrador',{ headers: authHeader() });
  }
  todosArticulos() {
    return axios.get(API_URL + 'admin/todosArticulos', { headers: authHeader() });
  }
  getFamilias() {
    return axios.get(API_URL + 'admin/familias', { headers: authHeader() });
  }
  postFamilia(subF){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'admin/nuevaFamilia',
      headers: authHeader(),
      data:subF 
    }
    return axios(axiosReq);
  }
  deleteFamilia(id){
    const axiosReq = {
      method: 'delete',
      url: API_URL + 'admin/borrarFamilia/'+id,
      headers: authHeader(),
    }
    return axios(axiosReq);
  }
  getSubFamilias() {
    return axios.get(API_URL + 'admin/subfamilias', { headers: authHeader() });
  }
  postSubFamilia(subF){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'admin/nuevaSubfamilia',
      headers: authHeader(),
      data:subF 
    }
    return axios(axiosReq);
  }
  deleteSubfamilia(id){
    const axiosReq = {
      method: 'delete',
      url: API_URL + 'admin/borrarSubFamilia/'+id,
      headers: authHeader(),
    }
    return axios(axiosReq);
  }
  postNuevoArticulo(articulo) {
    const axiosReq = {
      method: 'post',
      url: API_URL + 'admin/nuevoArticulo',
      headers: authHeader(),
      data:articulo
    }
    return axios(axiosReq);
  }
  postActualizarArticulo(articulo) {
    delete articulo['descFam'];
    delete articulo['descSubF']
    articulo.xfecha_creacion = articulo.xfecha_creacion.replace('T',' ')
    articulo.xfecha_creacion = articulo.xfecha_creacion.substring(0, articulo.xfecha_creacion.length-5)
    const axiosReq = {
      method: 'post',
      url: API_URL + 'admin/actualizarArticulo',
      headers: authHeader(),
      data:articulo
    }
    return axios(axiosReq);
  }
  deleteArticulo(id) {
    const axiosReq = {
      method: 'delete',
      url: API_URL + 'admin/borrarArticulo/'+id,
      headers: authHeader(),
    }
    return axios(axiosReq);
  }
  
  postSubirFoto(foto){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'admin/subirFoto',
      headers: authHeader(),
      data:foto
    }
    return axios(axiosReq);
  }

  postSubirFotoArticulo(foto, idArticulo){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'admin/subirFoto/' + idArticulo,
      headers: authHeader(),
      data:foto
    }
    return axios(axiosReq);
  }
  getImagenesArt(idArticulo){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'api/imagenes/' + idArticulo,
      headers: authHeader(),
    }
    return axios(axiosReq);
  }

  postNuevoPedido(pedido) {
    const axiosReq = {
      method: 'post',
      url: API_URL + 'api/user/nuevoPedido',
      data:{pedido: pedido},
      headers: authHeader(),
    }
    return axios(axiosReq);
  }
  postPagarPedido(idPedido, order){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'api/user/pagarPedido/'+idPedido,
      data:{paypalOrder: order},
      headers: authHeader(),
    }
    return axios(axiosReq);
  }

  postPuntuarArticulo(idArticulo, puntos){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'api/user/puntuarArticulo',
      data:{idArticulo: idArticulo, puntos:puntos},
      headers: authHeader(),
    }
    return axios(axiosReq);
  }
  postToggleFavorito(idArticulo){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'api/user/toggleFavorito/'+idArticulo,
      headers: authHeader(),
    }
    return axios(axiosReq);
  }
  getUsuario(){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'api/user/usuario',
      headers: authHeader(),
    }
    return axios(axiosReq);
  }
  postActualizarFotoPerfil(foto){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'api/user/actualizarFoto',
      headers: authHeader(),
      data:foto
    }
    return axios(axiosReq);
  }
  postEliminarFotoPerfil(){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'api/user/eliminarFoto',
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  postActualizarUsuario(usuario){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'api/user/actualizarUsuario',
      headers: authHeader(),
      data:{usuario: usuario}
    }
    return axios(axiosReq);
  }
  getFavoritos(){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'api/user/favoritos',
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  getPedidos(){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'api/user/misPedidos',
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  postActualizarPass(antigua, nueva){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'api/user/actualizarContrasena',
      headers: authHeader(),
      data:{antigua: antigua, nueva:nueva}
    }
    return axios(axiosReq);
  }
  getTodosPedidos(){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'admin/pedidos',
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  postEntregarPedido(idPed){
    const axiosReq = {
      method: 'post',
      url: API_URL + 'admin/entregar/'+idPed,
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  getUsuarios(){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'admin/usuarios',
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  deleteUsuario(id){
    const axiosReq = {
      method: 'delete',
      url: API_URL + 'admin/borrarUsuario/'+id,
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  getVentasAno(year){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'admin/estadisticas/ventasAno/'+year,
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  getMasVendidos(){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'admin/estadisticas/masVendidos',
      headers: authHeader()
    }
    return axios(axiosReq);
  }
  getMasVisitados(){
    const axiosReq = {
      method: 'get',
      url: API_URL + 'admin/estadisticas/masVisitados',
      headers: authHeader()
    }
    return axios(axiosReq);
  }
}

export default new UserService();