import Carrito from '../services/carrito.service';

const carrito = Carrito.getCarrito()
const initialState = carrito ?
    {
        status: {
            vacio: false
        },
        carrito
    } :
    {
        status: {
            vacio: true
        },
        carrito: null
    };

export const carritoStorage = {
    namespaced: true,
    state: initialState,
    actions: {
        anadirArticulo({ commit }, articulo) {
            Carrito.anadirArticulo(articulo);
            commit('anadirArticulo')
        },
        borrarArticulo({ commit }, id, cantidad = 0) {
            Carrito.quitarArticulo(id, cantidad);
            commit('borrarArticulo')
        },
        borrarCarrito({ commit }) {
            Carrito.borrarTodoCarrito()
            commit('borrarTodoCarrito')
        }
    },
    mutations: {
        anadirArticulo(state) {
            state.status.vacio = false;
            state.carrito = Carrito.getCarrito();
        },
        borrarArticulo(state) {
            if (state.carrito.length == 0)
                state.status.vacio = true;
            else
                state.status.vacio = false;
            state.carrito = Carrito.getCarrito();
        },
        borrarTodoCarrito(state) {
            state.status.vacio = true;
            state.carrito = null;
        },
    }
};