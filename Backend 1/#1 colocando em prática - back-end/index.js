const express = require('express') // "Carrega o módulo 'express' para uso."
const app = express() // "Cria uma aplicação Express e armazena em 'app'."

app.use(express.json()); // "Configura 'app' para entender JSON."

// Rota GET para listar todos os usuários
app.get("/usuarios", (req, res) => {
  console.log("API get todos"); // "Registra no log acesso à rota GET /usuarios."
  res.status(200).send("todos os usuários"); // "Envia resposta de sucesso com uma mensagem."
});

// Rota GET para buscar usuário por ID
app.get("/usuarios/:id", (req, res) => {
  console.log("API get por id"); // "Registra no log acesso à rota GET /usuarios/:id."
  res.status(200).send(req.params.id); // "Envia o 'id' do usuário como resposta."
});

// Rota POST para criar um novo usuário
app.post("/usuarios", (req, res) => {
  console.log("API post usuário"); // "Registra no log acesso à rota POST /usuarios."
  res.status(200).send(req.body); // "Envia os dados do novo usuário como resposta."
})

// Rota PUT para atualizar um usuário por ID
app.put("/usuarios/:id", (req, res) => {
  console.log("API put usuário"); // "Registra no log acesso à rota PUT /usuarios/:id."
  res.status(200).send(req.params.id); // "Confirma atualização do usuário com 'id'."
})

// Rota DELETE para remover um usuário por ID
app.delete("/usuarios/:id", (req, res) => {
  console.log("API delete usuário"); // "Registra no log acesso à rota DELETE /usuarios/:id."
  res.status(200).send(req.params.id); // "Confirma exclusão do usuário com 'id'."
});

app.listen(3000, () => {
  console.log("server running on port 3000"); // "Informa que o servidor está ativo na porta 3000."
});

