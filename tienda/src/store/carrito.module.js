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
        borrarTodoCarrito({ commit }) {
            Carrito.borrarTodoCarrito()
            commit('borrarTodoCarrito')
        },
        actualizarCarrito({ commit },carrito){
            Carrito.actualizarCarrito(carrito);
            commit('actualizarCarrito')
        }
    },
    mutations: {
        anadirArticulo(state) {
            state.carrito = Carrito.getCarrito();
            state.status.vacio = state.carrito.length==0 ? true : false;
        },
        borrarArticulo(state) {
            state.carrito = Carrito.getCarrito();
            state.status.vacio = state.carrito.length==0 ? true : false;
        },
        borrarTodoCarrito(state) {
            state.carrito = null;
            state.status.vacio = state.carrito ? state.carrito.length==0 ? true : false :false;
        },
        actualizarCarrito(state){
            state.carrito =  Carrito.getCarrito();
            state.status.vacio = state.carrito.length==0 ? true : false;
        }
    }
};