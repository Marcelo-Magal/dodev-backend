const delay = (time) =>
    new Promise(resolve =>
        setTimeout(resolve, time)
    )


const carrosDatabase = (() => {
    let idSequence = 1
    const carros =[];

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
      const insert = async (carro) => {
          await delay(400)
          const id = idSequence++
          const data = { ...carro, id }
          carros[id] = data
          return data
      }

    const list = async () => {
        await delay(100)
        return Object.values(carros)
    }

    const get = async (id) => {
        await delay(200)
        return carros[id]
    }

    const update = async (carro, id) => {
        await delay(400)
        carros[id] = { ...carro, id }
        return carro
    }

    const del = async (id) => {
        await delay(500)
        delete carros[id]
    }

    return {
        insert,
        list,
        get,
        update,
        del,
    }

})

module.exports = {
    carrosDatabase
}