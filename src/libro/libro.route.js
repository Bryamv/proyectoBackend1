import express from 'express';
const router = express.Router();
import { validarToken } from '../auth/login.actions.js';
import { crearLibro } from './libro.controller.js';


const crear = async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    try {
        const { nombre, usuario } = await crearLibro(token, req.body);
        res.status(200).json({
            mensaje: `Libro ${nombre} creado por el usuario ${usuario}`
        })
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })

    }

}


router.post("/", validarToken, crear);


export default router;