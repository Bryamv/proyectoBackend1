import express from 'express';
const router = express.Router();
import { crearUsuario, getUsuario } from './usuario.controller.js';


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

        await crearUsuario(req.body);
        res.status(200).json({
            mensaje: "Exito. 👍"
        })

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }




}

router.get("/:id", obtenerUsuario);

router.post("/",createUsuario);




export default router;



