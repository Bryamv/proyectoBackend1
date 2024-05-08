import express from 'express';
const router = express.Router();
import { crearUsuario, getUsuario, updateUsuario, deleteUsuario } from './usuario.controller.js';
import { validarToken } from '../auth/login.actions.js';


const obtener = async (req, res) => {
    const cedula = req.params.cedula;
    try {
        res.status(200).json(await getUsuario(cedula));
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }
}

const crear = async (req, res) => {
    try {
        const { cedula } = await crearUsuario(req.body);
        res.status(200).json({
            mensaje: `Usuario con cedula ${cedula} creado con éxito 🎉`
        })

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }
}

const actualizar = async (req, res) => {
    try {
        const cedula = req.params.cedula;
        await updateUsuario(cedula, req.body);
        res.status(200).json({
            mensaje: `Usuario con cedula ${cedula} actualizado con éxito 🎉`
        })
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }
}

const eliminar = async (req, res) => {
    try {
        await deleteUsuario(req.params.cedula);
        res.status(200).json({
            mensaje: `Usuario con cedula ${req.params.cedula} eliminado con éxito 🎉`
        })
    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })

    }
}


router.get("/:cedula", validarToken, obtener);
router.post("/", crear);
router.patch("/:cedula", validarToken, actualizar)
router.delete("/:cedula", validarToken, eliminar)

export default router;