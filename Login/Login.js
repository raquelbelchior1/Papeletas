// Função para fazer login
document.getElementById('login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login feito com Sucesso');
                window.location.href = "/home/home.html"; // Redirecionar para outra página
            } else {
                alert('Usuário não existe ou senha incorreta');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Função para registrar um novo usuário
document.getElementById('register-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, dateOfBirth }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
                window.location.href = "login.html"; // Redirecionar para a página de login
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Função para redirecionar para a página de registro
document.getElementById('register-link')?.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = "Registrar.html"; // Redirecionar para a página de registro
});

console.log(users);