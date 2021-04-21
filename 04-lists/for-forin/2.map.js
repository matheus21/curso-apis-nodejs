const service = require('./service')

//Meu proprio map na implementação de Array
Array.prototype.meuMap = function(callback) {
    const novoArrayMapeado = []
    for(let indice = 0; indice <= this.length - 1; indice++) {
        //No callback parametros que passamos no map
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado
}


main()
async function main () {
    try {
        const result = await service.obterPessoas('a')
        //const names = []
        // result.results.forEach(function (item) {
        //     names.push(item.name)
        // })

        //Pra cada item da lista, retorna um array apenas com o nome
        //const names = result.results.map(function (pessoa) {
        //    return pessoa.name
        //})

        //Pessoa como função: Arrow Function
        //const names = result.results.map((pessoa) => pessoa.name)
        const names = result.results.meuMap(function (pessoa, indice) {
            return `[${indice}]${pessoa.name}`
        })
        console.log('names', names)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}