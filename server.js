class User {
    constructor(username, password, email = '', dateOfBirth = '') {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    validatePassword(inputPassword) {
        return this.password === inputPassword;
    }
}

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Servir arquivos estáticos da pasta "Login"
app.use(express.static(path.join(__dirname, 'Login')));

// Simulação de um banco de dados em memória
let users = [];

// Rota para registrar um novo usuário
app.post('/api/register', (req, res) => {
    const { username, password, email, dateOfBirth } = req.body;

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ success: false, message: "Username already exists." });
    }

    const newUser = new User(username, password, email, dateOfBirth);
    users.push(newUser);

    res.status(201).json({ success: true });
});

// Rota para login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (user && user.validatePassword(password)) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false, message: "Invalid username or password." });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
