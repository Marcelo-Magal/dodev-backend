const express = require("express");
const app = express();
const db = require("./bd");
const dbcontext = db.AlunosDatabase();

app.use(express.json());

const port = 3000;

app.get("/alunos", async (req, res) => {
  res.status(200).send(await dbcontext.list());
});

app.get("/alunos/:id", async (req, res) => {
  res.status(200).send(await dbcontext.get(req.params.id));
});

app.post("/alunos", async (req, res) => {
  res.status(200).send(await dbcontext.insert(req.body));
});

app.put("/alunos/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10); //Nesta linha, estamos obtendo o ID do aluno a partir dos parâmetros da requisição (req.params.id). Como os parâmetros de rota são sempre strings, usamos parseInt para converter esse ID em um número inteiro. O segundo argumento, 10, é a base numérica para a conversão, garantindo que o número é interpretado como base decimal.
  if (!isNaN(id)) { // Aqui, usamos a função isNaN para verificar se o resultado da conversão é um número válido. Se id não for um número (por exemplo, se o cliente enviar uma string que não pode ser convertida em número), isNaN(id) retornará true e entraremos no bloco else.
    res.status(200).send(await dbcontext.update(req.body, id));
  } else {
    res.status(400).send({ error: "ID inválido" });
  }
});

app.delete("/alunos/:id", async (req, res) => {
  res.status(200).send(await dbcontext.del(req.params.id));
});  


app.listen(port, () => {
  console.log(`server running on port ${port}`)
});