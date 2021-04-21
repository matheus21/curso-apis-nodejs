/*
1 Obter um usuário
2 Obter o numero de telefone de um usuário a partir de seu Id
3 Obter o endereco do usuario pelo Id
*/

// importamos um modulo interno do node.js
const util = require('util')
// converte para promise
const obterEnderecoAsync = util.promisify(obterEndereco)

// Padrão callback -> parametros erro primeiro e depois sucesso
function obterUsuario() {
    // quando der algum problema -> reject(ERRO)
    // quando der bom -> resolve()
    return new Promise(function resolvePromise(resolve, reject){

        //return reject(new Error('DEU RUIM DE VERDADE!'))

        setTimeout(function() {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

//Callback é sempre o ultimo parâmetro
function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000)
    })
}

// Caso não seja seguido o padrão correto de callback, não funciona converter com o promisify
function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

// Usando async/await
// adicionar a palavra async -> automaticamente retorna uma promise

//Não executando nada após o main, não chamamos o then e catch dele
main()
async function main() {
    try {
        console.time('medida-promise')

        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
                 Nome: ${usuario.nome},
                 Endereco: ${endereco.rua},${endereco.numero}
                 Telefone: (${telefone.ddd})${telefone.telefone}
        `)
         console.timeEnd('medida-promise')
    } catch (error) {
        console.log('DEU RUIM', error)
    }
}

//Chamada usando promise
//const usuarioPromise = obterUsuario()
//// Para manipular o sucesso usamos a função '.then()'
//// Para manilular erros usamos '.catch'
//// Conceito de pipe: usuario -> telefone -> o ultimo chamado é o telefone
//usuarioPromise
//    //Pode utilizar o mesmo nome 'resultado', pois após a execução de cada contexto ele é excluído
//    .then(function (usuario) {
//        //Chama a promise obterTelefone passando o resultado que é o id do usuário
//        return obterTelefone(usuario.id)
//            //resolvendo promise de telefone, para passar o resultado com dados de usuário
//            .then(function resolverTelefone(result) {
//                return {
//                    usuario: {
//                        nome: usuario.nome,
//                        id: usuario.id
//                    },
//                    telefone: result
//                }
//            })
//    })
//
//    //resultado vem do ultimo '.then'
//    .then(function (resultado) {
//        const endereco = obterEnderecoAsync(resultado.usuario.id)
//        //resolve endereco
//        return endereco.then(function resolverEndereco(result) {
//            return {
//                usuario: resultado.usuario,
//                telefone: resultado.telefone,
//                endereco: result
//            }
//        })
//    })
//
//    .then(function (resultado) {
//            console.log(`
//                 Nome: ${resultado.usuario.nome},
//                 Endereco: ${resultado.endereco.rua},${resultado.endereco.numero}
//                 Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
//        `)
//    })
//    .catch(function (error){
//        console.error('DEU RUIM', error)
//    })

//Chamada usando callback
// obterUsuario(function resolverUsuario(error, usuario){
//     // null || "" || 0 === false
//     if(error) {
//         console.error('DEU RUIM em USUARIO', error)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone){
//         if(error1) {
//             console.error('DEU RUIM em TELEFONE', error1)
//             return;
//         }
//
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco){
//             if(error2) {
//                 console.error('DEU RUIM em ENDERECO', error2)
//                 return;
//             }
//
//             console.log(`
//                 Nome: ${usuario.nome},
//                 Endereco: ${endereco.rua},${endereco.numero}
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })
// })