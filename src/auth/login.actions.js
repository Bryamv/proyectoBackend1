import argon2 from 'argon2';
import Usuario from '../usuario/usuario.model.js';
async function verificarPassword(password, hash) {
    return await argon2.verify(hash, password);
}

async function buscarUsuario(correo) {
    return await Usuario.findOne({ correo: correo });
}
export { verificarPassword ,buscarUsuario};