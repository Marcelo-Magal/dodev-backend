
const express = require("express");
const app = express();
const db = require("./db");
const dbcontext = db.carrosDatabase();

app.use(express.json());

const port =3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

// GET
app.get("/carros", async (req, res) => {
  res.status(200).send(await dbcontext.list());
});

// GET BY ID
app.get("/carros/:id", async(req, res) => {
  res.status(200).send(await dbcontext.get(req.params.id));
});

// POST
app.post("/carros", async (req, res) => {
  res.status(200).send(await dbcontext.insert(req.body));
});

// PUT
app.put("/carros/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if(!isNaN(id)) {
    res.status(200).send(await dbcontext.update(req.body, id));
  } else {
    res.status(400).send({ error: "ID inválido" });
  }
});

// DELETE
app.delete("/carros/:id", async (req, res) => {
  await dbcontext.del(req.params.id)
  res.status(200).send(console.log("carro excluído com sucesso"));
});

