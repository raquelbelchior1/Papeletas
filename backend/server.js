const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const MONGO_URI="mongodb://localhost:27017/BancodePapeletas"


const authRoutes = require('./routes/authRoutes');
const papeletasRoutes = require('./routes/papeletas');
const boletinsRoute = require('./routes/boletins');


const app = express();
const PORT = process.env.PORT || 5000;

// Conectando ao MongoDB
mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => {
  console.log("Conectado ao MongoDB com sucesso!");
})
.catch((err) => {
  console.error("Erro ao conectar ao MongoDB:", err);
});
// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes); // Rotas de autenticação (registro e login)
app.use('/api/papeletas', papeletasRoutes); // Rotas de papeletas
app.use('/api/auth/boletins', boletinsRoute); // Rota de boletins


// Rota inicial de teste
app.get('/', (req, res) => {
  res.send('Papeletas Backend is running!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
