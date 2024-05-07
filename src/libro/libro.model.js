import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    genero: { type: String, required: true },
    fechaPublicacion: { type: Date },
    editorial: { type: String },
    autor: { type: String },
    precio: { type: mongoose.Types.Decimal128 },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
});

const Libro = mongoose.model('Libro', libroSchema);
export default Libro;