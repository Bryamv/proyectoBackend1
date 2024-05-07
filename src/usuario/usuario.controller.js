import { crearUsuarioMongo, getUsuarioMongo } from "./usuario.actions.js";

async function getUsuario(usuario) {
    const usuarioExistente = await getUsuarioMongo(usuario);
    if (!usuarioExistente) {
        throw new Error("El usuario no existe");
    }
    return usuarioExistente;
}

async function crearUsuario(usuario) {
    const usuarioExistente = await getUsuarioMongo({cedula: usuario.cedula});

    if (usuarioExistente) {
       
        throw new Error("El usuario ya existe");
    }
    
    return await crearUsuarioMongo(usuario);

}
export { crearUsuario, getUsuario }