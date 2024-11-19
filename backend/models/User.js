const mongoose = require('mongoose');

// Definição do esquema do usuário
const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  tipo: { type: String, enum: ['aluno', 'professor'], required: true }, // Diferenciar alunos e professores
  materia: { type: String, default: null }, // Matéria que o professor ensina
});

// Método para verificar se o usuário é professor
userSchema.methods.isProfessor = function () {
  return this.tipo === 'professor';
};

// Exporta o modelo
module.exports = mongoose.model('User', userSchema);
