// models/Pedido.js
import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    estado: { type: String, enum: ['(en progreso', 'completado', 'cancelado'], default: '(En progreso' },
    fecha: { type: Date, default: Date.now },
    total: { type: mongoose.Types.Decimal128 }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);
export default Pedido;
