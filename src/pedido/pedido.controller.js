import { obtenerLibroMongo } from "../libro/libro.actions.js";
import { obtenerLibro } from "../libro/libro.controller.js";
import { getUsuario } from "../usuario/usuario.controller.js";
import { crearPedidoMongo, obtenerPedidoMongo, obtenerPedidosMongo, eliminarPedidoMongo, actualizarPedidoMongo } from "./pedido.actions.js";
import mongoose from "mongoose";

async function obtenerPedido(id) {
    const pedido = await obtenerPedidoMongo(id);

    if (!pedido || !pedido.activo) {
        throw new Error("Pedido no encontrado");
    }
    return pedido;

}

async function obtenerPedidos({ fechainicio, fechafin, estado, mostrarInactivos }) {
    let filtro = {};
    filtro.activo = true;
    if ((!await esFechaValida(fechainicio) || !await esFechaValida(fechafin)) && fechainicio && fechafin) {
        throw new Error('Una o ambas fechas no son válidas.');
    }

    // Validar que la fecha de inicio sea anterior a la fecha de fin
    if (fechainicio && fechafin && new Date(fechainicio) > new Date(fechafin)) {
        throw new Error('La fecha de inicio debe ser anterior a la fecha de fin.');
    }

    // Agregar las fechas al filtro si están definidas y válidas
    if (fechainicio && fechafin) {
        filtro.createdAt = {
            $gte: new Date(fechainicio),
            $lte: new Date(fechafin)
        };
    }
    if (estado) {
        filtro.estado = estado;
    }

    if (mostrarInactivos) {
        delete filtro.activo;
    }

    const pedidos = await obtenerPedidosMongo(filtro);
    return pedidos;
}
async function esFechaValida(fecha) {
    // Verificar si es una fecha válida
    return !isNaN(new Date(fecha).getTime());
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
    return await crearPedidoMongo(usuario, dueño, librosFormateados, total);
}


async function actualizarPedido(personaId, idPedido, { estado }) {
    const pedido = await obtenerPedido(idPedido);

    const { usuario: comprador, vendedor } = pedido;

    const compradorId = comprador.toString();
    const vendedorId = vendedor.toString();


    // Verificar si la persona es la que realizó el pedido
    if (personaId === compradorId) {
        // Si es el usuario del pedido y el estado no es "cancelado", error
        if (estado.toLowerCase() !== "cancelado") {
            throw new Error("Solo puedes cambiar el estado del pedido a 'cancelado'.");
        }
        return await actualizarPedidoMongo(idPedido, estado);
    } else if (personaId === vendedorId) {

        return await actualizarPedidoMongo(idPedido, estado);
        // La persona es el vendedor, puede hacer cualquier cambio
        // No hay restricciones aquí
    } else {
        // Si no es ni el usuario ni el vendedor
        throw new Error("No tienes permiso para modificar este pedido.");
    }

    // Actualizar el pedido en la base de datos
}


async function eliminarPedido(id) {
    const pedido = await obtenerPedido(id);
    if (!pedido) {
        throw new Error("Pedido no encontrado");
    }
    return await eliminarPedidoMongo(id)




}

export { crearPedido, obtenerPedido, obtenerPedidos, eliminarPedido, actualizarPedido }