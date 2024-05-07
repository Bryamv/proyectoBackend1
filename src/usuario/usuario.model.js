import mongoose from "mongoose";
import argon2 from "argon2";

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    direccion: { type: String, required: true },
},
    {
        versionKey: false,
        timestamps: true
    });
// Hook pre-save para hashear la contraseña antes de guardar el documento
usuarioSchema.pre('save', async function (next) {
    // Asegúrate de hashear la contraseña solo si ha sido modificada (o es nueva)
    if (!this.isModified('password')) return next();

    try {
        // Genera el hash de la contraseña y lo asigna al campo de la contraseña
        this.password = await argon2.hash(this.password);
        next();
    } catch (error) {
        // Pasa el error al siguiente middleware o a la función que maneja errores
        next(error);
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;