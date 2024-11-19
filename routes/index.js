const express = require('express');
const boletimRoutes = require('./boletim');
const router = express.Router();

// Rotas de boletim
router.use('/boletim', boletimRoutes);

module.exports = router;
