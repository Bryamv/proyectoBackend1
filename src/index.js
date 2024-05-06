import express from "express";
import cors from "cors";
const app = express();

import rutasUsuario from "./usuario/usuario.route.js";
app.use(cors());

app.get("/", (req, res) => {
    res.send("Rappi libros API");
}
);
//Rutas de la API de usuario
app.use("/usuario", rutasUsuario);

//Fin de rutas de la API de usuario


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}

);