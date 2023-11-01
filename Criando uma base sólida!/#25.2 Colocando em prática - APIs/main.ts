// Classe para representar um Carro
class Carro {
  marca: string; // Declara a propriedade 'marca' do tipo string.
  modelo: string; // Declara a propriedade 'modelo' do tipo string.
  categoria: string; // Declara a propriedade 'categoria' do tipo string.
  ano: number; // Declara a propriedade 'ano' do tipo number.
  quilometragem: number; // Declara a propriedade 'quilometragem' do tipo number.
  valor: number; // Declara a propriedade 'valor' do tipo number.

  constructor(
    marca: string,
    modelo: string,
    categoria: string,
    ano: number,
    quilometragem: number,
    valor: number
  ) {
    this.marca = marca; // Inicializa a propriedade 'marca'.
    this.modelo = modelo; // Inicializa a propriedade 'modelo'.
    this.categoria = categoria; // Inicializa a propriedade 'categoria'.
    this.ano = ano; // Inicializa a propriedade 'ano'.
    this.quilometragem = quilometragem; // Inicializa a propriedade 'quilometragem'.
    this.valor = valor; // Inicializa a propriedade 'valor'.
  }
}

// URL base da API
const baseUrl: string = "https://apigenerator.dronahq.com/api/YIZEpqm1/carros"; // Declara a URL base da API.

// Função para obter todos os carros
function Get(url = "") {
  return fetch(url) // Faz uma requisição GET para a URL.
    .then((response) => response.json()) // Converte a resposta para JSON.
    .then((data) => console.log(`Todos os carros: ${JSON.stringify(data)}`)); // Exibe os dados no console.
}

// Função para obter um carro por ID
function GetById(url = "", id: number) {
  return fetch(`${url}/${id}`) // Faz uma requisição GET para a URL com o ID especificado.
    .then((response) => response.json()) // Converte a resposta para JSON.
    .then((data) => console.log(`Carro de Id ${id}: ${JSON.stringify(data)}`)); // Exibe os dados no console.
}

// Função para adicionar um novo carro
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    // Faz uma requisição POST assíncrona para a URL.
    method: "POST", // Especifica o método como POST.
    mode: "cors", // Permite requisições de cross-origin.
    cache: "no-cache", // Desativa o cache.
    credentials: "same-origin", // Inclui credenciais se a URL for do mesmo origin.
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
    },
    redirect: "follow", // Segue redirecionamentos.
    referrerPolicy: "no-referrer", // Não inclui um cabeçalho de referência.
    body: JSON.stringify(data), // Converte os dados para JSON.
  });
  return response.json(); // Retorna a resposta como JSON.
}

// Função para atualizar um carro existente
async function putData(url = "", id: number, data = {}) {
  const response = await fetch(`${url}/${id}`, {
    // Faz uma requisição PUT assíncrona para a URL com o ID especificado.
    method: "PUT", // Especifica o método como PUT.
    mode: "cors", // Permite requisições de cross-origin.
    cache: "no-cache", // Desativa o cache.
    credentials: "same-origin", // Inclui credenciais se a URL for do mesmo origin.
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
    },
    redirect: "follow", // Segue redirecionamentos.
    referrerPolicy: "no-referrer", // Não inclui um cabeçalho de referência.
    body: JSON.stringify(data), // Converte os dados para JSON.
  });
  return response.json(); // Retorna a resposta como JSON.
}

// Função para apagar um carro
async function deleteData(url = "", id: number) {
  const response = await fetch(`${url}/${id}`, {
    // Faz uma requisição DELETE assíncrona para a URL com o ID especificado.
    method: "DELETE", // Especifica o método como DELETE.
    mode: "cors", // Permite requisições de cross-origin.
    cache: "no-cache", // Desativa o cache.
    credentials: "same-origin", // Inclui credenciais se a URL for do mesmo origin.
    headers: {
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
    },
    redirect: "follow", // Segue redirecionamentos.
    referrerPolicy: "no-referrer", // Não inclui um cabeçalho de referência.
  });
  return response.json(); // Retorna a resposta como JSON.
}

// Exemplos de uso das funções

deleteData(baseUrl, 11).then((data) => { // Usa a função deleteData para apagar o carro com ID 9.
  console.log(`Carro apagado`); // Exibe a mensagem no console.
});

const novoCarro = new Carro("Ford", "Fiesta", "Hatchback", 2020, 10000, 50000); // Cria um novo objeto Carro.
postData(baseUrl, novoCarro).then((data) => {  // Usa a função postData para adicionar o novo carro.
  console.log(`Carro adicionado: ${JSON.stringify(data)}`); // Exibe os dados no console.
});

const atualizarCarro = new Carro( // Cria um novo objeto Carro para atualização.
  "Volkswagen",
  "Golf",
  "Hatchback",
  2018,
  15000,
  60000
); 
putData(baseUrl, 6, atualizarCarro).then((data) => {
  // Usa a função putData para atualizar o carro.
  console.log(`Carro modificado: ${JSON.stringify(data)}`); // Exibe os dados no console.
});

Get(baseUrl); // Usa a função Get para obter todos os carros.
GetById(baseUrl, 7); // Usa a função GetById para obter o carro com ID 6.
