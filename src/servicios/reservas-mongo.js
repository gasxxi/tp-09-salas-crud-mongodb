const mongoose = require("mongoose");
const Reserva = require("../modelos/reserva");

function transformarDoc(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  const copia = { ...obj };
  const idTexto = copia._id.toString();
  delete copia._id;
  delete copia.__v;
  return {
    id: idTexto,
    ...copia,
  };
}

async function listar(filtro = {}) {
  const consulta = {};
  if (filtro.sala) {
    consulta.sala = filtro.sala;
  }
  const docs = await Reserva.find(consulta).exec();
  return docs.map(transformarDoc);
}

async function obtenerPorId(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const doc = await Reserva.findById(id).exec();
  return transformarDoc(doc);
}

async function crear(datos) {
  // Allowlist estricto de los 6 campos permitidos
  const nuevoDoc = new Reserva({
    estudiante: datos.estudiante,
    email: datos.email,
    sala: datos.sala,
    fecha: datos.fecha,
    turno: datos.turno,
    personas: datos.personas,
  });
  const guardado = await nuevoDoc.save();
  return transformarDoc(guardado);
}

async function contar() {
  return await Reserva.countDocuments().exec();
}

async function reemplazar(id, datos) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const actualizable = {
    estudiante: datos.estudiante,
    email: datos.email,
    sala: datos.sala,
    fecha: datos.fecha,
    turno: datos.turno,
    personas: datos.personas,
  };
  if (datos.estado !== undefined) {
    actualizable.estado = datos.estado;
  }

  const doc = await Reserva.findByIdAndUpdate(id, actualizable, {
    new: true,
    runValidators: true,
  }).exec();

  return transformarDoc(doc);
}
async function actualizarParcial(id, cambios) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const camposPermitidos = [
    "estudiante",
    "email",
    "sala",
    "fecha",
    "turno",
    "personas",
    "estado",
  ];
  const actualizable = {};

  for (const campo of camposPermitidos) {
    if (Object.prototype.hasOwnProperty.call(cambios, campo)) {
      actualizable[campo] = cambios[campo];
    }
  }

  const doc = await Reserva.findByIdAndUpdate(
    id,
    { $set: actualizable },
    {
      new: true,
      runValidators: true,
    },
  ).exec();

  return transformarDoc(doc);
}

async function eliminar(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  const doc = await Reserva.findByIdAndDelete(id).exec();
  return transformarDoc(doc);
}

module.exports = {
  listar,
  obtenerPorId,
  crear,
  contar,
  reemplazar,
  actualizarParcial,
  eliminar,
};
