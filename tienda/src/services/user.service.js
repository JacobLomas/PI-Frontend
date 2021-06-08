import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
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
    console.log(axiosReq)
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
}

export default new UserService();