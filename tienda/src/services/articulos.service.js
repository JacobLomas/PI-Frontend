import axios from "axios";
const API_URL = 'http://13.58.30.123:8000/';
//import authHeader from './auth-header';

class ArticulosService {
    async getArticulosFamSubF(fam, subF = '') {
        var productos = []
        if (subF) {
            productos = await axios.get(
                "http://13.58.30.123:8000/api/articulos/" +
                fam +
                "/" +
                subF
            );
        } else {
            productos = await axios.get(
                "http://13.58.30.123:8000/api/articulos/" + fam + "/" + null
            );
        }
        return productos
    }
    getArticulo(id) {
        const axiosReq = {
            method: 'get',
            url: API_URL + 'api/unArticulo/' + id
        }
        return axios(axiosReq);
    }
    getMasVisitados() {
        const axiosReq = {
            method: 'get',
            url: API_URL + 'api/masVisitadosArt',
        }
        return axios(axiosReq);
    }
}


export default new ArticulosService()