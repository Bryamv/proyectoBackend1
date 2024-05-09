import express from "express";
import cors from "cors";
const app = express();
//import env
import dotenv from "dotenv";
dotenv.config();
import rutasUsuario from "./usuario/usuario.route.js";
import mongoose from "mongoose";
import Login from './auth/login.route.js'
import rutasLibro from "./libro/libro.route.js";
import rutasPedido from "./pedido/pedido.route.js";

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Rappi libros API");
}
);
//Rutas de la API de usuario
app.use("/usuario", rutasUsuario);

//Fin de rutas de la API de usuario
app.use("/login", Login);

app.use("/libro", rutasLibro);

app.use("/pedido", rutasPedido);

const port = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log("Conectado a la base de datos");
    })
    .catch((error) => {
        console.log("Error al conectar a la base de datos", error);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}

);