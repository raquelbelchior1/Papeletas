const mongoose = require('mongoose');

// Definindo o esquema para o boletim
const boletimSchema = new mongoose.Schema({
    materia: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    faltas: {
        type: Number,
        required: true
    },
    aluno: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pendente', 'aprovado', 'rejeitado'], // Status do boletim
        default: 'pendente', // Se não for especificado, o status será 'pendente'
    }
}, { timestamps: true });  // Isso irá adicionar `createdAt` e `updatedAt` automaticamente

// Criando o modelo com o esquema definido
const Boletim = mongoose.model('Boletim', boletimSchema);

module.exports = Boletim;
