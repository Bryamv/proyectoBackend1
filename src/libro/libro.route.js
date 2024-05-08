import express from 'express';
const router = express.Router();
import { validarToken } from '../auth/login.actions.js';
import { crearLibro, obtenerLibro, obtenerLibrosFilter, updateLibro } from './libro.controller.js';


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

const obtenerLibros = async (req, res) => {
    try {
        const filtros = req.query;
        const libros = await obtenerLibrosFilter(filtros);

        res.status(200).json({ libros: libros, total: libros.length });


    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }
}

const actualizar = async (req, res) => {
    try {
        const id = req.params.id;
        await updateLibro(id, req.body);
        res.status(200).json({
            mensaje: `Libro actualizado con éxito 🎉`
        })

    } catch (error) {
        res.status(400).json({
            mensaje: error.message
        })
    }

}

const eliminar = async (req, res) => {
}

router.get("/:id", obtener)
router.get("/", obtenerLibros)
router.post("/", validarToken, crear);
router.patch("/:id", validarToken, actualizar);
router.delete("/:id", validarToken, eliminar);



export default router;