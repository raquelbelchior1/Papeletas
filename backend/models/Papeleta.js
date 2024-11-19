// backend>models>Papeleta.js
const mongoose = require('mongoose');

const papeletaSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Aluno associado
  materia: { type: String, required: true }, // Matéria da papeleta
  faltas: { type: Number, default: 0 }, // Quantidade de faltas
  data: { type: Date, default: Date.now }, // Data de criação
});

module.exports = mongoose.model('Papeleta', papeletaSchema);
