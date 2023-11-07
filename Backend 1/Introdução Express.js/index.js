const express = require("express"); // Carrega o módulo express para criar servidores web e salava na varável chamada express.
const app = express(); // Inicializa o Express, um framework de servidor web, e atribui à variável 'app'


app.use(express.json()); // Habilita o middleware para parsear JSON no corpo das requisições. (Ativa o processamento de dados JSON em requisições recebidas) 

// API responsável por pegar todos os alunos
app.get('/alunos', (req, res) => { // Define a rota GET para '/alunos'
  console.log(req.query); // Loga os parâmetros de consulta da requisição
  console.log("entrou no alunos"); // Loga a mensagem indicando acesso à rota de alunos
  res.status(200).send('deu certo'); // Responde com status 200 e mensagem 'deu certo'
})

// API responsável por pegar 1 aluno
app.get('/alunos/:id/:outro', (req, res) => { // Cria a rota GET com parâmetros 'id' e 'outro'
  console.log(req.params.id); // Loga o parâmetro 'id' da URL
  console.log(req.params.outro); // Loga o parâmetro 'outro' da URL
  res.status(200).send('deu certo'); // Responde com status 200 e mensagem 'deu certo'
})

app.post('/alunos', (req, res) => { // Cria rota POST para adicionar um novo aluno
  console.log(req.body); // Loga o corpo da requisição recebida
  console.log("entrou no alunos"); // Loga a mensagem indicando acesso à rota de alunos
  res.status(200).send(req.body); // Responde com status 200 e o corpo da requisição
})


app.listen(3000, () => { // Inicia o servidor na porta 3000 e aguarda conexões
  console.log("iniciei meu servidor") // Exibe mensagem indicando que o servidor foi iniciado
});