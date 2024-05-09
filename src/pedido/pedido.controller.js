import { obtenerLibroMongo } from "../libro/libro.actions.js";
import { getUsuario } from "../usuario/usuario.controller.js";
import { crearPedidoMongo } from "./pedido.actions.js";

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

    return  await crearPedidoMongo(usuario, librosFormateados, total);

}

export { crearPedido }