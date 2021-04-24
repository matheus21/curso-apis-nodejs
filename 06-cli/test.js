const {
    deepEqual,
    ok
} = require('assert')

const database = require('./database')
const DEFAULT_ITEM_CADASTRADO = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel',
    id: 2
}

describe('Suite de manipulação de Herois', () => {

    //Cadastra algum heroi sempre antes dos testes
    //Para sempre passar o teste de delete, insere um usuario antes para deletar
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRADO
        //destructor -> pega somente o primeiro colocando os colchetes, colocando mais varáveis retorna mais itens na sequencia
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRADO
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRADO)
        // Verifica se o item que acabou de ser cadastrado existe no arquivo e faz o assert dele com o esperado
        const [atual] = await database.listar(DEFAULT_ITEM_CADASTRADO.id)
        deepEqual(atual, expected)
    })

    //'it.only' => só executa esse teste
    it('deve remover o heroi por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRADO.id)
        deepEqual(resultado, expected)
    })

    it('deve atualizar um heroi por id', async () => {

        //mantem o id
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        //Não passa o id, para não modificar o id também
        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        //Listar para checar se o resultado é o mesmo
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })

})