// backend>routes>papeletas.js
const express = require('express');
const Papeleta = require('../models/Papeleta');
const User = require('../models/User');
const isProfessor = require('../middleware/authMiddleware'); // Middleware para validar professor

const router = express.Router();

// Rota: Obter papeletas de uma matéria específica (somente para professores)
router.get('/materia', isProfessor, async (req, res) => {
  try {
    // Pega o professor pelo ID e verifica sua matéria
    const professor = await User.findById(req.user.id);
    if (!professor || professor.tipo !== 'professor') {
      return res.status(403).json({ message: 'Acesso negado. Apenas professores podem acessar esta rota.' });
    }

    // Buscar papeletas relacionadas à matéria do professor
    const papeletas = await Papeleta.find({ materia: professor.materia }).populate('aluno', 'nome email');
    res.status(200).json(papeletas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar papeletas.', error });
  }
});

module.exports = router;

// backend>routes>papeletas.js

// Registrar uma nova papeleta
router.post('/nova', isProfessor, async (req, res) => {
    const { alunoId, materia, faltas } = req.body;
  
    try {
      // Verifica se a matéria é a do professor
      const professor = await User.findById(req.user.id);
      if (professor.materia !== materia) {
        return res.status(403).json({ message: 'Você só pode registrar papeletas para sua matéria.' });
      }
  
      // Cria uma nova papeleta
      const papeleta = new Papeleta({ aluno: alunoId, materia, faltas });
      await papeleta.save();
  
      res.status(201).json({ message: 'Papeleta registrada com sucesso!', papeleta });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar papeleta.', error });
    }
  });
  