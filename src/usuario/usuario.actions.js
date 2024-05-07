
import Usuario from './usuario.model.js';

async function getUsuario(usuario) {
    return await Usuario.findOne({ correo: usuario.correo });
}

async function crearUsuarioMongo(user) {
    //const user = { ...user, password: argon2d.hash(user.password)}
    return await Usuario.create(user);
}

export { crearUsuarioMongo, getUsuario }