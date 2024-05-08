import express from 'express';
const router = express.Router();
import { validarToken } from '../auth/login.actions.js';
import { crearLibro, obtenerLibro } from './libro.controller.js';


const crear = async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    try {
        const { nombre } = await crearLibro(token, req.body);
        res.status(200).json({
            mensaje: `Libro ${nombre} creado por el usuario `
        })
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })

    }

}

const obtener = async (req, res) => {
    try {
        const id = req.params.id;
        const libro = await obtenerLibro(id);
        res.status(200).json(libro);
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }
}


router.get("/:id", obtener)
router.get("/", (req, res) => {

    try {
        

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }
}
);
router.post("/", validarToken, crear);


export default router;