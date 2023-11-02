const { getDoc, readWorkSheet } = require('../index.js'); // Substitua pelo caminho correto

test('deve ler os dados da planilha corretamente', async () => {
  const doc = await getDoc(); // Certifique-se de que esta função está sendo chamada corretamente
  const dadosEsperados = { nome: 'Luiz', idade: "25", email: 'email@email.com' }; // Dados esperados da planilha
  const dadosReais = await readWorkSheet(doc); // Passa o documento como argumento
  expect(dadosReais[0]).toEqual(dadosEsperados); // Verifica se os dados lidos correspondem aos dados esperados
});