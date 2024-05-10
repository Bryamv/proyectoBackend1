import argon2 from 'argon2';
import Usuario from '../usuario/usuario.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


async function verificarPassword(password, hash) {
    return await argon2.verify(hash, password);
}

async function buscarUsuario(correo) {
    return await Usuario.findOne({ correo: correo });
}

async function validarToken(req, res, next) {
    try {
        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            const decoded = jwt.verify(req.token, process.env.SECRET_KEY);
            req.usuario = decoded;
            console.log("Token válido")
            next();
        } else {
            return res.status(401).json({ mensaje: "No se proporcionó token" });
        }
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido" });
    }
}

async function obtenerUsuarioToken(token) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = decodedToken.cedula;
    return usuario
}
async function obtenerIdToken(token) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = decodedToken.userId;
    return usuario
}
export { verificarPassword, buscarUsuario, validarToken, obtenerUsuarioToken,obtenerIdToken };