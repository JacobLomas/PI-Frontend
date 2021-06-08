class Carrito{
    getCarrito(){
        return JSON.parse(localStorage.getItem("carrito"));
    }
    anadirArticulo(articulo){
        var carrito = this.getCarrito();
        if(!carrito || carrito.length==0){
            articulo.cantidad=1
            carrito = [articulo]
        }else{
            let semaforo = true
            carrito.forEach((e)=>{
                if(e.xarticulo_id == articulo.xarticulo_id){
                    if(e.cantidad == 0 || e.cantidad>=0) {
                        e.cantidad = e.cantidad+1
                    }
                    else {
                        e.cantidad=0
                    }
                    semaforo=!semaforo;
                    
                }
            })
            if(semaforo){
                articulo.cantidad=1
                carrito.push(articulo)
            }
                
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    quitarArticulo(id, cantidad=-1){
        var carrito = this.getCarrito();
        var i = -1;
        carrito.forEach((element, index) => {
            if(element.xarticulo_id==id){
                i = index;
                return;
            }
        });
        if(cantidad == -1 || cantidad-carrito[i].cantidad <=0)
            carrito.splice(i,1);
        else 
            carrito[i].cantidad = cantidad - carrito[i].cantidad
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    borrarTodoCarrito(){
        localStorage.removeItem("carrito");
    }
}
export default new Carrito();