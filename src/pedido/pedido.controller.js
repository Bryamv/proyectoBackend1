import { obtenerLibroMongo } from "../libro/libro.actions.js";
import { obtenerLibro } from "../libro/libro.controller.js";
import { getUsuario } from "../usuario/usuario.controller.js";
import { crearPedidoMongo, obtenerPedidoMongo, obtenerPedidosMongo, eliminarPedidoMongo, actualizarPedidoMongo } from "./pedido.actions.js";

async function obtenerPedido(id) {
    const pedido = await obtenerPedidoMongo(id);

    if (!pedido || !pedido.activo) {
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
    const { usuario: dueño } = await obtenerLibroMongo(libros[0]);

    // Verificar que el dueño no sea el mismo que el usuario
    if (dueño.toString() === usuario._id.toString()) {
        throw new Error("No puedes comprar tus propios libros");
    }

    // Verificar que todos los libros pertenezcan al mismo dueño
    for (const idLibro of libros) {
        const { usuario: dueñoActual } = await obtenerLibroMongo(idLibro);
        if (!dueño.equals(dueñoActual)) {
            throw new Error("No todos los libros pertenecen al mismo dueño");
        }
    }

    // Formatear los libros para el pedido
    const librosFormateados = libros.map(libro => ({ libro: libro }));
    //console.log(librosFormateados);

    // Crear el pedido en la base de datos
    return await crearPedidoMongo(usuario,dueño, librosFormateados, total);
}


async function actualizarPedido(persona, id, { estado }) {
    const pedido = await obtenerPedido(id);
    const libro = pedido.libros[0].libro.toString();
    console.log(persona)

    //console.log(idLibroString);
    const { usuario } = await obtenerLibro(libro);
    const usuarioString = usuario.toString();
    //console.log(usuarioString);
    //console.log(typeof persona);

    // Verificar si la persona es la que realizó el pedido
    if (pedido.usuario === persona) {
        // Si es el usuario del pedido y el estado no es "cancelado", error
        if (estado.toLowerCase() !== "cancelado") {
            throw new Error("Solo puedes cambiar el estado del pedido a 'cancelado'.");
        }
    } else {
        // Verificar si la persona es dueña de los libros
        if (usuarioString !== persona) {
            throw new Error("No tienes permiso para modificar este pedido.");
        }
        // Si es dueño de los libros, puede hacer cualquier cambio (sin restricciones aquí)
    }

    // Actualizar el pedido en la base de datos
    return await actualizarPedidoMongo(id, estado);
}


async function eliminarPedido(id) {
    const pedido = await obtenerPedido(id);
    if (!pedido) {
        throw new Error("Pedido no encontrado");
    }
    return await eliminarPedidoMongo(id)




}

export { crearPedido, obtenerPedido, obtenerPedidos, eliminarPedido, actualizarPedido }