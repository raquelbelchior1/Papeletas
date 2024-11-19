const express = require('express');
const router = express.Router();

// Rota para criar boletim
router.post('/criar', (req, res) => {
    res.send('Boletim criado!');
});

module.exports = router;
