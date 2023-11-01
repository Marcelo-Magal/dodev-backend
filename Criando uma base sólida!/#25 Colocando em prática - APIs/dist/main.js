"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = 3000;
class Carro {
    constructor(marca, modelo, categoria, ano, quilometragem, valor) {
        this.marca = marca;
        this.modelo = modelo;
        this.categoria = categoria;
        this.ano = ano;
        this.quilometragem = quilometragem;
        this.valor = valor;
    }
}
let carros = [];
axios_1.default.get('https://apigenerator.dronahq.com/api/XYiVwDBB/carro')
    .then(response => {
    carros = response.data;
})
    .catch(error => {
    console.log('Erro ao buscar dados:', error);
});
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/carros', (req, res) => {
    res.json(carros);
});
app.get('/carros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield axios_1.default.get(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`);
        res.json(response.data);
    }
    catch (error) {
        res.status(404).send('Carro não encontrado');
    }
}));
app.post('/carros', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const novoCarro = req.body;
    try {
        const response = yield axios_1.default.post('https://apigenerator.dronahq.com/api/XYiVwDBB/carro', novoCarro);
        carros.push(response.data);
        res.send('Novo carro adicionado');
    }
    catch (error) {
        res.status(500).send('Erro ao adicionar carro');
    }
}));
app.put('/carros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;
    try {
        const response = yield axios_1.default.put(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`, dadosAtualizados);
        const index = carros.findIndex(c => c.id === id);
        if (index !== -1) {
            carros[index] = response.data;
        }
        carros.push(response.data);
        res.send(`Carro com ID: ${id} atualizado`);
    }
    catch (error) {
        res.status(500).send('Erro ao atualizar carro');
    }
}));
app.delete('/carros/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const response = yield axios_1.default.delete(`https://apigenerator.dronahq.com/api/XYiVwDBB/carro/${id}`);
        const index = carros.findIndex(c => c.id === id); // Encontra o índice do carro na array
        if (index !== -1) {
            carros.splice(index, 1); // Remove o carro da array
        }
        console.log("Array atualizada após exclusão: ", carros); // Log da array atualizada
        res.send(`Carro com ID: ${id} excluído`);
    }
    catch (error) {
        res.status(500).send('Erro ao excluir carro');
    }
}));
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
