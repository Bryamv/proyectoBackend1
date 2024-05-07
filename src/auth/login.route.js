import express from 'express';
const router = express.Router();
import { logUser } from './login.controller.js';

router.post("/", async (req, res) => {

    try {
        const { token, correo } = await logUser(req.body);
        res.status(200).json({

            mensaje: `login de ${correo} exitoso 👍`,
            token
        });

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        });
    }

});

export default router;