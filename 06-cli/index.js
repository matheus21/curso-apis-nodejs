const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

main()
async function main() {
    Commander
        .version('v1')
        //Pega parametros
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")

        //Ações
        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar um Heroi")
        .option('-r, --remover', "Remover um Heroi pelo id")
        .option('-a, --atualizar [value]', "Atualizar um Heroi pelo id")


        .parse(process.argv)
    const heroi = new Heroi(Commander.opts())
    try {
        if(Commander.opts().cadastrar) {
            //Tira o 'heroi.id' se o valor for undefined
            delete heroi.id
            const resultado = await Database.cadastrar(heroi)
            if(!resultado) {
                console.error('Heroi não foi cadastrado')
            }
        console.log('Heroi cadastrado com sucesso')
        }
        if(Commander.opts().listar) {
            const resultado = await Database.listar()
            console.log(resultado)
        }

        if(Commander.opts().remover) {
            const resultado = await Database.remover(heroi.id)
            if(!resultado) {
                console.error('Não foi possível remover o Heroi')
            }
        console.log('Heroi removido com sucesso')
        }

        if(Commander.opts().atualizar) {
            const idParaAtualizar = parseInt(Commander.opts().atualizar)
            // remover todas as chaves que estiverem com undefined | null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, heroiAtualizar)

            if(!resultado) {
                console.error('Não foi possível atualizar o Heroi')
            }
            console.log('Herói atualizado com sucesso')
            //Se um parametro for composto, mandar entre aspas duplas para ele não achar que são dois parâmetros
            //Ex.: poder > "Teste Teste"
        }
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}
