//import { getUsuarioMongo } from "../usuario/usuario.actions.js";
import { verificarPassword, buscarUsuario } from "./login.actions.js";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

async function logUser({ correo, password }) {
    if (!correo || !password) {
        throw new Error("Login error: Correo y Contraseña son requeridos");
    }
    
    const usuarioExistente = await buscarUsuario(correo);
    
    const { password: hash } = usuarioExistente;
    
    if (!usuarioExistente || ! await verificarPassword(password, hash)) {
        throw new Error("Login error: Correo o Contraseña incorrecta");
    }
    
    const SECRET_KEY = process.env.SECRET_KEY;

    const token = jwt.sign(
        { userId: usuarioExistente._id, correo: usuarioExistente.correo, cedula: usuarioExistente.cedula }, // Payload del token
        SECRET_KEY,
        { expiresIn: '1h' } // Configura la expiración del token
    );

    return { token, correo: usuarioExistente.correo, cedula: usuarioExistente.cedula };


}
export { logUser }