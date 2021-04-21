//Extrair somente o 'obterPessoas' do service
const { obterPessoas } = require('./service')

/*
const item = {
    nome: Bob,
    idade: 11 meses
}

const { nome } = item
console.log(nome) -> Retorna apenas o nome
 */

//Meu proprio filter()
Array.prototype.meuFilter = function (callback) {
    const lista = []
    for(index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        //0, "", null, undefined === false
        if(!result) continue;
        lista.push(item)
    }
    return lista;
}

main()
async function main() {
    try {
        const { results } = await obterPessoas(`a`)
        // const familiaLars = results.filter(function(item) {
        //     // por padrão precisa retornar um boolean para informar se mantem ou remove da lista
        //     // false remove / true mantem
        //     // not found = -1
        //     // found = posição no array (0...)
        //     const result = item.name.toLowerCase().indexOf(`lars`) !== -1
        //     return result
        // })
        const familiaLars = results.meuFilter((item, index, lista) => {
           console.log(`index: ${index}`, lista.length)
           return item.name.toLowerCase().indexOf(`lars`) !== -1
        })

        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log('names', names)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}