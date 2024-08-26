// Definição da classe User
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        
    }

    // Método para verificar se a senha está correta
    validatePassword(inputPassword) {
        return this.password === inputPassword;
    }
}

// Lista de usuários simulados
const users = [
    new User('admin', '1234'),
    new User('student', 'password'),
    new User('caimi','admin'),
    new User('raquel','admin')    
];

// Função para simular a resposta do backend
function simulateBackendResponse(username, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = users.find(user => user.username === username);
            if (user && user.validatePassword(password)) {
                resolve({ success: true });
            } else {
                resolve({ success: false, message: "Invalid username or password." });
            }
        }, 1000); // Simula um atraso de 1 segundo para a resposta do servidor
    });
}

// Adiciona o evento de submit ao formulário de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Chama a simulação da resposta do backend
    simulateBackendResponse(username, password)
        .then(data => {
            if (data.success) {
                alert('Login feito com Sucesso');
                window.location.href = "home.html"; // Redirecionar para outra página
            } else {
                alert('Usuário não existe ou senha incorreta');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

// Adiciona o evento de clique ao link de registro
document.getElementById('register-link').addEventListener('click', function(e) {
    e.preventDefault();
    alert("Simulação de registro");
    // Lógica para alternar para a tela de registro (opcional)
});
