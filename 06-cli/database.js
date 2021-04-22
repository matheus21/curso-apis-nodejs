const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

// Outra forma de obter dados
// const dadosJson = require('./herois.json')

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now()
        /**
         * {
         * nome: Flash,
         * poder: Velocidade,
         * }
         *
         * {
         * id: 12812812
         * }
         *
         * {
         * nome: Flash,
         * poder: Velocidade,
         * id: 12812812
         * }
         */

        // Concatenar com operador spread
        const heroiComId = {
            id,
            ...heroi
        }

        // Concatenar o novo heroi com os ja existentes no arquivo
        const dadosFinal = [
            ...dados,
            heroiComId
        ]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado;
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        //Se não passar id, trazer tudo
        const dadosFiltrados = dados.filter(item => (id ? item.id === id : true))
        return dadosFiltrados
    }
}

module.exports = new Database()