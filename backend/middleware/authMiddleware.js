// backend>middleware>authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isProfessor = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Sem token de autenticação.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.tipo !== 'professor') {
      return res.status(403).json({ message: 'Acesso negado. Apenas professores podem acessar esta rota.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido ou expirado.', error });
  }
};

module.exports = isProfessor;
