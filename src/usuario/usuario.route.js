import express from 'express';
const router = express.Router();
import { crearUsuario } from './usuario.controller.js';



router.get("/", (req, res) => {
    res.send("usuario API");
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



