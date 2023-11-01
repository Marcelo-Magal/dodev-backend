import express from 'express';
import path from 'path';
import axios from 'axios';

const app = express();
const port = 3000;

class Carro {
  marca: string;
  modelo: string;
  categoria: string;
  ano: number;
  quilometragem: number;
  valor: number;

  constructor(marca: string, modelo: string, categoria: string, ano: number, quilometragem: number, valor: number) {
    this.marca = marca;
    this.modelo = modelo;
    this.categoria = categoria;
    this.ano = ano;
    this.quilometragem = quilometragem;
    this.valor = valor;
  }
}

interface CarroAPI {
  Marca: string;
  Modelo: string;
  Categoria: string;
  Ano: number;
  Quilometragem: number;
  Valor: number;
  id: number;
}

let carros: CarroAPI[] = [];

axios.get('https://apigenerator.dronahq.com/api/XYiVwDBB/carro')
  .then(response => {
    carros = response.data;
  })
  .catch(error => {
    console.log('Erro ao buscar dados:', error);
  });

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/carros', (req, res) => {
  res.json(carros);
});

app.get('/carros/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await axios.get(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).send('Carro não encontrado');
  }
});


app.post('/carros', async (req, res) => {
  const novoCarro: CarroAPI = req.body;
  try {
    const response = await axios.post('https://apigenerator.dronahq.com/api/XYiVwDBB/carro', novoCarro);
    carros.push(response.data);
    res.send('Novo carro adicionado');
  } catch (error) {
    res.status(500).send('Erro ao adicionar carro');
  }
});

app.put('/carros/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const dadosAtualizados: CarroAPI = req.body;
  try {
    const response = await axios.put(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`, dadosAtualizados);
    const index = carros.findIndex(c => c.id === id);
    if (index !== -1) {
      carros[index] = response.data;
    }
    carros.push(response.data);
    res.send(`Carro com ID: ${id} atualizado`);
  } catch (error) {
    res.status(500).send('Erro ao atualizar carro');
  }
});


app.delete('/carros/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const response = await axios.delete(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`);
    const index = carros.findIndex(c => c.id === id);  // Encontra o índice do carro na array
    if (index !== -1) {
      carros.splice(index, 1);  // Remove o carro da array
    }
    console.log("Array atualizada após exclusão: ", carros);  // Log da array atualizada
    res.send(`Carro com ID: ${id} excluído`);
  } catch (error) {
    res.status(500).send('Erro ao excluir carro');
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
