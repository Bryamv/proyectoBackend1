import Pedido from "./pedido.model.js";
async function obtenerPedidoMongo(id) {
    return Pedido.findById(id);
}

async function crearPedidoMongo(usuario, libros, total) {
    return await Pedido.create({ libros, usuario: usuario._id, total });
}
async function obtenerPedidosMongo() {
    return Pedido.find({ activo: true });
}
export { crearPedidoMongo, obtenerPedidoMongo, obtenerPedidosMongo }