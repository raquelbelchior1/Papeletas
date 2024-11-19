const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Endpoint de Registro
router.post('/register', async (req, res) => {
  const { nome, email, senha, tipo, materia } = req.body;

  try {
    // Validação dos dados de entrada
    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    if (!['aluno', 'professor'].includes(tipo)) {
      return res.status(400).json({ message: 'Tipo inválido. Escolha "aluno" ou "professor".' });
    }

    // Verificar se o e-mail já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já registrado.' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const newUser = new User({
      nome,
      email,
      senha: hashedPassword,
      tipo,
      materia: tipo === 'professor' ? materia : null, // Apenas professores têm matéria
    });

    // Salvar no banco de dados
    await newUser.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// Endpoint de Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Validação dos dados de entrada
    if (!email || !senha) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user._id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
        materia: user.materia,
      },
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao realizar login.' });
  }
});

module.exports = router;
