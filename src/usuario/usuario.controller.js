import { crearUsuarioMongo, getUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo } from "./usuario.actions.js";

async function getUsuario(cedula) {
    const usuarioExistente = await getUsuarioMongo(cedula);
    console.log(usuarioExistente);
    /* if (usuarioExistente && !usuarioExistente.activo) {
        throw new Error("El usuario ya existe pero no está activo.");
    } */
    if (!usuarioExistente && !usuarioExistente.activo) {
        throw new Error("El usuario no existe");
    }

    return usuarioExistente;
}

async function crearUsuario(usuario) {
    //await getUsuario(usuario.cedula);

    const usuarioCreado = await crearUsuarioMongo(usuario);

    return usuarioCreado;

}

async function updateUsuario(cedula, usuario) {

    const usuarioExistente = await getUsuarioMongo(cedula);

    if (!usuarioExistente) {
        throw new Error("El usuario no existe");
    }
    if (cedula !== usuario.cedula) {
        throw new Error("La cedula no puede ser modificada");
    }
    return await updateUsuarioMongo(cedula, usuario);
}

async function deleteUsuario(cedula) {
    const usuarioExistente = await getUsuarioMongo(cedula);
    if (!usuarioExistente) {
        throw new Error("El usuario no existe");
    }
    return await deleteUsuarioMongo(cedula);

}
export { crearUsuario, getUsuario, updateUsuario, deleteUsuario }