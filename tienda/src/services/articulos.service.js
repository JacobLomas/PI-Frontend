import axios from "axios";

class ArticulosService {
    async getArticulosFamSubF(fam, subF = '') {
        var productos = []
        if (subF) {
            productos = await axios.get(
                "http://localhost:8000/api/articulos/" +
                fam +
                "/" +
                subF
            );
        } else {
            productos = await axios.get(
                "http://localhost:8000/api/articulos/" + fam + "/" + null
            );
        }
        return productos
    }
}


export default new ArticulosService()