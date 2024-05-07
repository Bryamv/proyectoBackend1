
import Usuario from './usuario.model.js';

async function getUsuarioMongo(cedula) {

    return await Usuario.findOne({ cedula: cedula }, { password: 0 });


}

async function crearUsuarioMongo(usuario) {
    return await Usuario.create(usuario);
}

async function updateUsuarioMongo(cedula, usuario) {
    return await Usuario.findOneAndUpdate
        ({ cedula }, { $set: usuario });
}
async function deleteUsuarioMongo(cedula) {
    return await Usuario.findOneAndUpdate({ cedula }, { $set: { activo: false } });
}
export { crearUsuarioMongo, getUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo }