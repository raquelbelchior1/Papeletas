const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Boletim = require('../models/Boletim');


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secreta'; // Garantir que tenha uma chave secreta

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password); // Adicione esta linha para depurar

  try {
    // Verifica se o usuário existe no banco
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se a senha fornecida é válida
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    // Criação do token JWT (expira em 1h)
    const token = jwt.sign({ id: user._id, tipo: user.tipo }, JWT_SECRET, { expiresIn: '1h' });

    // Envia o token e o tipo de usuário no corpo da resposta
    res.json({ token, tipoUsuario: user.tipo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota de registro
router.post('/register', async (req, res) => {
  const { nome, email, senha, confirmar_senha, tipo, materia } = req.body;

  try {
    // Verifica se as senhas são iguais
    if (senha !== confirmar_senha) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    // Verifica se o email já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já registrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o novo usuário
    const newUser = new User({
      nome,
      email,
      senha: hashedPassword,
      tipo,
      materia: tipo === 'professor' ? materia : null,
    });

    // Salva o usuário no banco de dados
    await newUser.save();

    // Retorna uma mensagem de sucesso
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno ao registrar usuário' });
  }
});

// Criar boletim
router.post('/boletins', async (req, res) => {
  const { materia, data, faltas, aluno } = req.body;

  try {
      const novoBoletim = new Boletim({ materia, data, faltas, aluno });
      await novoBoletim.save();
      res.status(201).json({ message: 'Boletim criado com sucesso!' });
  } catch (error) {
      res.status(500).json({ message: 'Erro ao criar boletim' });
  }
});

// Consultar boletins
router.get('/boletins', async (req, res) => {
  try {
      const boletins = await Boletim.find();  // Adapte para filtrar boletins do aluno autenticado
      res.json(boletins);
  } catch (error) {
      res.status(500).json({ message: 'Erro ao carregar boletins' });
  }
});
// Rota para consultar boletins pendentes
router.get('/boletins/pendentes', async (req, res) => {
  try {
      const boletinsPendentes = await Boletim.find({ status: 'pendente' }); // Filtra os boletins com status 'pendente'
      res.json(boletinsPendentes);  // Retorna os boletins pendentes como resposta
  } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar boletins pendentes', error });
  }
});
// Rota para atualizar o status de um boletim
// routes/boletins.js
router.patch('/boletins/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['pendente', 'aprovado', 'rejeitado'].includes(status)) {
          return res.status(400).json({ error: 'Status inválido' });
      }

      const boletimAtualizado = await Boletim.findByIdAndUpdate(
          id,
          { status },
          { new: true } // Retorna o boletim atualizado
      );

      if (!boletimAtualizado) {
          return res.status(404).json({ error: 'Boletim não encontrado' });
      }

      res.json(boletimAtualizado);
  } catch (error) {
      console.error('Erro ao atualizar o boletim:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


module.exports = router;
