import { getUsuario } from "../usuario/usuario.actions.js";
import { verificarPassword } from "./login.actions.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
async function logUser(usuario) {
    if (!usuario.correo || !usuario.password) {
        throw new Error("Login error: Correo y Contraseña son requeridos");
    }

    const usuarioExistente = await getUsuario(usuario);
    const { password } = usuario;

    if (!usuarioExistente || ! await verificarPassword(password, usuarioExistente.password)) {
        throw new Error("Login error: Correo o Contraseña incorrecta");
    }


    const token = jwt.sign(
        { userId: usuarioExistente._id, correo: usuarioExistente.correo }, // Payload del token
        SECRET_KEY,
        { expiresIn: '1h' } // Configura la expiración del token
    );

    return { token, correo: usuario.correo };


}
export { logUser }