import Pedido from "./pedido.model.js";

async function crearPedidoMongo(usuario, libros, total) {
    return await Pedido.create({ libros, usuario: usuario._id, total });
}
export { crearPedidoMongo }