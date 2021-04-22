const { obterPessoas } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let index = 0; index <= this.length - 1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
}

main()
async function main() {
    try {
        const { results } = await obterPessoas(`a`)
        const pesos = results.map((item) => parseFloat(item.height))
        console.log('pesos', pesos)
        // [20.1, 30.2, 50.5]
        // Valor de 0 caso não tenha valor anterior
        // const total = pesos.reduce((anterior, proximo) => {
        //     return anterior + proximo
        // }, 0)

        const minhaLista = [
            ['Matheus', 'Oliveira'],
            ['TesteBr', 'Teste'],
        ]
        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, []).join(', ')
        console.log('total', total)
    } catch (error) {
        console.log('DEU RUIM', error)
    }
}