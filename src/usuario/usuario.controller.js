import { crearUsuarioMongo, getUsuarioMongo, updateUsuarioMongo } from "./usuario.actions.js";

async function getUsuario(usuario) {
    const usuarioExistente = await getUsuarioMongo(usuario);
    if (!usuarioExistente) {
        throw new Error("El usuario no existe");
    }
    //sin password
    delete usuarioExistente.password;
    return usuarioExistente;
}

async function crearUsuario(usuario) {
    const usuarioExistente = await getUsuarioMongo(usuario.cedula);

    if (usuarioExistente) {
        throw new Error("El usuario ya existe");
    }
    const usuarioCreado = await crearUsuarioMongo(usuario);

    return usuarioCreado;

}

async function updateUsuario(cedula, usuario) {
    
    const usuarioExistente = await getUsuarioMongo(cedula);
    if (!usuarioExistente) {
        throw new Error("El usuario no existe");
    }
    return await updateUsuarioMongo(cedula, usuario);
}
export { crearUsuario, getUsuario, updateUsuario }