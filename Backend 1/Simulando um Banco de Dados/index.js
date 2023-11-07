const express = require('express') // Importa a biblioteca Express para o arquivo.
const app = express() // Inicializa uma nova aplicação Express.

app.use(express.json()); // Configura a aplicação para interpretar dados em formato JSON.

const users = []; // Inicializa um array vazio para armazenar os usuários.

// Define uma rota GET para '/alunos' que lista todos os usuários.
app.get("/alunos", (req, res) => {
  console.log("API get todos"); // Exibe no console a ação de acesso à rota.
  console.log({users :users}); // Exibe no console o objeto com o array de usuários.
  res.status(200).send({users :users}); // Responde à requisição com o array de usuários e status 200.
});

// Define uma rota GET para '/alunos/:id' que busca um usuário pelo ID.
app.get("/alunos/:id", (req, res) => {
  const alunoId = req.params.id; // Extrai o ID do aluno da URL.
  console.log("API get by id") // Exibe no console a ação de acesso à rota com ID.
  console.log(users.find(x => x.id == alunoId)); // Procura no array o usuário com o ID fornecido e exibe no console.
  res.status(200).send(users.find(x => x.id == alunoId)); // Responde com o usuário encontrado ou undefined se não encontrar.
});

// Define uma rota POST para '/alunos' que adiciona um novo usuário ao array.
app.post("/alunos", (req, res) => {
  console.log("API post aluno") // Exibe no console a ação de adicionar um novo aluno.
  users.push(req.body); // Adiciona os dados do corpo da requisição ao array de usuários.
  console.log(`Aluno adicionado: ${JSON.stringify(req.body)}`); // Exibe no console os dados do aluno adicionado.
  res.status(200).send(req.body); // Responde com os dados do aluno adicionado e status 200.
})

// Define uma rota PUT para '/alunos/:id' que atualiza um usuário existente.
app.put("/alunos/:id", (req, res) => {
  const alunoId = parseInt(req.params.id); // Converte o ID do aluno para um número inteiro.
  console.log("API put aluno"); // Exibe no console a ação de atualizar um aluno.
  const index = users.findIndex(u => u.id === alunoId); // Encontra o índice do usuário com o ID fornecido.

  if (index !== -1) { // Verifica se o usuário existe.
    const updatedUser = { ...users[index], ...req.body }; // Cria um novo objeto usuário com as atualizações.
    users[index] = updatedUser; // Atualiza o usuário no array com as novas informações.
    res.status(200).send(`Aluno com ID: ${alunoId} atualizado`); // Responde com uma mensagem de sucesso.
    console.log(`Aluno com ID: ${alunoId} atualizado`); // Exibe no console a confirmação de atualização.
  } else {
    res.status(404).send({ message: "Usuário não encontrado." }); // Responde com erro se o usuário não existir.
  }
});

// Define uma rota DELETE para '/alunos/:id' que remove um usuário pelo ID.
app.delete("/alunos/:id", (req, res) => {
  const alunoId = parseInt(req.params.id); // Converte o ID do aluno para um número inteiro.
  console.log("API delete aluno"); // Exibe no console a ação de deletar um aluno.
  const index = users.findIndex(u => u.id === alunoId); // Encontra o índice do usuário com o ID fornecido.

  if (index !== -1) { // Verifica se o usuário existe.
    users.splice(index, 1); // Remove o usuário do array.
    res.status(200).send(`Aluno com ID: ${alunoId} deletado`); // Responde com uma mensagem de sucesso.
    console.log(`Aluno com ID: ${alunoId} deletado`); // Exibe no console a confirmação de exclusão.
  } else {
    res.status(404).send({ message: "Usuário não encontrado." }); // Responde com erro se o usuário não existir.
  }
});

// Inicia o servidor na porta 3000 e exibe uma mensagem no console.
app.listen(3000, () => {
  console.log("server running on port 3000"); // Exibe no console que o servidor está rodando.
});
