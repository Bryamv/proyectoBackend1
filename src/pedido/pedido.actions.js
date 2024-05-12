import Pedido from "./pedido.model.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
async function obtenerPedidoMongo(id) {
    return Pedido.findById(id);
}

async function crearPedidoMongo(usuario, vendedor, libros, total) {
    return await Pedido.create({ libros, usuario: usuario._id, vendedor, total });
}
async function obtenerPedidosMongo(filtro = {}) {
    return Pedido.find({ ...filtro });
}

async function eliminarPedidoMongo(id) {
    return Pedido.findByIdAndUpdate(id, { activo: false });
}

async function actualizarPedidoMongo(id, estado) {
    // Asegurarse de que id es un ObjectId válido
    const objectId = new ObjectId(id);

    // Actualizar el pedido en la base de datos
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
        objectId,
        { $set: { estado: estado } },
        { new: true }  // Devuelve el documento actualizado
    );

    return pedidoActualizado;
}

export { crearPedidoMongo, obtenerPedidoMongo, obtenerPedidosMongo, eliminarPedidoMongo, actualizarPedidoMongo }