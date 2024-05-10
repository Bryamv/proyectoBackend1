import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    estado: { type: String, enum: ['en progreso', 'completado', 'cancelado'], default: 'en progreso', required: true },
    //fecha: { type: Date, default: Date.now, required: true },
    total: { type: mongoose.Types.Decimal128, required: true },
    activo: { type: Boolean, default: true },
    libros: [
        {
            _id: false,
            libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true }
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});

const Pedido = mongoose.model('Pedido', pedidoSchema);
export default Pedido;
