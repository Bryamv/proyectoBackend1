
import Usuario from './usuario.model.js';

async function getUsuarioMongo(usuario) {
    return await Usuario.findOne({ cedula: usuario }, { password: 0 });
}

async function crearUsuarioMongo(user) {
    //const user = { ...user, password: argon2d.hash(user.password)}
    return await Usuario.create(user);
}

export { crearUsuarioMongo, getUsuarioMongo }