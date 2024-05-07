import express from 'express';
const router = express.Router();
import { crearUsuario, getUsuario, updateUsuario } from './usuario.controller.js';
import { validarToken } from '../auth/login.actions.js';


const obtenerUsuario = async (req, res) => {

    const id = req.params.id;
    try {
        res.status(200).json(await getUsuario(id));


    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })

    }



}

const createUsuario = async (req, res) => {
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

router.get("/:id", obtenerUsuario);

router.post("/", createUsuario);

//autentica con jwt bearer token


router.patch("/:cedula", validarToken, async (req, res) => {
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
})






export default router;



