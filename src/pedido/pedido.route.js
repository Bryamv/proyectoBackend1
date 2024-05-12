import express from 'express';
const router = express.Router();
import { obtenerUsuarioToken, validarToken, obtenerIdToken } from '../auth/login.actions.js';
import { crearPedido, obtenerPedido, obtenerPedidos, eliminarPedido, actualizarPedido } from './pedido.controller.js';


const obtener = async (req, res) => {
    try {
        const id = req.params.id;
        const pedido = await obtenerPedido(id);
        res.status(200).json(pedido);


    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });

    }

}
async function obtenerTodos(req, res) {
    try {
        
        const pedidos = await obtenerPedidos(req.query);
        res.status(200).json({ pedidos, total: pedidos.length });
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });

    }
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
    try {
        const id = req.params.id;
        const persona = await obtenerIdToken(req.headers["authorization"].split(" ")[1]);

        await actualizarPedido(persona, id, req.body);

        res.status(200).json({
            mensaje: `Pedido ${id} actualizado con éxito 🎉`
        });
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
}

const eliminar = async (req, res) => {


    try {
        const id = req.params.id;
        await eliminarPedido(id);

        res.status(200).json({
            mensaje: `Pedido ${id} eliminado con éxito 🎉`
        });
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }
}

router.get("/:id", validarToken, obtener);
router.get("/", validarToken, obtenerTodos);
router.post("/", validarToken, crear);
router.patch("/:id", validarToken, actualizar);
router.delete("/:id", validarToken, eliminar);




export default router;