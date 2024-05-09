import express from 'express';
const router = express.Router();
import { obtenerUsuarioToken, validarToken } from '../auth/login.actions.js';
import { crearPedido } from './pedido.controller.js';


const obtener = async (req, res) => {
    res.status(200).json({
        mensaje: "Obtener pedido"
    });
}
const crear = async (req, res) => {
    try {
        const cedula = await obtenerUsuarioToken(req.headers["authorization"].split(" ")[1]);

        await crearPedido(cedula, req.body);
        res.status(200).json({
            mensaje: `Pedido creado con éxito 🎉 por el usuario ${cedula}`
        });
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
}

const actualizar = async (req, res) => {
    res.status(200).json({
        mensaje: "Actualizar pedido"
    });
}

const eliminar = async (req, res) => {
    res.status(200).json({
        mensaje: "Eliminar pedido"
    });
}

router.get("/", validarToken, obtener);
router.post("/", validarToken, crear);
router.patch("/", validarToken, actualizar);
router.delete("/", validarToken, eliminar);




export default router;