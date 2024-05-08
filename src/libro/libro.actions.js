import Libro from './libro.model.js';
async function crearLibroMongo(usuario, libro) {

    return await Libro.create({ ...libro, usuario: usuario._id });
}
async function obtenerLibroMongo(id) {

    return await Libro.findById(id);
}
async function obtenerLibrosMongo(filtros) {
    return await Libro.find({ ...filtros, activo: true });
}
async function updateLibroMongo(id, cambios) {
    return await Libro.findByIdAndUpdate(
        id,
        cambios,
        { new: true }
    )
}
async function deleteLibroMongo(id) {
    return await Libro.findOneAndUpdate({ _id: id }, { $set: { activo: false } });
}
export { crearLibroMongo, obtenerLibroMongo, obtenerLibrosMongo, updateLibroMongo, deleteLibroMongo };