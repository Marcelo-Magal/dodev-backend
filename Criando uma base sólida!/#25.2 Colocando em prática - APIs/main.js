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
// Classe para representar um Carro
class Carro {
    constructor(marca, modelo, categoria, ano, quilometragem, valor) {
        this.marca = marca; // Inicializa a propriedade 'marca'.
        this.modelo = modelo; // Inicializa a propriedade 'modelo'.
        this.categoria = categoria; // Inicializa a propriedade 'categoria'.
        this.ano = ano; // Inicializa a propriedade 'ano'.
        this.quilometragem = quilometragem; // Inicializa a propriedade 'quilometragem'.
        this.valor = valor; // Inicializa a propriedade 'valor'.
    }
}
// URL base da API
const baseUrl = "https://apigenerator.dronahq.com/api/YIZEpqm1/carros"; // Declara a URL base da API.
// Função para obter todos os carros
function Get(url = "") {
    return fetch(url) // Faz uma requisição GET para a URL.
        .then((response) => response.json()) // Converte a resposta para JSON.
        .then((data) => console.log(`Todos os carros: ${JSON.stringify(data)}`)); // Exibe os dados no console.
}
// Função para obter um carro por ID
function GetById(url = "", id) {
    return fetch(`${url}/${id}`) // Faz uma requisição GET para a URL com o ID especificado.
        .then((response) => response.json()) // Converte a resposta para JSON.
        .then((data) => console.log(`Carro de Id ${id}: ${JSON.stringify(data)}`)); // Exibe os dados no console.
}
// Função para adicionar um novo carro
function postData(url = "", data = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url, {
            // Faz uma requisição POST assíncrona para a URL.
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data), // Converte os dados para JSON.
        });
        return response.json(); // Retorna a resposta como JSON.
    });
}
// Função para atualizar um carro existente
function putData(url = "", id, data = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${url}/${id}`, {
            // Faz uma requisição PUT assíncrona para a URL com o ID especificado.
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data), // Converte os dados para JSON.
        });
        return response.json(); // Retorna a resposta como JSON.
    });
}
// Função para apagar um carro
function deleteData(url = "", id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${url}/${id}`, {
            // Faz uma requisição DELETE assíncrona para a URL com o ID especificado.
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
            },
            redirect: "follow",
            referrerPolicy: "no-referrer", // Não inclui um cabeçalho de referência.
        });
        return response.json(); // Retorna a resposta como JSON.
    });
}
// Exemplos de uso das funções
deleteData(baseUrl, 11).then((data) => {
    console.log(`Carro apagado`); // Exibe a mensagem no console.
});
const novoCarro = new Carro("Ford", "Fiesta", "Hatchback", 2020, 10000, 50000); // Cria um novo objeto Carro.
postData(baseUrl, novoCarro).then((data) => {
    console.log(`Carro adicionado: ${JSON.stringify(data)}`); // Exibe os dados no console.
});
const atualizarCarro = new Carro(// Cria um novo objeto Carro para atualização.
"Volkswagen", "Golf", "Hatchback", 2018, 15000, 60000);
putData(baseUrl, 6, atualizarCarro).then((data) => {
    // Usa a função putData para atualizar o carro.
    console.log(`Carro modificado: ${JSON.stringify(data)}`); // Exibe os dados no console.
});
Get(baseUrl); // Usa a função Get para obter todos os carros.
GetById(baseUrl, 7); // Usa a função GetById para obter o carro com ID 6.
