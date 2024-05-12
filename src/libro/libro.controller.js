import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUsuario } from '../usuario/usuario.controller.js';
import { crearLibroMongo, obtenerLibroMongo, obtenerLibrosMongo, updateLibroMongo, deleteLibroMongo } from './libro.actions.js';
import { obtenerUsuarioToken } from '../auth/login.actions.js';
dotenv.config();
async function crearLibro(token, libro) {
    const usuario = await obtenerUsuarioToken(token);
    const usuarioexistente = await getUsuario(usuario);
    if (!usuarioexistente) {
        console.log("Usuario no existe");
    }
    return await crearLibroMongo(usuarioexistente, libro);
}
async function obtenerLibro(id) {

    if (id.length !== 24) {
        throw new Error("Id inválido");
    }
    const libro = await obtenerLibroMongo(id);
  
    if (!libro) {
        throw new Error("Libro no encontrado");
    }

    return libro;

}
async function obtenerLibrosFilter(filtros) {
    const libros = await obtenerLibrosMongo(filtros);
    if (libros.length === 0) {
        throw new Error("No se encontraron libros");
    }
    return libros;

}
const updateLibro = async (id, cambios) => {
    await obtenerLibro(id);
    return await updateLibroMongo(id, cambios);
}

const deleteLibro = async (id) => {
    await obtenerLibro(id);
    return await deleteLibroMongo(id);
}
export { crearLibro, obtenerLibro, obtenerLibrosFilter, updateLibro, deleteLibro };