const EventEmitter = require('events')
class MeuEmissor extends EventEmitter {

}
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'

//Observer do evento
meuEmissor.on(nomeEvento, function (click) {
    console.log('um usuario clicou', click)
})

// meuEmissor.emit(nomeEvento, 'na barra de rolagem')
// meuEmissor.emit(nomeEvento, 'no ok')
//
// //Função executada de tempo em tempo
// //Para cada evento, observer sempre assistirá
// let count = 0
// setInterval(function () {
//     meuEmissor.emit(nomeEvento, 'no ok' + (count++))
// }, 1000)

//Pega coisas que forem digitadas no terminal
const stdin = process.openStdin()

//Exemplo usando promise, que retorna uma unica vez
//Para eventos continuos, usa-se o EventEmitter
function main() {
    return new Promise(function (resolve, reject){
        stdin.addListener('data', function(value) {
            //console.log(`Voce digitou: ${value.toString().trim()}`)
            return resolve(value)
        })
    })
}

//Pegará o texto digitado uma vez só
main().then(function(resultado) {
    console.log('resultado', resultado.toString())
})