const mongoose = require('mongoose');

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,  // Garante que o email será único
            lowercase: true, // Converte o email para minúsculas
        },
        senha: {
            type: String,
            required: true,
        },
        tipo: {
            type: String,
            required: true,
            enum: ['aluno', 'professor'], // Apenas 'aluno' ou 'professor' são permitidos
        },
        materia: {
            type: String,
            default: null, // Apenas 'professores' terão uma matéria, o valor é 'null' para 'aluno'
        },
    },
    {
        timestamps: true, // Adiciona os campos createdAt e updatedAt automaticamente
    }
);

// Criando o modelo de Usuário a partir do esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
