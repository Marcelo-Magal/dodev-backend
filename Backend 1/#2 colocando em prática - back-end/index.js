const express = require("express");
const app = express();

app.use(express.json());

const port = 3000;
const alunos = [];

app.get("/alunos", (req, res) => {
  res.status(200).send({alunos: alunos});
});

app.get("/alunos/:id", (req, res) => {
  const aluno = alunos.find(a => a.id == req.params.id);
  res.status(200).send(aluno);
});

app.post("/alunos", (req, res) => {
  alunos.push(req.body);
  res.status(200).send("aluno cadastrado");
});

app.put("/alunos/:id", (req, res) => {
  const index = alunos.findIndex(a => a.id ==req.params.id);
  alunos[index] = req.body;
  res.status(200).send("aluno atualizado");
});

app.delete("/alunos/:id", (req, res) => {
  const index = alunos.indexOf(a => a.id == req.params.id);
  alunos.splice(index, 1);
  res.status(200).send("aluno excluído");
});


app.listen(port, () => {
  console.log(`server running on port ${port}`)
});