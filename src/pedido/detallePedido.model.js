// models/DetallePedido.js
import mongoose from 'mongoose';

const detallePedidoSchema = new mongoose.Schema({
    pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },
    libro: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro', required: true },
    cantidad: { type: Number, required: true },
    //precio: { type: mongoose.Types.Decimal128, required: true }
});

const DetallePedido = mongoose.model('DetallePedido', detallePedidoSchema);
export default DetallePedido;
