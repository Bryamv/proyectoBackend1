import { obtenerLibroMongo } from "../libro/libro.actions.js";
import { getUsuario } from "../usuario/usuario.controller.js";
import { crearPedidoMongo, obtenerPedidoMongo, obtenerPedidosMongo } from "./pedido.actions.js";

async function obtenerPedido(id) {
    const pedido = await obtenerPedidoMongo(id);

    if (!pedido) {
        throw new Error("Pedido no encontrado");
    }
    return pedido;

}

async function obtenerPedidos() {
    const pedidos = await obtenerPedidosMongo();
    return pedidos;
}


async function calcularTotal(libros) {
    //cada libro debo buscarlo en la bd y sumar su precio
    const librosPromesas = libros.map(id => obtenerLibroMongo(id));
    const librosbd = await Promise.all(librosPromesas);
    const total = librosbd.reduce((sum, libro) => {
        // Convertir Decimal128 a string, luego a número flotante
        const precio = parseFloat(libro.precio.toString());
        return sum + precio;
    }, 0);

    return total

}

async function crearPedido(cedula, { libros }) {
    const usuario = await getUsuario(cedula);
    const total = await calcularTotal(libros);

    const librosFormateados = libros.map(libro => ({ libro: libro }));
    console.log(librosFormateados);

    return await crearPedidoMongo(usuario, librosFormateados, total);

}

async function eliminarPedido(id) {

}

export { crearPedido, obtenerPedido, obtenerPedidos }