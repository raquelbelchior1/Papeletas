# Papeletas de Faltas - Gestão Digital
Dupla: Raquel Belchior e Caimi
## Sobre o Projeto

O **Papeletas** é uma plataforma web desenvolvida para substituir as tradicionais papeletas de falta em papel, oferecendo uma solução digital eficiente e fácil de usar para o registro e a gestão de faltas.
Além disso, será possível automatizar um processo que já acontece há bastante tempo no IME, melhorando o ensino ao evitar preocupações comuns, como manchas no papel.

## Funcionalidades

- **Área de login e cadastro**: Facilita o uso organizado da plataforma, permitindo que professores e a secretaria tenham acesso adicional para assinar papeletas e verificar os dados.
- **Registro de faltas**: Fácil preenchimento e submissão online de papeletas.
- **Acompanhamento em tempo real**: Visualize e gerencie as faltas diretamente no sistema.
- **Relatórios**: Geração de relatórios detalhados para análise e arquivamento.


## Tecnologias Utilizadas

- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express
- **Banco de Dados**: MongoDB

## Futuro site

Utilização do Figma para planejar e estruturar o design do site de maneira organizada e visualmente atraente.
https://www.figma.com/design/6eg2RWDZUsowZk3TTa9JHx/Untitled?node-id=0-1&t=OjiD8IIeD3H6UJqC-1

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/raquelbelchior1/Papeletas
2. Configure o banco de dados MongoDB:

Use o seguinte URI de conexão:
mongodb://localhost:27017/BancodePapeletas

3. Execute o backend:

Navegue até a pasta do backend:
bash
cd backend

Inicie o servidor:
bash
node server.js

4. Execute o frontend:

Navegue até a pasta do frontend:
bash
cd frontend/Login
Abra o arquivo Initial.html.

## **Sobre as Abas**

### **1. Página Inicial**
A página inicial oferece as opções de **Login** ou **Registrar-se**.

![Página Inicial](https://github.com/user-attachments/assets/3782cccd-6d8a-41b3-b2d7-9bc1314bbba4)

---

### **2. Login**
Caso o login seja feito como **professor**, a interface exibirá as opções:

- **Consultar Boletins**: Verifique as papeletas criadas pelos alunos.
- **Boletins Pendentes**: Acesse os registros que precisam de revisão.

![Tela de Login](https://github.com/user-attachments/assets/92a658dc-2863-416b-aa3f-890d0d72da0e)

---

### **3. Registrar-se**
Caso o login seja feito como **aluno**, a interface exibirá as opções:

- **Criar Boletim**: Preencha e envie uma nova papeleta.
- **Consultar Boletins**: Acompanhe as papeletas criadas e já submetidas.

![Tela de Registrar-se](https://github.com/user-attachments/assets/d788aa8d-89fd-4444-b137-93f7f8a90a82)

---

### **4. Aba do Professor**
Se o login for feito como **professor**, a interface exibirá a seguinte tela:

![Tela do Professor](https://github.com/user-attachments/assets/6fab534e-2c27-4e20-af09-7e3da10ebbbc)

Com as opções:

- **Consultar Boletim**: Verifique as papeletas criadas pelos alunos.
  ![Consultar Boletim](https://github.com/user-attachments/assets/7fbce0b1-7ed9-460a-a38f-bc5ca6578f11)
  
- **Boletins Pendentes**: Acesse os registros que precisam de revisão.
  ![Boletins Pendentes](https://github.com/user-attachments/assets/dce22013-becf-4220-a0d2-bd9f0fcbbe78)

---

### **5. Aba do Aluno**
Se o login for feito como **aluno**, a interface exibirá a seguinte tela:

![Tela do Aluno](https://github.com/user-attachments/assets/299760b9-72a5-46d5-9d44-c2a18a16bfaf)

Com as opções:

- **Criar Boletim**: Preencha e envie uma nova papeleta.
  ![Criar Boletim](https://github.com/user-attachments/assets/89875ea0-1bdd-48ba-8cba-7ce3775cab22)

- **Consultar Boletins**: Acompanhe as papeletas criadas e já submetidas.
  ![Consultar Boletins](https://github.com/user-attachments/assets/723cf9b5-784c-4aec-8513-341e3112ba10)

## *Diagrama de Classes*
![Diagrama de Classes](https://github.com/user-attachments/assets/3d5dcbe0-cc01-4f3d-a80b-dbcb92168b30)

## *Fluxograma*
![Fluxograma](https://github.com/user-attachments/assets/9733a568-a68c-4c91-97b8-e4469444bce7)

