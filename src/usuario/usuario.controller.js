import { crearUsuarioMongo } from "./usuario.actions.js";
async function crearUsuario(usuario) {
    const usuarioExistente = await Usuario.findOne({ email: usuario.email });

    if (usuarioExistente) {
        throw new Error("El usuario ya existe");
    }
    

    return await crearUsuarioMongo(usuario);

}
export { crearUsuario }