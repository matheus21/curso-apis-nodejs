const axios = require('axios')
const URL = `https://swapi.dev/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url)

    return response.data
}

//Teste chamada
// obterPessoas('a').then(function(resultado){
//     console.log('resultado', resultado)
// }).catch(function (error){
//     console.error('DEU RUIM', error)
// })

//Exportando no node
//Se a chave for o mesmo nome do valor, não precisa passar
module.exports = {
    //obterPessoas: obterPessoas
    obterPessoas
}