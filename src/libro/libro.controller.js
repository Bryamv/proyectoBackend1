import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUsuario } from '../usuario/usuario.controller.js';
import { crearLibroMongo, obtenerLibroMongo } from './libro.actions.js';
dotenv.config();
async function crearLibro(token, libro) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = decodedToken.cedula;
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

export { crearLibro, obtenerLibro };