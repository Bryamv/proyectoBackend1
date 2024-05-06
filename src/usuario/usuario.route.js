import express from 'express';
const router = express.Router();
import { crearUsuario } from './usuario.controller.js';


router.get("/", (req, res) => {
    res.send("usuario API");
});

router.post("/", async (req, res) => {

    try {

        return await crearUsuario(req.body);

    } catch (error) {
        res.status(500).send(error);
    }

});


export default router;



