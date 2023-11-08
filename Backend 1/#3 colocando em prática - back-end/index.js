
const express = require("express");
const app = express();

app.use(express.json());

const port =3000;
const carros =[]

// Define a classe Carro
class Carro {  // Define uma classe chamada 'Carro'.
  // Declara as propriedades da classe
  marca; // Declara a propriedade 'marca' do tipo string.
  modelo;  // Declara a propriedade 'modelo' do tipo string.
  categoria; // Declara a propriedade 'categoria' do tipo string.
  ano; // Declara a propriedade 'ano' do tipo number.
  quilometragem; // Declara a propriedade 'quilometragem' do tipo number.
  valor;  // Declara a propriedade 'valor' do tipo number.
  id; 

  // Construtor da classe
  constructor(marca, modelo, categoria, ano, quilometragem, valor, id) {  // Define o construtor da classe, que aceita seis argumentos.
    this.marca = marca;  // Inicializa a propriedade 'marca' com o valor fornecido.
    this.modelo = modelo;  // Inicializa a propriedade 'modelo' com o valor fornecido.
    this.categoria = categoria;  // Inicializa a propriedade 'categoria' com o valor fornecido.
    this.ano = ano;  // Inicializa a propriedade 'ano' com o valor fornecido.
    this.quilometragem = quilometragem;  // Inicializa a propriedade 'quilometragem' com o valor fornecido.
    this.valor = valor;  // Inicializa a propriedade 'valor' com o valor fornecido.
    this.id = id;
  }
}

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});

// GET
app.get("/carros", (req, res) => {
  res.status(200).send({carros: carros});
});

// GET BY ID
app.get("/carros/:id", (req, res) => {
  const carro = carros.find(c => c.id == req.params.id);
  res.status(200).send(carro);
});

// POST
app.post("/carros", (req, res) => {
  carros.push(req.body);
  res.status(200).send("carro cadastrado");
});

// PUT
app.put("/carros/:id", (req, res) => {
  const index = carros.findIndex(c => c.id == req.params.id);
  carros[index] = req.body;
  res.status(200).send("carro atualizado");
});

// DELETE
app.delete("/carros/:id", (req, res) => {
  const index = carros.findIndex(c => c.id == req.params.id);
  carros.splice(index, 1);
  res.status(200).send('carro excluído');
});

