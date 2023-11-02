const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credentials.json');
const arquivo = require('./arquivo.json');
const { JWT } = require('google-auth-library');

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets'
];

const jwt = new JWT({
  email: credenciais.client_email,
  key: credenciais.private_key,
  scopes: SCOPES,
});

module.exports = {
  getDoc,
  readWorkSheet,
  addUser
};

async function getDoc() {
  const doc = new GoogleSpreadsheet(arquivo.id, jwt);
  await doc.loadInfo();
  return doc;
}


async function readWorkSheet(doc) {
  const sheet = doc.sheetsByIndex[0]; 
  const rows = await sheet.getRows();
  const users = rows.map(row => {
    return row.toObject()
  });
  return users;
}


async function addUser(url, data = {}) {
  let response;  
  try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      });
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
    return response.json();
}

async function executeWorkFlow() {
  try {
    const doc = await getDoc();
    const users = await readWorkSheet(doc);
    const apiUrl = 'https://apigenerator.dronahq.com/api/Z87rrqIC/usuarios'
    for (const user of users) {
      await addUser(apiUrl, user);
    }
    return 'Todos os usuários foram adicionados com sucesso à API.'
  } catch (error) {
    console.error('Falha no workflow:', error);
  }
}

executeWorkFlow()
  .then(message => console.log(message)) // Exibe a mensagem de sucesso.
  .catch(error => console.error('Erro durante a execução do workflow:', error));
