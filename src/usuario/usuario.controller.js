import { crearUsuarioMongo, getUsuario } from "./usuario.actions.js";

async function crearUsuario(usuario) {
    const usuarioExistente = await getUsuario(usuario);

    if (usuarioExistente) {
        //console.log("El usuario ya existe");
        console.log(usuarioExistente);
        throw new Error("El usuario ya existe");
    }


    return await crearUsuarioMongo(usuario);

}
export { crearUsuario }