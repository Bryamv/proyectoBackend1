import Libro from './libro.model.js';
async function crearLibroMongo(usuario, libro) {

    return await Libro.create({ ...libro, usuario: usuario._id });
}
async function obtenerLibroMongo(id) {

    return await Libro.findById(id);
}
async function obtenerLibrosMongo(filtros) {
    filtros.activo = true;
    console.log(filtros);

    if (filtros.mostrarInactivos) {
        console.log("Mostrar inactivos");
        delete filtros.mostrarInactivos;
        delete filtros.activo;
    }

    return await Libro.find({ ...filtros });
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