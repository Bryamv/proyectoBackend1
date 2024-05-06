import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
    {
        versionKey: false,
        timestamps: true
    });

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;