
import Usuario from './usuario.model.js';

async function getUsuarioMongo(cedula) {

    return await Usuario.findOne({ cedula }, { password: 0 });


}

async function crearUsuarioMongo(usuario) {
    return await Usuario.create(usuario);
}

async function updateUsuarioMongo(cedula, usuario) {
    return await Usuario.findOneAndUpdate
        ({ cedula }, { $set: usuario });
}
export { crearUsuarioMongo, getUsuarioMongo, updateUsuarioMongo }