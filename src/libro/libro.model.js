import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    genero: { type: String, required: true },
    fechaPublicacion: { type: Date, required: true },
    editorial: { type: String, required: true },
    autor: { type: String, required: true },
    precio: { type: mongoose.Types.Decimal128, required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    activo: { type: Boolean, default: true },
    pedidos: [
        {
            pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true }
        }
    ]
},
    {
        versionKey: false,
        timestamps: true
    });

const Libro = mongoose.model('Libro', libroSchema);
export default Libro;