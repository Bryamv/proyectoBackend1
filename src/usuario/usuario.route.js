import express from 'express';
const router = express.Router();
import { crearUsuario, getUsuario } from './usuario.controller.js';




router.get("/:id", async (req, res) => {

    const id = req.params.id;
    try {
        res.status(200).json(await getUsuario(id));


    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })

    }



});

router.post("/", async (req, res) => {

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




});




export default router;



