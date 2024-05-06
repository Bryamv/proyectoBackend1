import Usuario from './usuario.model.js';

async function crearUsuarioMongo(user) {
    return await Usuario.create(user);
}

export { crearUsuarioMongo }